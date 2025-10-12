/**
 * Stage I - Chains of the Captive
 * Caesar Cipher Puzzle
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Panel } from '@/components/Panel';
import { CaptionBox } from '@/components/CaptionBox';
import { InputCard } from '@/components/InputCard';
import { ProgressBar } from '@/components/ProgressBar';
import { hashWithPepper, derivePepper } from '@/lib/crypto';
import { setProgress, loadStageInput, saveStageInput } from '@/lib/progress';

export default function Stage1Page() {
  const router = useRouter();
  const [savedInput] = useState(loadStageInput(1));

  const validateAnswer = async (input: string): Promise<boolean> => {
    // Import validator dynamically
    const { v } = await import('@/validators/v1.js');
    
    // Hash user input with pepper
    const pepper = derivePepper(1);
    const hash = await hashWithPepper(input, pepper);
    
    // Validate
    const isCorrect = v(hash);
    
    if (isCorrect) {
      setProgress(1);
      return true;
    }
    
    // Save attempt
    saveStageInput(1, input);
    return false;
  };

  const handleSuccess = () => {
    setTimeout(() => {
      router.push('/stage-2');
    }, 1500);
  };

  return (
    <main className="min-h-screen comic-gutter page-transition">
      <ProgressBar />

      {/* Hero Panel */}
      <Panel variant="hero" className="mb-8">
        <div className="relative min-h-[50vh] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-burgundy/40 via-obsidian/80 to-obsidian"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23b87333' fill-opacity='0.08'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <CaptionBox position="bottom" variant="story">
            <p className="mb-3">
              <strong className="text-xl text-bronze">Day Seven. The Caravan.</strong>
            </p>
            <p className="mb-3">
              You march in chains through dust and heat. Behind you, Dardania burns. 
              Ahead—Rome's markets, where men become property. Yet not all is lost.
            </p>
            <p className="mb-3">
              A fellow captive, once a scribe, whispers in the night. He scratches 
              symbols on wax—an old cipher of Caesar's legions. "Remember this," he says. 
              "Knowledge is the first key to freedom."
            </p>
            <p className="text-bronze italic">
              The message is shifted. The truth awaits the wise.
            </p>
          </CaptionBox>

          {/* SFX */}
          <div className="absolute top-8 right-8 sfx-label opacity-20">
            KLANK
          </div>
        </div>
      </Panel>

      {/* Puzzle Content */}
      <Panel variant="content" className="max-w-4xl mx-auto mb-8">
        <div className="space-y-6">
          <h1 className="font-display text-3xl md:text-5xl font-black text-burgundy text-center mb-6">
            CHAINS OF THE CAPTIVE
          </h1>

          <div className="prose prose-lg max-w-none text-obsidian">
            <p className="text-center italic mb-8 text-bronze font-semibold text-xl">
              "Decode the scribe's whisper"
            </p>

            <div className="bg-parchment/50 p-6 border-l-4 border-bronze mb-8">
              <p className="font-mono text-lg text-center tracking-wider">
                OLEHUWDV
              </p>
            </div>

            <p className="text-center text-sm text-obsidian/70 mb-4">
              The scribe used Caesar's method. Each letter shifted by a fixed count. 
              What word brings freedom?
            </p>

            <div className="bg-obsidian/10 p-4 rounded mb-8">
              <p className="text-xs text-obsidian/60 italic">
                Hint: The Roman general himself used a simple shift. The alphabet turns, 
                but the message remains. Try different rotations until meaning emerges.
              </p>
            </div>
          </div>

          <InputCard
            onSubmit={validateAnswer}
            placeholder="Enter the decoded word..."
            hint1="A whisper carries through the caravan—shift your view by Roman count."
            hint2="Caesar himself taught this cipher. The shift is modest, the message eternal."
            stageNumber={1}
            savedInput={savedInput}
            onSuccess={handleSuccess}
          />
        </div>
      </Panel>

      {/* Navigation */}
      <div className="text-center pb-8">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 text-parchment/60 hover:text-parchment
                   font-body text-sm transition-colors"
        >
          ← Return to Landing
        </button>
      </div>
    </main>
  );
}

