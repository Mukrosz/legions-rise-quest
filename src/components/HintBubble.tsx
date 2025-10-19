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
}

export function HintBubble({ 
  hint, 
  unlockDelay = 60000,
  unlockOnAttempt = 0,
  currentAttempts = 0
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
          className="absolute top-full mt-4 left-0 w-full min-w-[320px] max-w-2xl
                     bg-parchment border-4 border-obsidian p-6 rounded-lg
                     shadow-2xl z-30"
        >
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
          
          <p className="text-obsidian font-body text-sm italic leading-relaxed whitespace-normal break-words">
            {hint}
          </p>
        </div>
      )}
    </div>
  );
}

