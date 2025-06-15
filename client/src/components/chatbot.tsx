import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  "hello": "Hi there! I'm here to help with any questions about Kat's virtual assistant services. How can I assist you today?",
  "hi": "Hello! I'm here to answer any questions about Kat's virtual assistant services. What would you like to know?",
  "location": "Kat is based in Batangas City, Philippines and provides virtual assistance services to clients worldwide.",
  "where": "Kat is located in Batangas City, Philippines. She provides remote virtual assistance services globally.",
  "availability": "Kat is currently available for new clients and projects! She'd love to discuss how she can support your business.",
  "available": "Yes, Kat is available for new virtual assistant projects. Feel free to reach out through the contact form!",
  "time": "Kat is available during Philippine Time business hours (9 AM - 6 PM PHT) but can accommodate different time zones for international clients.",
  "hours": "Kat typically works during Philippine Time business hours but she's flexible with scheduling to meet client needs across different time zones.",
  "skills": "Kat specializes in administrative support, content creation, social media management, customer service, and business process optimization.",
  "experience": "Kat has extensive experience in virtual assistance including admin support, content creation, social media management, and customer service.",
  "services": "Kat offers administrative support, email/calendar management, social media management, content creation, customer support, and data entry services.",
  "portfolio": "You can view Kat's work samples and client projects in the Portfolio section to see examples of her virtual assistant services.",
  "contact": "You can reach Kat through the contact form on this website, or connect with her on LinkedIn, Facebook, or Instagram.",
  "email": "You can email Kat at katdworks@gmail.com or use the contact form on this website.",
  "phone": "Kat can be reached at +63 915 463 1747 for urgent inquiries.",
  "resume": "You can download Kat's resume from the About section or view her credentials in the Credentials section.",
  "tools": "Kat is proficient with Google Workspace, Microsoft Office, Canva, Trello, Asana, social media platforms, and many other business tools.",
  "philippines": "Yes, Kat is based in Batangas City, Philippines. She provides virtual assistance services to clients both locally and internationally.",
  "timezone": "Kat works in Philippine Time (PHT/GMT+8). She's flexible with scheduling and can accommodate meetings with international clients.",
  "rates": "Kat's rates are competitive and depend on the scope of work. Please contact her directly to discuss pricing for your specific needs.",
  "pricing": "Kat offers flexible pricing based on project requirements. Let's discuss your needs and she'll provide a customized quote.",
  "default": "I'm here to help! You can ask me about Kat's services, availability, skills, experience, tools she uses, or how to contact her. What would you like to know?"
};

function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase().trim();
  
  for (const [key, response] of Object.entries(botResponses)) {
    if (message.includes(key)) {
      return response;
    }
  }
  
  return botResponses.default;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Kat's Assistant. Ask me about her availability, location, skills, or how to contact her!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Close chatbot when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      
      // Don't close if clicking on the toggle button or inside the chat
      if (
        chatContainerRef.current && 
        !chatContainerRef.current.contains(target) &&
        !(target as Element).closest('[data-chatbot-toggle]')
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
        style={{ 
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 50
        }}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          size="icon"
          data-chatbot-toggle
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            initial={{ opacity: 0, y: 50, scale: 0.9, originY: 1, originX: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 300,
              opacity: { duration: 0.2 }
            }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96"
          >
            <Card className="h-full flex flex-col shadow-2xl">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg flex-shrink-0">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Bot className="h-5 w-5" />
                  Kat's Assistant
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 p-0 flex flex-col min-h-0">
                <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`flex items-start gap-2 max-w-[80%] ${
                          message.isBot ? "flex-row" : "flex-row-reverse"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.isBot
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {message.isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        </div>
                        <div
                          className={`rounded-lg p-3 text-sm break-words ${
                            message.isBot
                              ? "bg-muted text-muted-foreground"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}