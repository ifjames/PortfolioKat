import { 
  MessageSquare, 
  Calendar, 
  FileSpreadsheet, 
  Video, 
  Mail, 
  Camera, 
  Palette, 
  BarChart3, 
  Search, 
  Globe,
  Zap,
  Monitor
} from "lucide-react";

// Brand icons from react-icons
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaDiscord,
  FaSkype,
  FaSlack,
  FaMicrosoft,
  FaGoogle,
  FaTrello,
  FaWordpress,
  FaShopify,
  FaMailchimp,
  FaBuffer,
  FaHubspot
} from "react-icons/fa";

import {
  SiZoom,
  SiCanva,
  SiAsana,
  SiClickup,
  SiZapier,
  SiHootsuite,
  SiGoogleanalytics,
  SiAdobephotoshop,
  SiAdobeillustrator
} from "react-icons/si";

export interface Tool {
  id: number;
  name: string;
  category: string;
  icon: any;
  description?: string;
}

export const tools: Tool[] = [
  // Essential Productivity
  { id: 1, name: "Gmail", category: "Essential Productivity", icon: FaGoogle },
  { id: 2, name: "Google Drive", category: "Essential Productivity", icon: FaGoogle },
  { id: 3, name: "Google Docs", category: "Essential Productivity", icon: FaGoogle },
  { id: 4, name: "Google Sheets", category: "Essential Productivity", icon: FaGoogle },
  { id: 5, name: "Google Calendar", category: "Essential Productivity", icon: FaGoogle },
  { id: 6, name: "Microsoft Word", category: "Essential Productivity", icon: FaMicrosoft },
  { id: 7, name: "Microsoft Excel", category: "Essential Productivity", icon: FaMicrosoft },
  { id: 8, name: "Microsoft PowerPoint", category: "Essential Productivity", icon: FaMicrosoft },

  // Communication & Meetings
  { id: 9, name: "WhatsApp", category: "Communication & Meetings", icon: FaWhatsapp },
  { id: 10, name: "Zoom", category: "Communication & Meetings", icon: SiZoom },
  { id: 11, name: "Skype", category: "Communication & Meetings", icon: FaSkype },
  { id: 12, name: "Slack", category: "Communication & Meetings", icon: FaSlack },
  { id: 13, name: "Discord", category: "Communication & Meetings", icon: FaDiscord },
  { id: 14, name: "Telegram", category: "Communication & Meetings", icon: FaTelegram },

  // Social Media & Marketing
  { id: 15, name: "Facebook", category: "Social Media & Marketing", icon: FaFacebook },
  { id: 16, name: "Instagram", category: "Social Media & Marketing", icon: FaInstagram },
  { id: 17, name: "TikTok", category: "Social Media & Marketing", icon: FaTiktok },
  { id: 18, name: "LinkedIn", category: "Social Media & Marketing", icon: FaLinkedin },
  { id: 19, name: "Hootsuite", category: "Social Media & Marketing", icon: SiHootsuite },
  { id: 20, name: "Buffer", category: "Social Media & Marketing", icon: FaBuffer },
  { id: 21, name: "Mailchimp", category: "Social Media & Marketing", icon: FaMailchimp },

  // Design & Creative
  { id: 22, name: "Canva", category: "Design & Creative", icon: SiCanva },
  { id: 23, name: "Adobe Photoshop", category: "Design & Creative", icon: SiAdobephotoshop },
  { id: 24, name: "Adobe Illustrator", category: "Design & Creative", icon: SiAdobeillustrator },

  // Project Management & CRM
  { id: 25, name: "Trello", category: "Project Management & CRM", icon: FaTrello },
  { id: 26, name: "Asana", category: "Project Management & CRM", icon: SiAsana },
  { id: 27, name: "Monday.com", category: "Project Management & CRM", icon: BarChart3 },
  { id: 28, name: "ClickUp", category: "Project Management & CRM", icon: SiClickup },
  { id: 29, name: "HubSpot", category: "Project Management & CRM", icon: FaHubspot },

  // Business Tools
  { id: 30, name: "WordPress", category: "Business Tools", icon: FaWordpress },
  { id: 31, name: "Shopify", category: "Business Tools", icon: FaShopify },
  { id: 32, name: "Zapier", category: "Business Tools", icon: SiZapier },
  { id: 33, name: "Google Analytics", category: "Business Tools", icon: SiGoogleanalytics }
];

export const getToolsByCategory = (category: string) => 
  tools.filter(tool => tool.category === category);

export const getAllCategories = () => 
  [...new Set(tools.map(tool => tool.category))];
