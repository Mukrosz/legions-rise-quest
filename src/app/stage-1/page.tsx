/**
 * Stage I - Chains of the Captive
 * Caesar Cipher Puzzle
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputCard } from '@/components/InputCard';
import { ProgressBar } from '@/components/ProgressBar';
import { hashWithPepper, derivePepper } from '@/lib/crypto';
import { setProgress, loadStageInput, saveStageInput } from '@/lib/progress';

export default function Stage1Page() {
  const router = useRouter();
  const [savedInput] = useState(loadStageInput(1));

  const validateAnswer = async (input: string): Promise<boolean> => {
    // Import validator dynamically
    const { v } = await import('@/validators/v1.js');
    
    // Hash user input with pepper
    const pepper = derivePepper(1);
    const hash = await hashWithPepper(input, pepper);
    
    // Validate
    const isCorrect = v(hash);
    
    if (isCorrect) {
      setProgress(1);
      return true;
    }
    
    // Save attempt
    saveStageInput(1, input);
    return false;
  };

  const handleSuccess = () => {
    setTimeout(() => {
      router.push('/stage-2');
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: 'url("/stage1-bg.png")',
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
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            padding: 'clamp(32px, 5vw, 64px)',
          }}
        >
          {/* Puzzle Title - MOVED TO TOP */}
          <h1 className="font-display text-center mb-8" 
              style={{
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 800,
                letterSpacing: '0.08em',
                lineHeight: 1.1,
                color: '#1a1a2e',
                textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,119,182,0.2)',
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'
              }}>
            CHAINS OF THE CAPTIVE
          </h1>

          {/* Story Section */}
          <div className="mb-10 text-center">
            <h2 className="font-spectral text-xl md:text-2xl mb-6" 
                style={{ 
                  color: '#e8f4f8',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.4)'
                }}>
              Day Seven. The Caravan.
            </h2>
            <div className="font-spectral space-y-4" 
                 style={{ 
                   color: '#d4e8f0',
                   fontSize: 'clamp(15px, 1.1vw, 17px)',
                   lineHeight: 1.7,
                   fontWeight: 400,
                   textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                 }}>
              <p>
                You march in chains through dust and heat. Behind you, Dardania burns. 
                Ahead-Rome's markets, where men become property. Yet not all is lost.
              </p>
              <p>
                A fellow captive, once a scribe, whispers in the night. He scratches 
                symbols on wax-an old cipher of Caesar's legions. "Remember this," he says. 
                "Knowledge is the first key to freedom."
              </p>
              <p className="font-spectral italic" style={{ fontWeight: 500, color: '#f0f8ff', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                The message is shifted. The truth awaits the wise.
              </p>
            </div>
          </div>

        {/* Subtitle */}
        <p className="font-spectral text-center italic mb-8" 
           style={{ 
             fontSize: 'clamp(16px, 1.3vw, 20px)',
             fontWeight: 500,
             color: '#b8d4e6',
             textShadow: '0 2px 4px rgba(0,0,0,0.4)'
           }}>
          "Decode the scribe's whisper"
        </p>

        {/* Cipher Message */}
        <div 
          className="mb-8 p-6 text-center"
          style={{
            background: 'rgba(255, 255, 255, 0.25)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          <p className="font-mono tracking-widest" 
             style={{ 
               fontSize: 'clamp(20px, 2vw, 28px)',
               fontWeight: 600,
               color: '#1a1a2e',
               letterSpacing: '0.2em',
               textShadow: '0 1px 2px rgba(255,255,255,0.5)'
             }}>
            OLEHUWDV
          </p>
        </div>

        {/* Instructions */}
        <p className="font-spectral text-center mb-8" 
           style={{ 
             fontSize: 'clamp(14px, 1vw, 16px)',
             color: '#c8e0f0',
             lineHeight: 1.6,
             fontWeight: 400,
             textShadow: '0 1px 3px rgba(0,0,0,0.4)'
           }}>
          The scribe used Caesar's method. Each letter shifted by a fixed count. 
          What word brings freedom?
        </p>

        {/* Input Card - Contains built-in hints */}
        <InputCard
          onSubmit={validateAnswer}
          placeholder="Enter the decoded word..."
          hint1="A whisper carries through the caravan-shift your view by Roman count."
          hint2="Caesar himself taught this cipher. The shift is modest, the message eternal."
          stageNumber={1}
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
              color: '#b8d4e6',
              opacity: 0.8,
              fontWeight: 500,
              letterSpacing: '0.03em',
              textShadow: '0 1px 2px rgba(0,0,0,0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.color = '#e8f4f8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.color = '#b8d4e6';
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

