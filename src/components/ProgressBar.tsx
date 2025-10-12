/**
 * Progress indicator showing journey through stages
 * 6 steps: Landing + 5 stages
 */

'use client';

import React from 'react';
import { getProgress, getStageName } from '@/lib/progress';

export function ProgressBar() {
  const progress = getProgress();
  const stages = [0, 1, 2, 3, 4, 5]; // 0 = landing, 1-5 = stages

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-obsidian/20 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-bronze -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(progress.stage / 5) * 100}%` }}
        />

        {/* Stage markers */}
        {stages.map((stage) => {
          const isComplete = progress.stage >= stage;
          const isCurrent = progress.stage === stage;
          
          return (
            <div key={stage} className="relative z-10 flex flex-col items-center">
              {/* Circle marker */}
              <div 
                className={`
                  w-8 h-8 md:w-12 md:h-12 rounded-full border-4 
                  flex items-center justify-center
                  transition-all duration-300
                  ${isComplete 
                    ? 'bg-bronze border-obsidian' 
                    : 'bg-parchment border-obsidian/30'
                  }
                  ${isCurrent ? 'ring-4 ring-laurel ring-offset-2' : ''}
                `}
              >
                <span className={`
                  text-xs md:text-sm font-display font-bold
                  ${isComplete ? 'text-parchment' : 'text-obsidian/40'}
                `}>
                  {stage === 0 ? '🏛️' : stage}
                </span>
              </div>

              {/* Stage name */}
              <div className="absolute top-full mt-2 w-24 text-center">
                <span className={`
                  text-[10px] md:text-xs font-body
                  ${isComplete ? 'text-bronze font-bold' : 'text-obsidian/50'}
                `}>
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

