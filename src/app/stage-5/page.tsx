/**
 * Stage V - Vox Senatus (Voice of the Senate)
 * Final keyed challenge with split-hash validation
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Panel } from '@/components/Panel';
import { CaptionBox } from '@/components/CaptionBox';
import { InputCard } from '@/components/InputCard';
import { ProgressBar } from '@/components/ProgressBar';
import { useStageGuard } from '@/lib/guard';
import { sha256Hex, normalize, xorHex } from '@/lib/crypto';
import { setProgress, loadStageInput, saveStageInput } from '@/lib/progress';

export default function Stage5Page() {
  const router = useRouter();
  const { isChecking, isAllowed } = useStageGuard(5);
  const [savedInput] = useState(loadStageInput(5));
  const [showSuccess, setShowSuccess] = useState(false);

  const validateAnswer = async (input: string): Promise<boolean> => {
    // Dynamic import of split validators
    const [{ p1, hint1 }, { p2, target }] = await Promise.all([
      import('@/validators/v5a.js'),
      import('@/validators/v5b.js'),
    ]);

    // Merge XOR parts to get expected hash
    const expectedHash = xorHex(p1, p2);
    
    // Hash the user input
    const userHash = await sha256Hex('VOX' + normalize(input));
    
    const isCorrect = userHash === target;
    
    if (isCorrect) {
      setProgress(5);
      setShowSuccess(true);
      return true;
    }
    
    saveStageInput(5, input);
    return false;
  };

  const handleSuccess = () => {
    // Show laurel animation before redirect
    setTimeout(() => {
      router.push('/victory');
    }, 3000);
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

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 animate-panel-wipe">
          <div className="text-center space-y-6">
            <div className="text-8xl animate-laurel-glow">🏛️</div>
            <h2 className="font-display text-5xl font-black text-bronze">
              SENATOR ACHIEVIUM
            </h2>
            <p className="text-parchment text-xl italic">
              The Senate recognizes your ascent...
            </p>
          </div>
        </div>
      )}

      <Panel variant="hero" className="mb-8">
        <div className="relative min-h-[50vh] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-laurel/40 via-obsidian/60 to-obsidian"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0l60 60-60 60L0 60z' fill='%23b87333' fill-opacity='0.03'/%3E%3C/svg%3E")`,
            }}
          />

          <CaptionBox position="bottom" variant="narrator">
            <p className="mb-3">
              <strong className="text-xl text-bronze">Year Ten. Curia Julia.</strong>
            </p>
            <p className="mb-3">
              You stand at the threshold of Rome's beating heart. Five trials behind you: 
              chains decoded, arenas conquered, citizenship earned, influence woven, and now-
              the Senate awaits your voice.
            </p>
            <p className="mb-3">
              The Princeps Senator calls for the final proof. "Speak your name," he commands. 
              "Not the one Rome gave you, but the one you forged through fire and wit."
            </p>
            <p className="text-bronze italic font-bold">
              Declare yourself. Let the Curia record your full name for posterity.
            </p>
          </CaptionBox>

          <div className="absolute top-8 right-8 sfx-label opacity-20">
            TRIUMPH
          </div>
        </div>
      </Panel>

      <Panel variant="content" className="max-w-4xl mx-auto mb-8">
        <div className="space-y-6">
          <h1 className="font-display text-3xl md:text-5xl font-black text-burgundy text-center mb-6">
            VOX SENATUS
          </h1>

          <div className="prose prose-lg max-w-none text-obsidian">
            <p className="text-center italic mb-8 text-bronze font-semibold text-2xl">
              "The final decree"
            </p>

            <div className="bg-parchment/50 p-8 border-4 border-bronze mb-8">
              <p className="font-display text-xl text-center mb-6 text-burgundy">
                THE FIVE FRAGMENTS
              </p>
              
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-bold text-bronze">I. Chains:</span> You broke 
                  Caesar's cipher and claimed the word of freedom.
                </p>
                <p>
                  <span className="font-bold text-bronze">II. Arena:</span> The rudis 
                  bore a Latin name, earned through blood and sand.
                </p>
                <p>
                  <span className="font-bold text-bronze">III. Citizenship:</span> An 
                  orator's name, defender of the Republic, found in hidden script.
                </p>
                <p>
                  <span className="font-bold text-bronze">IV. Influence:</span> The 
                  Senate's acronym, decoded through grid and veil.
                </p>
                <p>
                  <span className="font-bold text-bronze">V. Voice:</span> Now speak 
                  the name that binds all trials-the warrior who ascended.
                </p>
              </div>
            </div>

            <div className="bg-obsidian/10 p-6 rounded mb-8">
              <p className="text-sm mb-4">
                From the caravan to the Curia, one identity persisted. The Dardanian 
                warrior who became gladiator, freedman, citizen, and senator.
              </p>
              <p className="text-sm font-bold text-burgundy">
                His full name is <span className="text-bronze">KAESO DARDANUS</span>.
              </p>
              <p className="text-xs text-obsidian/60 italic mt-4">
                (This final answer synthesizes your entire journey. Enter the protagonist's 
                complete name as revealed throughout the trials.)
              </p>
            </div>

            <div className="bg-laurel/10 p-6 border-2 border-laurel rounded text-center">
              <p className="text-sm font-bold text-laurel mb-3">
                🏛️ SENATORIAL DECREE 🏛️
              </p>
              <p className="text-xs text-obsidian/70 italic">
                "Let it be known that on this day, one who entered Rome in chains departs 
                with the laurel. The Senate and People of Rome recognize excellence born 
                of trial and tribulation. Gloria et Honor."
              </p>
            </div>
          </div>

          <InputCard
            onSubmit={validateAnswer}
            placeholder="Enter the full name..."
            hint1="Fragments from five trials converge. Speak the warrior's full name-his identity reclaimed."
            hint2="His journey began in chains, rose through blood, earned rights, wielded influence, and now speaks with authority."
            stageNumber={5}
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

