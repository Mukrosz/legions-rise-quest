'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EnemyCard } from '@/components/EnemyCard';
import { DecryptModal } from '@/components/DecryptModal';
import { ProgressBar } from '@/components/ProgressBar';
import { useStageGuard } from '@/lib/guard';
import { hashWithPepper, derivePepper } from '@/lib/crypto';
import { setProgress, getEnemyDefeats, defeatEnemy, getCollectedFragments } from '@/lib/progress';

const ENEMIES = [
  {
    id: 'beastmaster' as const,
    name: 'Beastmaster of Numidia',
    caption: 'Thunder and iron; the charge decides all.',
    imagePath: '/enemies/beastmaster.png',
    fragment: 'vi',
    clue: 'Placeholder for a clue',
  },
  {
    id: 'tigress' as const,
    name: 'Tigress Unbound',
    caption: 'White fury within a ring of fire.',
    imagePath: '/enemies/tigress.png',
    fragment: 'rt',
    clue: 'Placeholder for a clue',
  },
  {
    id: 'archer' as const,
    name: 'Archer of the Red Dunes',
    caption: 'Eyes and joints hunted from the chariot.',
    imagePath: '/enemies/archer.png',
    fragment: 'us',
    clue: 'Placeholder for a clue',
  },
];

export default function Stage2Page() {
  const router = useRouter();
  const { isChecking, isAllowed } = useStageGuard(2);
  const [answerInput, setAnswerInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [defeats, setDefeats] = useState(getEnemyDefeats());
  const [fragments, setFragments] = useState(getCollectedFragments());
  const [selectedEnemy, setSelectedEnemy] = useState<typeof ENEMIES[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setDefeats(getEnemyDefeats());
    setFragments(getCollectedFragments());
  }, []);

  const validateAnswer = async (input: string): Promise<boolean> => {
    const { v } = await import('@/validators/v2.js');
    const pepper = derivePepper(2);
    const hash = await hashWithPepper(input, pepper);
    
    const isCorrect = v(hash);
    
    if (isCorrect) {
      setProgress(2);
      return true;
    }
    
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerInput.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      const isCorrect = await validateAnswer(answerInput);

      if (isCorrect) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push('/stage-3');
        }, 1500);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnemyClick = (enemy: typeof ENEMIES[0]) => {
    setSelectedEnemy(enemy);
    setIsModalOpen(true);
  };

  const handleDefeatEnemy = (fragment: string) => {
    if (!selectedEnemy) return;
    defeatEnemy(selectedEnemy.id);
    setDefeats(getEnemyDefeats());
    setFragments(getCollectedFragments());
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
    <>
      <div
        className="min-h-screen"
        style={{
          backgroundImage: 'url("/stage2-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          animation: 'heatHaze 8s ease-in-out infinite',
        }}
      >
        <ProgressBar />

        <main className="min-h-[calc(100vh-120px)] flex items-center justify-center p-4">
          <div
            className="w-full max-w-5xl"
            style={{
              background: 'linear-gradient(135deg, rgba(204, 102, 51, 0.12), rgba(184, 115, 51, 0.15), rgba(139, 69, 19, 0.12))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '2px solid rgba(212, 135, 76, 0.35)',
              boxShadow: '0 8px 32px rgba(139, 69, 19, 0.4), inset 0 1px 0 rgba(255, 200, 150, 0.2)',
              padding: 'clamp(32px, 5vw, 64px)',
            }}
          >
            <h1 className="font-display text-center mb-6"
                style={{
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  lineHeight: 1.05,
                  color: '#d47f4a',
                  textShadow: '0 3px 6px rgba(0,0,0,0.6), 0 6px 12px rgba(139,69,19,0.4), 0 0 30px rgba(255,140,0,0.3)',
                  filter: 'drop-shadow(0 0 24px rgba(255,165,0,0.5))',
                }}>
              BLOOD OF THE ARENA
            </h1>

            <div className="mb-10 text-center">
              <h2 className="font-spectral text-xl md:text-2xl mb-6"
                  style={{
                    color: '#ffcc99',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    letterSpacing: '0.03em',
                    textShadow: '0 2px 6px rgba(0,0,0,0.7)',
                  }}>
                Year Two. Colosseum, Rome. The sun is a hammer; the sand, a kiln.
              </h2>
              <div className="font-spectral space-y-4"
                   style={{
                     color: '#f5d8b8',
                     fontSize: 'clamp(15px, 1.1vw, 17px)',
                     lineHeight: 1.75,
                     fontWeight: 400,
                     textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                     maxWidth: '700px',
                     margin: '0 auto',
                   }}>
                <p>
                  Kaeso faces three foes. Each holds a secret written in shadow and cipher. Defeat each, 
                  claim their word-fragment. Only when all three fall will the path forward emerge.
                </p>
              </div>
            </div>

            <div className="mb-10 flex justify-center">
              <div
                className="px-8 py-6"
                style={{
                  background: 'rgba(212, 165, 116, 0.15)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  border: '2px solid rgba(212, 165, 116, 0.4)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                  maxWidth: '700px',
                }}
              >
                <div className="font-spectral space-y-3"
                     style={{
                       color: '#f5d8b8',
                       fontSize: 'clamp(15px, 1.1vw, 17px)',
                       lineHeight: 1.75,
                       fontWeight: 400,
                       textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                       textAlign: 'left',
                     }}>
                  <p>
                    <strong style={{ color: '#ffb380' }}>Beastmaster of Numidia</strong> - thunder and iron, 
                    his riddle guards the first syllable.
                  </p>
                  <p>
                    <strong style={{ color: '#ffb380' }}>Tigress Unbound</strong> - white fury in fire, 
                    her secret holds the second.
                  </p>
                  <p>
                    <strong style={{ color: '#ffb380' }}>Archer of the Red Dunes</strong> - eyes and arrows, 
                    his clue completes the word.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-10 text-center">
              <div className="font-spectral"
                   style={{
                     color: '#f5d8b8',
                     fontSize: 'clamp(15px, 1.1vw, 17px)',
                     lineHeight: 1.75,
                     fontWeight: 400,
                     textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                   }}>
                <p className="font-spectral italic" style={{ fontWeight: 600, color: '#ffe5cc', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  Solve each riddle. Defeat each enemy. Unite the fragments. Speak the word.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {ENEMIES.map((enemy) => (
                <EnemyCard
                  key={enemy.id}
                  name={enemy.name}
                  caption={enemy.caption}
                  imagePath={enemy.imagePath}
                  onClick={() => handleEnemyClick(enemy)}
                  isDefeated={defeats[enemy.id]}
                />
              ))}
            </div>

            {fragments.length > 0 && (
              <div className="mb-10 text-center">
                <p className="font-spectral text-lg mb-2"
                   style={{ color: '#ffcc99', textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>
                  Collected Fragments:
                </p>
                <p className="font-display text-4xl tracking-widest"
                   style={{ 
                     color: '#ffe5cc', 
                     fontWeight: 900,
                     textShadow: '0 3px 6px rgba(0,0,0,0.8)',
                     letterSpacing: '0.2em',
                   }}>
                  {fragments.join('')}
                </p>
                {fragments.length === 3 && (
                  <p className="font-spectral text-sm mt-2"
                     style={{ color: '#e8c8a8', textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
                    All fragments obtained. Enter the complete word below.
                  </p>
                )}
              </div>
            )}

            <p className="font-spectral text-center italic text-sm mb-10"
               style={{
                 color: '#e8c8a8',
                 opacity: 0.9,
                 textShadow: '0 1px 3px rgba(0,0,0,0.6)',
               }}>
              Three gates. Three foes. Three fragments. Defeat all to claim victory.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative mb-12">
                <input
                  id="stage2-answer"
                  type="text"
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder="Enter the complete word..."
                  className="w-full font-spectral"
                  style={{
                    padding: '16px 20px',
                    fontSize: 'clamp(16px, 1.2vw, 20px)',
                    background: 'rgba(30, 20, 15, 0.6)',
                    color: '#ffe5cc',
                    border: '2px solid rgba(212, 135, 76, 0.5)',
                    borderRadius: '12px',
                    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.4)',
                    textAlign: 'center',
                    letterSpacing: '0.05em',
                  }}
                  autoComplete="off"
                  disabled={isSubmitting || showSuccess}
                />
                {showError && (
                  <div className="absolute -bottom-8 left-0 right-0 text-center">
                    <span className="font-spectral text-sm font-bold"
                          style={{ color: '#ff6b6b', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                      ❌ Incorrect. Try again.
                    </span>
                  </div>
                )}
                {showSuccess && (
                  <div className="absolute -bottom-8 left-0 right-0 text-center">
                    <span className="font-spectral text-sm font-bold animate-pulse"
                          style={{ color: '#51cf66', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                      ✓ Correct! Advancing...
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || showSuccess || !answerInput.trim()}
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
                  cursor: isSubmitting || showSuccess || !answerInput.trim() ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting || showSuccess || !answerInput.trim() ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting && !showSuccess && answerInput.trim()) {
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
                  textShadow: '0 1px 2px rgba(0,0,0,0.6)',
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

      {selectedEnemy && (
        <DecryptModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEnemy(null);
          }}
          enemyName={selectedEnemy.name}
          imagePath={selectedEnemy.imagePath}
          riddleClue={selectedEnemy.clue}
          wordFragment={selectedEnemy.fragment}
          isDefeated={defeats[selectedEnemy.id]}
          onDefeatEnemy={handleDefeatEnemy}
        />
      )}

      <style jsx>{`
        @keyframes heatHaze {
          0%, 100% {
            filter: blur(0px) brightness(1);
          }
          50% {
            filter: blur(0.5px) brightness(1.05);
          }
        }
      `}</style>
    </>
  );
}

