"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* =====================================================================
 * Shared infrastructure
 * ===================================================================== */

const CameraRig = ({ intensity = 1 }) => {
  useFrame((state, delta) => {
    const { camera, pointer } = state;
    const targetX = pointer.x * 1.6 * intensity;
    const targetY = pointer.y * 0.9 * intensity;
    camera.position.x += (targetX - camera.position.x) * Math.min(1, delta * 2);
    camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 2);
    camera.position.z = 8 + Math.sin(state.clock.elapsedTime * 0.18) * 0.5;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const ReticleFrame = ({ color = "#ff5c00", radius = 3.4, opacity = 0.65 }) => {
  const points = useMemo(() => {
    const r = radius;
    return {
      tl: [[-r, r - 0.6, 0], [-r, r, 0], [-r + 0.6, r, 0]],
      tr: [[r - 0.6, r, 0], [r, r, 0], [r, r - 0.6, 0]],
      bl: [[-r, -r + 0.6, 0], [-r, -r, 0], [-r + 0.6, -r, 0]],
      br: [[r - 0.6, -r, 0], [r, -r, 0], [r, -r + 0.6, 0]],
    };
  }, [radius]);
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.04;
  });
  return (
    <group ref={ref}>
      {Object.values(points).map((pts, i) => (
        <Line key={i} points={pts} color={color} lineWidth={1} transparent opacity={opacity} />
      ))}
    </group>
  );
};

/* =====================================================================
 * EARTH — blue stylized globe with atmosphere + orbiting satellites
 * ===================================================================== */

const Earth = () => {
  const inner = useRef();
  const grid = useRef();
  const atmo = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (inner.current) inner.current.rotation.y = t * 0.08;
    if (grid.current) {
      grid.current.rotation.y = t * 0.08;
      grid.current.rotation.x = Math.sin(t * 0.12) * 0.05;
    }
    if (atmo.current) atmo.current.rotation.y = -t * 0.04;
  });

  return (
    <group>
      {/* Inner ocean sphere */}
      <mesh ref={inner}>
        <sphereGeometry args={[1.7, 64, 64]} />
        <meshBasicMaterial color="#0a1628" />
      </mesh>
      {/* Wireframe latitude/longitude grid — white */}
      <mesh ref={grid}>
        <sphereGeometry args={[1.72, 36, 24]} />
        <meshBasicMaterial color="#7cb8ff" wireframe transparent opacity={0.5} />
      </mesh>
      {/* Inner glow */}
      <mesh ref={atmo}>
        <sphereGeometry args={[1.78, 32, 32]} />
        <meshBasicMaterial color="#3a86ff" wireframe transparent opacity={0.18} />
      </mesh>
      {/* Atmosphere halo */}
      <mesh>
        <sphereGeometry args={[1.95, 64, 64]} />
        <meshBasicMaterial
          color="#3a86ff"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
      {/* City lights — sparkles on the surface */}
      <Sparkles
        count={120}
        scale={[3.6, 3.6, 3.6]}
        size={1.2}
        speed={0.2}
        color="#ffd166"
        opacity={0.8}
      />
    </group>
  );
};

const Satellite = ({ radius, speed, tilt, color = "#ffffff", size = 0.06 }) => {
  const ref = useRef();
  const orbit = useRef();
  useFrame((state) => {
    if (orbit.current) orbit.current.rotation.y = state.clock.elapsedTime * speed;
  });
  return (
    <group ref={orbit} rotation={[tilt, 0, 0]}>
      <mesh ref={ref} position={[radius, 0, 0]}>
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Orbit trail */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.003, 6, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>
    </group>
  );
};

const EarthScene = () => (
  <>
    <CameraRig />
    <Stars radius={70} depth={50} count={2400} factor={3} saturation={0} fade speed={0.3} />
    <Earth />
    <Satellite radius={2.6} speed={0.45} tilt={0.4} color="#ff5c00" size={0.08} />
    <Satellite radius={3.2} speed={-0.25} tilt={-0.6} color="#ffffff" />
    <Satellite radius={3.8} speed={0.18} tilt={1.1} color="#ffffff" size={0.05} />
    <ReticleFrame color="#ff5c00" radius={3.6} opacity={0.55} />
  </>
);

/* =====================================================================
 * MARS — rust globe with dust ring + storm particles
 * ===================================================================== */

const Mars = () => {
  const ref = useRef();
  const dust = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) ref.current.rotation.y = t * 0.06;
    if (dust.current) dust.current.rotation.y = -t * 0.08;
  });
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshBasicMaterial color="#3a0d04" />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.62, 36, 24]} />
        <meshBasicMaterial color="#ff5c00" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Crater glow */}
      <mesh>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial color="#d4691a" wireframe transparent opacity={0.18} />
      </mesh>
      {/* Dust storm halo */}
      <mesh ref={dust}>
        <sphereGeometry args={[1.85, 64, 64]} />
        <meshBasicMaterial color="#ff5c00" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
      <Sparkles count={80} scale={[3.4, 3.4, 3.4]} size={1.4} speed={0.35} color="#ff5c00" opacity={0.7} />
    </group>
  );
};

