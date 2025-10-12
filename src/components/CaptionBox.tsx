/**
 * Caption box for lore and story beats
 * Emulates comic panel captions
 */

import React from 'react';

interface CaptionBoxProps {
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'center';
  variant?: 'story' | 'narrator' | 'thought';
}

export function CaptionBox({ 
  children, 
  position = 'top',
  variant = 'story' 
}: CaptionBoxProps) {
  const positionStyles = {
    top: 'top-8',
    bottom: 'bottom-8',
    center: 'top-1/2 -translate-y-1/2',
  };

  const variantStyles = {
    story: 'bg-parchment border-burgundy text-obsidian shadow-burgundy/30',
    narrator: 'bg-gradient-to-br from-obsidian to-slate-900 border-bronze text-parchment shadow-bronze/50',
    thought: 'bg-gradient-to-br from-burgundy to-burgundy/80 border-parchment text-parchment italic shadow-burgundy/50',
  };

  return (
    <div 
      className={`
        absolute left-1/2 -translate-x-1/2 ${positionStyles[position]}
        max-w-3xl w-[90%] p-8 border-8
        ${variantStyles[variant]}
        font-body text-sm md:text-base leading-relaxed
        shadow-2xl z-20 transform hover:scale-[1.02] transition-transform duration-200
      `}
    >
      {/* Corner accents (comic style) */}
      <div className="absolute -top-2 -left-2 w-6 h-6 bg-bronze border-2 border-obsidian" />
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-bronze border-2 border-obsidian" />
      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-bronze border-2 border-obsidian" />
      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-bronze border-2 border-obsidian" />
      
      {/* Inner border glow */}
      <div className="absolute inset-2 border-2 border-bronze/20 pointer-events-none" />
      
      {children}
    </div>
  );
}

