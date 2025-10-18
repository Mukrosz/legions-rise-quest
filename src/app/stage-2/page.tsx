/**
 * Stage II - Blood of the Arena
 * Steganography + Logic Riddle
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputCard } from '@/components/InputCard';
import { ProgressBar } from '@/components/ProgressBar';
import { useStageGuard } from '@/lib/guard';
import { hashWithPepper, derivePepper } from '@/lib/crypto';
import { setProgress, loadStageInput, saveStageInput } from '@/lib/progress';

export default function Stage2Page() {
  const router = useRouter();
  const { isChecking, isAllowed } = useStageGuard(2);
  const [savedInput] = useState(loadStageInput(2));

  const validateAnswer = async (input: string): Promise<boolean> => {
    const { v } = await import('@/validators/v2.js');
    const pepper = derivePepper(2);
    const hash = await hashWithPepper(input, pepper);
    
    const isCorrect = v(hash);
    
    if (isCorrect) {
      setProgress(2);
      return true;
    }
    
    saveStageInput(2, input);
    return false;
  };

  const handleSuccess = () => {
    setTimeout(() => {
      router.push('/stage-3');
    }, 1500);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-parchment font-display text-xl">Checking access...</p>
      </div>
    );
  }

  if (!isAllowed) {
    return null;
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: 'url("/stage2-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Progress Bar at Top */}
      <ProgressBar />

      {/* Main Content - Centered */}
      <main className="min-h-[calc(100vh-120px)] flex items-center justify-center p-4">
        {/* Glassmorphism Container */}
        <div
          className="w-full max-w-4xl"
          style={{
            background: 'rgba(255, 235, 205, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 200, 150, 0.25)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            padding: 'clamp(32px, 5vw, 64px)',
          }}
        >
          {/* Puzzle Title */}
          <h1 className="font-display text-center mb-8"
              style={{
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 800,
                letterSpacing: '0.08em',
                lineHeight: 1.1,
                color: '#d4a574',
                textShadow: '0 2px 4px rgba(0,0,0,0.4), 0 4px 8px rgba(212,165,116,0.3)',
                filter: 'drop-shadow(0 0 20px rgba(255,220,180,0.4))'
              }}>
            BLOOD OF THE ARENA
          </h1>

          {/* Story Section */}
          <div className="mb-10 text-center">
            <h2 className="font-spectral text-xl md:text-2xl mb-6"
                style={{
                  color: '#ffe5cc',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
              Year One. Ludus Magnus, Capua.
            </h2>
            <div className="font-spectral space-y-4"
                 style={{
                   color: '#f5d8b8',
                   fontSize: 'clamp(15px, 1.1vw, 17px)',
                   lineHeight: 1.7,
                   fontWeight: 400,
                   textShadow: '0 1px 3px rgba(0,0,0,0.6)'
                 }}>
              <p>
                You grip the rudis - a wooden sword, lighter than the blade you once bore.
                The lanista watches, calculating your worth in blood and coin.
              </p>
              <p>
                A grizzled veteran approaches, marking the sand with his toe. Three ranks,
                he mutters: Tiro, Veteranus, Rudiarius. "Know their order, know your future."
                The map he leaves holds more than training grounds.
              </p>
              <p className="font-spectral italic" style={{ fontWeight: 500, color: '#ffecd6', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                What the eye misses, the mind reveals. The arena's true name is your passage.
              </p>
            </div>
          </div>

        {/* Subtitle */}
        <p className="font-spectral text-center italic mb-8"
           style={{
             fontSize: 'clamp(16px, 1.3vw, 20px)',
             fontWeight: 500,
             color: '#e8c8a8',
             textShadow: '0 2px 4px rgba(0,0,0,0.5)'
           }}>
          "The arena speaks in hidden tongues"
        </p>

        {/* Arena Map */}
        <div
          className="mb-8 p-6"
          style={{
            background: 'rgba(255, 220, 180, 0.2)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 200, 150, 0.3)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          <p className="font-display text-center mb-6"
             style={{
               fontSize: 'clamp(18px, 2vw, 24px)',
               fontWeight: 700,
               color: '#d4a574',
               letterSpacing: '0.12em',
               textShadow: '0 1px 2px rgba(0,0,0,0.4)'
             }}>
            TRAINING GROUNDS MAP
          </p>

          {/* Visual puzzle: ranks in specific order spell hint */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
            <div className="p-4 text-center"
                 style={{
                   background: 'rgba(255, 235, 205, 0.3)',
                   borderRadius: '12px',
                   border: '2px solid rgba(212, 165, 116, 0.4)'
                 }}>
              <p className="font-display font-bold text-sm mb-1"
                 style={{ color: '#d4a574', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>North</p>
              <p className="font-spectral text-sm font-semibold"
                 style={{ color: '#f5d8b8' }}>TIRO</p>
              <p className="font-mono text-xs mt-2"
                 style={{ color: '#e8c8a8', opacity: 0.8 }}>G-L</p>
            </div>
            <div className="p-4 text-center"
                 style={{
                   background: 'rgba(255, 235, 205, 0.3)',
                   borderRadius: '12px',
                   border: '2px solid rgba(212, 165, 116, 0.4)'
                 }}>
              <p className="font-display font-bold text-sm mb-1"
                 style={{ color: '#d4a574', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Center</p>
              <p className="font-spectral text-sm font-semibold"
                 style={{ color: '#f5d8b8' }}>VETERANUS</p>
              <p className="font-mono text-xs mt-2"
                 style={{ color: '#e8c8a8', opacity: 0.8 }}>A-D</p>
            </div>
            <div className="p-4 text-center"
                 style={{
                   background: 'rgba(255, 235, 205, 0.3)',
                   borderRadius: '12px',
                   border: '2px solid rgba(212, 165, 116, 0.4)'
                 }}>
              <p className="font-display font-bold text-sm mb-1"
                 style={{ color: '#d4a574', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>South</p>
              <p className="font-spectral text-sm font-semibold"
                 style={{ color: '#f5d8b8' }}>RUDIARIUS</p>
              <p className="font-mono text-xs mt-2"
                 style={{ color: '#e8c8a8', opacity: 0.8 }}>I-U-S</p>
            </div>
          </div>

          <p className="font-spectral text-center italic text-sm"
             style={{
               color: '#f5d8b8',
               opacity: 0.9,
               textShadow: '0 1px 2px rgba(0,0,0,0.4)'
             }}>
            The veteran's wooden sword holds a name. Three ranks, three parts, one truth.
          </p>
        </div>

        {/* Instructions */}
        <p className="font-spectral text-center mb-8"
           style={{
             fontSize: 'clamp(14px, 1vw, 16px)',
             color: '#e8c8a8',
             lineHeight: 1.6,
             fontWeight: 400,
             textShadow: '0 1px 3px rgba(0,0,0,0.5)'
           }}>
          The three ranks spell a path. Their positions reveal letters. The weapon of freedom has a Latin name.
        </p>

        {/* Input Card */}
        <InputCard
          onSubmit={validateAnswer}
          placeholder="Enter the weapon's name..."
          hint1="The arena map holds secrets. Look beyond what eyes can see - pixels whisper."
          hint2="Three ranks converge. The wooden sword's true name is your passage."
          stageNumber={2}
          savedInput={savedInput}
          onSuccess={handleSuccess}
        />

        {/* Navigation */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/')}
            className="font-spectral px-6 py-2 transition-all"
            style={{
              fontSize: 'clamp(13px, 1vw, 15px)',
              color: '#e8c8a8',
              opacity: 0.8,
              fontWeight: 500,
              letterSpacing: '0.03em',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.color = '#ffecd6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.color = '#e8c8a8';
            }}
          >
            ← Return to Landing
          </button>
        </div>
      </div>
      </main>
    </div>
  );
}

