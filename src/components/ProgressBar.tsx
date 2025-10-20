/**
 * Progress indicator showing journey through stages
 * 6 steps: Landing + 5 stages
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { getProgress, getStageName } from '@/lib/progress';

export function ProgressBar() {
  const router = useRouter();
  const progress = getProgress();
  const stages = [0, 1, 2, 3, 4, 5, 6]; // 0 = landing, 1-5 = stages, 6 = victory
  
  // Convert to Roman numerals
  const toRoman = (num: number): string => {
    if (num === 0) return '🏛️';
    if (num === 6) return '👑';
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
    return romanNumerals[num - 1] || num.toString();
  };

  // Handle stage navigation
  const handleStageClick = (stage: number) => {
    // Only allow clicking on unlocked stages
    if (progress.stage < stage - 1) return;
    
    if (stage === 0) {
      router.push('/');
    } else if (stage === 6) {
      router.push('/victory');
    } else {
      router.push(`/stage-${stage}`);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes sunRays {
          0%, 100% { 
            transform: rotate(0deg); 
            opacity: 0.6; 
          }
          50% { 
            transform: rotate(180deg); 
            opacity: 0.9; 
          }
        }
      `}</style>
      
      <div className="w-full max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/20 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-amber-400 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(progress.stage / 6) * 100}%` }}
        />

        {/* Stage markers */}
        {stages.map((stage) => {
          let isComplete = false;
          let isCurrent = false;
          let isLocked = false;
          
          if (stage === 0) {
            isComplete = progress.stage > 0;
            isCurrent = false;
            isLocked = false;
          } else if (stage === 6) {
            isComplete = progress.stage >= 6;
            isCurrent = progress.stage === 5;
            isLocked = progress.stage < 5;
          } else {
            isComplete = progress.stage >= stage;
            isCurrent = progress.stage + 1 === stage && stage <= 5;
            isLocked = stage > progress.stage + 1;
          }
          
          const isUnlocked = !isLocked;
          const isVictory = stage === 6 && isComplete;
          
          return (
            <div 
              key={stage} 
              className="relative z-10 flex flex-col items-center"
              onClick={() => handleStageClick(stage)}
              style={{ 
                cursor: isUnlocked ? 'pointer' : 'not-allowed',
              }}
            >
              {/* Glowing sun rays for victory stage */}
              {isVictory && (
                <>
                  <div 
                    className="absolute w-20 h-20 md:w-28 md:h-28 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
                      animation: 'sunRays 4s ease-in-out infinite',
                    }}
                  />
                  <div 
                    className="absolute w-16 h-16 md:w-24 md:h-24 pointer-events-none"
                    style={{
                      background: `
                        conic-gradient(
                          from 0deg,
                          transparent 0deg,
                          rgba(255,215,0,0.4) 10deg,
                          transparent 20deg,
                          transparent 40deg,
                          rgba(255,215,0,0.4) 50deg,
                          transparent 60deg,
                          transparent 80deg,
                          rgba(255,215,0,0.4) 90deg,
                          transparent 100deg,
                          transparent 120deg,
                          rgba(255,215,0,0.4) 130deg,
                          transparent 140deg,
                          transparent 160deg,
                          rgba(255,215,0,0.4) 170deg,
                          transparent 180deg,
                          transparent 200deg,
                          rgba(255,215,0,0.4) 210deg,
                          transparent 220deg,
                          transparent 240deg,
                          rgba(255,215,0,0.4) 250deg,
                          transparent 260deg,
                          transparent 280deg,
                          rgba(255,215,0,0.4) 290deg,
                          transparent 300deg,
                          transparent 320deg,
                          rgba(255,215,0,0.4) 330deg,
                          transparent 340deg,
                          transparent 360deg
                        )
                      `,
                      animation: 'sunRays 8s linear infinite',
                      filter: 'blur(2px)',
                    }}
                  />
                </>
              )}
              
              {/* Circle marker */}
              <div 
                className={`
                  w-8 h-8 md:w-12 md:h-12 rounded-full border-4 
                  flex items-center justify-center
                  transition-all duration-300
                  ${isVictory 
                    ? 'bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 border-yellow-200 shadow-2xl' 
                    : isComplete 
                    ? 'bg-amber-400 border-white' 
                    : isCurrent
                    ? 'bg-amber-500 border-amber-300'
                    : 'bg-white/20 border-white/40'
                  }
                  ${isCurrent ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-gray-900 animate-pulse' : ''}
                  ${isVictory ? 'ring-4 ring-yellow-300 ring-offset-2 ring-offset-gray-900' : ''}
                  ${isUnlocked ? 'hover:scale-110 hover:shadow-lg' : 'opacity-60'}
                `}
                style={isVictory ? {
                  boxShadow: '0 0 30px rgba(255,215,0,0.8), 0 0 60px rgba(255,215,0,0.4), inset 0 0 20px rgba(255,255,255,0.3)',
                } : undefined}
              >
                <span className={`
                  text-xs md:text-sm font-display font-bold
                  ${isVictory
                    ? 'text-gray-900 text-xl md:text-2xl'
                    : isComplete 
                    ? 'text-gray-900' 
                    : isCurrent 
                    ? 'text-white' 
                    : 'text-white/50'
                  }
                `}>
                  {toRoman(stage)}
                </span>
              </div>

              {/* Stage name */}
              <div className="absolute top-full mt-2 w-28 text-center pointer-events-none">
                <span 
                  className={`
                    text-[11px] md:text-sm font-spectral font-semibold
                    ${isVictory
                      ? 'text-yellow-300 font-bold'
                      : isComplete 
                      ? 'text-amber-300' 
                      : isCurrent 
                      ? 'text-amber-400' 
                      : 'text-white/50'
                    }
                  `}
                  style={isVictory ? {
                    textShadow: '0 0 10px rgba(255,215,0,0.8), 0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9)',
                    letterSpacing: '0.02em'
                  } : {
                    textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9)',
                    letterSpacing: '0.02em'
                  }}
                >
                  {getStageName(stage)}
                </span>
              </div>

              {/* Lock icon for locked stages */}
              {isLocked && (
                <div className="absolute -bottom-1 text-xs opacity-70">
                  🔒
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </>
  );
}

