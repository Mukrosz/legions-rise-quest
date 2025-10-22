'use client';

import { useEffect } from 'react';

export function ClientInit() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      });
      
      document.addEventListener('keydown', (e) => {
        if (
          e.keyCode === 123 ||
          (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
          (e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
          (e.ctrlKey && e.keyCode === 85)
        ) {
          e.preventDefault();
          return false;
        }
      });
    }
  }, []);

  return null;
}

