/**
 * Comic-style panel component
 * Full-bleed hero panels with thick gutters
 */

import React from 'react';

interface PanelProps {
  children: React.ReactNode;
  variant?: 'hero' | 'content' | 'split';
  className?: string;
}

export function Panel({ children, variant = 'content', className = '' }: PanelProps) {
  const baseStyles = 'relative border-8 border-obsidian shadow-2xl';
  
  const variantStyles = {
    hero: 'min-h-[60vh] bg-gradient-to-b from-burgundy/30 via-obsidian/80 to-obsidian overflow-hidden',
    content: 'bg-gradient-to-br from-parchment via-parchment/95 to-amber-50 p-8',
    split: 'bg-gradient-to-r from-parchment/95 to-amber-50 p-6',
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 bg-bronze border-r-4 border-b-4 border-obsidian" />
      <div className="absolute top-0 right-0 w-8 h-8 bg-bronze border-l-4 border-b-4 border-obsidian" />
      <div className="absolute bottom-0 left-0 w-8 h-8 bg-bronze border-r-4 border-t-4 border-obsidian" />
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-bronze border-l-4 border-t-4 border-obsidian" />
      
      {/* Halftone texture overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
          backgroundSize: '4px 4px',
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

