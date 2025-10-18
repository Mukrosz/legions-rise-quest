/**
 * Decrypt Modal Component
 * Shows enemy image with download and decrypt functionality
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { decryptStegoImage, isPNGImage } from '@/lib/stego';

interface DecryptModalProps {
  isOpen: boolean;
  onClose: () => void;
  enemyName: string;
  imagePath: string;
  onDecryptSuccess?: (plaintext: string) => void;
}

export function DecryptModal({
  isOpen,
  onClose,
  enemyName,
  imagePath,
  onDecryptSuccess,
}: DecryptModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [passphrase, setPassphrase] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptResult, setDecryptResult] = useState<'success' | 'error' | null>(null);
  const [decryptedText, setDecryptedText] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape key
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

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedFile(null);
      setPassphrase('');
      setDecryptResult(null);
      setDecryptedText('');
    }
  }, [isOpen]);

  // Focus trap
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
        // Success!
        setDecryptResult('success');
        setDecryptedText(plaintext);

        // Auto-fill the main answer input
        if (onDecryptSuccess) {
          onDecryptSuccess(plaintext);
        }

        // Also try to fill by DOM id as backup
        const answerInput = document.getElementById('stage2-answer') as HTMLInputElement;
        if (answerInput) {
          answerInput.value = plaintext;
          // Trigger change event for React
          const event = new Event('input', { bubbles: true });
          answerInput.dispatchEvent(event);
        }
      } else {
        // Failed
        setDecryptResult('error');
      }
    } catch (error) {
      console.error('Decryption error:', error);
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
        backdropFilter: 'blur(8px)',
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
          background: 'rgba(30, 20, 15, 0.95)',
          borderRadius: '24px',
          border: '2px solid rgba(212, 165, 116, 0.4)',
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)',
          padding: 'clamp(24px, 4vw, 40px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center transition-all"
          style={{
            background: 'rgba(212, 165, 116, 0.2)',
            borderRadius: '50%',
            color: '#d4a574',
            fontSize: '24px',
            fontWeight: 'bold',
            border: '1px solid rgba(212, 165, 116, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212, 165, 116, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(212, 165, 116, 0.2)';
          }}
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Enemy Name */}
        <h2
          id="modal-title"
          className="font-display text-center mb-6"
          style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#d4a574',
            textShadow: '0 2px 4px rgba(0,0,0,0.6)',
          }}
        >
          {enemyName}
        </h2>

        {/* Enemy Image */}
        <div
          className="mb-6 mx-auto"
          style={{
            maxWidth: '400px',
            aspectRatio: '1 / 1',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '2px solid rgba(212, 165, 116, 0.4)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
          }}
        >
          <img
            src={imagePath}
            alt={enemyName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Download Button */}
        <div className="mb-8 text-center">
          <button
            onClick={handleDownload}
            className="font-display px-6 py-3 transition-all"
            style={{
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              background: 'rgba(212, 165, 116, 0.3)',
              color: '#ffe5cc',
              border: '2px solid rgba(212, 165, 116, 0.5)',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              textShadow: '0 1px 2px rgba(0,0,0,0.6)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212, 165, 116, 0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(212, 165, 116, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ⬇ DOWNLOAD IMAGE
          </button>
        </div>

        {/* Decrypt Panel */}
        <div
          className="p-6"
          style={{
            background: 'rgba(212, 165, 116, 0.1)',
            borderRadius: '16px',
            border: '1px solid rgba(212, 165, 116, 0.3)',
          }}
        >
          <h3
            className="font-display mb-4 text-center"
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#e8c8a8',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            DECRYPT HERE
          </h3>

          {/* File Picker */}
          <div className="mb-4">
            <label
              htmlFor="file-input"
              className="block font-spectral text-sm mb-2"
              style={{ color: '#f5d8b8', fontWeight: 500 }}
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
                color: '#f5d8b8',
                border: '1px solid rgba(212, 165, 116, 0.4)',
                borderRadius: '8px',
              }}
            />
            {selectedFile && (
              <p
                className="font-spectral text-xs mt-2"
                style={{ color: '#d4a574', fontStyle: 'italic' }}
              >
                ✓ {selectedFile.name}
              </p>
            )}
          </div>

          {/* Passphrase Input */}
          <div className="mb-4">
            <label
              htmlFor="passphrase-input"
              className="block font-spectral text-sm mb-2"
              style={{ color: '#f5d8b8', fontWeight: 500 }}
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
                border: '1px solid rgba(212, 165, 116, 0.4)',
                borderRadius: '8px',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isDecrypting) {
                  handleDecrypt();
                }
              }}
            />
          </div>

          {/* Decrypt Button */}
          <button
            onClick={handleDecrypt}
            disabled={isDecrypting || !selectedFile || !passphrase.trim()}
            className="w-full font-display py-3 transition-all"
            style={{
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              background: isDecrypting || !selectedFile || !passphrase.trim() 
                ? 'rgba(100, 70, 50, 0.5)' 
                : 'rgba(212, 165, 116, 0.6)',
              color: '#ffe5cc',
              border: '2px solid rgba(212, 165, 116, 0.6)',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              cursor: isDecrypting || !selectedFile || !passphrase.trim() ? 'not-allowed' : 'pointer',
              opacity: isDecrypting || !selectedFile || !passphrase.trim() ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isDecrypting && selectedFile && passphrase.trim()) {
                e.currentTarget.style.background = 'rgba(212, 165, 116, 0.7)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isDecrypting && selectedFile && passphrase.trim()) {
                e.currentTarget.style.background = 'rgba(212, 165, 116, 0.6)';
              }
            }}
          >
            {isDecrypting ? 'DECRYPTING...' : '🔓 REVEAL'}
          </button>

          {/* Result Display */}
          {decryptResult === 'success' && (
            <div
              className="mt-6 p-4 text-center"
              style={{
                background: 'rgba(100, 150, 100, 0.2)',
                border: '2px solid rgba(100, 200, 100, 0.4)',
                borderRadius: '12px',
              }}
            >
              <p
                className="font-spectral font-bold mb-2"
                style={{ color: '#aaffaa', fontSize: '14px' }}
              >
                ✓ Decryption Successful
              </p>
              <p
                className="font-display text-2xl tracking-widest"
                style={{ color: '#ffe5cc', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}
              >
                {decryptedText}
              </p>
              <p
                className="font-spectral text-xs mt-2"
                style={{ color: '#e8c8a8', fontStyle: 'italic' }}
              >
                This word has been entered into the answer field below.
              </p>
            </div>
          )}

          {decryptResult === 'error' && (
            <div
              className="mt-6 p-4 text-center"
              style={{
                background: 'rgba(150, 50, 50, 0.2)',
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
      </div>
    </div>
  );
}

