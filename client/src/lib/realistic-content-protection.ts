import { useEffect } from 'react';

/**
 * Realistic Content Protection System
 * 
 * IMPORTANT DISCLAIMER:
 * This system provides basic deterrence against casual content copying.
 * It is NOT a security measure and can be easily bypassed by:
 * - Browser extensions (Enable Copy Paste, etc.)
 * - Developer tools
 * - Disabling JavaScript
 * - Browser view-source
 * - Network inspection
 * 
 * This serves as a "Please don't copy" sign, not a security fence.
 * For real content protection, use server-side solutions, watermarking,
 * legal agreements, and reduced-quality public versions.
 */

export class RealisticContentProtection {
  private static instance: RealisticContentProtection;
  private isInitialized = false;
  private protectionLevel: 'none' | 'basic' | 'standard' = 'standard';

  public static getInstance(): RealisticContentProtection {
    if (!RealisticContentProtection.instance) {
      RealisticContentProtection.instance = new RealisticContentProtection();
    }
    return RealisticContentProtection.instance;
  }

  public initialize(level: 'none' | 'basic' | 'standard' = 'standard'): void {
    if (this.isInitialized) return;
    
    this.protectionLevel = level;
    
    if (level === 'none') {
      return;
    }

    // Basic protection - just disable obvious copying methods
    if (level === 'basic' || level === 'standard') {
      this.addBasicProtection();
    }

    // Standard protection - add some extra deterrents
    if (level === 'standard') {
      this.addStandardProtection();
    }
    
    this.isInitialized = true;
  }

  private addBasicProtection(): void {
    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
      // Allow on form elements
      if (this.isFormElement(e.target as Element)) {
        return true;
      }
      e.preventDefault();
      return false;
    });

    // Disable text selection via CSS
    const style = document.createElement('style');
    style.textContent = `
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      /* Allow selection in forms and contact page */
      input, textarea, select, [contenteditable="true"],
      .contact-page *, .form-field *, form * {
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
        user-select: auto !important;
      }
      
      /* Disable image dragging */
      img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
        pointer-events: none;
      }
      
      /* Allow interactive images */
      button img, a img, [role="button"] img {
        pointer-events: auto;
      }
    `;
    document.head.appendChild(style);
  }

  private addStandardProtection(): void {
    // Disable common keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Allow in form elements
      if (this.isFormElement(e.target as Element)) {
        // Still block developer tools shortcuts even in forms
        if (this.isDeveloperToolsShortcut(e)) {
          e.preventDefault();
          return false;
        }
        return true;
      }

      // Block various shortcuts
      if (this.isDeveloperToolsShortcut(e) || 
          this.isCopyPasteShortcut(e) || 
          this.isPrintSaveShortcut(e)) {
        e.preventDefault();
        return false;
      }
    });

    // Show warning message for common bypass attempts
    this.addBypassWarning();
  }

  private isDeveloperToolsShortcut(e: KeyboardEvent): boolean {
    return e.key === 'F12' ||
           (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key.toUpperCase())) ||
           (e.ctrlKey && e.key.toUpperCase() === 'U');
  }

  private isCopyPasteShortcut(e: KeyboardEvent): boolean {
    return e.ctrlKey && ['C', 'V', 'X', 'A'].includes(e.key.toUpperCase());
  }

  private isPrintSaveShortcut(e: KeyboardEvent): boolean {
    return e.ctrlKey && ['S', 'P'].includes(e.key.toUpperCase());
  }

  private isFormElement(element: Element): boolean {
    if (!element) return false;
    
    const tagName = element.tagName.toLowerCase();
    const formTags = ['input', 'textarea', 'select'];
    
    return formTags.includes(tagName) ||
           element.getAttribute('contenteditable') === 'true' ||
           element.closest('form') !== null ||
           element.closest('.contact-page') !== null ||
           element.closest('.form-field') !== null;
  }

  private addBypassWarning(): void {
    // Add a subtle message about content protection
    console.clear();
    console.log(
      '%c⚠️ Content Protection Notice ⚠️',
      'color: #ff6b6b; font-size: 16px; font-weight: bold;'
    );
    console.log(
      '%cThis portfolio\'s content is protected by copyright law.\n' +
      'While technical protection can be bypassed, legal protection cannot.\n' +
      'Unauthorized use may result in legal action.',
      'color: #4ecdc4; font-size: 12px;'
    );
    console.log(
      '%cFor legitimate use or permissions, please contact through the contact page.',
      'color: #45b7d1; font-size: 12px;'
    );

    // Periodically clear console and show message
    setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every interval
        console.clear();
        console.log('📋 Content protected by copyright - Contact for permissions');
      }
    }, 30000); // Every 30 seconds
  }

  public getProtectionStatus(): {
    level: string;
    bypassable: boolean;
    recommendations: string[];
  } {
    return {
      level: this.protectionLevel,
      bypassable: true,
      recommendations: [
        'Use server-side document protection for sensitive files',
        'Add watermarks to images',
        'Include clear copyright notices',
        'Consider legal agreements for commercial use',
        'Use reduced-quality public versions',
        'Monitor for unauthorized use periodically'
      ]
    };
  }
}

// Hook for easy use in React components
export function useRealisticContentProtection(level: 'none' | 'basic' | 'standard' = 'standard') {
  useEffect(() => {
    const protection = RealisticContentProtection.getInstance();
    protection.initialize(level);
  }, [level]);
}

// Export singleton
export const realisticContentProtection = RealisticContentProtection.getInstance();
