import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Linkedin, Instagram, Loader2, Clock } from "lucide-react";
import { FaFacebook } from "react-icons/fa";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "katdworks@gmail.com",
    color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 915 463 1747",
    color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Batangas City, Philippines",
    color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
  },
];

const socialLinks = [
  { icon: FaFacebook, href: "https://www.facebook.com/ifkatz#", color: "hover:bg-blue-600" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/katrina-de-leon-i-eva-085282368/", color: "hover:bg-blue-700" },
  { icon: Instagram, href: "https://www.instagram.com/ifkats", color: "hover:bg-pink-600" },
];

export default function Contact() {
  const { toast } = useToast();

  // Enable text selection and copy/paste on this page only
  useEffect(() => {
    // Create a style element to override global protection for this page
    const contactPageStyle = document.createElement('style');
    contactPageStyle.id = 'contact-page-override';
    contactPageStyle.textContent = `
      .contact-page * {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
        -webkit-touch-callout: default !important;
      }
      
      .contact-page img {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        user-select: none !important;
      }
      
      .contact-page .selectable-text {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        user-select: text !important;
        cursor: text !important;
      }
      
      .contact-page .selectable-text:hover {
        background-color: rgba(59, 130, 246, 0.1);
        border-radius: 4px;
        transition: background-color 0.2s ease;
      }
    `;
    document.head.appendChild(contactPageStyle);

    // Override keyboard event handlers for this page
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow Ctrl+C, Ctrl+V, Ctrl+A, Ctrl+X on contact page
      if (e.ctrlKey && ['c', 'v', 'a', 'x'].includes(e.key)) {
        e.stopPropagation();
        return true;
      }
    };

    // Override text selection handlers
    const handleSelectStart = (e: Event) => {
      e.stopPropagation();
      return true;
    };

    const handleMouseDown = (e: MouseEvent) => {
      e.stopPropagation();
      return true;
    };

    // Add event listeners with capture to override global ones
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('selectstart', handleSelectStart, true);
    document.addEventListener('mousedown', handleMouseDown, true);

    // Cleanup on unmount
    return () => {
      const styleElement = document.getElementById('contact-page-override');
      if (styleElement) {
        styleElement.remove();
      }
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
      document.removeEventListener('mousedown', handleMouseDown, true);
    };
  }, []);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section className="contact-page py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 lg:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-base sm:text-xl text-muted-foreground">
            Let's discuss how I can help streamline your business operations and support your goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 lg:mb-6">Let's Connect</h3>
            <div className="space-y-4 lg:space-y-6 mb-6 lg:mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-center"
                >
                  <div className={`p-3 rounded-lg mr-4 ${item.color}`}>
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">{item.label}</h4>
                    <p className="text-muted-foreground text-sm sm:text-base selectable-text cursor-text">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-medium mb-3 lg:mb-4 text-sm sm:text-base">Follow Me</h4>
              <div className="flex space-x-3 lg:space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className={`bg-muted hover:text-white p-2 sm:p-3 rounded-lg transition-colors duration-200 ${social.color}`}
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6 lg:mt-8"
            >
              <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Availability</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      I respond to messages within 24 hours. Open to freelance opportunities and collaborations.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 lg:space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Project inquiry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: [1, 1.2, 0.95, 1.1, 1], rotate: [0, 2, -2, 1, 0] }}
                  animate={{ rotate: 0 }}
                >
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
