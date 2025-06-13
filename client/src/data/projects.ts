export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
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
    title: "Content Planner & Social Media Templates",
    description: "Create, schedule, and track posts across various social media platforms with custom content planning templates",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Canva", "Content Strategy", "Social Media Management", "Brand Guidelines"],
    featured: true,
    category: "Social Media Management",
    developmentMode: true,
    developmentMessage: "Portfolio Sample"
  },
  {
    id: 2,
    title: "Instagram Feed Design & Management",
    description: "Complete Instagram feed makeover with cohesive branding, post templates, and content calendar management",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Instagram", "Canva", "Content Creation", "Social Media Strategy"],
    featured: true,
    category: "Social Media Management",
    liveUrlLocked: true,
    liveUrlLockedMessage: "Client Portfolio - Available upon request"
  },
  {
    id: 3,
    title: "Travel Itinerary Design Templates",
    description: "Professional travel itinerary designs for travel agencies and personal use with detailed day-by-day planning",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Canva", "Graphic Design", "Template Creation", "Travel Planning"],
    featured: true,
    category: "Graphic Design",
    developmentMode: true,
    developmentMessage: "Template Available"
  },
  {
    id: 4,
    title: "Restaurant Menu & Marketing Materials",
    description: "Complete branding package for restaurant including menu design, promotional flyers, and marketing materials",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Canva", "Brand Design", "Print Design", "Marketing Materials"],
    featured: false,
    category: "Graphic Design",
    liveUrlLocked: true,
    liveUrlLockedMessage: "Client Work - Available upon request"
  },
  {
    id: 5,
    title: "Administrative Process Documentation",
    description: "Streamlined document management and workflow processes improving business efficiency and organization",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Google Workspace", "Process Documentation", "Workflow Optimization", "Data Management"],
    featured: false,
    category: "Administrative Support",
    developmentMode: true,
    developmentMessage: "Case Study Available"
  },
  {
    id: 6,
    title: "Email Marketing Campaign Design",
    description: "Professional email templates and marketing campaign management with analytics tracking and optimization",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Email Design", "Marketing Automation", "Analytics", "Campaign Management"],
    featured: false,
    category: "Digital Marketing",
    developmentMessage: "Portfolio Sample"
  }
];

// Helper functions for easy project management
export const getFeaturedProjects = () => projects.filter(project => project.featured);
export const getAllProjects = () => projects;
export const getProjectsByCategory = (category: string) => projects.filter(project => project.category === category);
