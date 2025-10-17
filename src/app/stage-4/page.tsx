/**
 * Stage IV - Web of Influence
 * Polybius Square + Vigenère Cipher (two-step decode)
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Panel } from '@/components/Panel';
import { CaptionBox } from '@/components/CaptionBox';
import { InputCard } from '@/components/InputCard';
import { ProgressBar } from '@/components/ProgressBar';
import { useStageGuard } from '@/lib/guard';
import { validateWithCandidates, timeSaltCandidates } from '@/lib/crypto';
import { setProgress, loadStageInput, saveStageInput } from '@/lib/progress';

export default function Stage4Page() {
  const router = useRouter();
  const { isChecking, isAllowed } = useStageGuard(4);
  const [savedInput] = useState(loadStageInput(4));
  const [showGrid, setShowGrid] = useState(false);

  const validateAnswer = async (input: string): Promise<boolean> => {
    const { v } = await import('@/validators/v4.js');
    
    // Get candidate salts and compute hashes
    const salts = timeSaltCandidates();
    const { hashWithTimeSalt } = await import('@/lib/crypto');
    
    const hashes = await Promise.all(
      salts.map(salt => hashWithTimeSalt(input, salt))
    );
    
    const isCorrect = v(hashes[0]) || v(hashes[1]);
    
    if (isCorrect) {
      setProgress(4);
      return true;
    }
    
    saveStageInput(4, input);
    return false;
  };

  const handleSuccess = () => {
    setTimeout(() => {
      router.push('/stage-5');
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

  // Polybius grid (I/J merged)
  const polybiusGrid = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I/J', 'K'],
    ['L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z'],
  ];

  return (
    <main className="min-h-screen comic-gutter page-transition">
      <ProgressBar />

      <Panel variant="hero" className="mb-8">
        <div className="relative min-h-[50vh] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-bronze/30 via-obsidian/80 to-obsidian"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h50v50H0V0zm50 50h50v50H50V50z' fill='%23b87333' fill-opacity='0.04'/%3E%3C/svg%3E")`,
            }}
          />

          <CaptionBox position="bottom" variant="narrator">
            <p className="mb-3">
              <strong className="text-xl text-bronze">Year Five. The Patron's Atrium.</strong>
            </p>
            <p className="mb-3">
              Citizenship secured, you now navigate Rome's true arena - influence. 
              Your patron, a senator of old blood, tests your cunning with coded messages.
            </p>
            <p className="mb-3">
              A courier delivers a mosaic fragment. Numbers hide in its corners - pairs 
              that reference an ancient Greek grid. Decode them, but beware: a second 
              veil awaits, woven with a keyword from Rome's founding motto.
            </p>
            <p className="text-bronze italic">
              Two ciphers, one truth. The Senate's own acronym shall be your reward.
            </p>
          </CaptionBox>

          <div className="absolute top-8 left-8 sfx-label opacity-20">
            WHISPER
          </div>
        </div>
      </Panel>

      <Panel variant="content" className="max-w-4xl mx-auto mb-8">
        <div className="space-y-6">
          <h1 className="font-display text-3xl md:text-5xl font-black text-burgundy text-center mb-6">
            WEB OF INFLUENCE
          </h1>

          <div className="prose prose-lg max-w-none text-obsidian">
            <p className="text-center italic mb-8 text-bronze font-semibold text-xl">
              "Navigate the double cipher"
            </p>

            {/* Mosaic with embedded Polybius coordinates */}
            <div className="bg-bronze/20 border-4 border-obsidian p-8 mb-8">
              <p className="text-center font-display text-2xl mb-6">MOSAIC MESSAGE</p>
              
              <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto mb-6">
                <div className="bg-burgundy/40 p-3 text-center font-bold text-parchment">34</div>
                <div className="bg-laurel/40 p-3 text-center font-bold text-parchment">31</div>
                <div className="bg-bronze/40 p-3 text-center font-bold text-parchment">42</div>
                <div className="bg-burgundy/40 p-3 text-center font-bold text-parchment">15</div>
              </div>

              <p className="text-sm text-center text-obsidian/70 mb-4">
                The numbers speak in Polybius pairs (row, column). Decipher them using 
                the ancient 5×5 grid below.
              </p>

              <button
                onClick={() => setShowGrid(!showGrid)}
                className="mx-auto block px-4 py-2 bg-obsidian text-parchment text-sm
                         hover:bg-obsidian/80 transition-colors rounded"
              >
                {showGrid ? 'Hide' : 'Show'} Polybius Grid
              </button>

              {showGrid && (
                <div className="mt-6 overflow-x-auto">
                  <table className="mx-auto border-2 border-obsidian">
                    <thead>
                      <tr>
                        <th className="p-2 border border-obsidian bg-parchment/50"></th>
                        {[1, 2, 3, 4, 5].map(col => (
                          <th key={col} className="p-2 border border-obsidian bg-parchment/50 font-bold">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {polybiusGrid.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <th className="p-2 border border-obsidian bg-parchment/50 font-bold">
                            {rowIndex + 1}
                          </th>
                          {row.map((letter, colIndex) => (
                            <td key={colIndex} className="p-2 border border-obsidian text-center bg-parchment">
                              {letter}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-xs text-center mt-2 text-obsidian/60">
                    Note: I and J share position 2,4
                  </p>
                </div>
              )}
            </div>

            {/* Vigenère hint */}
            <div className="bg-obsidian/10 p-6 rounded mb-8">
              <p className="text-sm mb-3">
                <strong>Step 1:</strong> Decode the Polybius pairs to get an intermediate word.
              </p>
              <p className="text-sm mb-3">
                <strong>Step 2:</strong> Apply Vigenère cipher to that word using the keyword <strong>"ROMA"</strong>.
              </p>
              <p className="text-xs text-obsidian/60 italic">
                (Hint: The Polybius pairs above decode to letters that form a Latin acronym. 
                Then shift each letter using the Vigenère table with keyword ROMA. 
                The result is Rome's most famous initialism.)
              </p>
            </div>

            <div className="bg-burgundy/10 p-4 border-2 border-burgundy rounded">
              <p className="text-sm font-bold text-burgundy mb-2">Historical Note:</p>
              <p className="text-xs text-obsidian/70">
                SPQR: <em>Senatus Populusque Romanus</em> - "The Senate and People of Rome." 
                This acronym appeared on military standards, public buildings, and coins 
                throughout Roman history.
              </p>
            </div>
          </div>

          <InputCard
            onSubmit={validateAnswer}
            placeholder="Enter the final decoded acronym..."
            hint1="The grid of Polybius awaits. Numbers hide in mosaic corners - five by five."
            hint2="First decode the squares, then a keyword from history veils the truth once more."
            stageNumber={4}
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

