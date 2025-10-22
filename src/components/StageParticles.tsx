'use client';

import { useMemo } from 'react';
import Particles from '@tsparticles/react';
import type { ISourceOptions } from '@tsparticles/engine';

interface StageParticlesProps {
  theme: 'chains' | 'blood' | 'gold' | 'web' | 'imperial' | 'victory';
}

export function StageParticles({ theme }: StageParticlesProps) {

  const options: ISourceOptions = useMemo(() => {
    const baseConfig = {
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
          resize: { enable: true } as any,
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
        },
      },
      particles: {
        number: { density: { enable: true, width: 1920, height: 1080 }, value: 80 },
        opacity: { value: { min: 0.3, max: 0.8 } },
        size: { value: { min: 2, max: 5 } },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'none' as const,
          random: true,
          straight: false,
          outModes: { default: 'out' as const },
        },
      },
      detectRetina: true,
    };

    switch (theme) {
      case 'chains':
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            color: { value: ['#0077B6', '#00B4D8', '#90E0EF'] },
            shape: { type: 'circle' },
            number: { ...baseConfig.particles.number, value: 40 },
            move: { ...baseConfig.particles.move, speed: 0.3 },
            links: {
              enable: true,
              distance: 150,
              color: '#0077B6',
              opacity: 0.2,
              width: 1,
            },
          },
        };

      case 'blood':
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            color: { value: ['#DC2626', '#EF4444', '#F97316'] },
            shape: { type: ['circle', 'triangle'] },
            number: { ...baseConfig.particles.number, value: 60 },
            opacity: { value: { min: 0.2, max: 0.6 } },
            move: {
              ...baseConfig.particles.move,
              speed: 1.5,
              direction: 'bottom' as const,
            },
          },
        };

      case 'gold':
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            color: { value: ['#FFD700', '#FFA500', '#FFEC8B'] },
            shape: { type: 'circle' },
            number: { ...baseConfig.particles.number, value: 30 },
            opacity: { value: { min: 0.3, max: 0.7 } },
            size: { value: { min: 2, max: 5 } },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 1,
              },
            },
            move: {
              ...baseConfig.particles.move,
              speed: 0.2,
              direction: 'top' as const,
            },
          },
        };

      case 'web':
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            color: { value: ['#22C55E', '#10B981', '#86EFAC'] },
            shape: { type: 'circle' },
            number: { ...baseConfig.particles.number, value: 50 },
            links: {
              enable: true,
              distance: 120,
              color: '#22C55E',
              opacity: 0.3,
              width: 2,
              triangles: {
                enable: true,
                color: '#22C55E',
                opacity: 0.05,
              },
            },
            move: { ...baseConfig.particles.move, speed: 0.4 },
          },
        };

      case 'imperial':
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            color: { value: ['#8B5CF6', '#A78BFA', '#C4B5FD'] },
            shape: { type: 'circle' },
            number: { ...baseConfig.particles.number, value: 70 },
            opacity: { value: { min: 0.2, max: 0.6 } },
            size: { value: { min: 1, max: 4 } },
            move: {
              ...baseConfig.particles.move,
              speed: 0.8,
              direction: 'none' as const,
              outModes: { default: 'bounce' as const },
            },
          },
        };

      case 'victory':
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            color: { value: ['#FFD700', '#FFA500', '#FF8C00'] },
            shape: { type: 'circle' },
            number: { ...baseConfig.particles.number, value: 100 },
            opacity: { value: { min: 0.4, max: 0.8 } },
            size: { value: { min: 2, max: 6 } },
            move: {
              ...baseConfig.particles.move,
              speed: 2,
              direction: 'top' as const,
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.1,
                opacity: 1,
              },
            },
          },
        };

      default:
        return baseConfig;
    }
  }, [theme]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <Particles id={`particles-${theme}`} options={options} />
    </div>
  );
}

