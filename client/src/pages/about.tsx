import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

const personalSkills = [
  "E-mail handling and Email inbox optimization",
  "Calendar & Meeting Scheduling",
  "Research, Data Collection and Data Entry",
  "SMM (scheduling posts)",
  "Website post management",
  "WordPress",
  "Customer Support",
  "Google Suite: Drive, Docs, Sheets, Forms, Mail, Calendar, Slides",
  "MS Office (Word, Excel, PowerPoint, Outlook)",
  "Other administrative support"
];

export default function About() {
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            "YOUR BEHIND-THE-SCENES PARTNER IN PRODUCTIVITY AND SUCCESS!"
          </p>
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
              <p>
                Results-driven professional with experience in customer support, digital marketing, and project management. Currently working as a Customer Support Intern for a local e-commerce startup, assisting with email and chat inquiries, using CRM tools, and addressing customer concerns.
              </p>
              <p>
                Skilled in problem-solving, communication, and process optimization to support business growth and deliver quality outcomes in fast-paced environments.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <img
              src="https://i.ibb.co/chwKvc77/504195476-1385451012759702-5915179977276087071-n.jpg&auto=format&fit=crop&w=500&h=600"
              alt="Professional profile"
              className="rounded-2xl shadow-2xl w-full max-w-sm"
            />
          </motion.div>
        </div>

        {/* Personal Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Personal Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              {personalSkills.slice(0, Math.ceil(personalSkills.length / 2)).map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="w-3 h-3 bg-primary rounded-full mr-4 flex-shrink-0 mt-2"></div>
                  <p className="text-muted-foreground text-lg">{skill}</p>
                </motion.div>
              ))}
            </div>
            <div className="space-y-6">
              {personalSkills.slice(Math.ceil(personalSkills.length / 2)).map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="w-3 h-3 bg-primary rounded-full mr-4 flex-shrink-0 mt-2"></div>
                  <p className="text-muted-foreground text-lg">{skill}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button size="lg" className="inline-flex items-center">
            <Download className="mr-2 h-5 w-5" />
            Download Resume
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
