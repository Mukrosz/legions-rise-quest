'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/ProgressBar';
import { InputCard } from '@/components/InputCard';
import { useStageGuard } from '@/lib/guard';
import { setProgress, loadStageInput, saveStageInput } from '@/lib/progress';

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
  'IN LEGIBUS VIRTUS STAT SEQUITUR HONOR',
  'MODERATIO CIVES DUCAT CONSILII',
  'PROBITAS DOMET FASTUS ROMANO RITU',
  'EQUITAS MERITA TOLLAT AD SUMMUM',
];

export default function Stage5Page() {
  const router = useRouter();
  const { isChecking, isAllowed } = useStageGuard(5);
  const [savedInput] = useState(loadStageInput(5));

  const validateAnswer = async (input: string): Promise<boolean> => {
    const normalized = input.toLowerCase().trim();
    
    if (normalized === _0xans) {
      setProgress(5);
      return true;
    } else {
      saveStageInput(5, input);
      return false;
    }
  };

  const handleSuccess = () => {
    setTimeout(() => {
      router.push('/victory');
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
              <h2 className="font-spectral text-xl md:text-2xl mb-6"
                  style={{
                    color: '#F5DEB3',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    letterSpacing: '0.02em',
                    textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                  }}>
                Year Ten. Curia Julia. {COPY.subheader}
              </h2>
              <p className="font-spectral mb-4"
                 style={{
                   color: '#d4e8f0',
                   fontSize: 'clamp(15px, 1.1vw, 17px)',
                   lineHeight: 1.75,
                   fontWeight: 400,
                   textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                   maxWidth: '700px',
                   margin: '0 auto 16px',
                 }}>
                {COPY.storyline}
              </p>
              <p className="font-spectral text-center italic"
                 style={{
                   fontSize: 'clamp(15px, 1.1vw, 17px)',
                   fontWeight: 600,
                   color: '#e8f4f8',
                   textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                   maxWidth: '700px',
                   margin: '0 auto',
                 }}>
                {COPY.legatusLine}
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
                     color: '#F5DEB3',
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

              <div className="font-spectral mx-auto"
                   style={{
                     background: 'rgba(147, 112, 219, 0.1)',
                     borderRadius: '12px',
                     padding: 'clamp(24px, 3vw, 40px)',
                     border: '1px solid rgba(106, 58, 138, 0.3)',
                     maxWidth: '540px',
                   }}>
                {DECREE_LINES.map((line, idx) => (
                  <p key={idx}
                     style={{
                       fontSize: 'clamp(15px, 1.2vw, 18px)',
                       fontWeight: 500,
                       letterSpacing: '0.08em',
                       lineHeight: 2.2,
                       color: '#F5DEB3',
                       textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                       fontFamily: 'monospace',
                       userSelect: 'text',
                       cursor: 'text',
                       textAlign: 'justify',
                       textAlignLast: 'justify',
                       marginBottom: idx === DECREE_LINES.length - 1 ? 0 : '0.5em',
                     }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <InputCard
              onSubmit={validateAnswer}
              placeholder="Enter the word that crowns strength..."
              hint1="The Senate favors verses that hide a double acrostic. Do not search the belly of the lines - look to their borders, where a verse swears in and takes its leave."
              hint2="In Rome, procession matters: let the heads take their ranks first from top to bottom, and only then let the tails fall in behind to speak with one voice."
              stageNumber={5}
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
      </div>
    </>
  );
}
