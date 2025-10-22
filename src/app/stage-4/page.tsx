'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputCard } from '@/components/InputCard';
import { ProgressBar } from '@/components/ProgressBar';
import { useStageGuard } from '@/lib/guard';
import { hashWithPepper, derivePepper } from '@/lib/crypto';
import { setProgress, loadStageInput, saveStageInput } from '@/lib/progress';

export default function Stage4Page() {
  const router = useRouter();
  const { isChecking, isAllowed } = useStageGuard(4);
  const [savedInput] = useState(loadStageInput(4));
  const [showGrid, setShowGrid] = useState(false);

  const validateAnswer = async (input: string): Promise<boolean> => {
    const { v } = await import('@/validators/v4.js');
    
    const pepper = derivePepper(4);
    const hash = await hashWithPepper(input, pepper);
    
    const isCorrect = v(hash);
    
    if (isCorrect) {
      setProgress(4);
      return true;
    }
    
    saveStageInput(4, input);
    return false;
  };

  const handleSuccess = () => {
    setTimeout(() => {
      router.push('/stage-5');
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

  const polybiusGrid = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I/J', 'K'],
    ['L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z'],
  ];

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: 'url("/stage4-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <ProgressBar />

      <main className="min-h-[calc(100vh-120px)] flex items-center justify-center p-4">
        <div
          className="w-full max-w-5xl"
          style={{
            background: 'linear-gradient(135deg, rgba(46, 111, 64, 0.12), rgba(60, 130, 76, 0.15), rgba(34, 90, 55, 0.12))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '2px solid rgba(76, 175, 80, 0.35)',
            boxShadow: '0 8px 32px rgba(34, 90, 55, 0.4), inset 0 1px 0 rgba(139, 195, 74, 0.2)',
            padding: 'clamp(32px, 5vw, 64px)',
          }}
        >
          <h1 className="font-display text-center mb-6"
              style={{
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 900,
                letterSpacing: '0.12em',
                lineHeight: 1.05,
                color: '#2e7d32',
                textShadow: '0 3px 6px rgba(0,0,0,0.6), 0 6px 12px rgba(34,90,55,0.4), 0 0 30px rgba(76,175,80,0.3)',
                filter: 'drop-shadow(0 0 24px rgba(139,195,74,0.5))',
              }}>
            WEB OF INFLUENCE
          </h1>

          <div className="mb-10 text-center">
            <h2 className="font-spectral text-xl md:text-2xl mb-6"
                style={{
                  color: '#c5e1a5',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  letterSpacing: '0.03em',
                  textShadow: '0 2px 6px rgba(0,0,0,0.7)',
                }}>
              Year Five. The Senate's Threshold. Where honor is the true currency.
            </h2>
            <div className="font-spectral space-y-4"
                 style={{
                   color: '#dcedc8',
                   fontSize: 'clamp(15px, 1.1vw, 17px)',
                   lineHeight: 1.75,
                   fontWeight: 400,
                   textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                   maxWidth: '700px',
                   margin: '0 auto',
                 }}>
              <p>
                Citizenship secured, Kaeso stands before the Senate's great doors. Yet entry demands more 
                than legal status - it requires demonstrating the virtue that built Rome itself.
              </p>
              <p>
                A senior senator presents a test: a tablet bearing Roman numerals in mysterious pairs. 
                These numbers reference an ancient Greek grid used by scholars and spies alike. Decode 
                the pairs to reveal letters, then apply a second cipher using Rome's founding motto as key.
              </p>
              <p className="font-spectral italic mt-4" style={{ fontWeight: 600, color: '#f1f8e9', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                Master the double cipher. Speak the word of honor. Prove yourself worthy of the Senate.
              </p>
            </div>
          </div>

          <div className="mb-10"
               style={{
                 background: 'rgba(46, 111, 64, 0.2)',
                 backdropFilter: 'blur(12px)',
                 WebkitBackdropFilter: 'blur(12px)',
                 border: '2px solid rgba(76, 175, 80, 0.4)',
                 borderRadius: '16px',
                 padding: 'clamp(24px, 4vw, 40px)',
                 boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)',
               }}>
            <p className="font-display text-center mb-6"
               style={{
                 fontSize: 'clamp(18px, 2vw, 24px)',
                 fontWeight: 700,
                 letterSpacing: '0.08em',
                 color: '#c5e1a5',
                 textShadow: '0 2px 4px rgba(0,0,0,0.7)',
               }}>
              THE SENATOR'S TABLET
            </p>

            <div className="grid grid-cols-5 gap-3 max-w-2xl mx-auto mb-6">
              <div style={{
                background: 'rgba(76, 175, 80, 0.3)',
                padding: '16px',
                textAlign: 'center',
                fontWeight: 700,
                color: '#f1f8e9',
                borderRadius: '8px',
                border: '2px solid rgba(139, 195, 74, 0.5)',
              }}>
                <div style={{ fontSize: 'clamp(16px, 1.5vw, 20px)' }}>IV, I</div>
              </div>
              <div style={{
                background: 'rgba(46, 111, 64, 0.3)',
                padding: '16px',
                textAlign: 'center',
                fontWeight: 700,
                color: '#f1f8e9',
                borderRadius: '8px',
                border: '2px solid rgba(139, 195, 74, 0.5)',
              }}>
                <div style={{ fontSize: 'clamp(16px, 1.5vw, 20px)' }}>I, I</div>
              </div>
              <div style={{
                background: 'rgba(76, 175, 80, 0.3)',
                padding: '16px',
                textAlign: 'center',
                fontWeight: 700,
                color: '#f1f8e9',
                borderRadius: '8px',
                border: '2px solid rgba(139, 195, 74, 0.5)',
              }}>
                <div style={{ fontSize: 'clamp(16px, 1.5vw, 20px)' }}>I, II</div>
              </div>
              <div style={{
                background: 'rgba(46, 111, 64, 0.3)',
                padding: '16px',
                textAlign: 'center',
                fontWeight: 700,
                color: '#f1f8e9',
                borderRadius: '8px',
                border: '2px solid rgba(139, 195, 74, 0.5)',
              }}>
                <div style={{ fontSize: 'clamp(16px, 1.5vw, 20px)' }}>III, IV</div>
              </div>
              <div style={{
                background: 'rgba(76, 175, 80, 0.3)',
                padding: '16px',
                textAlign: 'center',
                fontWeight: 700,
                color: '#f1f8e9',
                borderRadius: '8px',
                border: '2px solid rgba(139, 195, 74, 0.5)',
              }}>
                <div style={{ fontSize: 'clamp(16px, 1.5vw, 20px)' }}>I, II</div>
              </div>
            </div>

            <p className="font-spectral text-sm text-center mb-4"
               style={{ color: '#dcedc8', opacity: 0.9 }}>
              These Roman numeral pairs reference rows and columns in the Polybius grid below.
            </p>

            <button
              onClick={() => setShowGrid(!showGrid)}
              className="mx-auto block px-6 py-3 transition-all font-spectral"
              style={{
                background: 'rgba(76, 175, 80, 0.4)',
                color: '#f1f8e9',
                borderRadius: '12px',
                border: '2px solid rgba(139, 195, 74, 0.5)',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(76, 175, 80, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(76, 175, 80, 0.4)';
              }}
            >
              {showGrid ? '🔒 Hide' : '🔓 Show'} Polybius Grid
            </button>

            {showGrid && (
              <div className="mt-6 overflow-x-auto"
                   style={{
                     border: '2px solid rgba(76, 175, 80, 0.5)',
                     borderRadius: '12px',
                     padding: '16px',
                     background: 'rgba(46, 111, 64, 0.1)',
                   }}>
                <table className="mx-auto"
                       style={{
                         border: '2px solid rgba(76, 175, 80, 0.5)',
                         borderRadius: '8px',
                         overflow: 'hidden',
                       }}>
                  <thead>
                    <tr>
                      <th style={{
                        padding: '12px',
                        border: '1px solid rgba(76, 175, 80, 0.3)',
                        background: 'rgba(46, 111, 64, 0.3)',
                        color: '#f1f8e9',
                      }}></th>
                      {romanNumerals.map(numeral => (
                        <th key={numeral} style={{
                          padding: '12px',
                          border: '1px solid rgba(76, 175, 80, 0.3)',
                          background: 'rgba(46, 111, 64, 0.3)',
                          color: '#c5e1a5',
                          fontWeight: 700,
                        }}>
                          {numeral}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {polybiusGrid.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <th style={{
                          padding: '12px',
                          border: '1px solid rgba(76, 175, 80, 0.3)',
                          background: 'rgba(46, 111, 64, 0.3)',
                          color: '#c5e1a5',
                          fontWeight: 700,
                        }}>
                          {romanNumerals[rowIndex]}
                        </th>
                        {row.map((letter, colIndex) => (
                          <td key={colIndex} style={{
                            padding: '12px',
                            border: '1px solid rgba(76, 175, 80, 0.3)',
                            textAlign: 'center',
                            background: 'rgba(139, 195, 74, 0.2)',
                            color: '#f1f8e9',
                            fontWeight: 600,
                          }}>
                            {letter}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="font-spectral text-xs text-center mt-3"
                   style={{ color: '#dcedc8', opacity: 0.8 }}>
                  Note: I and J share position (II, IV)
                </p>
              </div>
            )}
          </div>

          <div className="mb-10"
               style={{
                 background: 'rgba(46, 111, 64, 0.15)',
                 backdropFilter: 'blur(12px)',
                 WebkitBackdropFilter: 'blur(12px)',
                 border: '2px solid rgba(76, 175, 80, 0.3)',
                 borderRadius: '16px',
                 padding: 'clamp(20px, 3vw, 32px)',
               }}>
            <p className="font-spectral text-sm mb-3"
               style={{ color: '#dcedc8', lineHeight: 1.7 }}>
              <strong style={{ color: '#c5e1a5' }}>Step 1:</strong> Decode the Roman numeral pairs using the Polybius grid to get an intermediate word.
            </p>
            <p className="font-spectral text-sm"
               style={{ color: '#dcedc8', lineHeight: 1.7 }}>
              <strong style={{ color: '#c5e1a5' }}>Step 2:</strong> Apply Vigenère cipher to that word using the keyword <strong style={{ color: '#f1f8e9' }}>"ROMA"</strong>.
            </p>
          </div>

          <p className="font-spectral text-center italic text-sm mb-10"
             style={{
               color: '#dcedc8',
               opacity: 0.9,
               textShadow: '0 1px 3px rgba(0,0,0,0.6)',
             }}>
            Two ciphers guard the path. Master both to prove your worth.
          </p>

          <InputCard
            onSubmit={validateAnswer}
            placeholder="Enter the word of honor..."
            stageNumber={4}
            savedInput={savedInput}
            onSuccess={handleSuccess}
          />

          <div className="text-center mt-8">
            <button
              onClick={() => router.push('/')}
              className="font-spectral px-6 py-2 transition-all"
              style={{
                fontSize: 'clamp(13px, 1vw, 15px)',
                color: '#c5e1a5',
                opacity: 0.85,
                fontWeight: 600,
                letterSpacing: '0.03em',
                textShadow: '0 2px 4px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = '#f1f8e9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.85';
                e.currentTarget.style.color = '#c5e1a5';
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

