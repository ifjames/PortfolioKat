import { Award, BookOpen, GraduationCap, Building, Briefcase } from "lucide-react";

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category: string;
  description: string;
  icon: any;
  image?: string;
  // Lock properties
  imageLocked?: boolean;
  imageLockedMessage?: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
  description: string;
  achievements?: string[];
}

export interface Training {
  id: number;
  title: string;
  organizer: string;
  date: string;
  duration: string;
  description?: string;
}

export interface WorkExperience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  icon: any;
}

// Global setting to override all individual certificate lock settings
export const ALL_CERTIFICATES_LOCKED = false; // Set to true to lock all certificates globally

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Customer Service Excellence Training",
    issuer: "247CSR",
    date: "February 2024",
    category: "Customer Support",
    description: "Mastered tone adjustment, empathy in service, and problem resolution for high-satisfaction outcomes.",
    icon: Award,
    imageLocked: false,
    imageLockedMessage: "Certificate image available upon request"
  },
  {
    id: 2,
    title: "Business Opportunities & Financial Literacy Seminar",
    issuer: "University of Batangas",
    date: "October 2024",
    category: "Business",
    description: "Explored entrepreneurship, smart budgeting, and practical finance for future business leaders.",
    icon: BookOpen,
    imageLocked: false,
    imageLockedMessage: "Certificate image available upon request"
  },
  {
    id: 3,
    title: "Virtual Assistant Training Certificate",
    issuer: "VA Skills Pro Training Hub",
    date: "2024",
    category: "Professional Certification",
    description: "Completed 128 hours of hands-on training focused on admin support, Facebook name research, data entry, email/calendar management, Canva designs, and remote communication.",
    icon: Award,
    image: "https://i.ibb.co/9H6yj3pS/496626528-1067324845360104-4490323821290159540-n.jpg",
    imageLocked: false,
    imageLockedMessage: "Certificate image available upon request"
  },
  {
    id: 4,
    title: "Freelancing Skills and Virtual Assistant Training",
    issuer: "VA Coach Angel Jalong",
    date: "2024",
    category: "Skills Development",
    description: "Demonstrated proficiency in five essential freelancing and VA skills, including client communication, task management, and digital productivity.",
    icon: Award,
    image: "https://i.ibb.co/LdJdw3Yg/image.png",
    imageLocked: false,
    imageLockedMessage: "Certificate image available upon request"
  }
];

export const education: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Science in Business Administration - Financial Management",
    institution: "University of Batangas",
    year: "2021-2025",
    description: "Major in Financial Management with comprehensive business education and management principles.",
    achievements: [
      "Best in Feasibility Study (2023)",
      "Most Outstanding Student in Business Simulation (2023)"
    ]
  },
  {
    id: 2,
    degree: "Accountancy, Business, and Management",
    institution: "Rizal College of Taal Senior High School",
    year: "2019-2022",
    description: "Senior High School program focused on business fundamentals and financial literacy.",
    achievements: [
      "With Honors (2020–2022)",
      "Leadership Award (2021)"
    ]
  }
];

export const trainings: Training[] = [
  {
    id: 1,
    title: "Real Estate Virtual Assistant Masterclass",
    organizer: "Trained by Coach Karen Dela Fuente",
    date: "April 2025",
    duration: "Online Course",
    description: "Learned core real estate VA responsibilities including calendar management, lead follow-up, and client communication. Trained in using real estate tools such as KVCore, Follow Up Boss, Calendly, and Google Workspace. Gained experience in listing coordination, property research, and document preparation. Completed simulated scenarios for responding to buyer and seller inquiries professionally. Focused on supporting real estate agents through organized, proactive, and detail-oriented virtual support."
  },
  {
    id: 2,
    title: "Virtual Assistant Training and Internship Program",
    organizer: "VA Skills Pro",
    date: "January 2025 – February 2025",
    duration: "128 hours",
    description: "Successfully completed 128 hours of hands-on virtual assistant training and internship experience, covering administrative support, client coordination, and productivity tools."
  },
  {
    id: 3,
    title: "Time Management & Productivity Tools for Remote Teams",
    organizer: "DTI Webinar Series",
    date: "March 2023",
    duration: "8 hours",
    description: "Trained in using productivity tools for managing tasks and streamlining communication in remote environments."
  },
  {
    id: 4,
    title: "Social Media Management & Content Creation",
    organizer: "Digital Marketing Academy",
    date: "April 2024",
    duration: "32 hours"
  },
  {
    id: 5,
    title: "Email Marketing & Automation",
    organizer: "Digital Marketing Academy",
    date: "January 2023",
    duration: "30 hours"
  },
  {
    id: 6,
    title: "Graphic Design with Canva",
    organizer: "Design Institute",
    date: "July 2022",
    duration: "25 hours"
  }
];

