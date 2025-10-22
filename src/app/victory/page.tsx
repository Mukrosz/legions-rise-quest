'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/ProgressBar';
import { getProgress, setProgress } from '@/lib/progress';

export default function VictoryPage() {
  const router = useRouter();
  const [pageProgress, setPageProgress] = useState({ stage: 0, timestamp: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const p = getProgress();
    setPageProgress(p);
    setIsClient(true);
    
    if (p.stage < 5) {
      router.push('/');
    } else {
      setProgress(6);
    }
  }, [router]);

  if (pageProgress.stage < 5) {
    return null;
  }

  const completionDate = new Date(pageProgress.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const completionTime = new Date(pageProgress.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    timeZone: 'UTC',
  });

  return (
    <>
      <style jsx global>{`
        ::-webkit-scrollbar-thumb {
          background: #D4AF37 !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #B8941F !important;
        }
        
        @keyframes sunRays {
          0%, 100% { transform: rotate(0deg); opacity: 0.6; }
          50% { transform: rotate(180deg); opacity: 0.9; }
        }
      `}</style>
      
      <div 
        className="min-h-screen relative overflow-auto"
        style={{
          backgroundImage: 'url("/final-bg.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        
        {isClient && pageProgress.stage >= 5 && (
          <div className="relative z-20">
            <ProgressBar />
          </div>
        )}

        <main className="relative min-h-[calc(100vh-120px)] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-4xl"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(218, 165, 32, 0.2), rgba(184, 134, 11, 0.15))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '3px solid rgba(212, 175, 55, 0.6)',
              boxShadow: '0 8px 32px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255, 215, 100, 0.3), 0 0 60px rgba(212, 175, 55, 0.3)',
              padding: 'clamp(32px, 5vw, 64px)',
            }}
          >
            <div className="text-center space-y-8">
              <div className="text-8xl mb-6">🏛️</div>

              <h1 className="font-display"
                  style={{
                    fontSize: 'clamp(32px, 4vw, 52px)',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    lineHeight: 1.1,
                    color: '#FFD700',
                    textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 0 40px rgba(255,215,0,0.6)',
                    filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.5))',
                    marginBottom: '24px',
                  }}>
                LAURELS OF TRIUMPH
              </h1>

              <h2 className="font-spectral text-xl md:text-2xl mb-8"
                  style={{
                    color: '#F5DEB3',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    letterSpacing: '0.02em',
                    textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                  }}>
                The Ascent Complete. From Dardanian Tribe to Roman Senate.
              </h2>

              <div className="font-spectral space-y-6 mb-10"
                   style={{
                     color: '#F5DEB3',
                     fontSize: 'clamp(15px, 1.1vw, 18px)',
                     lineHeight: 1.75,
                     fontWeight: 400,
                     textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                     maxWidth: '700px',
                     margin: '0 auto 40px',
                   }}>
                <p>
                  Let the Senate record: <strong style={{ color: '#FFD700' }}>KAESO DARDANUS</strong>, 
                  once bound in chains, has risen. Through five trials - cipher, combat, citizenship, 
                  cunning, and command - he proved what Rome demands: not merely strength, but the 
                  wisdom to wield it.
                </p>
                <p>
                  From the dust of captivity to the marble halls of power, the journey was arduous. 
                  Yet despite all odds, against every enemy, through every riddle, Kaeso endured. 
                  The oath is fulfilled. The ascent is complete.
                </p>
                <p style={{ 
                  fontSize: 'clamp(16px, 1.2vw, 20px)', 
                  fontWeight: 600, 
                  color: '#FFD700',
                  fontStyle: 'italic',
                  marginTop: '32px',
                }}>
                  "Fortuna Fortes Adiuvat" - Fortune Favors the Bold
                </p>
              </div>

              <div style={{
                background: 'rgba(212, 175, 55, 0.2)',
                border: '2px solid rgba(212, 175, 55, 0.5)',
                borderRadius: '16px',
                padding: 'clamp(24px, 4vw, 40px)',
                marginBottom: '32px',
              }}>
                <p className="font-display mb-6"
                   style={{
                     fontSize: 'clamp(20px, 2.5vw, 28px)',
                     fontWeight: 800,
                     letterSpacing: '0.1em',
                     color: '#FFD700',
                     textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                   }}>
                  CLAIM YOUR VICTORY
                </p>
                <div className="font-spectral"
                     style={{
                       color: '#F5DEB3',
                       fontSize: 'clamp(14px, 1vw, 16px)',
                       lineHeight: 1.7,
                       textAlign: 'left',
                     }}>
                  <p style={{ 
                    marginBottom: '20px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                  }}>
                    <strong style={{ color: '#FFD700', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                      To receive official recognition:
                    </strong>
                  </p>
                  
                  <div style={{ 
                    background: 'rgba(0, 0, 0, 0.15)',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    marginBottom: '20px',
                  }}>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '16px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                    }}>
                      <span style={{ 
                        color: '#FFD700',
                        fontWeight: 700,
                        fontSize: '1.2em',
                        marginRight: '12px',
                        minWidth: '24px',
                      }}>①</span>
                      <div>
                        <strong style={{ color: '#FFD700' }}>Compile all five answers:</strong>
                        <div style={{ 
                          color: '#FFD700', 
                          fontFamily: 'monospace', 
                          fontSize: '0.95em',
                          marginTop: '8px',
                          padding: '8px 12px',
                          background: 'rgba(212, 175, 55, 0.1)',
                          borderRadius: '6px',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                        }}>
                          Stage1+Stage2+Stage3+Stage4+Stage5
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '16px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                    }}>
                      <span style={{ 
                        color: '#FFD700',
                        fontWeight: 700,
                        fontSize: '1.2em',
                        marginRight: '12px',
                        minWidth: '24px',
                      }}>②</span>
                      <div>
                        <strong style={{ color: '#FFD700' }}>Take a screenshot</strong> of this completion page
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                    }}>
                      <span style={{ 
                        color: '#FFD700',
                        fontWeight: 700,
                        fontSize: '1.2em',
                        marginRight: '12px',
                        minWidth: '24px',
                      }}>③</span>
                      <div>
                        <strong style={{ color: '#FFD700' }}>Email both</strong> to:{' '}
                        <a href="mailto:charlie@legion.cc" 
                           style={{ 
                             color: '#FFD700', 
                             fontWeight: 700, 
                             textDecoration: 'underline',
                             textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                           }}>
                          charlie@legion.cc
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <p style={{ 
                    marginTop: '16px', 
                    fontSize: '0.9em', 
                    fontStyle: 'italic', 
                    opacity: 0.9,
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                  }}>
                    Your achievement will be recorded in the Legion's archives.
                  </p>
                </div>
              </div>

              <div className="text-sm space-y-2"
                   style={{
                     color: '#D4AF37',
                     fontFamily: 'Spectral',
                   }}>
                <p>Journey completed: <strong>{completionDate} at {completionTime}</strong></p>
                <p>Stages conquered: <strong>5/5</strong></p>
                <p style={{ color: '#FFD700', fontSize: '1.1em', marginTop: '8px' }}>
                  ⚔️ SENATOR ACHIEVIUM ⚔️
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
