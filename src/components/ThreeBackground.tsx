'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Suspense } from 'react';

interface ThreeBackgroundProps {
  theme: 'chains' | 'blood' | 'gold' | 'web' | 'imperial' | 'victory';
}

function ChainScene() {
  return (
    <>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#0077B6" />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1, 32, 32]} position={[-2, 0, 0]}>
          <MeshDistortMaterial color="#00B4D8" attach="material" distort={0.3} speed={2} roughness={0.4} />
        </Sphere>
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.7}>
        <Sphere args={[0.8, 32, 32]} position={[2, 1, -2]}>
          <MeshDistortMaterial color="#0077B6" attach="material" distort={0.4} speed={1.5} roughness={0.4} />
        </Sphere>
      </Float>
    </>
  );
}

function BloodScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#DC2626" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#F97316" />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial color="#DC2626" attach="material" distort={0.6} speed={3} roughness={0.2} metalness={0.8} />
        </Sphere>
      </Float>
      {[...Array(5)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere args={[0.3, 16, 16]} position={[Math.cos(i * 1.26) * 3, Math.sin(i * 1.26) * 2, -3]}>
            <meshStandardMaterial color="#EF4444" roughness={0.5} />
          </Sphere>
        </Float>
      ))}
    </>
  );
}

function GoldScene() {
  return (
    <>
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0.5} fade speed={0.3} />
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#FFD700" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1.5} color="#FFA500" />
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere args={[1.2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#FFD700"
            attach="material"
            distort={0.2}
            speed={1}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      </Float>
    </>
  );
}

function WebScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#22C55E" />
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={0.5 + i * 0.2} rotationIntensity={0.3} floatIntensity={0.4}>
          <Sphere args={[0.4, 16, 16]} position={[Math.cos(i * 0.785) * 4, Math.sin(i * 0.785) * 4, -5]}>
            <meshStandardMaterial color="#22C55E" emissive="#10B981" emissiveIntensity={0.5} roughness={0.6} />
          </Sphere>
        </Float>
      ))}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial color="#10B981" attach="material" distort={0.4} speed={2} roughness={0.3} />
        </Sphere>
      </Float>
    </>
  );
}

function ImperialScene() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={5} saturation={0.8} fade speed={0.8} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#8B5CF6" />
      <pointLight position={[-10, -10, 10]} intensity={1} color="#A78BFA" />
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
        <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#8B5CF6"
            attach="material"
            distort={0.5}
            speed={2.5}
            roughness={0.2}
            metalness={0.7}
          />
        </Sphere>
      </Float>
      {[...Array(3)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.3} rotationIntensity={0.4} floatIntensity={0.6}>
          <Sphere args={[0.5, 32, 32]} position={[Math.cos(i * 2.09) * 3, Math.sin(i * 2.09) * 2, -2]}>
            <meshStandardMaterial color="#A78BFA" emissive="#8B5CF6" emissiveIntensity={0.3} />
          </Sphere>
        </Float>
      ))}
    </>
  );
}

function VictoryScene() {
  return (
    <>
      <Stars radius={100} depth={50} count={8000} factor={6} saturation={1} fade speed={1} />
      <ambientLight intensity={0.7} />
      <pointLight position={[0, 5, 5]} intensity={2} color="#FFD700" />
      <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} color="#FFA500" />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1.8, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#FFD700"
            attach="material"
            distort={0.7}
            speed={4}
            roughness={0.0}
            metalness={1}
          />
        </Sphere>
      </Float>
      {[...Array(12)].map((_, i) => (
        <Float key={i} speed={2 + i * 0.2} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[0.2, 16, 16]} position={[Math.cos(i * 0.524) * 5, Math.sin(i * 0.524) * 5, -3]}>
            <meshStandardMaterial color="#FFA500" emissive="#FFD700" emissiveIntensity={1} />
          </Sphere>
        </Float>
      ))}
    </>
  );
}

export function ThreeBackground({ theme }: ThreeBackgroundProps) {
  const SceneComponent = {
    chains: ChainScene,
    blood: BloodScene,
    gold: GoldScene,
    web: WebScene,
    imperial: ImperialScene,
    victory: VictoryScene,
  }[theme];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.6,
        pointerEvents: 'none',
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <SceneComponent />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

