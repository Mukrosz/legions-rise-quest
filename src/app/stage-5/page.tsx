'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/ProgressBar';
import { useStageGuard } from '@/lib/guard';
import { setProgress } from '@/lib/progress';

const _0xbg5 = '/stage5-bg.png';
const _0xans = 'imperium';

const COPY = {
  subheader: 'By mandate of the Founders, the Senate speaks through the Legatus.',
  storyline: 'In the hush of the Curia\'s inner chamber, Kaeso is summoned before the Legatus. No enemy missive lies on the table - only a worn tablet engraved with a Senatorial maxim. The Legatus explains that this is the oath by which Rome keeps herself upright: a verse spoken in councils before war, hiding Rome\'s one condition for command. Many can recite the words; few can read what they require.',
  legatusLine: 'Strength wins cheers; order wins Rome. Read the maxim as the Senate reads it - head and tail - and bring me the word that crowns strength.',
  successBanner: 'IMPERIUM CONFIRMED',
  successSubtext: 'Law crowns strength.',
};

const DECREE_LINES = [
  'IN LEGIBUS VIRTUS STAT  SEQUITUR HONOR',
  'MODERATIO CIVES  DUCAT  CONSILII     ',
  'PROBITAS DOMET FASTUS  ROMANO RITU  ',
  'EQUITAS  MERITA TOLLAT AD SUMMUM    ',
];

