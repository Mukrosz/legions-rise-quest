/**
 * Stage II - Blood of the Arena
 * Steganography + Logic Riddle
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Panel } from '@/components/Panel';
import { CaptionBox } from '@/components/CaptionBox';
import { InputCard } from '@/components/InputCard';
import { ProgressBar } from '@/components/ProgressBar';
import { useStageGuard } from '@/lib/guard';
import { hashWithPepper, derivePepper } from '@/lib/crypto';
import { setProgress, loadStageInput, saveStageInput } from '@/lib/progress';

export default function Stage2Page() {
  const router = useRouter();
  const { isChecking, isAllowed } = useStageGuard(2);
  const [savedInput] = useState(loadStageInput(2));

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

  const handleSuccess = () => {
    setTimeout(() => {
      router.push('/stage-3');
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
            className="absolute inset-0 bg-gradient-to-br from-burgundy/60 via-obsidian/70 to-obsidian"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23b87333' fill-opacity='0.05'/%3E%3C/svg%3E")`,
            }}
          />

          <CaptionBox position="bottom" variant="narrator">
            <p className="mb-3">
              <strong className="text-xl text-bronze">Year One. Ludus Magnus, Capua.</strong>
            </p>
            <p className="mb-3">
              You grip the rudis—a wooden sword, lighter than the blade you once bore. 
              The lanista watches, calculating your worth in blood and coin.
            </p>
            <p className="mb-3">
              A grizzled veteran approaches, marking the sand with his toe. Three ranks, 
              he mutters: Tiro, Veteranus, Rudiarius. "Know their order, know your future." 
              The map he leaves holds more than training grounds.
            </p>
            <p className="text-bronze italic">
              What the eye misses, the mind reveals. The arena's true name is your passage.
            </p>
          </CaptionBox>

          <div className="absolute top-8 left-8 sfx-label opacity-20">
            THWACK
          </div>
        </div>
      </Panel>

      <Panel variant="content" className="max-w-4xl mx-auto mb-8">
        <div className="space-y-6">
          <h1 className="font-display text-3xl md:text-5xl font-black text-burgundy text-center mb-6">
            BLOOD OF THE ARENA
          </h1>

          <div className="prose prose-lg max-w-none text-obsidian">
            <p className="text-center italic mb-8 text-bronze font-semibold text-xl">
              "The arena speaks in hidden tongues"
            </p>

            {/* Arena Map Placeholder */}
            <div className="relative bg-bronze/20 border-4 border-obsidian p-8 mb-8">
              <div className="text-center space-y-4">
                <p className="font-display text-2xl text-obsidian mb-4">TRAINING GROUNDS MAP</p>
                
                {/* Visual puzzle: ranks in specific order spell hint */}
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="bg-parchment p-4 border-2 border-obsidian">
                    <p className="font-bold">North</p>
                    <p className="text-sm">TIRO</p>
                    <p className="text-xs text-obsidian/60">G-L</p>
                  </div>
                  <div className="bg-parchment p-4 border-2 border-obsidian">
                    <p className="font-bold">Center</p>
                    <p className="text-sm">VETERANUS</p>
                    <p className="text-xs text-obsidian/60">A-D</p>
                  </div>
                  <div className="bg-parchment p-4 border-2 border-obsidian">
                    <p className="font-bold">South</p>
                    <p className="text-sm">RUDIARIUS</p>
                    <p className="text-xs text-obsidian/60">I-U-S</p>
                  </div>
                </div>

                <p className="text-sm italic text-obsidian/70 mt-6">
                  {/* Hidden metadata: R3VkaXVz */}
                  The veteran's wooden sword holds a name. Three ranks, three parts, one truth.
                </p>
              </div>
            </div>

            <div className="bg-obsidian/10 p-4 rounded mb-8">
              <p className="text-xs text-obsidian/60 italic">
                <strong>Logic Riddle:</strong> The three ranks spell a path. 
                Their positions reveal letters. The weapon of freedom has a Latin name.
              </p>
            </div>
          </div>

          <InputCard
            onSubmit={validateAnswer}
            placeholder="Enter the weapon's name..."
            hint1="The arena map holds secrets. Look beyond what eyes can see—pixels whisper."
            hint2="Three ranks converge. The wooden sword's true name is your passage."
            stageNumber={2}
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

