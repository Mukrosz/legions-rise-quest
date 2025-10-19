/**
 * Speech bubble style hint component
 * Appears after timer or wrong attempts
 */

'use client';

import React, { useState, useEffect } from 'react';

interface HintBubbleProps {
  hint: string;
  unlockDelay?: number; // ms (set to 0 to disable time-based unlock)
  unlockOnAttempt?: number; // unlock after N wrong attempts (0 = disabled)
  currentAttempts?: number; // current number of wrong attempts
  stageNumber?: number; // stage number for stage-specific styling
}

export function HintBubble({ 
  hint, 
  unlockDelay = 60000,
  unlockOnAttempt = 0,
  currentAttempts = 0,
  stageNumber = 1
}: HintBubbleProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Attempt-based unlock (if enabled)
    if (unlockOnAttempt > 0 && currentAttempts >= unlockOnAttempt) {
      setIsUnlocked(true);
      return;
    }

    // Time-based unlock (if enabled)
    if (unlockDelay > 0) {
      const timer = setTimeout(() => {
        setIsUnlocked(true);
      }, unlockDelay);

      return () => clearTimeout(timer);
    }
  }, [unlockDelay, unlockOnAttempt, currentAttempts]);

  if (!isUnlocked) {
    return null;
  }

  const isStage3 = stageNumber === 3;

  const bubbleStyle = isStage3 ? {
    background: 'rgba(255, 248, 220, 0.25)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '2px solid rgba(218, 165, 32, 0.5)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 215, 100, 0.2)',
    borderRadius: '16px',
  } : {};

  const textStyle = isStage3 ? {
    color: '#654321',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
  } : {};

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-4 py-2 bg-laurel hover:bg-laurel/80 text-parchment rounded-lg 
                   font-body text-sm transition-colors duration-200
                   border-2 border-parchment/50"
        aria-label="Toggle hint"
      >
        {isVisible ? '🗨️ Hide Hint' : '💡 Show Hint'}
      </button>

      {isVisible && (
        <div 
          className={`absolute top-full mt-4 left-0 w-full min-w-[320px] max-w-2xl p-6 rounded-lg shadow-2xl z-30 ${
            isStage3 ? '' : 'bg-parchment border-4 border-obsidian'
          }`}
          style={isStage3 ? bubbleStyle : {}}
        >
          {!isStage3 && (
            <>
              {/* Speech bubble tail */}
              <div 
                className="absolute -top-4 left-8 w-0 h-0 
                           border-l-[16px] border-l-transparent
                           border-r-[16px] border-r-transparent
                           border-b-[20px] border-b-obsidian"
              />
              <div 
                className="absolute -top-[10px] left-[34px] w-0 h-0 
                           border-l-[10px] border-l-transparent
                           border-r-[10px] border-r-transparent
                           border-b-[14px] border-b-parchment"
              />
            </>
          )}
          
          <p 
            className={`font-body text-sm italic leading-relaxed whitespace-normal break-words ${
              isStage3 ? '' : 'text-obsidian'
            }`}
            style={isStage3 ? textStyle : {}}
          >
            {hint}
          </p>
        </div>
      )}
    </div>
  );
}

