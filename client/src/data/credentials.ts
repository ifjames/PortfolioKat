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
    title: "Virtual Assistant Training and Internship Program",
    organizer: "VA Skills Pro",
    date: "January 20, 2025 – February 4, 2025",
    duration: "128 hours",
    description: "Successfully completed 128 hours of hands-on virtual assistant training and internship experience, covering administrative support, client coordination, and productivity tools."
  },
  {
    id: 2,
    title: "Time Management & Productivity Tools for Remote Teams",
    organizer: "DTI Webinar Series",
    date: "March 2023",
    duration: "8 hours",
    description: "Trained in using productivity tools for managing tasks and streamlining communication in remote environments."
  },
  {
    id: 3,
    title: "Social Media Management & Content Creation",
    organizer: "Digital Marketing Academy",
    date: "2024",
    duration: "32 hours"
  },
  {
    id: 4,
    title: "Email Marketing & Automation",
    organizer: "Digital Marketing Academy",
    date: "2023",
    duration: "30 hours"
  },
  {
    id: 5,
    title: "Graphic Design with Canva",
    organizer: "Design Institute",
    date: "2022",
    duration: "25 hours"
  }
];

export const workExperience: WorkExperience[] = [
  {
    id: 1,
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
    id: 2,
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
