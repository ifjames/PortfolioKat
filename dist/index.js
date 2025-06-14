// server/index.ts
import dotenv from "dotenv";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  projects;
  contactMessages;
  currentUserId;
  currentProjectId;
  currentMessageId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.projects = /* @__PURE__ */ new Map();
    this.contactMessages = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentMessageId = 1;
    this.initializeProjects();
  }
  initializeProjects() {
    const sampleProjects = [
      {
        title: "E-Commerce Platform",
        description: "Modern shopping platform with React, Node.js, and Stripe integration",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["React", "Node.js", "Stripe", "MongoDB"],
        liveUrl: "https://example-ecommerce.com",
        githubUrl: "https://github.com/example/ecommerce",
        featured: true
      },
      {
        title: "Task Management App",
        description: "Collaborative task management with real-time updates and team features",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Vue.js", "Firebase", "Socket.io"],
        liveUrl: "https://example-tasks.com",
        githubUrl: "https://github.com/example/tasks",
        featured: true
      },
      {
        title: "Analytics Dashboard",
        description: "Data visualization platform with interactive charts and reporting",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["D3.js", "Python", "PostgreSQL"],
        liveUrl: "https://example-analytics.com",
        githubUrl: "https://github.com/example/analytics",
        featured: true
      },
      {
        title: "Social Media Dashboard",
        description: "Unified social media management platform with analytics and scheduling",
        image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["React", "TypeScript", "Node.js", "Redis"],
        liveUrl: "https://example-social.com",
        githubUrl: "https://github.com/example/social",
        featured: false
      },
      {
        title: "Weather App",
        description: "Real-time weather application with location-based forecasts and alerts",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["React Native", "OpenWeather API", "SQLite"],
        liveUrl: "https://example-weather.com",
        githubUrl: "https://github.com/example/weather",
        featured: false
      },
      {
        title: "Portfolio Website",
        description: "Responsive portfolio website with modern design and animations",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
        liveUrl: "https://example-portfolio.com",
        githubUrl: "https://github.com/example/portfolio",
        featured: false
      },
      {
        title: "Restaurant Management System",
        description: "Complete restaurant management with order tracking and inventory",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Angular", "Express.js", "MySQL", "Socket.io"],
        liveUrl: "https://example-restaurant.com",
        githubUrl: "https://github.com/example/restaurant",
        featured: false
      },
      {
        title: "Learning Management System",
        description: "Educational platform with course management and progress tracking",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Vue.js", "Django", "PostgreSQL", "AWS S3"],
        liveUrl: "https://example-lms.com",
        githubUrl: "https://github.com/example/lms",
        featured: false
      },
      {
        title: "Fitness Tracker",
        description: "Personal fitness tracking app with workout plans and progress monitoring",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["React Native", "Firebase", "Chart.js"],
        liveUrl: "https://example-fitness.com",
        githubUrl: "https://github.com/example/fitness",
        featured: false
      }
    ];
    sampleProjects.forEach((project) => {
      this.createProject(project);
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getAllProjects() {
    return Array.from(this.projects.values());
  }
  async getFeaturedProjects() {
    return Array.from(this.projects.values()).filter((project) => project.featured);
  }
  async getProject(id) {
    return this.projects.get(id);
  }
  async createProject(insertProject) {
    const id = this.currentProjectId++;
    const project = {
      ...insertProject,
      id,
      liveUrl: insertProject.liveUrl || null,
      githubUrl: insertProject.githubUrl || null,
      featured: insertProject.featured || false
    };
    this.projects.set(id, project);
    return project;
  }
  async createContactMessage(insertMessage) {
    const id = this.currentMessageId++;
    const message = { ...insertMessage, id };
    this.contactMessages.set(id, message);
    return message;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  technologies: text("technologies").array().notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  featured: boolean("featured").default(false)
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertProjectSchema = createInsertSchema(projects).omit({
  id: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true
});

// server/routes.ts
import { ZodError } from "zod";

// server/email.ts
import nodemailer from "nodemailer";
var createTransporter = () => {
  const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
  const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || "587");
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    // true for 465, false for other ports
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });
};
async function sendContactEmail(contactData) {
  try {
    const transporter = createTransporter();
    const TO_EMAIL = process.env.TO_EMAIL || "jamesmatthewcastillo4@gmail.com";
    const EMAIL_USER = process.env.EMAIL_USER;
    const mailOptions = {
      from: `"${contactData.name}" <${EMAIL_USER}>`,
      // sender address
      to: TO_EMAIL,
      // your email
      replyTo: contactData.email,
      // reply to the contact's email
      subject: `Portfolio Contact: ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
          <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #4f46e5;">Contact Details</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #4f46e5; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message</h3>
            <p style="white-space: pre-wrap;">${contactData.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">
            <p>This message was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${contactData.name}
        Email: ${contactData.email}
        Subject: ${contactData.subject}
        
        Message:
        ${contactData.message}
        
        ---
        This message was sent from your portfolio contact form.
      `
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
async function verifyEmailConfig() {
  try {
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    console.log("Email environment variables:");
    console.log("EMAIL_USER:", EMAIL_USER);
    console.log("EMAIL_PASS:", EMAIL_PASS ? "[HIDDEN]" : "undefined");
    console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
    console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
    if (!EMAIL_USER || !EMAIL_PASS) {
      throw new Error("Email credentials not configured");
    }
    const transporter = createTransporter();
    await transporter.verify();
    console.log("Email configuration verified successfully");
    return true;
  } catch (error) {
    console.error("Email configuration error:", error);
    return false;
  }
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/projects", async (req, res) => {
    try {
      const projects2 = await storage.getAllProjects();
      res.json(projects2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  app2.get("/api/projects/featured", async (req, res) => {
    try {
      const projects2 = await storage.getFeaturedProjects();
      res.json(projects2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      try {
        await sendContactEmail(validatedData);
        console.log("Contact message received and email sent:", message);
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }
      res.json({ message: "Message sent successfully!" });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
dotenv.config();
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const emailConfigValid = await verifyEmailConfig();
  if (!emailConfigValid) {
    log("\u26A0\uFE0F  Email configuration not set up - contact form emails will not be sent");
    log("   Set EMAIL_USER and EMAIL_PASS environment variables to enable email functionality");
  } else {
    log("\u2705 Email configuration verified successfully");
  }
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
