'use client';

/*
  The scribe's ancient notes, encoded in the scholar's cipher:
  
  const scribenotes = "U2VlayB0aGUgRm91bmRlcnMgaW4gdGhlICNyb2xlcyBjaGFubmVsIG9mIERpc2NvcmQuIFJlYWQgb2YgUmVtdXMgYW5kIFJvbXVsdXMsIGFuZCBsZWFybiBvZiB0aGVpciBHbG9yaWE=";
  
  Decode this Base64 string to reveal the path to Gloria.
*/

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputCard } from '@/components/InputCard';
import { ProgressBar } from '@/components/ProgressBar';
import { useStageGuard } from '@/lib/guard';
import { hashWithPepper } from '@/lib/crypto';
import { setProgress, loadStageInput, saveStageInput } from '@/lib/progress';

export default function Stage3Page() {
  const router = useRouter();
  const { isChecking, isAllowed } = useStageGuard(3);
  const [savedInput] = useState(loadStageInput(3));

  const validateAnswer = async (input: string): Promise<boolean> => {
    const { v } = await import('@/validators/v3.js');
    const pepper = 'FORVM';
    const hash = await hashWithPepper(input, pepper);
    
    const isCorrect = v(hash);
    
    if (isCorrect) {
      setProgress(3);
      return true;
    }
    
    saveStageInput(3, input);
    return false;
  };

  const handleSuccess = () => {
    setTimeout(() => {
      router.push('/stage-4');
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
    router.push('/');
    return null;
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: 'url("/stage3-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <ProgressBar />

      <main className="min-h-[calc(100vh-120px)] flex items-center justify-center p-4">
        <div 
          className="w-full max-w-4xl"
          style={{
            background: 'rgba(255, 245, 220, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '2px solid rgba(218, 165, 32, 0.5)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 215, 100, 0.2)',
            padding: 'clamp(32px, 5vw, 64px)',
          }}
        >
          <h1 className="font-display text-center mb-8" 
              style={{
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 800,
                letterSpacing: '0.08em',
                lineHeight: 1.1,
                color: '#8B4513',
                textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(218,165,32,0.2)',
                filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.3))'
              }}>
            CITIZEN'S TRIAL
          </h1>

          <div className="mb-10 text-center">
            <h2 className="font-spectral text-xl md:text-2xl mb-6" 
                style={{ 
                  color: '#B8860B',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.4)'
                }}>
              Year Three. The Forum.
            </h2>
            <div className="font-spectral" 
                 style={{ 
                   color: '#5D4E37',
                   fontSize: 'clamp(15px, 1.1vw, 17px)',
                   lineHeight: 1.75,
                   fontWeight: 400,
                   textShadow: '0 1px 2px rgba(255,255,255,0.3)',
                   maxWidth: '700px',
                   margin: '0 auto',
                 }}>
              <p>
                Manumission granted. You are free - but not equal. The path to citizenship 
                winds through marble halls where the Founders' legacy echoes. An archivist 
                whispers: "To claim your place, you must know the Glory of Rome. Seek the 
                Founders' words where brothers gather. There lies the key."
              </p>
            </div>
          </div>

        <p className="font-spectral text-center italic mb-8" 
           style={{ 
             fontSize: 'clamp(15px, 1.1vw, 17px)',
             fontWeight: 600,
             color: '#8B4513',
             textShadow: '0 2px 4px rgba(255,255,255,0.5)'
           }}>
          Seek the ancient cipher where scribes left their marks
        </p>

        <p className="font-spectral text-center italic mb-10" 
           style={{ 
             fontSize: '14px',
             color: '#654321',
             opacity: 0.9,
             textShadow: '0 1px 2px rgba(255,255,255,0.3)'
           }}>
          Inspect the foundation's source. The scholar's cipher awaits in scribenotes.
        </p>

        <InputCard
          onSubmit={validateAnswer}
          placeholder="Enter the word of glory..."
          hint1="The Founders left their mark in sacred spaces. Seek where brothers gather, and the Gloria Aeterna reveals itself."
          hint2="Remus and Romulus, the twin Founders. Their legacy holds the key. Look to the roles where they are honored."
          stageNumber={3}
          savedInput={savedInput}
          onSuccess={handleSuccess}
          hint1UnlockDelay={0}
          hint2UnlockDelay={0}
          hint1UnlockAttempt={1}
          hint2UnlockAttempt={2}
        />

        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/')}
            className="font-spectral px-6 py-2 transition-all"
            style={{ 
              fontSize: 'clamp(13px, 1vw, 15px)',
              color: '#8B4513',
              opacity: 0.8,
              fontWeight: 500,
              letterSpacing: '0.03em',
              textShadow: '0 1px 2px rgba(255,255,255,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.color = '#654321';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.color = '#8B4513';
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
