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

  const getStageStyle = () => {
    switch (stageNumber) {
      case 1:
        return {
          background: 'rgba(200, 220, 240, 0.7)',
          border: '2px solid rgba(212, 175, 55, 0.5)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 215, 100, 0.2)',
          textColor: '#1a1a2e',
          textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        };
      case 2:
        return {
          background: 'rgba(255, 230, 200, 0.7)',
          border: '2px solid rgba(212, 135, 76, 0.5)',
          boxShadow: '0 8px 32px rgba(139, 69, 19, 0.4), inset 0 1px 0 rgba(255, 200, 150, 0.2)',
          textColor: '#3a2a1e',
          textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        };
      case 3:
        return {
          background: 'rgba(255, 248, 220, 0.7)',
          border: '2px solid rgba(218, 165, 32, 0.5)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 215, 100, 0.2)',
          textColor: '#654321',
          textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        };
      default:
        return {
          background: 'rgba(245, 237, 218, 0.7)',
          border: '2px solid rgba(110, 14, 30, 0.5)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 215, 100, 0.2)',
          textColor: '#121212',
          textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        };
    }
  };

  const stageStyle = getStageStyle();

  const bubbleStyle = {
    background: stageStyle.background,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: stageStyle.border,
    boxShadow: stageStyle.boxShadow,
    borderRadius: '16px',
  };

  const textStyle = {
    color: stageStyle.textColor,
    textShadow: stageStyle.textShadow,
  };

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
          className="absolute top-full mt-4 left-0 w-full min-w-[320px] max-w-2xl p-6 shadow-2xl z-30"
          style={bubbleStyle}
        >
          <p 
            className="font-body text-sm italic leading-relaxed whitespace-normal break-words"
            style={textStyle}
          >
            {hint}
          </p>
        </div>
      )}
    </div>
  );
}

