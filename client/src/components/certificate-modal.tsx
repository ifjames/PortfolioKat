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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="bg-background border-border">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className="text-primary mr-3">
                        <certificate.icon className="h-6 w-6" />
                      </div>
                      <Badge variant="outline">{certificate.category}</Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2">{certificate.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-primary">
                      {certificate.issuer} • {certificate.date}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {certificate.image && (
                  <div className="mb-6">
                    <img
                      src={certificate.image}
                      alt={`${certificate.title} Certificate`}
                      className="w-full h-auto rounded-lg shadow-lg max-h-[60vh] object-contain"
                    />
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">About This Certificate</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {certificate.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="secondary">{certificate.category}</Badge>
                    <Badge variant="outline">{certificate.date}</Badge>
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