const MarsScene = () => (
  <>
    <CameraRig />
    <Stars radius={70} depth={50} count={1800} factor={2.5} saturation={0} fade speed={0.25} />
    <Mars />
    <Satellite radius={2.5} speed={0.35} tilt={0.7} color="#ff5c00" size={0.05} />
    <ReticleFrame color="#ff5c00" radius={3.2} opacity={0.5} />
  </>
);

/* =====================================================================
 * SATURN-LIKE — banded sphere with prominent rings
 * ===================================================================== */

const Saturn = () => {
  const ref = useRef();
  const rings = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) ref.current.rotation.y = t * 0.05;
    if (rings.current) rings.current.rotation.z = t * 0.02;
  });
  return (
    <group rotation={[0.4, 0, 0.18]}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshBasicMaterial color="#1a1208" />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.42, 24, 36]} />
        <meshBasicMaterial color="#d4a96a" wireframe transparent opacity={0.45} />
      </mesh>
      {/* Multi-band ring system */}
      <group ref={rings} rotation={[Math.PI / 2, 0, 0]}>
        {[1.9, 2.2, 2.5, 2.85, 3.2, 3.5].map((r, i) => (
          <mesh key={i}>
            <torusGeometry args={[r, 0.018, 6, 128]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#d4a96a" : "#ffffff"}
              transparent
              opacity={0.5 - i * 0.04}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const SaturnScene = () => (
  <>
    <CameraRig />
    <Stars radius={70} depth={50} count={2000} factor={3} saturation={0} fade speed={0.35} />
    <Saturn />
    <Satellite radius={4.2} speed={-0.12} tilt={1.2} color="#ff5c00" size={0.05} />
    <ReticleFrame color="#ff5c00" radius={3.9} opacity={0.45} />
  </>
);

/* =====================================================================
 * ASTEROID FIELD — drifting irregular rocks
 * ===================================================================== */

const Asteroid = ({ position, scale, speed }) => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.2 * speed;
    ref.current.rotation.y = t * 0.3 * speed;
    ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.15;
  });
  return (
    <Float speed={1} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.55} />
      </mesh>
    </Float>
  );
};

const AsteroidScene = () => {
  const rocks = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const radius = 2 + Math.random() * 2.5;
      arr.push({
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 2.4,
          Math.sin(angle) * radius - 1,
        ],
        scale: 0.18 + Math.random() * 0.45,
        speed: 0.3 + Math.random() * 0.8,
      });
    }
    return arr;
  }, []);
  return (
    <>
      <CameraRig intensity={1.2} />
      <Stars radius={60} depth={50} count={2200} factor={2.8} saturation={0} fade speed={0.4} />
      {rocks.map((r, i) => (
        <Asteroid key={i} {...r} />
      ))}
      {/* Central beacon */}
      <mesh position={[0, 0, -2]}>
        <icosahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color="#ff5c00" wireframe />
      </mesh>
      <ReticleFrame color="#ff5c00" radius={4.0} opacity={0.4} />
    </>
  );
};

/* =====================================================================
 * VOID — deep space, almost nothing
 * ===================================================================== */

const VoidScene = () => (
  <>
    <CameraRig intensity={0.6} />
    <Stars radius={80} depth={60} count={3500} factor={2.2} saturation={0} fade speed={0.15} />
    <Sparkles count={40} scale={[8, 8, 8]} size={2.5} speed={0.05} color="#ff5c00" opacity={0.5} />
    {/* Distant beacon */}
    <mesh position={[0, 0, -3]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color="#ff5c00" />
    </mesh>
    <ReticleFrame color="#ff5c00" radius={3.5} opacity={0.35} />
  </>
);

/* =====================================================================
 * Variant dispatch + Public component
 * ===================================================================== */

export const PLANET_META = {
  earth: { name: "EARTH", code: "TERRA-001", coords: "0.000°N · 0.000°E" },
  mars: { name: "MARS", code: "ARES-002", coords: "4.589°N · 137.441°E" },
  saturn: { name: "SATURN", code: "CRONUS-006", coords: "RING-DIVISION-A" },
  asteroid: { name: "ASTEROID BELT", code: "BELT-MAIN", coords: "2.2 - 3.2 AU" },
  void: { name: "DEEP VOID", code: "OUTER-RIM", coords: "SIGNAL LOST" },
};

const SceneDispatch = ({ variant }) => {
  switch (variant) {
    case "mars":
      return <MarsScene />;
    case "saturn":
      return <SaturnScene />;
    case "asteroid":
      return <AsteroidScene />;
    case "void":
      return <VoidScene />;
    case "earth":
    default:
      return <EarthScene />;
  }
};

const ThreeScene = ({ variant = "earth", className = "", vignette = true }) => {
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <SceneDispatch variant={variant} />
        </Suspense>
      </Canvas>
      {vignette && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      )}
    </div>
  );
};

export default ThreeScene;
