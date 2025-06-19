import React from 'react';
import { motion } from 'framer-motion';

interface CopyrightNoticeProps {
  className?: string;
}

export const CopyrightNotice: React.FC<CopyrightNoticeProps> = ({ className = '' }) => {
  return (
    <div className={`text-xs text-muted-foreground border rounded-md p-3 bg-muted/50 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold">© 2026 Katrina De Leon</span>
      </div>
      <p className="mb-2">
        All content, including but not limited to text, images, graphics, certificates, 
        and project materials displayed on this portfolio are protected by copyright law.
      </p>
      <p className="mb-2">
        <strong>Unauthorized reproduction, distribution, or use of any content</strong> from this 
        portfolio without explicit written permission is strictly prohibited and may result in 
        legal action.
      </p>
      <p className="text-xs">
        For licensing inquiries or permission requests, please contact me through the 
        contact page. All violations will be reported and pursued to the full extent of the law.
      </p>
    </div>
  );
};

interface WatermarkProps {
  text?: string;
  className?: string;
}

export const ContentWatermark: React.FC<WatermarkProps> = ({ 
  text = "© 2024 Katrina De Leon - Portfolio", 
  className = '' 
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
          <svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'>
            <text x='200' y='200' 
                  font-family='Arial, sans-serif' 
                  font-size='14' 
                  font-weight='300'
                  fill='rgba(0,0,0,0.03)' 
                  text-anchor='middle' 
                  dominant-baseline='middle'
                  transform='rotate(-45 200 200)'>
              ${text}
            </text>
          </svg>
        `)}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px 300px'
      }}
    />
  );
};

export const TermsOfUse: React.FC = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-3xl font-bold"
        variants={sectionVariants}
      >
        Terms of Use
      </motion.h1>
      
      <motion.section variants={sectionVariants}>
        <h2 className="text-xl font-semibold mb-3">Copyright and Intellectual Property</h2>
        <p className="mb-3">
          All content on this portfolio website, including but not limited to text, images, 
          graphics, logos, certificates, project descriptions, and design elements, is the 
          exclusive property of Katrina De Leon.
        </p>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <h2 className="text-xl font-semibold mb-3">Prohibited Uses</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Copying, reproducing, or distributing any content without written permission</li>
          <li>Using content for commercial purposes without authorization</li>
          <li>Claiming ownership of any content or work displayed</li>
          <li>Reverse engineering or attempting to extract source code or assets</li>
          <li>Using automated tools to scrape or download content</li>
        </ul>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <h2 className="text-xl font-semibold mb-3">Permitted Uses</h2>
        <p className="mb-3">
          You may view this portfolio for legitimate business purposes such as:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Evaluating Katrina De Leon for employment opportunities</li>
          <li>Assessing qualifications for business partnerships or contracts</li>
          <li>General professional networking and information gathering</li>
        </ul>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <h2 className="text-xl font-semibold mb-3">Enforcement</h2>
        <p className="mb-3">
          Violations of these terms will be actively monitored and pursued. Any unauthorized 
          use may result in:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Immediate legal action for copyright infringement</li>
          <li>Claims for damages and attorney fees</li>
          <li>Reporting to relevant authorities and platforms</li>
        </ul>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <h2 className="text-xl font-semibold mb-3">Contact for Permissions</h2>
        <p>
          For any questions about these terms or to request permission for content use, 
          please contact Katrina De Leon through the contact page on this website.
        </p>
      </motion.section>
    </motion.div>
  );
};
