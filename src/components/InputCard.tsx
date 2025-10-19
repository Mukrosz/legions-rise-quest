/**
 * Puzzle input card with validation and hints
 * Central component for all stage puzzles
 */

'use client';

import React, { useState, useEffect } from 'react';
import { HintBubble } from './HintBubble';

interface InputCardProps {
  onSubmit: (input: string) => Promise<boolean>;
  placeholder?: string;
  hint1: string;
  hint2: string;
  stageNumber: number;
  savedInput?: string;
  onSuccess?: () => void;
  hint1UnlockDelay?: number;
  hint2UnlockDelay?: number;
  hint1UnlockAttempt?: number;
  hint2UnlockAttempt?: number;
  maxWidth?: string;
}

export function InputCard({
  onSubmit,
  placeholder = 'Enter your answer...',
  hint1,
  hint2,
  stageNumber,
  savedInput = '',
  onSuccess,
  hint1UnlockDelay = 60000,
  hint2UnlockDelay = 120000,
  hint1UnlockAttempt = 0,
  hint2UnlockAttempt = 0,
  maxWidth,
}: InputCardProps) {
  const [input, setInput] = useState(savedInput);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      const isCorrect = await onSubmit(input);
      
      if (isCorrect) {
        setShowSuccess(true);
        setTimeout(() => {
          onSuccess?.();
        }, 1500);
      } else {
        setShowError(true);
        setWrongAttempts(prev => prev + 1);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStage1 = stageNumber === 1;
  const isStage3 = stageNumber === 3;
  const hasCustomStyling = isStage1 || isStage3;

  const getInputStyle = () => {
    if (isStage1) {
      return {
        width: '100%',
        padding: '16px 24px',
        fontSize: '18px',
        background: 'rgba(200, 220, 240, 0.2)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: '#1a1a2e',
        border: '2px solid rgba(212, 175, 55, 0.4)',
        borderRadius: '12px',
        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        letterSpacing: '0.05em',
      };
    }
    if (isStage3) {
      return {
        width: '100%',
        padding: '16px 24px',
        fontSize: '18px',
        background: 'rgba(255, 248, 220, 0.3)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: '#3E2723',
        border: '2px solid rgba(218, 165, 32, 0.5)',
        borderRadius: '12px',
        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        letterSpacing: '0.05em',
      };
    }
    return {};
  };

  return (
    <div className="w-full flex flex-col items-center mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 w-full" style={{ maxWidth: maxWidth || '100%' }}>
        {/* Input field */}
        <div className="relative mb-12">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            style={getInputStyle()}
            className={hasCustomStyling ? '' : "w-full px-6 py-4 text-lg font-body bg-parchment border-4 border-obsidian focus:border-bronze focus:outline-none transition-colors duration-200 text-obsidian placeholder-obsidian/40"}
            aria-label="Puzzle answer input"
            disabled={isSubmitting || showSuccess}
          />
          
          {/* Status indicators */}
          {showError && (
            <div className="absolute -bottom-8 left-0 right-0 text-center">
              <span className="text-burgundy font-body text-sm font-bold">
                ❌ Incorrect. Try again.
              </span>
            </div>
          )}
          
          {showSuccess && (
            <div className="absolute -bottom-8 left-0 right-0 text-center">
              <span className="text-laurel font-body text-sm font-bold animate-pulse">
                ✓ Correct! Advancing...
              </span>
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || showSuccess || !input.trim()}
          className="w-full font-display relative overflow-hidden transition-all duration-300 uppercase"
          style={{ 
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            fontWeight: 700,
            letterSpacing: '0.16em',
            padding: 'clamp(12px, 1.5vw, 16px) clamp(20px, 2.5vw, 30px)',
            borderRadius: '10px',
            background: '#8a2f2b',
            color: '#fff',
            border: '2px solid #6c2421',
            boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
            cursor: isSubmitting || showSuccess || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: isSubmitting || showSuccess || !input.trim() ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting && !showSuccess && input.trim()) {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.35)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
          }}
          aria-label="Submit answer"
        >
          {isSubmitting ? 'VALIDATING...' : showSuccess ? 'SUCCESS!' : 'SUBMIT'}
        </button>
      </form>

      {/* Hints */}
      <div className="mt-8 space-y-4">
        <HintBubble 
          hint={hint1} 
          unlockDelay={hint1UnlockDelay}
          unlockOnAttempt={hint1UnlockAttempt}
          currentAttempts={wrongAttempts}
        />
        <HintBubble 
          hint={hint2} 
          unlockDelay={hint2UnlockDelay}
          unlockOnAttempt={hint2UnlockAttempt}
          currentAttempts={wrongAttempts}
        />
      </div>
    </div>
  );
}

