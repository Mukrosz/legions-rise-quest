/**
 * Stage II - Fire at Noon
 * Steganography Challenge - Three Enemies, Three Images, One Truth
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EnemyCard } from '@/components/EnemyCard';
import { DecryptModal } from '@/components/DecryptModal';
import { ProgressBar } from '@/components/ProgressBar';
import { useStageGuard } from '@/lib/guard';
import { hashWithPepper, derivePepper } from '@/lib/crypto';
import { setProgress, loadStageInput, saveStageInput } from '@/lib/progress';

// Enemy data
const ENEMIES = [
  {
    name: 'Beastmaster of Numidia',
    caption: 'Thunder and iron; the charge decides all.',
    imagePath: '/enemies/beastmaster.png',
  },
  {
    name: 'Tigress Unbound',
    caption: 'White fury within a ring of fire.',
    imagePath: '/enemies/tigress.png',
  },
  {
    name: 'Archer of the Red Dunes',
    caption: 'Eyes and joints hunted from the chariot.',
    imagePath: '/enemies/archer.png',
  },
];

export default function Stage2Page() {
  const router = useRouter();
  const { isChecking, isAllowed } = useStageGuard(2);
  const [savedInput] = useState(loadStageInput(2));
  const [answerInput, setAnswerInput] = useState(savedInput);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Modal state
  const [selectedEnemy, setSelectedEnemy] = useState<typeof ENEMIES[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      console.error('Submission error:', error);
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

  const handleDecryptSuccess = (plaintext: string) => {
    setAnswerInput(plaintext);
    saveStageInput(2, plaintext);
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
          // Heat haze effect
          animation: 'heatHaze 8s ease-in-out infinite',
        }}
      >
        {/* Progress Bar at Top */}
        <ProgressBar />

        {/* Main Content - Centered */}
        <main className="min-h-[calc(100vh-120px)] flex items-center justify-center p-4">
          {/* Glassmorphism Container - Heat Theme */}
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
            {/* Puzzle Title */}
            <h1 className="font-display text-center mb-6"
                style={{
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  lineHeight: 1.05,
                  color: '#d47f4a',
                  textShadow: '0 3px 6px rgba(0,0,0,0.6), 0 6px 12px rgba(139,69,19,0.4), 0 0 30px rgba(255,140,0,0.3)',
                  filter: 'drop-shadow(0 0 24px rgba(255,165,0,0.5))',
                }}>
              FIRE AT NOON
            </h1>

            {/* Story Section */}
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
                  Kaeso stands shoulder-to-shoulder with his companions, blades high, backs locked. 
                  Three gates yawn open - the arena's breath held.
                </p>
                <p>
                  From the North, thunder and iron: the <strong style={{ color: '#ffb380' }}>Beastmaster of Numidia</strong> atop 
                  an armored rhinoceros, lance lowered for a killing rush.
                </p>
                <p>
                  From the East, smoke and screams: the <strong style={{ color: '#ffb380' }}>Tigress Unbound</strong>, 
                  a white fury loosed as the ring of fire tightens.
                </p>
                <p>
                  From the West, dust and whistle: the <strong style={{ color: '#ffb380' }}>Archer of the Red Dunes</strong>, 
                  chariot circling, arrows hunting eyes and joints.
                </p>
                <p className="font-spectral italic" style={{ fontWeight: 600, color: '#ffe5cc', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  "Choose the first cut - or the last breath," Kaeso murmurs. The crowd roars. The sand waits.
                </p>
              </div>
            </div>

            {/* Enemy Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {ENEMIES.map((enemy) => (
                <EnemyCard
                  key={enemy.name}
                  name={enemy.name}
                  caption={enemy.caption}
                  imagePath={enemy.imagePath}
                  onClick={() => handleEnemyClick(enemy)}
                />
              ))}
            </div>

            {/* Player Hint */}
            <p className="font-spectral text-center italic text-sm mb-10"
               style={{
                 color: '#e8c8a8',
                 opacity: 0.9,
                 textShadow: '0 1px 3px rgba(0,0,0,0.6)',
               }}>
              Three gates. Three foes. Three images. The first victory is insight. 
              What is hidden in one is the key for all.
            </p>

            {/* Answer Input */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative mb-12">
                <input
                  id="stage2-answer"
                  type="text"
                  value={answerInput}
                  onChange={(e) => {
                    setAnswerInput(e.target.value);
                    saveStageInput(2, e.target.value);
                  }}
                  placeholder="Enter the decoded word..."
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

              {/* Submit Button */}
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

      {/* Decrypt Modal */}
      {selectedEnemy && (
        <DecryptModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEnemy(null);
          }}
          enemyName={selectedEnemy.name}
          imagePath={selectedEnemy.imagePath}
          onDecryptSuccess={handleDecryptSuccess}
        />
      )}

      {/* CSS Animation for heat haze */}
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

