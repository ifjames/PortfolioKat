import { Award, BookOpen, GraduationCap } from "lucide-react";

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category: string;
  description: string;
  icon: any;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface Training {
  id: number;
  title: string;
  organizer: string;
  date: string;
  duration: string;
}

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Virtual Assistant Training Certificate",
    issuer: "VA Skills Pro Training Hub",
    date: "2024",
    category: "Professional Certification",
    description: "Completed 128 hours of hands-on training focused on admin support, Facebook name research, data entry, email/calendar management, Canva designs, and remote communication. Gained practical skills in time management, professionalism, and virtual task execution.",
    icon: Award
  },
  {
    id: 2,
    title: "Certificate of Completion",
    issuer: "Professional Development of Institute",
    date: "2024",
    category: "Skills Development",
    description: "I actively join various trainings to continuously enhance my skills and stay updated with industry trends.",
    icon: BookOpen
  }
];

export const education: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Science in Business Administration - Financial Management",
    institution: "University of Batangas",
    year: "2021-2025",
    description: "Major in Financial Management with comprehensive business education and management principles."
  },
  {
    id: 2,
    degree: "Accountancy, Business, and Management",
    institution: "Rizal College of Taal Senior High School",
    year: "2019-2021",
    description: "Senior High School program focused on business fundamentals and financial literacy."
  }
];

export const trainings: Training[] = [
  {
    id: 1,
    title: "Virtual Assistant Comprehensive Training",
    organizer: "VA Skills Pro Training Hub",
    date: "2024",
    duration: "128 hours"
  },
  {
    id: 2,
    title: "Admin Support & Data Management",
    organizer: "Professional Skills Institute",
    date: "2024",
    duration: "40 hours"
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
    title: "Customer Service Excellence",
    organizer: "Business Communication Center",
    date: "2023",
    duration: "24 hours"
  },
  {
    id: 5,
    title: "Graphic Design with Canva",
    organizer: "Design Institute",
    date: "2022",
    duration: "25 hours"
  },
  {
    id: 6,
    title: "Email Marketing & Automation",
    organizer: "Digital Marketing Academy",
    date: "2023",
    duration: "30 hours"
  }
];