export default function Stage5Page() {
  const router = useRouter();
  const { isChecking, isAllowed } = useStageGuard(5);
  const [userInput, setUserInput] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttempted(true);
    
    const normalized = userInput.toLowerCase().trim();
    
    if (normalized === _0xans) {
      setShowSuccess(true);
      setShowError(false);
      setProgress(5);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
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
          background: #6A3A8A !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #4B286D !important;
        }
      `}</style>
      <div
        className="min-h-screen"
        style={{
          backgroundImage: `url("${_0xbg5}")`,
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
              background: 'linear-gradient(135deg, rgba(75, 40, 109, 0.12), rgba(106, 58, 138, 0.15), rgba(58, 27, 82, 0.12))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '2px solid rgba(106, 58, 138, 0.35)',
              boxShadow: '0 8px 32px rgba(58, 27, 82, 0.4), inset 0 1px 0 rgba(147, 112, 219, 0.2)',
              padding: 'clamp(32px, 5vw, 64px)',
            }}
          >
            <h1 className="font-display text-center mb-6"
                style={{
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  lineHeight: 1.05,
                  color: '#9370DB',
                  textShadow: '0 3px 6px rgba(0,0,0,0.6), 0 6px 12px rgba(106,58,138,0.4), 0 0 30px rgba(147,112,219,0.3)',
                  filter: 'drop-shadow(0 0 24px rgba(147,112,219,0.5))',
                }}>
              VOX SENATUS
            </h1>

            <div className="mb-8 text-center">
              <p className="font-spectral italic mb-6"
                 style={{
                   color: '#F5DEB3',
                   fontSize: 'clamp(13px, 0.95vw, 15px)',
                   fontWeight: 600,
                   textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                 }}>
                {COPY.subheader}
              </p>
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
                {COPY.storyline}
              </p>
              <p className="font-spectral italic"
                 style={{
                   color: '#D4AF37',
                   fontSize: 'clamp(13px, 0.95vw, 15px)',
                   fontWeight: 600,
                   textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                   maxWidth: '700px',
                   margin: '0 auto',
                 }}>
                "{COPY.legatusLine}"
              </p>
            </div>

            <div className="mb-8"
                 style={{
                   background: 'rgba(75, 40, 109, 0.25)',
                   borderRadius: '16px',
                   border: '2px solid rgba(106, 58, 138, 0.4)',
                   padding: 'clamp(32px, 4vw, 48px)',
                 }}>
              <div className="text-center mb-6">
                <p className="font-display"
                   style={{
                     fontSize: 'clamp(18px, 2vw, 24px)',
                     fontWeight: 700,
                     letterSpacing: '0.08em',
                     color: '#D4AF37',
                     textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                     marginBottom: '8px',
                   }}>
                  SENATORIAL MAXIM
                </p>
                <p className="font-spectral text-xs"
                   style={{
                     color: '#D2B48C',
                     fontStyle: 'italic',
                     opacity: 0.8,
                   }}>
                  Carved tablet • Spoken in councils before war
                </p>
              </div>

              <div className="font-spectral text-center"
                   style={{
                     background: 'rgba(147, 112, 219, 0.1)',
                     borderRadius: '12px',
                     padding: 'clamp(24px, 3vw, 40px)',
                     border: '1px solid rgba(106, 58, 138, 0.3)',
                   }}>
                {DECREE_LINES.map((line, idx) => (
                  <p key={idx}
                     style={{
                       fontSize: 'clamp(14px, 1.1vw, 18px)',
                       fontWeight: 500,
                       letterSpacing: '0.05em',
                       lineHeight: 2,
                       color: '#F5DEB3',
                       textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                       fontFamily: 'monospace',
                       userSelect: 'text',
                       cursor: 'text',
                     }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {!showSuccess && (
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex flex-col items-center gap-4">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter the word that crowns strength..."
                    className="w-full max-w-md font-spectral"
                    style={{
                      padding: '16px 24px',
                      fontSize: '18px',
                      background: 'rgba(106, 58, 138, 0.2)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      color: '#F5DEB3',
                      border: '2px solid rgba(106, 58, 138, 0.4)',
                      borderRadius: '12px',
                      boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)',
                      textAlign: 'center',
                      letterSpacing: '0.05em',
                    }}
                  />
                  
                  <button
                    type="submit"
                    className="font-display w-full max-w-md px-8 py-3 transition-all"
                    style={{
                      fontSize: 'clamp(14px, 1.2vw, 16px)',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      background: '#8B2F2B',
                      color: '#F5DEB3',
                      border: '2px solid #6C2421',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#A03834';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#8B2F2B';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
                    }}
                  >
                    Submit Command
                  </button>
                </div>
              </form>
            )}

            {showError && (
              <div className="mb-6 text-center">
                <p className="font-spectral text-lg"
                   style={{
                     color: '#FF6B6B',
                     fontWeight: 600,
                     textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                   }}>
                  The word eludes you. Read head and tail once more.
                </p>
              </div>
            )}

            {showSuccess && (
              <div className="mb-8 text-center"
                   style={{
                     background: 'rgba(147, 112, 219, 0.2)',
                     borderRadius: '16px',
                     border: '2px solid rgba(147, 112, 219, 0.5)',
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
                <p className="font-display mb-6"
                   style={{
                     fontSize: 'clamp(32px, 4vw, 48px)',
                     fontWeight: 900,
                     letterSpacing: '0.3em',
                     color: '#FFD700',
                     textShadow: '0 4px 8px rgba(0,0,0,0.9)',
                   }}>
                  I M P E R I U M
                </p>
                <p className="font-spectral mb-8"
                   style={{
                     fontSize: 'clamp(13px, 1vw, 15px)',
                     color: '#DEB887',
                     lineHeight: 1.7,
                     maxWidth: '600px',
                     margin: '0 auto 32px',
                   }}>
                  The Legatus rises. This is the proof the founders demanded: not brute cunning, but a mind that binds power to law. The standards are raised, the order is issued, and the campaign turns in Rome's favor.
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
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => setShowHintModal(true)}
                  disabled={!hasAttempted}
                  className="font-spectral px-6 py-2 transition-all"
                  style={{
                    fontSize: 'clamp(13px, 1vw, 15px)',
                    fontWeight: 600,
                    background: !hasAttempted ? 'rgba(75, 40, 109, 0.3)' : 'rgba(106, 58, 138, 0.4)',
                    color: !hasAttempted ? '#8B7388' : '#F5DEB3',
                    border: '2px solid rgba(106, 58, 138, 0.5)',
                    borderRadius: '12px',
                    cursor: !hasAttempted ? 'not-allowed' : 'pointer',
                    opacity: !hasAttempted ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (hasAttempted) {
                      e.currentTarget.style.background = 'rgba(106, 58, 138, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (hasAttempted) {
                      e.currentTarget.style.background = 'rgba(106, 58, 138, 0.4)';
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
                background: 'rgba(75, 40, 109, 0.95)',
                borderRadius: '16px',
                border: '2px solid rgba(106, 58, 138, 0.5)',
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
                <p className="font-spectral"
                   style={{
                     color: '#F5DEB3',
                     fontSize: 'clamp(13px, 1vw, 15px)',
                     lineHeight: 1.6,
                     textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                   }}>
                  1. The Senate reads decrees by their caput et cauda - head and tail.
                </p>
                <p className="font-spectral"
                   style={{
                     color: '#F5DEB3',
                     fontSize: 'clamp(13px, 1vw, 15px)',
                     lineHeight: 1.6,
                     textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                   }}>
                  2. The head is what begins; the tail is what ends. Read both from top to bottom.
                </p>
                <p className="font-spectral"
                   style={{
                     color: '#F5DEB3',
                     fontSize: 'clamp(13px, 1vw, 15px)',
                     lineHeight: 1.6,
                     textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                   }}>
                  3. Unite head and tail to reveal the word that binds power to law.
                </p>
              </div>
              <button
                onClick={() => setShowHintModal(false)}
                className="font-spectral w-full px-6 py-2 transition-all"
                style={{
                  fontSize: 'clamp(13px, 1vw, 15px)',
                  fontWeight: 600,
                  background: 'rgba(106, 58, 138, 0.6)',
                  color: '#F5DEB3',
                  border: '2px solid rgba(106, 58, 138, 0.8)',
                  borderRadius: '12px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(106, 58, 138, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(106, 58, 138, 0.6)';
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
