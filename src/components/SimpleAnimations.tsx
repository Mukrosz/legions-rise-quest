'use client';

interface SimpleAnimationsProps {
  theme: 'chains' | 'blood' | 'gold' | 'web' | 'imperial' | 'victory';
}

export function SimpleAnimations({ theme }: SimpleAnimationsProps) {
  const colors = {
    chains: { primary: '#0077B6', secondary: '#00B4D8' },
    blood: { primary: '#DC2626', secondary: '#EF4444' },
    gold: { primary: '#FFD700', secondary: '#FFA500' },
    web: { primary: '#22C55E', secondary: '#10B981' },
    imperial: { primary: '#8B5CF6', secondary: '#A78BFA' },
    victory: { primary: '#FFD700', secondary: '#FF8C00' },
  };

  const { primary, secondary } = colors[theme];

  return (
    <>
      {/* Floating Orbs */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            width: `${80 + i * 20}px`,
            height: `${80 + i * 20}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${secondary}aa, ${primary}44)`,
            top: `${20 + i * 15}%`,
            left: `${10 + i * 18}%`,
            zIndex: 1,
            pointerEvents: 'none',
            animation: `float${i} ${4 + i}s ease-in-out infinite`,
            filter: 'blur(2px)',
            boxShadow: `0 0 40px ${primary}88`,
          }}
        />
      ))}

      {/* Particle Dots */}
      {[...Array(50)].map((_, i) => (
        <div
          key={`dot-${i}`}
          style={{
            position: 'fixed',
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            borderRadius: '50%',
            background: primary,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 1,
            pointerEvents: 'none',
            animation: `twinkle ${1 + Math.random() * 3}s ease-in-out infinite`,
            opacity: 0.6,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float0 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 40px) scale(0.9); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 20px) scale(1.05); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, -25px) scale(0.95); }
        }
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(25px, 35px) scale(1.08); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}

