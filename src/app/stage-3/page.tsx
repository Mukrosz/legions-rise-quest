/**
 * Stage III - Citizen's Trial
 * Source Inspection (Base64) + History
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Panel } from '@/components/Panel';
import { CaptionBox } from '@/components/CaptionBox';
import { InputCard } from '@/components/InputCard';
import { ProgressBar } from '@/components/ProgressBar';
import { useStageGuard } from '@/lib/guard';
import { hashWithPepper } from '@/lib/crypto';
import { setProgress, loadStageInput, saveStageInput } from '@/lib/progress';

/*
  HIDDEN CLUE FOR SOURCE INSPECTION:
  The greatest orator of Rome, defender of the Republic, spoke against Catiline.
  His name is encoded below in the scholar's cipher:
  
  Q0lDRVJP
  
  This decodes from Base64 to: CICERO
  
  Historical context: Marcus Tullius Cicero (106-43 BCE) was Rome's greatest 
  orator and statesman. He defended the Republic and was known for his Catilinarian Orations.
*/

export default function Stage3Page() {
  const router = useRouter();
  const { isChecking, isAllowed } = useStageGuard(3);
  const [savedInput] = useState(loadStageInput(3));

  const validateAnswer = async (input: string): Promise<boolean> => {
    const { v } = await import('@/validators/v3.js');
    
    // Use FORVM as pepper for this stage
    const pepper = 'FORVM';
    const hash = await hashWithPepper(input, pepper);
    
    const isCorrect = v(hash);
    
    if (isCorrect) {
      setProgress(3);
      return true;
    }
    
    saveStageInput(3, input);
    return false;
  };

  const handleSuccess = () => {
    setTimeout(() => {
      router.push('/stage-4');
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
    return null;
  }

  return (
    <main className="min-h-screen comic-gutter page-transition">
      <ProgressBar />

      <Panel variant="hero" className="mb-8">
        <div className="relative min-h-[50vh] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-laurel/30 via-obsidian/70 to-obsidian"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b87333' fill-opacity='0.06'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <CaptionBox position="bottom" variant="story">
            <p className="mb-3">
              <strong className="text-xl text-bronze">Year Three. The Tabularium.</strong>
            </p>
            <p className="mb-3">
              Manumission granted. You are free—but not equal. The path to citizenship 
              winds through the Forum, past marble columns and bronze tablets.
            </p>
            <p className="mb-3">
              An archivist, bent over scrolls, catches your eye. "Seeking rights? 
              Then know those who shaped them." He gestures to the walls where names 
              are etched, some visible, others hidden where scribes leave notes.
            </p>
            <p className="text-bronze italic">
              The greatest defender of the Republic awaits discovery. Inspect the foundation.
            </p>
          </CaptionBox>

          <div className="absolute top-8 right-8 sfx-label opacity-20">
            CRACK
          </div>
        </div>
      </Panel>

      <Panel variant="content" className="max-w-4xl mx-auto mb-8">
        <div className="space-y-6">
          <h1 className="font-display text-3xl md:text-5xl font-black text-burgundy text-center mb-6">
            CITIZEN'S TRIAL
          </h1>

          <div className="prose prose-lg max-w-none text-obsidian">
            <p className="text-center italic mb-8 text-bronze font-semibold text-xl">
              "Where scribes leave their marks"
            </p>

            <div className="bg-parchment/50 p-6 border-l-4 border-bronze mb-8">
              <p className="font-serif text-base mb-4">
                <strong>Historical Context:</strong>
              </p>
              <p className="text-sm mb-3">
                In 63 BCE, a conspiracy threatened Rome's very existence. One man stood 
                before the Senate and delivered orations so powerful they saved the Republic.
              </p>
              <p className="text-sm mb-3">
                He was not a general but a lawyer. Not a warrior but a wordsmith. 
                His weapon was rhetoric; his legacy, eternal.
              </p>
              <p className="text-sm text-bronze italic">
                "O tempora, o mores!" he cried. The times, the customs—Rome at the precipice.
              </p>
            </div>

            <div className="bg-obsidian/10 p-6 rounded mb-8 text-center">
              <p className="text-sm text-obsidian/80 mb-4">
                The archivist whispers: <em>"Records hidden where scribes leave notes. 
                Look at the foundation—the very source of this page."</em>
              </p>
              <p className="text-xs text-obsidian/60">
                (Hint: Builders of webpages leave comments. Inspect what lies beneath 
                the visible structure. A scholar's cipher—six characters—reveals the name.)
              </p>
            </div>

            <div className="bg-burgundy/10 p-4 border-2 border-burgundy rounded">
              <p className="text-sm font-bold text-burgundy mb-2">🔍 For the Curious:</p>
              <p className="text-xs text-obsidian/70">
                This stage explicitly requires source inspection. Right-click this page, 
                select "View Page Source" or "Inspect Element," and search for hidden 
                comments near the top of the file. A Base64-encoded string awaits decoding.
              </p>
            </div>
          </div>

          <InputCard
            onSubmit={validateAnswer}
            placeholder="Enter the orator's name..."
            hint1="Records hidden where scribes leave notes. Inspect what builders wrote."
            hint2="Look at the foundation—the very source. A name encoded in scholar's cipher awaits."
            stageNumber={3}
            savedInput={savedInput}
            onSuccess={handleSuccess}
          />
        </div>
      </Panel>

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

