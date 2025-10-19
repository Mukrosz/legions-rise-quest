/**
 * Stage V - Vox Senatus (Voice of the Senate)
 * Interactive mosaic labyrinth puzzle - trace the lawful path
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/ProgressBar';
import { useStageGuard } from '@/lib/guard';
import { setProgress } from '@/lib/progress';

// Configurables
const BACKGROUND_PNG_PATH = '/stage5-bg.png';
const EXPECTED_PATH = [1, 2, 3, 5, 7, 10, 13, 17, 21, 26];
const ANSWER_WORD = 'IMPERIUM';

const COPY = {
  intro: 'Within the Legatus\' chamber, beneath standards blessed by Remus and Romulus, Kaeso kneels. Power is granted in Rome by law and lineage. Prove you can wield it.',
  legatus: 'By mandate of the Founders, I set your final trial. Find the single lawful path; Rome crowns those who master order.',
  objective: 'Traverse from Porta to Apex on the mosaic. Let order guide your march; the stones will speak the word of dominion.',
  wrongNode: 'Ambitio te fallit.',
  regression: 'Where order falters, Rome withholds.',
  resetCTA: 'Reform the March',
  successBanner: 'IMPERIUM CONFIRMED',
  successSubtext: 'Law crowns strength.',
};

const HINTS = [
  'Order, not speed. Read the numerals as a magistrate would.',
  'True steps do not squander rank; their measure holds, then rises.',
  'A just march reveals letters only at journey\'s end.',
];

const NODES = [
  { id: 1, numeral: 'I', x: 10, y: 90, isPorta: true },
  { id: 2, numeral: 'II', x: 20, y: 80 },
  { id: 3, numeral: 'III', x: 30, y: 75 },
  { id: 4, numeral: 'II', x: 25, y: 70 },
  { id: 5, numeral: 'V', x: 40, y: 70 },
  { id: 6, numeral: 'IV', x: 35, y: 65 },
  { id: 7, numeral: 'VII', x: 50, y: 65 },
  { id: 8, numeral: 'VI', x: 45, y: 60 },
  { id: 9, numeral: 'VIII', x: 55, y: 58 },
  { id: 10, numeral: 'X', x: 60, y: 55 },
  { id: 11, numeral: 'IX', x: 58, y: 50 },
  { id: 12, numeral: 'XI', x: 65, y: 48 },
  { id: 13, numeral: 'XIII', x: 70, y: 45 },
  { id: 14, numeral: 'XII', x: 68, y: 40 },
  { id: 15, numeral: 'XV', x: 75, y: 38 },
  { id: 16, numeral: 'XIV', x: 72, y: 35 },
  { id: 17, numeral: 'XVII', x: 78, y: 30 },
  { id: 18, numeral: 'XVI', x: 76, y: 25 },
  { id: 19, numeral: 'XIX', x: 82, y: 23 },
  { id: 20, numeral: 'XVIII', x: 80, y: 20 },
  { id: 21, numeral: 'XXI', x: 85, y: 15 },
  { id: 22, numeral: 'XX', x: 83, y: 12 },
  { id: 23, numeral: 'XXIII', x: 88, y: 10 },
  { id: 24, numeral: 'XXII', x: 86, y: 8 },
  { id: 25, numeral: 'XXV', x: 90, y: 5 },
  { id: 26, numeral: 'XXVI', x: 50, y: 50, isApex: true },
];

export default function Stage5Page() {
  const router = useRouter();
  const { isChecking, isAllowed } = useStageGuard(5);
  const [clickedPath, setClickedPath] = useState<number[]>([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [revealedWord, setRevealedWord] = useState('');
  const [showHintModal, setShowHintModal] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [rapidClickCount, setRapidClickCount] = useState(0);

  const handleNodeClick = (nodeId: number) => {
    const now = Date.now();
    
    if (now - lastClickTime < 200) {
      setRapidClickCount(prev => prev + 1);
      if (rapidClickCount >= 5) {
        setErrorMessage(COPY.regression);
        setShowError(true);
        handleReset();
        setRapidClickCount(0);
        return;
      }
    } else {
      setRapidClickCount(0);
    }
    
    setLastClickTime(now);
    setHasAttempted(true);
    
    const newPath = [...clickedPath, nodeId];
    setClickedPath(newPath);
    
    const expectedSoFar = EXPECTED_PATH.slice(0, newPath.length);
    
    if (JSON.stringify(newPath) !== JSON.stringify(expectedSoFar)) {
      setErrorMessage(COPY.wrongNode);
      setShowError(true);
      setTimeout(() => {
        handleReset();
      }, 1500);
      return;
    }
    
    if (newPath.length === EXPECTED_PATH.length) {
      const letters = ANSWER_WORD.split('');
      setRevealedWord(letters.join(' '));
      setShowSuccess(true);
      setProgress(5);
    }
  };

  const handleReset = () => {
    setClickedPath([]);
    setShowError(false);
    setErrorMessage('');
    setShowSuccess(false);
    setRevealedWord('');
  };

  const handleProceed = () => {
    router.push('/victory');
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
    <>
      <style jsx global>{`
        ::-webkit-scrollbar-thumb {
          background: #8B4513 !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #654321 !important;
        }
      `}</style>
      <div
        className="min-h-screen"
        style={{
          backgroundImage: `url("${BACKGROUND_PNG_PATH}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <ProgressBar />

        <main className="min-h-[calc(100vh-120px)] flex items-center justify-center p-4">
          <div
            className="w-full max-w-6xl"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.12), rgba(160, 82, 45, 0.15), rgba(101, 67, 33, 0.12))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '2px solid rgba(139, 69, 19, 0.35)',
              boxShadow: '0 8px 32px rgba(101, 67, 33, 0.4), inset 0 1px 0 rgba(210, 180, 140, 0.2)',
              padding: 'clamp(32px, 5vw, 64px)',
            }}
          >
            <h1 className="font-display text-center mb-6"
                style={{
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  lineHeight: 1.05,
                  color: '#D2691E',
                  textShadow: '0 3px 6px rgba(0,0,0,0.6), 0 6px 12px rgba(139,69,19,0.4), 0 0 30px rgba(210,105,30,0.3)',
                  filter: 'drop-shadow(0 0 24px rgba(210,180,140,0.5))',
                }}>
              VOX SENATUS
            </h1>

            <div className="mb-8 text-center">
              <p className="font-spectral mb-4"
                 style={{
                   color: '#DEB887',
                   fontSize: 'clamp(14px, 1vw, 16px)',
                   lineHeight: 1.7,
                   fontWeight: 400,
                   textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                   maxWidth: '800px',
                   margin: '0 auto 16px',
                 }}>
                {COPY.intro}
              </p>
              <p className="font-spectral italic mb-4"
                 style={{
                   color: '#F5DEB3',
                   fontSize: 'clamp(13px, 0.95vw, 15px)',
                   fontWeight: 600,
                   textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                 }}>
                "{COPY.legatus}"
              </p>
              <p className="font-spectral"
                 style={{
                   color: '#D2B48C',
                   fontSize: 'clamp(13px, 0.95vw, 15px)',
                   lineHeight: 1.6,
                   textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                   maxWidth: '700px',
                   margin: '0 auto',
                 }}>
                {COPY.objective}
              </p>
            </div>

            <div className="mb-8 flex justify-center items-center"
                 style={{
                   minHeight: '400px',
                   background: 'rgba(101, 67, 33, 0.2)',
                   borderRadius: '16px',
                   border: '2px solid rgba(139, 69, 19, 0.4)',
                   padding: '32px',
                 }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', maxWidth: '600px', height: 'auto' }}>
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {clickedPath.length > 1 && clickedPath.map((nodeId, idx) => {
                  if (idx === 0) return null;
                  const fromNode = NODES.find(n => n.id === clickedPath[idx - 1]);
                  const toNode = NODES.find(n => n.id === nodeId);
                  if (!fromNode || !toNode) return null;
                  return (
                    <line
                      key={`line-${idx}`}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      strokeOpacity="0.8"
                    />
                  );
                })}

                {NODES.map((node) => {
                  const isClicked = clickedPath.includes(node.id);
                  const isPorta = node.isPorta;
                  const isApex = node.isApex;
                  
                  return (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isPorta || isApex ? 3 : 2}
                        fill={isClicked ? '#D4AF37' : isPorta ? '#4CAF50' : isApex ? '#8B4513' : '#8B7355'}
                        stroke={isPorta || isApex ? '#FFD700' : '#654321'}
                        strokeWidth="0.3"
                        onClick={() => !showSuccess && handleNodeClick(node.id)}
                        style={{ cursor: showSuccess ? 'default' : 'pointer' }}
                        filter={isPorta || isApex ? 'url(#glow)' : undefined}
                      />
                      <text
                        x={node.x}
                        y={node.y - 3}
                        textAnchor="middle"
                        fill="#F5DEB3"
                        fontSize="2.5"
                        fontWeight="600"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {isPorta ? 'Porta' : isApex ? 'Apex' : node.numeral}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {showError && (
              <div className="mb-6 text-center">
                <p className="font-spectral text-lg"
                   style={{
                     color: '#FF6B6B',
                     fontWeight: 600,
                     textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                   }}>
                  {errorMessage}
                </p>
              </div>
            )}

            {showSuccess && (
              <div className="mb-8 text-center"
                   style={{
                     background: 'rgba(212, 175, 55, 0.2)',
                     borderRadius: '16px',
                     border: '2px solid rgba(212, 175, 55, 0.5)',
                     padding: '32px',
                   }}>
                <p className="font-display mb-4"
                   style={{
                     fontSize: 'clamp(24px, 3vw, 36px)',
                     fontWeight: 900,
                     letterSpacing: '0.12em',
                     color: '#D4AF37',
                     textShadow: '0 3px 6px rgba(0,0,0,0.8)',
                   }}>
                  {COPY.successBanner}
                </p>
                <p className="font-spectral mb-6"
                   style={{
                     fontSize: 'clamp(14px, 1.2vw, 18px)',
                     color: '#F5DEB3',
                     fontStyle: 'italic',
                     textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                   }}>
                  "{COPY.successSubtext}"
                </p>
                <p className="font-display mb-8"
                   style={{
                     fontSize: 'clamp(32px, 4vw, 48px)',
                     fontWeight: 900,
                     letterSpacing: '0.3em',
                     color: '#FFD700',
                     textShadow: '0 4px 8px rgba(0,0,0,0.9)',
                   }}>
                  {revealedWord}
                </p>
                <button
                  onClick={handleProceed}
                  className="font-display px-8 py-3 transition-all"
                  style={{
                    fontSize: 'clamp(14px, 1.2vw, 16px)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    background: '#8B4513',
                    color: '#F5DEB3',
                    border: '2px solid #654321',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#A0522D';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#8B4513';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
                  }}
                >
                  Proceed to Coronation
                </button>
              </div>
            )}

            {!showSuccess && (
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={handleReset}
                  disabled={clickedPath.length === 0}
                  className="font-spectral px-6 py-2 transition-all"
                  style={{
                    fontSize: 'clamp(13px, 1vw, 15px)',
                    fontWeight: 600,
                    background: clickedPath.length === 0 ? 'rgba(101, 67, 33, 0.3)' : 'rgba(139, 69, 19, 0.4)',
                    color: clickedPath.length === 0 ? '#8B7355' : '#F5DEB3',
                    border: '2px solid rgba(139, 69, 19, 0.5)',
                    borderRadius: '12px',
                    cursor: clickedPath.length === 0 ? 'not-allowed' : 'pointer',
                    opacity: clickedPath.length === 0 ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (clickedPath.length > 0) {
                      e.currentTarget.style.background = 'rgba(139, 69, 19, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (clickedPath.length > 0) {
                      e.currentTarget.style.background = 'rgba(139, 69, 19, 0.4)';
                    }
                  }}
                >
                  {COPY.resetCTA}
                </button>
                
                <button
                  onClick={() => setShowHintModal(true)}
                  disabled={!hasAttempted}
                  className="font-spectral px-6 py-2 transition-all"
                  style={{
                    fontSize: 'clamp(13px, 1vw, 15px)',
                    fontWeight: 600,
                    background: !hasAttempted ? 'rgba(101, 67, 33, 0.3)' : 'rgba(139, 69, 19, 0.4)',
                    color: !hasAttempted ? '#8B7355' : '#F5DEB3',
                    border: '2px solid rgba(139, 69, 19, 0.5)',
                    borderRadius: '12px',
                    cursor: !hasAttempted ? 'not-allowed' : 'pointer',
                    opacity: !hasAttempted ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (hasAttempted) {
                      e.currentTarget.style.background = 'rgba(139, 69, 19, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (hasAttempted) {
                      e.currentTarget.style.background = 'rgba(139, 69, 19, 0.4)';
                    }
                  }}
                >
                  Consult the Legatus
                </button>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => router.push('/')}
                className="font-spectral px-6 py-2 transition-all"
                style={{
                  fontSize: 'clamp(13px, 1vw, 15px)',
                  color: '#D2B48C',
                  opacity: 0.85,
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.color = '#F5DEB3';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.85';
                  e.currentTarget.style.color = '#D2B48C';
                }}
              >
                ← Return to Landing
              </button>
            </div>
          </div>
        </main>

        {showHintModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
            }}
            onClick={() => setShowHintModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(101, 67, 33, 0.95)',
                borderRadius: '16px',
                border: '2px solid rgba(139, 69, 19, 0.5)',
                padding: '32px',
                maxWidth: '600px',
                width: '100%',
              }}
            >
              <h3 className="font-display text-center mb-6"
                  style={{
                    fontSize: 'clamp(20px, 2.5vw, 28px)',
                    fontWeight: 800,
                    color: '#D4AF37',
                    letterSpacing: '0.1em',
                  }}>
                Counsel of the Legatus
              </h3>
              <div className="space-y-4 mb-8">
                {HINTS.map((hint, idx) => (
                  <p key={idx} className="font-spectral"
                     style={{
                       color: '#F5DEB3',
                       fontSize: 'clamp(13px, 1vw, 15px)',
                       lineHeight: 1.6,
                       textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                     }}>
                    {idx + 1}. {hint}
                  </p>
                ))}
              </div>
              <button
                onClick={() => setShowHintModal(false)}
                className="font-spectral w-full px-6 py-2 transition-all"
                style={{
                  fontSize: 'clamp(13px, 1vw, 15px)',
                  fontWeight: 600,
                  background: 'rgba(139, 69, 19, 0.6)',
                  color: '#F5DEB3',
                  border: '2px solid rgba(139, 69, 19, 0.8)',
                  borderRadius: '12px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 69, 19, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 69, 19, 0.6)';
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
