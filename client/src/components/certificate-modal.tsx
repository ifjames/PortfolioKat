import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Certificate } from "@/data/credentials";

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateModal({ certificate, isOpen, onClose }: CertificateModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  // Reset state when certificate changes
  useEffect(() => {
    setIsClosing(false);
  }, [certificate]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen || !certificate) return;
      
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, certificate]);

  if (!certificate) return null;

  const handleClose = () => {
    setIsClosing(true);
    // Delay the actual close to allow animation to play
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isClosing ? 0.8 : 1, 
              opacity: isClosing ? 0 : 1 
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="bg-background border-border flex flex-col h-full">
              <CardHeader className="pb-4 shrink-0 px-4 sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-3">
                      <div className="text-primary mr-3">
                        <certificate.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <Badge variant="outline" className="text-xs sm:text-sm">
                        {certificate.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg sm:text-2xl mb-2 line-clamp-2">
                      {certificate.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-lg font-medium text-primary line-clamp-1">
                      {certificate.issuer} • {certificate.date}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="shrink-0 h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 flex-1 overflow-y-auto px-4 sm:px-6">
                {certificate.image && (
                  <div className="mb-4 sm:mb-6">
                    <img
                      src={certificate.image}
                      alt={`${certificate.title} Certificate`}
                      className="w-full h-auto rounded-lg shadow-lg max-h-[40vh] sm:max-h-[45vh] object-contain mx-auto block"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      style={{ 
                        userSelect: 'none', 
                        pointerEvents: 'none',
                        webkitUserDrag: 'none',
                        webkitUserSelect: 'none'
                      }}
                    />
                  </div>
                )}
                
                <div className="space-y-3 sm:space-y-4 pb-4">
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-2">About This Certificate</h4>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {certificate.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="secondary" className="text-xs sm:text-sm">
                      {certificate.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      {certificate.date}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
