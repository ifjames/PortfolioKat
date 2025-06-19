import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Katrina De Leon. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link 
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
