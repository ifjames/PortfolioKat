import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

interface SecureDocument {
  id: string;
  filename: string;
  originalPath: string;
  accessToken?: string;
  expiresAt?: Date;
  downloadCount: number;
  maxDownloads?: number;
}

export class DocumentSecurity {
  private documents: Map<string, SecureDocument> = new Map();
  private readonly secretKey = process.env.DOC_SECRET_KEY || 'your-secret-key-change-this';

  /**
   * Register a document for secure access
   */
  registerDocument(filename: string, originalPath: string, options?: {
    maxDownloads?: number;
    expirationHours?: number;
  }): string {
    const id = crypto.randomUUID();
    const doc: SecureDocument = {
      id,
      filename,
      originalPath,
      downloadCount: 0,
      maxDownloads: options?.maxDownloads,
    };

    if (options?.expirationHours) {
      doc.expiresAt = new Date(Date.now() + options.expirationHours * 60 * 60 * 1000);
    }

    this.documents.set(id, doc);
    return id;
  }

  /**
   * Generate a secure access token for a document
   */
  generateAccessToken(documentId: string, clientInfo?: string): string | null {
    const doc = this.documents.get(documentId);
    if (!doc) return null;

    // Check if document is still valid
    if (doc.expiresAt && doc.expiresAt < new Date()) {
      this.documents.delete(documentId);
      return null;
    }

    if (doc.maxDownloads && doc.downloadCount >= doc.maxDownloads) {
      return null;
    }

    // Generate token with expiration (1 hour)
    const payload = {
      documentId,
      clientInfo: clientInfo || 'anonymous',
      issuedAt: Date.now(),
      expiresAt: Date.now() + (60 * 60 * 1000) // 1 hour
    };

    const token = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = crypto.createHmac('sha256', this.secretKey).update(token).digest('hex');
    
    return `${token}.${signature}`;
  }

  /**
   * Validate an access token
   */
  validateToken(token: string): { documentId: string; clientInfo: string } | null {
    try {
      const [tokenPart, signature] = token.split('.');
      
      // Verify signature
      const expectedSignature = crypto.createHmac('sha256', this.secretKey).update(tokenPart).digest('hex');
      if (signature !== expectedSignature) {
        return null;
      }

      const payload = JSON.parse(Buffer.from(tokenPart, 'base64').toString());
      
      // Check expiration
      if (payload.expiresAt < Date.now()) {
        return null;
      }

      return {
        documentId: payload.documentId,
        clientInfo: payload.clientInfo
      };
    } catch {
      return null;
    }
  }

  /**
   * Get document for download (increments counter)
   */
  getDocument(documentId: string): SecureDocument | null {
    const doc = this.documents.get(documentId);
    if (!doc) return null;

    // Check constraints
    if (doc.expiresAt && doc.expiresAt < new Date()) {
      this.documents.delete(documentId);
      return null;
    }

    if (doc.maxDownloads && doc.downloadCount >= doc.maxDownloads) {
      return null;
    }

    // Increment download count
    doc.downloadCount++;
    return doc;
  }

  /**
   * Setup secure document routes
   */
  setupRoutes(app: express.Application): void {
    // Request access to a document
    app.post('/api/documents/:id/request-access', (req, res) => {
      const { id } = req.params;
      const clientInfo = req.headers['user-agent'] || 'unknown';
      
      const token = this.generateAccessToken(id, clientInfo);
      if (!token) {
        return res.status(404).json({ error: 'Document not found or access denied' });
      }

      res.json({ accessToken: token });
    });

    // Download document with token
    app.get('/api/documents/:id/download', (req, res) => {
      const { id } = req.params;
      const token = req.query.token as string;

      if (!token) {
        return res.status(401).json({ error: 'Access token required' });
      }

      const validation = this.validateToken(token);
      if (!validation || validation.documentId !== id) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }

      const doc = this.getDocument(id);
      if (!doc) {
        return res.status(404).json({ error: 'Document not found or access expired' });
      }

      // Check if file exists
      if (!fs.existsSync(doc.originalPath)) {
        return res.status(404).json({ error: 'File not found' });
      }

      // Set headers to prevent caching and encourage download
      res.setHeader('Content-Disposition', `attachment; filename="${doc.filename}"`);
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');

      // Stream the file
      const stream = fs.createReadStream(doc.originalPath);
      stream.pipe(res);
    });

    // Get document info (without downloading)
    app.get('/api/documents/:id/info', (req, res) => {
      const { id } = req.params;
      const doc = this.documents.get(id);
      
      if (!doc) {
        return res.status(404).json({ error: 'Document not found' });
      }

      res.json({
        id: doc.id,
        filename: doc.filename,
        downloadCount: doc.downloadCount,
        maxDownloads: doc.maxDownloads,
        expiresAt: doc.expiresAt,
        isExpired: doc.expiresAt ? doc.expiresAt < new Date() : false,
        isDownloadLimitReached: doc.maxDownloads ? doc.downloadCount >= doc.maxDownloads : false
      });
    });
  }
}

// Singleton instance
export const documentSecurity = new DocumentSecurity();

// Initialize protected documents
export function initializeProtectedDocuments(): void {
  // Register the resume with protection
  const resumePath = path.join(process.cwd(), 'client/public/assets/my-resume.final.pdf');
  if (fs.existsSync(resumePath)) {
    documentSecurity.registerDocument(
      'Katrina_De_Leon_Resume.pdf',
      resumePath,
      {
        maxDownloads: 100, // Limit downloads
        expirationHours: 24 * 7 // Valid for 1 week
      }
    );
  }
}
