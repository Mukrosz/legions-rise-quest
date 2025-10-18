/**
 * Enemy Card Component
 * Displays enemy portrait with hover effects
 */

'use client';

import React from 'react';

interface EnemyCardProps {
  name: string;
  caption: string;
  imagePath: string;
  onClick: () => void;
}

export function EnemyCard({ name, caption, imagePath, onClick }: EnemyCardProps) {
  return (
    <button
      onClick={onClick}
      className="relative group cursor-pointer transition-all duration-300"
      style={{
        aspectRatio: '1 / 1',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '2px solid rgba(212, 165, 116, 0.5)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
      }}
      aria-label={`View ${name}`}
    >
      {/* Enemy Portrait */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url('${imagePath}')`,
          backgroundColor: 'rgba(60, 40, 30, 0.3)', // Fallback if image not loaded
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
          opacity: 0.9,
        }}
      />

      {/* Caption Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
        <h3 className="font-display mb-1"
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              fontWeight: 800,
              letterSpacing: '0.06em',
              color: '#d4a574',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}>
          {name}
        </h3>
        <p className="font-spectral text-sm"
           style={{
             color: '#f5d8b8',
             fontStyle: 'italic',
             fontWeight: 400,
             textShadow: '0 1px 3px rgba(0,0,0,0.9)',
           }}>
          {caption}
        </p>
      </div>

      {/* Hover Indicator */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'rgba(212, 165, 116, 0.15)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <span className="font-display px-4 py-2"
              style={{
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#ffe5cc',
                background: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '8px',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              }}>
          INVESTIGATE
        </span>
      </div>
    </button>
  );
}