export const workExperience: WorkExperience[] = [
  {
    id: 1,
    title: "Customer Support Assistant – Namu Beauty & Dr. Roots",
    company: "Remote – EU/Asia Market",
    location: "Remote",
    period: "2025 – Present",
    responsibilities: [
      "Provided full customer support coverage for two international Shopify dropshipping stores, with a combined 950,000+ customers and 90,000+ orders sold, ensuring warm, professional, and human communication.",
      "Delivered order & shipping support: sent branded tracking links, reassured customers during tracking delays, and used local courier systems (USPS, DHL, Royal Mail, Evri, Yodel, etc.) to provide proof of delivery (photos, notes, signatures).",
      "Escalated delivery issues with local couriers in multiple countries and coordinated with Chinese agents; resolved urgent issues by contacting customers outside of email (WhatsApp/phone) when needed.",
      "Followed a strict refund & compensation hierarchy: starting from $15 store credit or €5 refund, scaling up to 30%, 40%, 70%, and full refund only when necessary.",
      "Processed cancellations in compliance with policy: full refund including shipping within 24 hours; after that, declined politely unless Dr. Roots pre-sale rules applied.",
      "Conducted address verification for flagged or incomplete orders, updated details in Shopify, and coordinated with the team to prevent delivery failures.",
      "Created and submitted daily support reports (emails answered, refunds, reships, cancellations, escalations) and weekly finance reports (refund totals, store credits, partial refunds, major actions).",
      "Applied Shopify best practices: issued partial refunds manually via the right-side PayPal box without editing product quantities, ensuring accurate records.",
      "Resolved product concerns (damaged, missing, or incorrect items) by requesting photo proof, escalating replacements, and ensuring customers felt supported.",
      "Assisted with returns & non-deliverables, applying deductions for shipping + handling fees when refunds were issued instead of reshipments.",
      "Handled chargebacks and disputes by following internal escalation rules, prioritizing low chargeback rates with full refunds when required.",
      "Guided customers on product use and skincare routines: provided step-by-step instructions, personalized advice, and recommended best practices for achieving results.",
      "Maintained brand voice across all communications, adapting tone and closing signatures for Namu Beauty and Dr. Roots customers."
    ],
    icon: Briefcase
  },
  {
    id: 2,
    title: "Sales and Marketing Associate – Real Estate",
    company: "La Aldea del Monte (Property Consultant Role)",
    location: "Batangas, Philippines",
    period: "May 2024 – December 2024",
    responsibilities: [
      "Promoted and sold residential properties by presenting project features to potential buyers and guiding them through the purchasing process",
      "Scheduled client appointments, hosted site viewings, and maintained consistent follow-ups to convert leads into buyers",
      "Met and exceeded monthly sales goals through effective communication, relationship building, and strategic outreach",
      "Collaborated with sales team leaders to execute digital campaigns and drive qualified leads through social media platforms",
      "Provided assistance with documentation, reservation processing, and buyer concerns to ensure a smooth sales experience",
      "Supported virtual sales efforts and online inquiries as part of Camella's digital sales associate initiative"
    ],
    icon: Building
  },
  {
    id: 3,
    title: "Chat Support Representative",
    company: "247CSR",
    location: "Batangas City, Batangas",
    period: "January 2023 – April 2024",
    responsibilities: [
      "Responded to 60+ daily live chat inquiries, maintaining a 95% customer satisfaction score.",
      "Resolved client concerns efficiently, reducing repeat issues by 15% through tailored solutions.",
      "Collaborated with support teams to hit or exceed KPI targets across response time and resolution rates.",
      "Maintained a calm and professional tone across all interactions, contributing to positive customer retention."
    ],
    icon: Briefcase
  },
  {
    id: 4,
    title: "Customer Support Intern",
    company: "Freelance / Project-Based",
    location: "Remote",
    period: "June 2023 – September 2023",
    responsibilities: [
      "Managed incoming email and chat requests for a local e-commerce startup, helping improve support response rate.",
      "Practiced using CRM systems to log tickets, update customer records, and prioritize urgent concerns.",
      "Participated in simulated training scenarios to enhance active listening and tone calibration.",
      "Delivered clear product information, resolving 90% of basic concerns during first contact."
    ],
    icon: Building
  }
];
