import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, Mail, CheckCircle, Laptop } from "lucide-react";

export function Mascot() {
  const [isTyping, setIsTyping] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(0);

  const vaIcons = [Calendar, Mail, CheckCircle, Laptop];
  const messages = [
    "Ready to help! 💼",
    "Let's get organized! 📅", 
    "Managing your tasks! ✅",
    "Available 24/7! 🌟"
  ];

  // Random typing animation
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }, 5000 + Math.random() * 3000);

    return () => clearInterval(typingInterval);
  }, []);

  // Random blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 2000 + Math.random() * 4000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Cycle through VA icons
  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % vaIcons.length);
    }, 3000);

    return () => clearInterval(iconInterval);
  }, []);

  const CurrentIcon = vaIcons[currentIcon];

  return (
    <motion.div
      className="relative flex flex-col items-center mb-6 sm:mb-8"
      initial={{ opacity: 0, scale: 0.5, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
    >
      {/* Speech Bubble */}
      <motion.div
        className="relative bg-background dark:bg-card border border-border rounded-2xl px-3 py-2 sm:px-4 sm:py-2 mb-3 shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.p 
          className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap"
          key={currentIcon}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {messages[currentIcon]}
        </motion.p>
        {/* Speech bubble tail */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-3 border-r-3 border-t-3 border-l-transparent border-r-transparent border-t-background dark:border-t-card"></div>
        </div>
      </motion.div>

      {/* VA Assistant Mascot */}
      <motion.div
        className="relative w-16 h-16 sm:w-20 sm:h-20"
        animate={{ 
          y: [0, -3, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Main Avatar Circle */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary rounded-full shadow-lg border-2 border-primary/20"
          animate={{
            scale: isTyping ? [1, 1.05, 1] : 1,
            boxShadow: isTyping ? 
              ["0 4px 15px rgba(59, 130, 246, 0.3)", "0 8px 25px rgba(59, 130, 246, 0.5)", "0 4px 15px rgba(59, 130, 246, 0.3)"] :
              "0 4px 15px rgba(59, 130, 246, 0.3)"
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Face Container */}
        <div className="absolute inset-2 bg-gradient-to-br from-background to-muted rounded-full flex flex-col items-center justify-center">
          {/* Eyes */}
          <div className="flex space-x-1.5 mb-1">
            <motion.div
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-foreground rounded-full"
              animate={{
                scaleY: isBlinking ? 0.1 : 1,
              }}
              transition={{ duration: 0.1 }}
            />
            <motion.div
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-foreground rounded-full"
              animate={{
                scaleY: isBlinking ? 0.1 : 1,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          {/* Mouth */}
          <motion.div
            className="w-2 h-1 sm:w-3 sm:h-1.5 border-b-2 border-foreground rounded-b-full"
            animate={{
              scaleX: isTyping ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Laptop/Work Icon */}
        <motion.div
          className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center shadow-md border-2 border-background"
          animate={{
            rotate: [0, 10, 0, -10, 0],
            scale: isTyping ? [1, 1.1, 1] : 1,
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <CurrentIcon className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
        </motion.div>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            className="absolute -top-2 -left-2 flex space-x-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-primary rounded-full"
                animate={{
                  y: [0, -4, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Productivity Sparkles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full"
            style={{
              left: `${20 + (i * 30)}%`,
              top: `${10 + (i % 2) * 70}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Floating Productivity Icons */}
      <motion.div
        className="absolute -top-2 -right-6 text-primary/70"
        animate={{
          y: [0, -8, 0],
          opacity: [0.5, 1, 0.5],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1,
          ease: "easeInOut"
        }}
      >
        <CheckCircle className="w-4 h-4" />
      </motion.div>

      <motion.div
        className="absolute -top-2 -left-6 text-primary/70"
        animate={{
          y: [0, -6, 0],
          opacity: [0.5, 1, 0.5],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          delay: 2,
          ease: "easeInOut"
        }}
      >
        <Mail className="w-3 h-3" />
      </motion.div>
    </motion.div>
  );
}
