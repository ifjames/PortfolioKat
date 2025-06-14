import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

interface ProjectGalleryModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectGalleryModal({ project, isOpen, onClose }: ProjectGalleryModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setIsClosing(false);
  }, [project]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen || !project) return;
      
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, project, currentImageIndex]);

  if (!project) return null;

  const images = project.images || [project.image];
  const hasMultipleImages = images.length > 1;

  const handleClose = () => {
    setIsClosing(true);
    // Delay the actual close to allow animation to play
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: isClosing ? 0 : 1, 
              scale: isClosing ? 0.8 : 1, 
              y: isClosing ? 40 : 0 
            }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ 
              duration: isClosing ? 0.2 : 0.3, 
              ease: isClosing ? "easeIn" : "easeOut" 
            }}
            className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] bg-background rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Fixed to top-right of modal */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 z-30 bg-background/90 backdrop-blur-sm hover:bg-background text-foreground hover:text-foreground rounded-full w-8 h-8 sm:w-9 sm:h-9 border border-border/20"
              onClick={handleClose}
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <div className="flex flex-col lg:flex-row h-full max-h-[95vh] sm:max-h-[90vh]">
              {/* Image Section */}
              <div className="relative flex-1 bg-muted/20 flex items-center justify-center min-h-[250px] sm:min-h-[300px] lg:min-h-[500px] p-3 sm:p-4 lg:p-6">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain max-h-[200px] sm:max-h-[350px] lg:max-h-[450px] rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400`;
                  }}
                />

                {/* Navigation Arrows */}
                {hasMultipleImages && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white hover:text-white rounded-full w-8 h-8 sm:w-10 sm:h-10"
                      onClick={handlePrevImage}
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white hover:text-white rounded-full w-8 h-8 sm:w-10 sm:h-10"
                      onClick={handleNextImage}
                    >
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                {hasMultipleImages && (
                  <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                    <span className="text-xs sm:text-sm font-medium">
                      {currentImageIndex + 1} / {images.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="lg:w-96 p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                      {project.title}
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Tools & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Project Status */}
                  {project.developmentMode && (
                    <div>
                      <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                        Status
                      </h3>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {project.developmentMessage || "Portfolio Sample"}
                      </Badge>
                    </div>
                  )}

                  {project.liveUrlLocked && (
                    <div>
                      <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                        Availability
                      </h3>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800">
                        {project.liveUrlLockedMessage || "Available upon request"}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Thumbnail Navigation for Multiple Images */}
                {hasMultipleImages && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? "border-primary shadow-md"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100`;
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
