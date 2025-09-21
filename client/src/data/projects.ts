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
    id: 3,
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
    id: 4,
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
    id: 5,
    title: "Graphic Design Portfolio",
    description: "Comprehensive collection of graphic design work including travel itinerary templates, custom logos, marketing campaign materials, promotional flyers, and brand identity systems. Showcases versatility in design styles, strategic visual communication, and professional marketing materials for various industries and client needs.",
    image: "https://i.ibb.co/Tqb2wskT/image.png",
    images: [
      // Travel Itinerary Design
      "https://i.ibb.co/Tqb2wskT/image.png",
      "https://i.ibb.co/kVDPdszh/image.png",
      // Custom Graphic Design
      "https://i.ibb.co/9kCcynRz/image.png",
      "https://i.ibb.co/B2GYZmMh/White-Minimalist-Product-Skincare-Instagram-Post.png",
      "https://i.ibb.co/tp9STZL0/image.png",
      "https://i.ibb.co/4wj9tc4R/image.png",
      // Campaign Plan Design
      "https://i.ibb.co/KcTsVnd3/1.png",
      "https://i.ibb.co/xKyMwjFM/2.png",
      "https://i.ibb.co/nM9VCRW3/3.png",
      "https://i.ibb.co/cS7Y7Qps/4.png",
      "https://i.ibb.co/Z6bqnpZD/5.png",
      "https://i.ibb.co/tM8w3n0R/6.png",
      "https://i.ibb.co/9P0wKyj/7.png",
      // Sample Flyers Design
      "https://i.ibb.co/N293nDVF/496623628-1892570794854110-5820447567454576515-n.jpg"
    ],
    technologies: ["Adobe Illustrator", "Canva", "Graphic Design", "Logo Design", "Brand Identity", "Marketing Materials", "Travel Planning", "Template Design", "Strategic Planning", "Campaign Design", "Flyer Design", "Visual Communication"],
    featured: true,
    category: "Graphic Design",
    developmentMode: false,
    developmentMessage: "Design Portfolio Showcase"
  },
  {
    id: 6,
    title: "Customer Product Complaint Handling",
    description: "Professional customer service case study demonstrating empathetic handling of product complaints related to skin reactions. Showcases proper protocol for health-related concerns, documentation requirements, and customer reassurance techniques.",
    image: "/assets/Customer Product Complaint Handling – Skin Reaction/Screenshot 2025-09-19 061454.png",
    images: [
      "/assets/Customer Product Complaint Handling – Skin Reaction/Screenshot 2025-09-19 061454.png",
      "/assets/Customer Product Complaint Handling – Skin Reaction/Screenshot 2025-09-19 061508.png",
      "/assets/Customer Product Complaint Handling – Skin Reaction/Screenshot 2025-09-19 061550.png"
    ],
    technologies: ["Customer Service", "Health & Safety", "Complaint Resolution", "Documentation", "Empathy Training"],
    featured: true,
    category: "Customer Support",
    developmentMode: false,
    developmentMessage: "Real Client Work"
  },
  {
    id: 7,
    title: "Damaged Product Resolution",
    description: "Comprehensive damage claim resolution process showing professional handling of damaged product complaints. Demonstrates photo evidence collection, refund processing, and customer satisfaction protocols for physical product issues.",
    image: "/assets/Damaged Product Resolution – Assisted customers with damaged items by requesting proof and arranging refunds or replacements/Screenshot 2025-09-16 204630.png",
    images: [
      "/assets/Damaged Product Resolution – Assisted customers with damaged items by requesting proof and arranging refunds or replacements/Screenshot 2025-09-16 204630.png",
      "/assets/Damaged Product Resolution – Assisted customers with damaged items by requesting proof and arranging refunds or replacements/Screenshot 2025-09-16 204702.png"
    ],
    technologies: ["Damage Assessment", "Proof Collection", "Refund Processing", "Customer Satisfaction", "Quality Control"],
    featured: true,
    category: "Customer Support",
    developmentMode: false,
    developmentMessage: "Live Case Examples"
  },
  {
    id: 8,
    title: "Delivery Dispute Resolution",
    description: "Expert handling of delivery disputes and shipping issues with professional communication and solution-oriented approach. Demonstrates coordination with courier services and customer advocacy in complex delivery scenarios.",
    image: "/assets/Delivery Dispute Resolution/Screenshot 2025-09-16 204128.png",
    images: [
      "/assets/Delivery Dispute Resolution/Screenshot 2025-09-16 204128.png",
      "/assets/Delivery Dispute Resolution/Screenshot 2025-09-16 204205.png",
      "/assets/Delivery Dispute Resolution/Screenshot 2025-09-16 204235.png"
    ],
    technologies: ["Dispute Resolution", "Courier Coordination", "Delivery Tracking", "Customer Advocacy", "Problem Solving"],
    featured: false,
    category: "Customer Support",
    developmentMode: false,
    developmentMessage: "Operational Excellence"
  },
  {
    id: 9,
    title: "Local Tracking Support",
    description: "Proactive customer support providing detailed tracking updates and proof of delivery coordination with various local courier services. Showcases international shipping knowledge and customer communication excellence.",
    image: "/assets/Local Tracking Support – Provided customers with local courier updates or proof of delivery when needed/Screenshot 2025-09-20 214431.png",
    images: [
      "/assets/Local Tracking Support – Provided customers with local courier updates or proof of delivery when needed/Screenshot 2025-09-20 214431.png",
      "/assets/Local Tracking Support – Provided customers with local courier updates or proof of delivery when needed/Screenshot 2025-09-20 214446.png",
      "/assets/Local Tracking Support – Provided customers with local courier updates or proof of delivery when needed/Screenshot 2025-09-20 214621.png",
      "/assets/Local Tracking Support – Provided customers with local courier updates or proof of delivery when needed/Screenshot 2025-09-20 214736.png"
    ],
    technologies: ["Tracking Systems", "Courier Networks", "International Shipping", "Customer Updates", "Logistics Support"],
    featured: false,
    category: "Customer Support",
    developmentMode: false,
    developmentMessage: "Global Operations"
  },
  {
    id: 10,
    title: "Order & Logistics Monitoring",
    description: "Systematic order monitoring and logistics management demonstrating proactive issue identification and rapid response protocols. Shows comprehensive order tracking and customer communication during shipping processes.",
    image: "/assets/Order & Logistics Monitoring – Tracked orders in the system, identified urgent issues, and took immediate action to resolve them/Screenshot 2025-09-20 214945.png",
    images: [
      "/assets/Order & Logistics Monitoring – Tracked orders in the system, identified urgent issues, and took immediate action to resolve them/Screenshot 2025-09-20 214945.png",
      "/assets/Order & Logistics Monitoring – Tracked orders in the system, identified urgent issues, and took immediate action to resolve them/Screenshot 2025-09-20 215032.png"
    ],
    technologies: ["Order Management", "System Monitoring", "Logistics Coordination", "Issue Detection", "Rapid Response"],
    featured: false,
    category: "Customer Support",
    developmentMode: false,
    developmentMessage: "System Operations"
  },
  {
    id: 11,
    title: "Order Pick-Up Notifications",
    description: "Customer communication for order ready notifications and pick-up coordination. Demonstrates clear communication protocols and customer convenience prioritization in local fulfillment operations.",
    image: "/assets/Order Pick-Up Notifications – Informed customers when their orders were ready for pick-up/Screenshot 2025-09-16 203624.png",
    images: [
      "/assets/Order Pick-Up Notifications – Informed customers when their orders were ready for pick-up/Screenshot 2025-09-16 203624.png"
    ],
    technologies: ["Notification Systems", "Pick-up Coordination", "Customer Communication", "Local Fulfillment", "Service Excellence"],
    featured: false,
    category: "Customer Support",
    developmentMode: false,
    developmentMessage: "Fulfillment Operations"
  },
  {
    id: 12,
    title: "Order Status & Delivery Time Updates",
    description: "Comprehensive order status communication and delivery timeline management. Showcases proactive customer updates, expectation management, and transparent communication throughout the fulfillment process.",
    image: "/assets/Order Status & Delivery Time Updates/Screenshot 2025-09-20 165800.png",
    images: [
      "/assets/Order Status & Delivery Time Updates/Screenshot 2025-09-20 165800.png",
      "/assets/Order Status & Delivery Time Updates/Screenshot 2025-09-20 165821.png",
      "/assets/Order Status & Delivery Time Updates/Screenshot 2025-09-20 165843.png",
      "/assets/Order Status & Delivery Time Updates/Screenshot 2025-09-20 165904.png"
    ],
    technologies: ["Status Updates", "Delivery Management", "Customer Expectations", "Timeline Communication", "Service Transparency"],
    featured: false,
    category: "Customer Support",
    developmentMode: false,
    developmentMessage: "Communication Excellence"
  },
  {
    id: 13,
    title: "Product Guidance & Recommendations",
    description: "Expert product consultation and personalized recommendations based on customer needs. Demonstrates deep product knowledge, skincare expertise, and consultative selling approach to enhance customer satisfaction.",
    image: "/assets/Product Guidance & Recommendations – Provided customers with usage tips and suggested suitable products based on their needs/Screenshot 2025-09-20 215456.png",
    images: [
      "/assets/Product Guidance & Recommendations – Provided customers with usage tips and suggested suitable products based on their needs/Screenshot 2025-09-20 215456.png",
      "/assets/Product Guidance & Recommendations – Provided customers with usage tips and suggested suitable products based on their needs/Screenshot 2025-09-20 215511.png",
      "/assets/Product Guidance & Recommendations – Provided customers with usage tips and suggested suitable products based on their needs/Screenshot 2025-09-20 215740.png",
      "/assets/Product Guidance & Recommendations – Provided customers with usage tips and suggested suitable products based on their needs/Screenshot 2025-09-20 215759.png"
    ],
    technologies: ["Product Knowledge", "Skincare Consultation", "Personalized Recommendations", "Usage Guidance", "Customer Education"],
    featured: true,
    category: "Customer Support",
    developmentMode: false,
    developmentMessage: "Consultation Services"
  },
  {
    id: 14,
    title: "Refund Processing",
    description: "Professional refund processing demonstrating adherence to company policies while maintaining customer satisfaction. Shows proper documentation, calculation accuracy, and empathetic communication during refund procedures.",
    image: "/assets/Refund Processing – Issued accurate partial or full refunds based on policy/Screenshot 2025-08-09 124702.png",
    images: [
      "/assets/Refund Processing – Issued accurate partial or full refunds based on policy/Screenshot 2025-08-09 124702.png",
      "/assets/Refund Processing – Issued accurate partial or full refunds based on policy/Screenshot 2025-09-20 170259.png"
    ],
    technologies: ["Refund Processing", "Policy Compliance", "Financial Accuracy", "Customer Satisfaction", "Documentation"],
    featured: true,
    category: "Customer Support",
    developmentMode: false,
    developmentMessage: "Financial Operations"
  },
  {
    id: 15,
    title: "Returned Parcel & Reshipment Coordination",
    description: "Complex logistics coordination for returned parcels and reshipment processes. Demonstrates international shipping knowledge, customs handling, and multi-step resolution processes for returned items.",
    image: "/assets/Returned Parcel & Reshipment Coordination/Screenshot 2025-09-16 202451.png",
    images: [
      "/assets/Returned Parcel & Reshipment Coordination/Screenshot 2025-09-16 202451.png",
      "/assets/Returned Parcel & Reshipment Coordination/Screenshot 2025-09-16 202755.png",
      "/assets/Returned Parcel & Reshipment Coordination/Screenshot 2025-09-16 202850.png",
      "/assets/Returned Parcel & Reshipment Coordination/Screenshot 2025-09-16 203300.png"
    ],
    technologies: ["Return Processing", "Reshipment Coordination", "International Logistics", "Customs Handling", "Complex Resolution"],
    featured: false,
    category: "Customer Support",
    developmentMode: false,
    developmentMessage: "Advanced Logistics"
  },
  {
    id: 16,
    title: "Coordinated with couriers to resolve failed deliveries and arranged successful redelivery",
    description: "Professional coordination with courier services to resolve failed delivery attempts and arrange successful redelivery. Demonstrates proactive problem-solving, effective communication with logistics partners, and commitment to ensuring customer satisfaction through persistent delivery resolution.",
    image: "/assets/Coordinated with couriers to resolve failed deliveries and arranged successful redelivery/Screenshot 2025-09-21 104515.png",
    images: [
      "/assets/Coordinated with couriers to resolve failed deliveries and arranged successful redelivery/Screenshot 2025-09-21 104515.png",
      "/assets/Coordinated with couriers to resolve failed deliveries and arranged successful redelivery/Screenshot 2025-09-21 104531.png"
    ],
    technologies: ["Courier Coordination", "Delivery Resolution", "Redelivery Management", "Customer Communication", "Logistics Problem-Solving"],
    featured: true,
    category: "Customer Support",
    developmentMode: false,
    developmentMessage: "Delivery Solutions"
  }
];

// Helper functions for easy project management
export const getFeaturedProjects = () => projects.filter(project => project.featured);
export const getAllProjects = () => projects;
export const getProjectsByCategory = (category: string) => projects.filter(project => project.category === category);
