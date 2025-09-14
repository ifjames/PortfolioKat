import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { ProjectCard } from "@/components/project-card";
import { ProjectGalleryModal } from "@/components/project-gallery-modal";
import { Mascot } from "@/components/mascot";
import { getFeaturedProjects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { useState, useEffect } from "react";

const typingCaptions = [
  "General Virtual Assistant | Shopify eCommerce • Real Estate CRM • Customer Support"
];

function TypewriterText() {
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentCaption = typingCaptions[currentCaptionIndex];
    
    if (isTyping) {
      if (displayedText.length < currentCaption.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentCaption.slice(0, displayedText.length + 1));
        }, 50); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, wait before erasing
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Wait 2 seconds before erasing
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30); // Erasing speed
        return () => clearTimeout(timeout);
      } else {
        // Finished erasing, move to next caption
        setCurrentCaptionIndex((prev) => (prev + 1) % typingCaptions.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentCaptionIndex]);

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayedText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
    </span>
  );
}

export default function Home() {
  const allFeaturedProjects = getFeaturedProjects();
  // Only show first 2 featured projects on home page
  const featuredProjects = allFeaturedProjects.slice(0, 2);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('featured-projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated Mascot */}
            <Mascot />
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hi, I'm{" "}
              <span className="text-primary">Katrina De Leon</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto min-h-[4rem] flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <TypewriterText />
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: [1, 1.3, 0.9, 1.2, 1],
                  rotate: [0, 5, -5, 3, 0],
                  transition: { 
                    duration: 0.6,
                    times: [0, 0.2, 0.4, 0.6, 1],
                    ease: "easeInOut"
                  }
                }}
                animate={{ rotate: 0 }}
                className="relative"
              >
                <Button asChild size="lg" className="relative overflow-hidden">
                  <Link href="/projects">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: [1, 1.3, 0.9, 1.2, 1],
                  rotate: [0, -5, 5, -3, 0],
                  transition: { 
                    duration: 0.6,
                    times: [0, 0.2, 0.4, 0.6, 1],
                    ease: "easeInOut"
                  }
                }}
                animate={{ rotate: 0 }}
                className="relative"
              >
                <Button asChild variant="outline" size="lg" className="relative overflow-hidden">
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={scrollToProjects}
          >
            <ChevronDown className="text-muted-foreground text-2xl hover:text-primary transition-colors" />
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="featured-projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent client work and accomplishments showcasing 
              various virtual assistant services
            </p>
          </motion.div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {featuredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  onViewProject={handleViewProject}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>No featured projects available at the moment.</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild variant="link" className="text-primary">
              <Link href="/projects">
                View Complete Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Project Gallery Modal */}
      <ProjectGalleryModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}