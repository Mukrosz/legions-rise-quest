/**
 * Progress indicator showing journey through stages
 * 6 steps: Landing + 5 stages
 */

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { getProgress, getStageName } from '@/lib/progress';

export function ProgressBar() {
  const pathname = usePathname();
  const progress = getProgress();
  const stages = [0, 1, 2, 3, 4, 5]; // 0 = landing, 1-5 = stages
  
  // Detect current stage from pathname
  const getCurrentStage = (): number => {
    if (pathname === '/') return 0;
    if (pathname === '/victory') return 5;
    const match = pathname.match(/\/stage-(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };
  
  const currentStage = getCurrentStage();
  
  // Convert to Roman numerals
  const toRoman = (num: number): string => {
    if (num === 0) return '🏛️';
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
    return romanNumerals[num - 1] || num.toString();
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
          const isComplete = progress.stage >= stage;
          const isCurrent = currentStage === stage;
          
          return (
            <div key={stage} className="relative z-10 flex flex-col items-center">
              {/* Circle marker */}
              <div 
                className={`
                  w-8 h-8 md:w-12 md:h-12 rounded-full border-4 
                  flex items-center justify-center
                  transition-all duration-300
                  ${isComplete 
                    ? 'bg-amber-400 border-white' 
                    : 'bg-white/30 border-white/50'
                  }
                  ${isCurrent ? 'ring-4 ring-amber-300 ring-offset-2' : ''}
                `}
              >
                <span className={`
                  text-xs md:text-sm font-display font-bold
                  ${isComplete ? 'text-gray-900' : 'text-white/60'}
                `}>
                  {toRoman(stage)}
                </span>
              </div>

              {/* Stage name */}
              <div className="absolute top-full mt-2 w-28 text-center">
                <span 
                  className={`
                    text-[11px] md:text-sm font-spectral font-semibold
                    ${isComplete ? 'text-amber-300' : 'text-white/70'}
                  `}
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9)',
                    letterSpacing: '0.02em'
                  }}
                >
                  {getStageName(stage)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

