export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string[]; // Additional images for gallery view
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category?: string;
  // Lock properties
  codeLocked?: boolean;
  codeLockedMessage?: string;
  liveUrlLocked?: boolean;
  liveUrlLockedMessage?: string;
  // Development/Status mode - replaces buttons with status badges
  developmentMode?: boolean;
  developmentMessage?: string;
}

// Global setting to override all individual lock settings
export const EVERYTHING_LOCKED = false; // Set to true to lock all projects globally

export const projects: Project[] = [
  {
    id: 1,
    title: "Calendar Management System",
    description: "Professional calendar organization and scheduling system designed to streamline appointment booking, meeting coordination, and daily task management for busy executives and entrepreneurs.",
    image: "https://i.ibb.co/3mYBCw2q/image.png",
    images: ["https://i.ibb.co/3mYBCw2q/image.png"],
    technologies: ["Google Calendar", "Scheduling", "Time Management", "Workflow Optimization"],
    featured: false,
    category: "Administrative Support"
  },
  {
    id: 2,
    title: "Email Management & Organization",
    description: "Comprehensive email management solution featuring inbox organization, automated responses, email templates, and priority filtering systems to maintain professional communication flow.",
    image: "https://i.ibb.co/93T5g8Yr/image.png",
    images: ["https://i.ibb.co/93T5g8Yr/image.png"],
    technologies: ["Gmail", "Email Organization", "Template Creation", "Communication Management"],
    featured: true,
    category: "Administrative Support",
    liveUrlLocked: false,
    liveUrlLockedMessage: "Client Work - Available upon request"
  },
  {
    id: 3,
    title: "Meeting Management & Documentation",
    description: "Complete meeting coordination system including scheduling, agenda preparation, virtual meeting setup, note-taking templates, and follow-up action item tracking for seamless business operations.",
    image: "https://i.ibb.co/h1mLhY1d/image.png",
    images: [
      "https://i.ibb.co/h1mLhY1d/image.png",
      "https://i.ibb.co/BHrfn6Jm/image.png"
    ],
    technologies: ["Zoom", "Meeting Planning", "Documentation", "Project Coordination"],
    featured: false,
    category: "Administrative Support",
    developmentMode: false,
    developmentMessage: "Template Available"
  },
  {
    id: 4,
    title: "Task Management & Workflow Systems",
    description: "Efficient task tracking and project management system with priority assignments, deadline monitoring, progress tracking, and team collaboration features for enhanced productivity.",
    image: "https://i.ibb.co/FkgFWjht/image.png",
    images: ["https://i.ibb.co/FkgFWjht/image.png"],
    technologies: ["Task Management", "Project Planning", "Workflow Optimization", "Team Coordination"],
    featured: false,
    category: "Project Management",
    liveUrlLocked: false,
    liveUrlLockedMessage: "Client Portfolio - Available upon request"
  },
  {
    id: 5,
    title: "Content Planner & Strategy Templates",
    description: "Professional content planning system with editorial calendars, post scheduling templates, content categorization, and social media strategy frameworks for consistent brand messaging.",
    image: "https://i.ibb.co/TqY6yGqG/image.png",
    images: [
      "https://i.ibb.co/TqY6yGqG/image.png",
      "https://i.ibb.co/xqx2rmcg/image.png"
    ],
    technologies: ["Content Strategy", "Social Media Planning", "Editorial Calendar", "Brand Management"],
    featured: false,
    category: "Social Media Management",
    developmentMode: false,
    developmentMessage: "Portfolio Sample"
  },
  {
    id: 6,
    title: "Social Media Templates & Graphics",
    description: "Custom social media template collection featuring Instagram posts, stories, Facebook graphics, and LinkedIn content with consistent branding and engaging visual designs.",
    image: "https://i.ibb.co/276hthZ9/image.png",
    images: [
      "https://i.ibb.co/276hthZ9/image.png",
      "https://i.ibb.co/qQ3c5pr/image.png",
      "https://i.ibb.co/whK2DBdW/image.png",
      "https://i.ibb.co/LhnL7CW3/image.png"
    ],
    technologies: ["Canva", "Graphic Design", "Social Media", "Brand Templates"],
    featured: false,
    category: "Graphic Design",
    developmentMode: false,
    developmentMessage: "Template Collection"
  },
  {
    id: 7,
    title: "Travel Itinerary Design & Planning",
    description: "Professional travel itinerary templates and planning documents for travel agencies, corporate trips, and personal vacations with detailed schedules, booking information, and travel guides.",
    image: "https://i.ibb.co/Tqb2wskT/image.png",
    images: [
      "https://i.ibb.co/Tqb2wskT/image.png",
      "https://i.ibb.co/kVDPdszh/image.png"
    ],
    technologies: ["Travel Planning", "Template Design", "Itinerary Creation", "Client Services"],
    featured: true,
    category: "Administrative Support",
    liveUrlLocked: false,
    liveUrlLockedMessage: "Client Work - Available upon request"
  },
  {
    id: 8,
    title: "Custom Graphic Design Portfolio",
    description: "Collection of custom graphic design work including logos, branding materials, marketing collateral, and visual identity systems for various clients and business needs.",
    image: "https://i.ibb.co/9kCcynRz/image.png",
    images: [
      "https://i.ibb.co/9kCcynRz/image.png",
      "https://i.ibb.co/tp9STZL0/image.png",
      "https://i.ibb.co/4wj9tc4R/image.png"
    ],
    technologies: ["Adobe Illustrator", "Canva", "Logo Design", "Brand Identity", "Visual Design"],
    featured: true,
    category: "Graphic Design",
    developmentMode: false,
    developmentMessage: "Portfolio Showcase"
  }
];

// Helper functions for easy project management
export const getFeaturedProjects = () => projects.filter(project => project.featured);
export const getAllProjects = () => projects;
export const getProjectsByCategory = (category: string) => projects.filter(project => project.category === category);
