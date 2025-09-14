import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { Link } from "wouter";

const skillCategories = [
  {
    category: "Real Estate & Sales",
    skills: ["Real Estate CRM Management (KVCore, Follow Up Boss)", "Property Research & Listing Coordination", "Lead Follow-Up & Email Support", "Cold Calling (Warm Leads)", "Client Communication & Sales Support"]
  },
  {
    category: "Administrative Support",
    skills: ["Appointment Scheduling & Calendar Management", "File & Document Organization", "Data Entry & Research", "Email Management & Support", "Virtual Assistant Services"]
  },
  {
    category: "Digital Marketing & Social Media",
    skills: ["Social Media Management", "Post Scheduling", "WordPress Administration", "Content Creation", "Digital Campaign Support"]
  },
  {
    category: "Technical Skills",
    skills: ["Google Workspace", "Microsoft Office", "CRM Systems", "Communication Tools", "Productivity Software"]
  },
  {
    category: "Customer Service & Support",
    skills: ["Customer Support & Live Chat Assistance", "Client Communication", "Problem-Solving", "High-Volume Support", "Professional Communication"]
  },
  {
    category: "Personal Skills",
    skills: ["Strong Work Ethic", "Excellent Communication", "Attention to Detail", "Time Management", "Team Collaboration", "Adaptability", "Initiative & Self-Motivation", "Professionalism Under Pressure", "Client-Focused Attitude"]
  }
];

export default function About() {
  const handleResumeDownload = () => {
    // Create link to download PDF
    const link = document.createElement('a');
    link.href = '/assets/my-resume.final.docx';
    link.download = 'Katrina-DeLeon-Resume.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-8">
            About <span className="text-primary">Me</span>
          </h1>
        </motion.div>

        {/* About Me Section */}
        {/* About Me Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <h3 className="text-2xl font-semibold text-foreground">Professional Summary</h3>
              <p>
                Client-focused and adaptable Virtual Assistant with experience in Shopify eCommerce operations, real estate CRM management, and international customer support. Skilled in handling order management, courier escalations, refunds/returns hierarchy, appointment scheduling, and lead follow-up. Adept at providing step-by-step product guidance, clear communication, and personalized solutions to build trust and ensure customer satisfaction. Recognized for attention to detail, proactive problem-solving, and strong organizational skills, with the ability to thrive in fast-paced, cross-cultural environments.
              </p>
              
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center space-y-6"
          >
            <img
              src="https://i.ibb.co/chwKvc77/504195476-1385451012759702-5915179977276087071-n.jpg&auto=format&fit=crop&w=500&h=600"
              alt="Professional profile"
              className="rounded-2xl shadow-2xl w-full max-w-sm"
            />
            
            {/* Download Resume Button */}
            <div className="relative inline-block group">
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-primary text-primary-foreground px-3 py-2 rounded-lg shadow-lg pointer-events-none z-10 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-12 opacity-0 scale-75 transition-all duration-300 ease-out"
              >
                <div className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span className="text-sm font-medium">Download</span>
                </div>
                {/* Arrow pointing down */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
              >
                <Button 
                  size="lg" 
                  className="inline-flex items-center group/button"
                  onClick={handleResumeDownload}
                >
                  <div className="mr-2 group-hover/button:hidden">
                    <Download className="h-5 w-5" />
                  </div>
                  <motion.div
                    className="mr-2 hidden group-hover/button:block"
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                  >
                    <Download className="h-5 w-5" />
                  </motion.div>
                  Download Resume
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Personal Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-16 text-center">Personal Skills</h2>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + categoryIndex * 0.1 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-primary mb-6">
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.6 + categoryIndex * 0.1 + skillIndex * 0.05 
                        }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="px-4 py-2 text-sm font-medium hover:bg-primary/10 transition-colors duration-200 rounded-full"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>


      </div>
    </div>
  );
}
