import { useEffect } from 'react';

/**
 * Content Protection Utilities
 * Provides basic protection against casual content copying.
 * Note: This is NOT foolproof - advanced users can bypass these protections
 * using browser extensions, developer tools, or by disabling JavaScript.
 * This serves as a deterrent for casual copying, not as a security measure.
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
    this.detectExtensions();
    this.obfuscateContent();
    this.monitorClipboard();
    this.addAntiTamperProtection();
    
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

  private detectExtensions(): void {
    // Check for common copy-paste enabling extensions
    const checkExtensions = () => {
      // Check if user-select has been overridden by extensions
      const testElement = document.createElement('div');
      testElement.style.userSelect = 'none';
      document.body.appendChild(testElement);
      
      const computedStyle = window.getComputedStyle(testElement);
      if (computedStyle.userSelect !== 'none') {
        console.warn('Extension detected that modifies content protection');
        this.reinforceProtection();
      }
      
      document.body.removeChild(testElement);
    };

    setInterval(checkExtensions, 3000);
  }

  private obfuscateContent(): void {
    // Add invisible characters to important text content
    const obfuscateText = (element: HTMLElement) => {
      if (element.nodeType === Node.TEXT_NODE && element.textContent) {
        const text = element.textContent;
        // Insert zero-width characters randomly
        const obfuscated = text.split('').map((char, index) => {
          if (index % 3 === 0) {
            return char + '\u200B'; // Zero-width space
          }
          return char;
        }).join('');
        element.textContent = obfuscated;
      }
    };

    // Apply to specific content areas (not forms)
    const contentElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span:not(.contact-page span)');
    contentElements.forEach(el => {
      el.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          obfuscateText(node as any);
        }
      });
    });
  }

  private monitorClipboard(): void {
    // Override clipboard operations
    document.addEventListener('copy', (e) => {
      const isFormElement = e.target instanceof HTMLInputElement || 
                           e.target instanceof HTMLTextAreaElement ||
                           (e.target as HTMLElement).closest('.contact-page');
      
      if (!isFormElement) {
        e.clipboardData?.setData('text/plain', 'Content protected - KatDWorks Portfolio');
        e.preventDefault();
      }
    });

    // Monitor clipboard changes
    if (navigator.clipboard && navigator.clipboard.readText) {
      setInterval(() => {
        navigator.clipboard.readText().then(text => {
          if (text && text.includes('katdworks') || text.includes('portfolio')) {
            // Detected potential content copying
            console.log('Content copying detected');
          }
        }).catch(() => {
          // Clipboard access denied (which is good for protection)
        });
      }, 5000);
    }
  }

  private addAntiTamperProtection(): void {
    // Detect if protection styles have been modified
    const originalProtectionCSS = `
      * { user-select: none !important; }
      img { pointer-events: none !important; }
    `;

    const checkTampering = () => {
      const testDiv = document.createElement('div');
      testDiv.style.userSelect = 'none';
      testDiv.style.cssText += 'user-select: none !important;';
      document.body.appendChild(testDiv);

      const computedStyle = window.getComputedStyle(testDiv);
      if (computedStyle.userSelect !== 'none') {
        this.reinforceProtection();
      }

      document.body.removeChild(testDiv);
    };

    setInterval(checkTampering, 2000);

    // Protect against style sheet modifications
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === 'STYLE' || node.nodeName === 'LINK') {
              // Check if new styles are interfering with protection
              setTimeout(() => this.reinforceProtection(), 100);
            }
          });
        }
      });
    });

    observer.observe(document.head, { childList: true, subtree: true });
  }

  private reinforceProtection(): void {
    // Re-apply protection when tampering is detected
    const reinforcementStyle = document.createElement('style');
    reinforcementStyle.id = 'protection-reinforcement';
    reinforcementStyle.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
      
      img {
        -webkit-user-drag: none !important;
        pointer-events: none !important;
        -webkit-user-select: none !important;
      }
      
      /* Re-enable forms only */
      .contact-page * {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        user-select: text !important;
      }
      
      button, input, textarea, select {
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        user-select: auto !important;
        pointer-events: auto !important;
      }
    `;

    // Remove old reinforcement and add new one
    const oldReinforcement = document.getElementById('protection-reinforcement');
    if (oldReinforcement) {
      oldReinforcement.remove();
    }
    
    document.head.appendChild(reinforcementStyle);
    
    console.log('%cProtection reinforced due to tampering attempt', 'color: #ef4444; font-weight: bold;');
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
