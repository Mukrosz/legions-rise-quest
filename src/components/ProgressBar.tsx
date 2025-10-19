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
  const stages = [0, 1, 2, 3, 4, 5]; // 0 = landing, 1-5 = stages
  
  // Convert to Roman numerals
  const toRoman = (num: number): string => {
    if (num === 0) return '🏛️';
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
    return romanNumerals[num - 1] || num.toString();
  };

  // Handle stage navigation
  const handleStageClick = (stage: number) => {
    // Only allow clicking on unlocked stages
    if (progress.stage < stage - 1) return;
    
    if (stage === 0) {
      router.push('/');
    } else {
      router.push(`/stage-${stage}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/20 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-amber-400 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(progress.stage / 5) * 100}%` }}
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
          } else {
            isComplete = progress.stage >= stage;
            isCurrent = progress.stage + 1 === stage && stage <= 5;
            isLocked = stage > progress.stage + 1;
          }
          
          const isUnlocked = !isLocked;
          
          return (
            <div 
              key={stage} 
              className="relative z-10 flex flex-col items-center"
              onClick={() => handleStageClick(stage)}
              style={{ 
                cursor: isUnlocked ? 'pointer' : 'not-allowed',
              }}
            >
              {/* Circle marker */}
              <div 
                className={`
                  w-8 h-8 md:w-12 md:h-12 rounded-full border-4 
                  flex items-center justify-center
                  transition-all duration-300
                  ${isComplete 
                    ? 'bg-amber-400 border-white' 
                    : isCurrent
                    ? 'bg-amber-500 border-amber-300'
                    : 'bg-white/20 border-white/40'
                  }
                  ${isCurrent ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-gray-900 animate-pulse' : ''}
                  ${isUnlocked ? 'hover:scale-110 hover:shadow-lg' : 'opacity-60'}
                `}
              >
                <span className={`
                  text-xs md:text-sm font-display font-bold
                  ${isComplete 
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
                    ${isComplete 
                      ? 'text-amber-300' 
                      : isCurrent 
                      ? 'text-amber-400' 
                      : 'text-white/50'
                    }
                  `}
                  style={{
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
  );
}

