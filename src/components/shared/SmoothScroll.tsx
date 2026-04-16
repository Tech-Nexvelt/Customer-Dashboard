"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  // Option: you can access the lenis instance here if needed via useLenis hook
  
  return (
    <ReactLenis root options={{ 
        lerp: 0.1, 
        duration: 1.5, 
        smoothWheel: true 
    }}>
      {children}
    </ReactLenis>
  );
}
