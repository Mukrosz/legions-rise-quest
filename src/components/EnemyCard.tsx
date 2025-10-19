'use client';

import React from 'react';

interface EnemyCardProps {
  name: string;
  caption: string;
  imagePath: string;
  onClick: () => void;
  isDefeated?: boolean;
}

export function EnemyCard({ name, caption, imagePath, onClick, isDefeated = false }: EnemyCardProps) {
  return (
    <button
      onClick={onClick}
      className="relative group cursor-pointer transition-all duration-300"
      style={{
        aspectRatio: '1 / 1',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '2px solid rgba(212, 135, 76, 0.35)',
        boxShadow: '0 4px 16px rgba(139, 69, 19, 0.4)',
        opacity: isDefeated ? 0.5 : 1,
        filter: isDefeated ? 'grayscale(50%)' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!isDefeated) {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 69, 19, 0.5)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 69, 19, 0.4)';
      }}
      aria-label={`View ${name}${isDefeated ? ' (Defeated)' : ''}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url('${imagePath}')`,
          backgroundColor: 'rgba(60, 40, 30, 0.3)',
        }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(204, 102, 51, 0.12), rgba(184, 115, 51, 0.15), rgba(139, 69, 19, 0.12))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
          opacity: 0.7,
        }}
      />

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

      {!isDefeated && (
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
      )}

      {isDefeated && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full">
            <div
              className="absolute"
              style={{
                top: '0',
                left: '50%',
                width: '8px',
                height: '141.4%',
                background: 'linear-gradient(180deg, rgba(139,0,0,0.9) 0%, rgba(180,0,0,0.95) 50%, rgba(139,0,0,0.9) 100%)',
                transform: 'translateX(-50%) rotate(45deg)',
                transformOrigin: 'center',
                boxShadow: '0 0 20px rgba(180,0,0,0.8), inset 0 0 10px rgba(0,0,0,0.6)',
                borderRadius: '2px',
              }}
            />
            <div
              className="absolute"
              style={{
                top: '0',
                left: '50%',
                width: '8px',
                height: '141.4%',
                background: 'linear-gradient(180deg, rgba(139,0,0,0.9) 0%, rgba(180,0,0,0.95) 50%, rgba(139,0,0,0.9) 100%)',
                transform: 'translateX(-50%) rotate(-45deg)',
                transformOrigin: 'center',
                boxShadow: '0 0 20px rgba(180,0,0,0.8), inset 0 0 10px rgba(0,0,0,0.6)',
                borderRadius: '2px',
              }}
            />
          </div>
          
          <span className="absolute font-display"
                style={{
                  fontSize: 'clamp(16px, 2vw, 24px)',
                  fontWeight: 900,
                  letterSpacing: '0.15em',
                  color: '#ff4444',
                  textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(255,0,0,0.6)',
                  background: 'rgba(0,0,0,0.8)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '2px solid rgba(180,0,0,0.6)',
                }}>
            DEFEATED
          </span>
        </div>
      )}
    </button>
  );
}

