/**
 * Landing Page - The Ascent of Kaeso Dardanus
 * Epic American comic-style intro with transformation imagery
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProgress, resetProgress } from '@/lib/progress';
import { ProgressBar } from '@/components/ProgressBar';

export default function LandingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState({ stage: 0, timestamp: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setProgress(getProgress());
    setIsClient(true);
  }, []);

  const handleBegin = () => {
    router.push('/stage-1');
  };

  const handleReset = () => {
    if (confirm('This will erase all progress. Are you certain?')) {
      resetProgress();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen relative overflow-auto">
      {/* Vintage Colosseum Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/colosseum-sunset.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Subtle vignette overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
      </div>

      {/* Progress Bar - Only show if user has made progress */}
      {isClient && progress.stage > 0 && (
        <div className="relative z-20">
          <ProgressBar />
        </div>
      )}

      {/* Parchment scroll with title and story */}
      <main className={`relative min-h-[calc(100vh-120px)] flex ${progress.stage > 0 ? 'items-start pt-4' : 'items-center min-h-screen'} justify-center p-4`}>
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          {/* Parchment scroll with actual image - stretched to fit all content */}
          <div 
            className="relative w-full flex flex-col"
            style={{
              backgroundImage: 'url("/parchment-scroll.png")',
              backgroundSize: '100% 100%', // Stretch to fit container
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
              padding: 'clamp(80px, 15vw, 280px) clamp(30px, 8vw, 130px) clamp(60px, 10vw, 160px) clamp(30px, 8vw, 130px)',
            }}
          >
            {/* Content */}
            <div className="relative flex-1">
              {/* Title */}
              <div className="text-center">
                {/* A) Hero title - THE ASCENT */}
                <h1 className="font-display"
                    style={{ 
                      fontSize: 'clamp(34px, 5vw, 64px)',
                      fontWeight: 800,
                      letterSpacing: '0.075em',
                      lineHeight: 1.04,
                      marginBottom: '0.25em',
                      color: '#5a4630',
                      textShadow: '0 1px 0 rgba(255,255,255,0.65), 0 -1px 0 rgba(0,0,0,0.28), 0 2px 2px rgba(0,0,0,0.20), 0 6px 12px rgba(0,0,0,0.14)',
                      mixBlendMode: 'multiply'
                    }}>
                  THE ASCENT
                </h1>
                
                {/* B) Subtitle - of Kaeso Dardanus */}
                <p className="font-spectral italic"
                   style={{ 
                     fontSize: 'clamp(16px, 1.8vw, 22px)',
                     fontWeight: 500,
                     lineHeight: 1.25,
                     color: '#2b1e14',
                     opacity: 0.95,
                     marginTop: '-0.3em',
                     marginBottom: '0.6em'
                   }}>
                  of Kaeso Dardanus
                </p>
                
                {/* C) Emblem line - SPQR */}
                <div className="flex justify-center items-center gap-3" style={{ margin: '0.8em 0' }}>
                  <div style={{ 
                    height: '1px', 
                    width: '110px', 
                    maxWidth: '110px',
                    background: 'rgba(0,0,0,0.18)' 
                  }} />
                  <span className="font-spectral" 
                        style={{ 
                          fontSize: 'clamp(12px, 1.4vw, 16px)',
                          fontWeight: 600,
                          letterSpacing: '0.28em',
                          fontVariant: 'small-caps',
                          padding: '0 0.6em',
                          color: '#2b1e14',
                          opacity: 0.9
                        }}>
                    🌿 SPQR 🌿
                  </span>
                  <div style={{ 
                    height: '1px', 
                    width: '110px',
                    maxWidth: '110px',
                    background: 'rgba(0,0,0,0.18)' 
                  }} />
                </div>
              </div>
              
              {/* Story text */}
              <div className="text-center" style={{ marginTop: '1.5em' }}>
                {/* D) Deck/intro paragraph */}
                <p className="font-spectral mx-auto" 
                   style={{ 
                     fontSize: 'clamp(15px, 1.1vw, 18px)',
                     fontWeight: 400,
                     lineHeight: 1.7,
                     maxWidth: '60ch',
                     color: '#3a2a1e'
                   }}>
                  From the mountain tribes of <span style={{ fontWeight: 600 }}>Dardania</span>, he descended - 
                  a warrior of proud lineage. The legions came. Chains replaced his sword. 
                  The arena became his proving ground. Through <span style={{ fontWeight: 600 }}>cunning, blood, and cryptic wit</span>, 
                  he claimed freedom. Yet freedom was but the first rung.
                </p>
                
                {/* E) Section headline - FIVE TRIALS AWAIT */}
                <h2 className="font-display"
                    style={{ 
                      fontSize: 'clamp(24px, 3.2vw, 40px)',
                      fontWeight: 800,
                      letterSpacing: '0.16em',
                      lineHeight: 1.1,
                      margin: '1.1em 0 0.35em',
                      color: '#5a4630',
                      textShadow: '0 1px 0 rgba(255,255,255,0.65), 0 -1px 0 rgba(0,0,0,0.28), 0 2px 2px rgba(0,0,0,0.20), 0 6px 12px rgba(0,0,0,0.14)',
                      mixBlendMode: 'multiply'
                    }}>
                  <span style={{ opacity: 0.75 }}>⚔ </span>
                  FIVE TRIALS AWAIT
                  <span style={{ opacity: 0.75 }}> ⚔</span>
                </h2>
                
                {/* F) Microcopy */}
                <p className="font-spectral"
                   style={{ 
                     fontSize: 'clamp(12px, 1.1vw, 15px)',
                     fontWeight: 500,
                     letterSpacing: '0.06em',
                     opacity: 0.85,
                     color: '#2b1e14',
                     marginTop: '.8em'
                   }}>
                  Decipher the secrets. Ascend from captive to consul.
                  <br/>
                  The Senate awaits your voice.
                </p>
              </div>

              {/* CTA Button - Inside parchment, right after text */}
              <div className="text-center" style={{ marginTop: '2em' }}>
                {/* G) CTA button */}
                <button
                  onClick={handleBegin}
                  className="font-display relative overflow-hidden transition-all duration-300 uppercase"
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
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
                  }}
                >
                  {progress.stage > 0 ? 'CONTINUE ASCENT' : 'BEGIN ASCENT'}
                </button>

                {/* Reset Button (only for users with progress) */}
                {progress.stage > 0 && (
                  <div className="text-center" style={{ marginTop: '1.5em' }}>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 text-burgundy hover:text-amber-50 hover:bg-burgundy
                               border-2 border-burgundy font-spectral text-sm transition-all rounded"
                      style={{ fontWeight: 500 }}
                    >
                      ⚠️ Start Over (Hard Reset)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Attribution */}
      <footer className="relative py-4 text-center z-10">
        <p className="text-amber-900/50 font-spectral tracking-widest drop-shadow-lg"
           style={{ 
             letterSpacing: '0.2em', 
             fontSize: 'clamp(10px, 1vw, 12px)', 
             fontWeight: 500,
             fontVariant: 'small-caps'
           }}>
          A Puzzle Odyssey Through Ancient Rome
        </p>
      </footer>
    </div>
  );
}

