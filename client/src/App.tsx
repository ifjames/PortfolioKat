import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { NotificationProvider } from "@/hooks/use-notifications";
import { useRealisticContentProtection } from "@/lib/realistic-content-protection";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Chatbot } from "@/components/chatbot";
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import About from "@/pages/about";
import Certificates from "@/pages/certificates";
import Tools from "@/pages/tools";
import Contact from "@/pages/contact";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/about" component={About} />
      <Route path="/certificates" component={Certificates} />
      <Route path="/tools" component={Tools} />
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize realistic content protection (acknowledges it's bypassable)
  useRealisticContentProtection('standard');

  return (
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <div className="min-h-screen flex flex-col">
              <div className="content-overlay flex-1">
                <Navigation />
                <main className="pt-16">
                  <Router />
                </main>
              </div>
              <Footer />
              <Chatbot />
            </div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </NotificationProvider>
  );
}

export default App;
