import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Award, GraduationCap, BookOpen, Briefcase, Eye, Lock } from "lucide-react";
import { certificates, education, trainings, workExperience, ALL_CERTIFICATES_LOCKED } from "@/data/credentials";
import { CertificateModal } from "@/components/certificate-modal";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Certificate } from "@/data/credentials";

// Certificate View Button Component with state transitions
function CertificateViewButton({ certificate, onViewCertificate }: { 
  certificate: Certificate; 
  onViewCertificate: (cert: Certificate) => void 
}) {
  const [buttonState, setButtonState] = useState<'view' | 'not-available'>('view');
  const { toast } = useToast();

  // Initialize button state properly on mount
  useEffect(() => {
    const isLocked = ALL_CERTIFICATES_LOCKED || certificate.imageLocked;
    
    // Always start with 'view' state for locked certificates
    if (isLocked) {
      setButtonState('view');
      return;
    }
    
    // For unlocked certificates, start with 'view' state
    // The 'not-available' state will only show after clicking if no image
    setButtonState('view');
  }, [certificate]);

  const handleClick = () => {
    const isLocked = ALL_CERTIFICATES_LOCKED || certificate.imageLocked;
    
    // Handle locked certificates first
    if (isLocked) {
      toast({
        title: "Certificate Locked",
        description: certificate.imageLockedMessage || "Certificate image is currently locked.",
        variant: "destructive",
      });
      return;
    }

    // Handle certificates with images
    if (certificate.image) {
      onViewCertificate(certificate);
      return;
    }

    // Handle certificates without images (not locked, but no image available)
    setButtonState('not-available');
    setTimeout(() => {
      setButtonState('view');
    }, 2000);
  };

  const getButtonContent = () => {
    const isLocked = ALL_CERTIFICATES_LOCKED || certificate.imageLocked;
    
    if (isLocked) {
      return (
        <>
          <Lock className="h-4 w-4" />
          Locked
        </>
      );
    }

    if (buttonState === 'not-available') {
      return (
        <>
          <Lock className="h-4 w-4" />
          Not Available
        </>
      );
    }

    return (
      <>
        <Eye className="h-4 w-4" />
        View Certificate
      </>
    );
  };

  const getButtonVariant = () => {
    const isLocked = ALL_CERTIFICATES_LOCKED || certificate.imageLocked;
    if (isLocked) return "secondary";
    return "outline"; // Always use outline for both view and not-available states
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        whileHover={{ 
          scale: 1.05,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant={getButtonVariant()}
          size="sm"
          onClick={handleClick}
          className="flex items-center gap-2 transition-all duration-300"
          disabled={buttonState === 'not-available'}
        >
          <motion.div
            key={buttonState}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {getButtonContent()}
          </motion.div>
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            My <span className="text-primary">Credentials</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Certifications, education, and professional development that demonstrate my commitment to excellence
          </p>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center mb-8">
            <Award className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold">Professional Certifications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="text-primary mr-3">
                          <cert.icon className="h-6 w-6" />
                        </div>
                        <Badge variant="outline">{cert.category}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {cert.date}
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{cert.title}</CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {cert.issuer}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pt-0">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{cert.description}</p>
                    <CertificateViewButton
                      certificate={cert}
                      onViewCertificate={handleViewCertificate}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center mb-8">
            <GraduationCap className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0 pr-4">
                        <CardTitle className="text-xl mb-2">{edu.degree}</CardTitle>
                        <CardDescription className="text-lg font-medium text-primary">
                          {edu.institution}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="flex-shrink-0">{edu.year}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 pt-0">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">{edu.description}</p>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="mt-3">
                        <p className="font-medium text-sm mb-1">Achievements:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-muted-foreground">{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Work Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center mb-8">
            <Briefcase className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold">Work Experience</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workExperience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="text-primary mr-3">
                          <exp.icon className="h-6 w-6" />
                        </div>
                        <Badge variant="outline">{exp.period}</Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-1">{exp.title}</CardTitle>
                    <CardDescription className="font-medium text-primary mb-2">
                      {exp.company} | {exp.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {exp.responsibilities.map((item, i) => (
                        <li key={i} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Training & Seminars Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center mb-8">
            <BookOpen className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold">Training & Seminars</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainings.map((training, index) => (
              <motion.div
                key={training.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0 pr-4">
                        <CardTitle className="text-lg mb-2">{training.title}</CardTitle>
                        <CardDescription className="font-medium text-primary">
                          {training.organizer}
                        </CardDescription>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <Badge variant="outline" className="mb-1">{training.date}</Badge>
                        <p className="text-sm text-muted-foreground">{training.duration}</p>
                      </div>
                    </div>
                    {training.description && (
                      <p className="text-sm text-muted-foreground mt-2">{training.description}</p>
                    )}
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
