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
    if (num === 6) return '🌿';
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
          0% { 
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% { 
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes sunGlow {
          0%, 100% { 
            opacity: 0.6; 
          }
          50% { 
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
                  {/* Radial glow backdrop */}
                  <div 
                    className="absolute pointer-events-none"
                    style={{
                      width: '96px',
                      height: '96px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,215,0,0.2) 40%, transparent 70%)',
                      animation: 'sunGlow 3s ease-in-out infinite',
                    }}
                  />
                  
                  {/* Sun rays container - rotates continuously */}
                  <div 
                    className="absolute pointer-events-none"
                    style={{
                      width: '72px',
                      height: '72px',
                      left: '50%',
                      top: '50%',
                      animation: 'sunRays 8s linear infinite',
                    }}
                  >
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                      <div
                        key={angle}
                        style={{
                          position: 'absolute',
                          width: '3px',
                          height: '36px',
                          left: '50%',
                          top: '50%',
                          background: 'linear-gradient(to bottom, rgba(255,215,0,0.7), rgba(255,215,0,0.3) 60%, transparent)',
                          transformOrigin: '50% 0',
                          transform: `translate(-50%, 0) rotate(${angle}deg)`,
                          filter: 'blur(1px)',
                        }}
                      />
                    ))}
                  </div>
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

