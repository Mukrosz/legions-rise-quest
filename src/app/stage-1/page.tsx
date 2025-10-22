/**
 * Stage I - Chains of the Captive
 * Caesar Cipher Puzzle
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputCard } from '@/components/InputCard';
import { ProgressBar } from '@/components/ProgressBar';
import { slowHash } from '@/lib/crypto';
import { setProgress, loadStageInput, saveStageInput } from '@/lib/progress';

export default function Stage1Page() {
  const router = useRouter();
  const [savedInput] = useState(loadStageInput(1));

  const validateAnswer = async (input: string): Promise<boolean> => {
    const { v } = await import('@/validators/v1.js');
    
    const hash = await slowHash(input);
    const isCorrect = v(hash);
    
    if (isCorrect) {
      setProgress(1);
      return true;
    }
    
    saveStageInput(1, input);
    return false;
  };

  const handleSuccess = () => {
    setTimeout(() => {
      router.push('/stage-2');
    }, 1500);
  };

  return (
    <>
      <style jsx global>{`
        ::-webkit-scrollbar-thumb {
          background: #0077B6 !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #005F8D !important;
        }
      `}</style>
      <div 
        className="min-h-screen"
        style={{
          backgroundImage: 'url("/stage1-bg.webp")',
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
            border: '2px solid rgba(212, 175, 55, 0.5)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 215, 100, 0.2)',
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
            <div className="font-spectral" 
                 style={{ 
                   color: '#d4e8f0',
                   fontSize: 'clamp(15px, 1.1vw, 17px)',
                   lineHeight: 1.75,
                   fontWeight: 400,
                   textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                   maxWidth: '700px',
                   margin: '0 auto',
                 }}>
              <p>
                You march in chains through dust and heat. Behind you, Dardania burns. 
                Ahead - Rome's markets, where men become property. Yet not all is lost. 
                A fellow captive, once a scribe, whispers in the night. He scratches 
                symbols on wax - an old cipher of Caesar's legions. "Remember this," he says. 
                "Knowledge is the first key to freedom." The message is shifted. The truth awaits the wise.
              </p>
            </div>
          </div>

        {/* Subtitle */}
        <p className="font-spectral text-center italic mb-8" 
           style={{ 
             fontSize: 'clamp(15px, 1.1vw, 17px)',
             fontWeight: 600,
             color: '#e8f4f8',
             textShadow: '0 2px 4px rgba(0,0,0,0.8)'
           }}>
          Decode the scribe's whisper
        </p>

        {/* Cipher Message */}
        <div className="mb-8 flex justify-center">
          <div 
            className="p-6 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '16px',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)',
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
        </div>

        {/* Instructions */}
        <p className="font-spectral text-center italic mb-10" 
           style={{ 
             fontSize: '14px',
             color: '#c8e0f0',
             opacity: 0.9,
             textShadow: '0 1px 3px rgba(0,0,0,0.6)'
           }}>
          The cipher holds a single word. Decipher it, and the path opens.
        </p>

        {/* Input Card - Contains built-in hints */}
        <InputCard
          onSubmit={validateAnswer}
          placeholder="Enter the decoded word..."
          hint1="A whisper carries through the caravan - shift your view by Roman count."
          hint2="Caesar himself taught this cipher. The shift is modest, the message eternal."
          stageNumber={1}
          savedInput={savedInput}
          onSuccess={handleSuccess}
          hint1UnlockDelay={0}
          hint2UnlockDelay={0}
          hint1UnlockAttempt={1}
          hint2UnlockAttempt={2}
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
    </>
  );
}

