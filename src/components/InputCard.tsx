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
}

export function InputCard({
  onSubmit,
  placeholder = 'Enter your answer...',
  hint1,
  hint2,
  stageNumber,
  savedInput = '',
  onSuccess,
}: InputCardProps) {
  const [input, setInput] = useState(savedInput);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
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
        setHasAttempted(true);
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

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input field */}
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full px-6 py-4 text-lg font-body
                     bg-parchment border-4 border-obsidian
                     focus:border-bronze focus:outline-none
                     transition-colors duration-200
                     text-obsidian placeholder-obsidian/40"
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
          className="w-full px-8 py-4 bg-bronze hover:bg-bronze/80
                   disabled:bg-obsidian/50 disabled:cursor-not-allowed
                   text-parchment font-display text-xl font-bold
                   border-4 border-obsidian
                   transition-all duration-200
                   transform hover:scale-[1.02] active:scale-[0.98]
                   shadow-lg"
          aria-label="Submit answer"
        >
          {isSubmitting ? 'VALIDATING...' : showSuccess ? 'SUCCESS!' : 'SUBMIT'}
        </button>
      </form>

      {/* Hints */}
      <div className="mt-8 space-y-4">
        <HintBubble hint={hint1} unlockDelay={60000} />
        <HintBubble 
          hint={hint2} 
          unlockDelay={120000}
          onWrongAttempt={hasAttempted}
        />
      </div>
    </div>
  );
}

