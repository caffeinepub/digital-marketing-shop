import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

function FloatingGeometry() {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1, 64, 64]} position={[-3, 2, -2]}>
          <MeshDistortMaterial
            color="#0D7B7B"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[3, -1, -1]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial
            color="#D4AF37"
            roughness={0.1}
            metalness={0.9}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[0, 1, -3]} rotation={[Math.PI / 6, 0, 0]}>
          <torusGeometry args={[1, 0.3, 32, 100]} />
          <meshStandardMaterial
            color="#0A7B7B"
            roughness={0.15}
            metalness={0.85}
            envMapIntensity={1.2}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.4}>
        <mesh position={[-2, -2, -2]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#F4D03F"
            roughness={0.2}
            metalness={0.7}
            envMapIntensity={1.3}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#D4AF37" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        color="#0D7B7B"
      />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <Suspense fallback={null}>
          <Lights />
          <FloatingGeometry />
          <Environment preset="city" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
