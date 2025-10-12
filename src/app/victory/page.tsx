/**
 * Victory Page - Journey Complete
 * Shown after completing all five stages
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Panel } from '@/components/Panel';
import { getProgress } from '@/lib/progress';

export default function VictoryPage() {
  const router = useRouter();
  const [progress, setProgress] = useState({ stage: 0, timestamp: 0 });

  useEffect(() => {
    const p = getProgress();
    setProgress(p);
    
    // Redirect if not completed
    if (p.stage < 5) {
      router.push('/');
    }
  }, [router]);

  if (progress.stage < 5) {
    return null;
  }

  const completionDate = new Date(progress.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen flex items-center justify-center p-4 page-transition">
      <Panel variant="hero" className="w-full max-w-4xl relative overflow-hidden">
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center p-8">
          {/* Background gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-laurel/30 via-bronze/20 to-obsidian"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L100 50L50 100L0 50z' fill='%23b87333' fill-opacity='0.06'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Laurel wreaths */}
          <div className="absolute top-8 left-8 text-8xl animate-laurel-glow">🌿</div>
          <div className="absolute top-8 right-8 text-8xl animate-laurel-glow transform scale-x-[-1]">🌿</div>

          {/* Content */}
          <div className="relative z-10 text-center space-y-8">
            <div className="text-9xl mb-8 animate-bounce">🏛️</div>

            <h1 className="font-display text-5xl md:text-7xl font-black text-bronze mb-4 tracking-wide">
              SENATOR ACHIEVIUM
            </h1>

            <div className="max-w-2xl mx-auto space-y-6 text-parchment">
              <p className="text-xl md:text-2xl font-display">
                From chains to the Curia. From captive to consul.
              </p>

              <div className="bg-parchment/20 border-4 border-bronze p-8 backdrop-blur-sm">
                <p className="font-serif text-base md:text-lg mb-4 text-parchment/90">
                  <strong>SENATUS POPULUSQUE ROMANUS</strong>
                </p>
                <p className="text-sm md:text-base text-parchment/80">
                  Let it be recorded that <strong>KAESO DARDANUS</strong>, once 
                  enslaved, has ascended through wit, cunning, and unyielding resolve 
                  to claim a seat among Rome's nobility.
                </p>
                <p className="text-sm md:text-base text-parchment/80 mt-4">
                  Five trials conquered. Five ciphers decoded. One legacy forged.
                </p>
                <p className="text-bronze font-display text-lg mt-6 italic">
                  Gloria et Honor
                </p>
              </div>

              <div className="text-sm text-parchment/60 space-y-2">
                <p>Journey completed: {completionDate}</p>
                <p>Stages mastered: 5/5</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <button
                onClick={() => router.push('/')}
                className="px-8 py-4 bg-bronze hover:bg-bronze/80
                         text-parchment font-display text-xl font-bold
                         border-4 border-obsidian
                         transition-all duration-200
                         transform hover:scale-[1.05]"
              >
                Return to Landing
              </button>
            </div>

            {/* Share section */}
            <div className="mt-16 pt-8 border-t-2 border-parchment/20">
              <p className="text-sm text-parchment/60 mb-4">
                Share your achievement:
              </p>
              <div className="flex gap-4 justify-center text-3xl">
                <span className="cursor-pointer hover:scale-110 transition-transform" title="Twitter">🐦</span>
                <span className="cursor-pointer hover:scale-110 transition-transform" title="Facebook">📘</span>
                <span className="cursor-pointer hover:scale-110 transition-transform" title="LinkedIn">💼</span>
              </div>
            </div>
          </div>

          {/* Bottom laurels */}
          <div className="absolute bottom-8 left-8 text-8xl animate-laurel-glow transform rotate-180">🌿</div>
          <div className="absolute bottom-8 right-8 text-8xl animate-laurel-glow transform scale-x-[-1] rotate-180">🌿</div>
        </div>
      </Panel>
    </main>
  );
}

