import { useEffect, useRef } from 'react';

interface WatermarkProps {
  children: React.ReactNode;
  text?: string;
  className?: string;
}

export function WatermarkOverlay({ children, text = "KatDWorks Portfolio", className = "" }: WatermarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const watermarkStyle = document.createElement('style');
    watermarkStyle.textContent = `
      .watermark-container {
        position: relative;
        overflow: hidden;
      }
      
      .watermark-container::before {
        content: "${text}";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 20px;
        color: rgba(0, 0, 0, 0.1);
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 1000;
        background: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 100px,
          rgba(6, 182, 212, 0.03) 100px,
          rgba(6, 182, 212, 0.03) 150px
        );
      }
      
      .watermark-container > * {
        position: relative;
        z-index: 1;
      }
    `;
    
    document.head.appendChild(watermarkStyle);
    container.classList.add('watermark-container');

    return () => {
      document.head.removeChild(watermarkStyle);
      container.classList.remove('watermark-container');
    };
  }, [text]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
