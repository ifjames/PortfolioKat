import { useEffect } from 'react';

/**
 * Content Protection Utilities
 * Provides comprehensive protection against content copying and developer tools
 */

export class ContentProtection {
  private static instance: ContentProtection;
  private isInitialized = false;

  public static getInstance(): ContentProtection {
    if (!ContentProtection.instance) {
      ContentProtection.instance = new ContentProtection();
    }
    return ContentProtection.instance;
  }

  public initialize(): void {
    if (this.isInitialized) return;
    
    this.disableTextSelection();
    this.disableImageDragging();
    this.disableKeyboardShortcuts();
    this.disableContextMenu();
    this.disablePrint();
    this.protectConsole();
    this.detectDevTools();
    
    this.isInitialized = true;
  }

  private disableTextSelection(): void {
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      /* Allow interactive elements */
      button, input, textarea, select, a, label, [role="button"], [tabindex] {
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
        user-select: auto !important;
        pointer-events: auto !important;
        -webkit-touch-callout: auto !important;
      }

      /* Allow form interactions */
      form, form *, .form-field, .form-field * {
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
        user-select: auto !important;
        pointer-events: auto !important;
        -webkit-touch-callout: auto !important;
      }
      
      img {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        pointer-events: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        user-select: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  private disableImageDragging(): void {
    // Disable dragging for existing images
    const protectImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.setAttribute('draggable', 'false');
        img.style.pointerEvents = 'none';
        img.style.webkitUserDrag = 'none';
        img.style.userSelect = 'none';
        img.addEventListener('dragstart', (e) => e.preventDefault());
      });
    };

    // Protect existing images
    protectImages();

    // Observer for dynamically added images
    const observer = new MutationObserver(() => {
      protectImages();
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
  }

  private disableKeyboardShortcuts(): void {
    document.addEventListener('keydown', (e) => {
      // Check if we're in a form field
      const isFormElement = e.target instanceof HTMLInputElement || 
                           e.target instanceof HTMLTextAreaElement ||
                           e.target instanceof HTMLSelectElement ||
                           (e.target as HTMLElement).contentEditable === 'true';

      // Developer Tools shortcuts (always disabled)
      if (e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)) ||
          (e.ctrlKey && ['U'].includes(e.key))) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Allow form-related shortcuts when in form fields
      if (isFormElement) {
        // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X in form fields
        if (e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key)) {
          return true;
        }
      }

      // Disable other shortcuts outside of form fields
      if (!isFormElement && e.ctrlKey && ['s', 'a', 'p', 'c', 'v', 'x'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });
  }

  private disableContextMenu(): void {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  }

  private disablePrint(): void {
    window.addEventListener('beforeprint', (e) => {
      e.preventDefault();
      return false;
    });

    // Override window.print
    window.print = () => {
      console.log('Printing is disabled for content protection.');
    };
  }

  private protectConsole(): void {
    // Clear console regularly
    setInterval(() => {
      console.clear();
    }, 2000);

    // Override clipboard
    document.addEventListener('copy', (e) => {
      e.clipboardData?.setData('text/plain', '');
      e.preventDefault();
    });
  }

  private detectDevTools(): void {
    let devtools = { open: false };
    
    setInterval(() => {
      const threshold = 200;
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          console.clear();
          console.log('%cContent Protection Active', 'color: #06b6d4; font-size: 16px; font-weight: bold;');
          console.log('%cThis portfolio is protected against unauthorized copying.', 'color: #6b7280;');
        }
      } else {
        devtools.open = false;
      }
    }, 500);
  }

  public protectElement(element: HTMLElement): void {
    element.style.webkitUserSelect = 'none';
    element.style.mozUserSelect = 'none';
    element.style.msUserSelect = 'none';
    element.style.userSelect = 'none';
    element.style.webkitTouchCallout = 'none';
    
    element.addEventListener('contextmenu', (e) => e.preventDefault());
    element.addEventListener('selectstart', (e) => e.preventDefault());
    element.addEventListener('dragstart', (e) => e.preventDefault());
  }
}

// Hook for React components
export const useContentProtection = () => {
  const protection = ContentProtection.getInstance();
  
  useEffect(() => {
    protection.initialize();
  }, []);

  return protection;
};

// For non-React usage
export const initializeContentProtection = () => {
  const protection = ContentProtection.getInstance();
  protection.initialize();
};
