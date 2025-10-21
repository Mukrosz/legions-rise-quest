'use client';

import React, { useState, useEffect, useRef } from 'react';
import { decryptStegoImage, isPNGImage } from '@/lib/stego';

interface DecryptModalProps {
  isOpen: boolean;
  onClose: () => void;
  enemyName: string;
  imagePath: string;
  riddleClue: string;
  wordFragment: string;
  isDefeated: boolean;
  onDefeatEnemy?: (fragment: string) => void;
  description: string;
}

export function DecryptModal({
  isOpen,
  onClose,
  enemyName,
  imagePath,
  riddleClue,
  wordFragment,
  isDefeated,
  onDefeatEnemy,
  description,
}: DecryptModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [passphrase, setPassphrase] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptResult, setDecryptResult] = useState<'success' | 'error' | null>(null);
  const [decryptedText, setDecryptedText] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setSelectedFile(null);
      setPassphrase('');
      setDecryptResult(null);
      setDecryptedText('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, input, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = `${enemyName.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isPNGImage(file)) {
      setSelectedFile(file);
      setDecryptResult(null);
      setDecryptedText('');
    } else if (file) {
      alert('Please select a PNG image file.');
    }
  };

  const handleDecrypt = async () => {
    if (!selectedFile || !passphrase.trim()) {
      alert('Please select an image and enter a passphrase.');
      return;
    }

    setIsDecrypting(true);
    setDecryptResult(null);
    setDecryptedText('');

    try {
      const plaintext = await decryptStegoImage(selectedFile, passphrase.trim());

      if (plaintext && plaintext.length > 0) {
        setDecryptResult('success');
        setDecryptedText(plaintext);

        if (onDefeatEnemy) {
          onDefeatEnemy(wordFragment);
        }
      } else {
        setDecryptResult('error');
      }
    } catch (error) {
      setDecryptResult('error');
    } finally {
      setIsDecrypting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(3px)',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        style={{
          background: 'linear-gradient(135deg, rgba(180, 0, 0, 0.15), rgba(220, 20, 60, 0.18), rgba(139, 0, 0, 0.15))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '2px solid rgba(180, 0, 0, 0.5)',
          boxShadow: '0 8px 32px rgba(139, 0, 0, 0.5), inset 0 1px 0 rgba(255, 100, 100, 0.2)',
          padding: 'clamp(24px, 4vw, 40px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center transition-all"
          style={{
            background: 'rgba(180, 0, 0, 0.3)',
            borderRadius: '50%',
            color: '#ff6b6b',
            fontSize: '24px',
            fontWeight: 'bold',
            border: '1px solid rgba(180, 0, 0, 0.5)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(180, 0, 0, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(180, 0, 0, 0.3)';
          }}
          aria-label="Close modal"
        >
          ×
        </button>

        <h2
          id="modal-title"
          className="font-display text-center mb-6"
          style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#ff6b6b',
            textShadow: '0 2px 4px rgba(0,0,0,0.6)',
          }}
        >
          {enemyName}
        </h2>

        <div
          className="mb-6 mx-auto"
          style={{
            maxWidth: '400px',
            aspectRatio: '1 / 1',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '2px solid rgba(180, 0, 0, 0.5)',
            boxShadow: '0 4px 16px rgba(139, 0, 0, 0.5)',
          }}
        >
          <img
            src={imagePath}
            alt={enemyName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Enemy Description */}
        <div
          className="mb-6 px-6 py-4"
          style={{
            background: 'rgba(180, 0, 0, 0.15)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '2px solid rgba(180, 0, 0, 0.4)',
            borderRadius: '12px',
            boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <p
            className="font-spectral text-center"
            style={{
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              color: '#ffcccc',
              lineHeight: 1.7,
              fontWeight: 400,
              textShadow: '0 1px 2px rgba(0,0,0,0.6)',
            }}
          >
            {description}
          </p>
        </div>

        {/* Battle Plan or Defeated Status */}
        {isDefeated ? (
          <div className="mb-8 text-center">
            <div
              className="inline-block px-8 py-4"
              style={{
                background: 'rgba(139, 0, 0, 0.2)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '2px solid rgba(180, 0, 0, 0.5)',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              }}
            >
              <p className="font-display mb-2"
                 style={{
                   fontSize: 'clamp(16px, 2vw, 20px)',
                   fontWeight: 800,
                   color: '#ff4444',
                   letterSpacing: '0.12em',
                   textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                 }}>
                ⚔ ENEMY DEFEATED ⚔
              </p>
              <p className="font-spectral"
                 style={{
                   fontSize: 'clamp(14px, 1.2vw, 16px)',
                   color: '#ffa07a',
                   fontWeight: 500,
                 }}>
                Fragment obtained: "<span style={{ fontWeight: 700, color: '#ffe5cc' }}>{wordFragment}</span>"
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div
              className="px-6 py-4"
              style={{
                background: 'rgba(180, 0, 0, 0.2)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '2px solid rgba(180, 0, 0, 0.5)',
                borderRadius: '12px',
                boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              <h3 className="font-display text-center mb-3"
                  style={{
                    fontSize: 'clamp(14px, 1.5vw, 18px)',
                    fontWeight: 700,
                    color: '#ff6b6b',
                    letterSpacing: '0.10em',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  }}>
                ⚔ BATTLE PLAN
              </h3>
              {riddleClue && (
                <p className="font-spectral text-center"
                   style={{
                     fontSize: 'clamp(13px, 1.1vw, 15px)',
                     color: '#ffcccc',
                     lineHeight: 1.6,
                     fontStyle: 'italic',
                     textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                   }}>
                  {riddleClue}
                </p>
              )}
              
              {/* Requisites Section */}
              <div className="mt-4">
                <p className="font-spectral text-center mb-4"
                   style={{
                     fontSize: 'clamp(13px, 1.1vw, 15px)',
                     color: '#ffa07a',
                     lineHeight: 1.7,
                     fontWeight: 500,
                     textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                   }}>
                  To bring down this foe, you must secure two requisites: an encrypted image and a spoken key - one won by favor, the other by wit.
                </p>
                
                <div className="space-y-3">
                  {/* Image Bullet Point */}
                  <div 
                    className="px-4 py-3"
                    style={{
                      background: 'rgba(139, 0, 0, 0.15)',
                      borderLeft: '3px solid rgba(255, 107, 107, 0.6)',
                      borderRadius: '8px',
                    }}
                  >
                    <div className="flex items-start">
                      <span style={{
                        color: '#ff6b6b',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginRight: '12px',
                        marginTop: '2px',
                      }}>⚡</span>
                      <div>
                        <p className="font-display"
                           style={{
                             fontSize: 'clamp(13px, 1.1vw, 15px)',
                             fontWeight: 700,
                             color: '#ff6b6b',
                             letterSpacing: '0.06em',
                             marginBottom: '4px',
                           }}>
                          Image
                        </p>
                        <p className="font-spectral"
                           style={{
                             fontSize: 'clamp(12px, 1vw, 14px)',
                             color: '#ffcccc',
                             lineHeight: 1.6,
                             textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                           }}>
                          Petition a Senator in Legion's discord for the image required to engage this enemy.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Passphrase Bullet Point */}
                  <div 
                    className="px-4 py-3"
                    style={{
                      background: 'rgba(139, 0, 0, 0.15)',
                      borderLeft: '3px solid rgba(255, 107, 107, 0.6)',
                      borderRadius: '8px',
                    }}
                  >
                    <div className="flex items-start">
                      <span style={{
                        color: '#ff6b6b',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginRight: '12px',
                        marginTop: '2px',
                      }}>🗝️</span>
                      <div>
                        <p className="font-display"
                           style={{
                             fontSize: 'clamp(13px, 1.1vw, 15px)',
                             fontWeight: 700,
                             color: '#ff6b6b',
                             letterSpacing: '0.06em',
                             marginBottom: '4px',
                           }}>
                          Passphrase
                        </p>
                        <p className="font-spectral"
                           style={{
                             fontSize: 'clamp(12px, 1vw, 14px)',
                             color: '#ffcccc',
                             lineHeight: 1.6,
                             textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                           }}>
                          Consult the Legion Whitepaper (<a href="#" style={{ color: '#ff6b6b', textDecoration: 'underline', fontWeight: 600 }}>link</a>). At ____, heed the heading and claim what opens beyond it - its first breath will arm your tongue.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Decrypt Panel - Only show if not defeated */}
        {!isDefeated && (
          <div
            className="p-6"
            style={{
              background: 'rgba(180, 0, 0, 0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '16px',
              border: '1px solid rgba(180, 0, 0, 0.4)',
            }}
          >
            <h3
              className="font-display mb-4 text-center"
              style={{
                fontSize: 'clamp(16px, 2vw, 20px)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#ffcccc',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              DECRYPT HERE
            </h3>

          <div className="mb-4">
            <label
              htmlFor="file-input"
              className="block font-spectral text-sm mb-2"
              style={{ color: '#ffcccc', fontWeight: 500 }}
            >
              Select Image File:
            </label>
            <input
              ref={fileInputRef}
              id="file-input"
              type="file"
              accept="image/png"
              onChange={handleFileSelect}
              className="w-full font-spectral text-sm"
              style={{
                padding: '10px',
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#ffcccc',
                border: '1px solid rgba(180, 0, 0, 0.5)',
                borderRadius: '8px',
              }}
            />
            {selectedFile && (
              <p
                className="font-spectral text-xs mt-2"
                style={{ color: '#ff6b6b', fontStyle: 'italic' }}
              >
                ✓ {selectedFile.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="passphrase-input"
              className="block font-spectral text-sm mb-2"
              style={{ color: '#ffcccc', fontWeight: 500 }}
            >
              Passphrase (from Stage I):
            </label>
            <input
              id="passphrase-input"
              type="text"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="Enter passphrase..."
              className="w-full font-spectral"
              style={{
                padding: '12px',
                fontSize: '16px',
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#ffe5cc',
                border: '1px solid rgba(180, 0, 0, 0.5)',
                borderRadius: '8px',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isDecrypting) {
                  handleDecrypt();
                }
              }}
            />
          </div>

          <button
            onClick={handleDecrypt}
            disabled={isDecrypting || !selectedFile || !passphrase.trim()}
            className="w-full font-display py-3 transition-all"
            style={{
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              background: isDecrypting || !selectedFile || !passphrase.trim() 
                ? 'rgba(80, 0, 0, 0.5)' 
                : 'rgba(180, 0, 0, 0.6)',
              color: '#ffcccc',
              border: '2px solid rgba(180, 0, 0, 0.7)',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              cursor: isDecrypting || !selectedFile || !passphrase.trim() ? 'not-allowed' : 'pointer',
              opacity: isDecrypting || !selectedFile || !passphrase.trim() ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isDecrypting && selectedFile && passphrase.trim()) {
                e.currentTarget.style.background = 'rgba(200, 0, 0, 0.7)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isDecrypting && selectedFile && passphrase.trim()) {
                e.currentTarget.style.background = 'rgba(180, 0, 0, 0.6)';
              }
            }}
          >
            {isDecrypting ? 'DECRYPTING...' : '🔓 REVEAL'}
          </button>

          {decryptResult === 'success' && (
            <div
              className="mt-6 p-4 text-center"
              style={{
                background: 'rgba(100, 150, 100, 0.2)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '2px solid rgba(100, 200, 100, 0.4)',
                borderRadius: '12px',
              }}
            >
              <p
                className="font-spectral font-bold mb-3"
                style={{ color: '#aaffaa', fontSize: '16px' }}
              >
                ⚔ ENEMY DEFEATED! ⚔
              </p>
              <p
                className="font-spectral mb-2"
                style={{ color: '#ffcccc', fontSize: '14px' }}
              >
                You obtained a fragment of the word:
              </p>
              <p
                className="font-display text-3xl tracking-widest mb-3"
                style={{ color: '#ffe5cc', textShadow: '0 2px 4px rgba(0,0,0,0.6)', fontWeight: 900 }}
              >
                "{wordFragment}"
              </p>
              <p
                className="font-spectral text-xs"
                style={{ color: '#aaffaa', fontStyle: 'italic' }}
              >
                Collect all fragments to advance to Stage 3!
              </p>
            </div>
          )}

          {decryptResult === 'error' && (
            <div
              className="mt-6 p-4 text-center"
              style={{
                background: 'rgba(150, 50, 50, 0.2)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '2px solid rgba(200, 80, 80, 0.4)',
                borderRadius: '12px',
              }}
            >
              <p
                className="font-spectral font-bold"
                style={{ color: '#ffaaaa', fontSize: '14px' }}
              >
                ❌ Invalid image or passphrase
              </p>
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}

