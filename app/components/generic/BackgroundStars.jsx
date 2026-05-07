"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";

/* ---------------------------------------------------------------
 * Slow auto-drift rig — no mouse parallax (would compete with hero)
 * Pans the camera in a wide elliptical orbit around the origin
 * to create perpetual subtle motion in the background field.
 * --------------------------------------------------------------- */
const DriftRig = () => {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { camera } = state;
    camera.position.x = Math.sin(t * 0.04) * 1.4;
    camera.position.y = Math.cos(t * 0.03) * 0.8;
    camera.position.z = 6 + Math.sin(t * 0.05) * 0.6;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

/* ---------------------------------------------------------------
 * Slowly rotating star field — far layer
 * --------------------------------------------------------------- */
const FarStars = () => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.008;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
  });
  return (
    <group ref={ref}>
      <Stars
        radius={120}
        depth={80}
        count={5000}
        factor={2.4}
        saturation={0}
        fade
        speed={0.1}
      />
    </group>
  );
};

/* ---------------------------------------------------------------
 * Mid-distance star layer — counter-rotation for parallax depth
 * --------------------------------------------------------------- */
const MidStars = () => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = -state.clock.elapsedTime * 0.014;
  });
  return (
    <group ref={ref}>
      <Stars
        radius={60}
        depth={40}
        count={1200}
        factor={1.8}
        saturation={0}
        fade
        speed={0.25}
      />
    </group>
  );
};

/* ---------------------------------------------------------------
 * Background scene
 * --------------------------------------------------------------- */
const BackgroundContents = () => (
  <>
    <DriftRig />
    <FarStars />
    <MidStars />
    {/* Faint ember dust — barely there, anchors the brand color */}
    <Sparkles
      count={50}
      scale={[18, 12, 12]}
      size={1.4}
      speed={0.08}
      color="#ff5c00"
      opacity={0.25}
    />
  </>
);

/* ---------------------------------------------------------------
 * Public component — fixed full-viewport, behind everything
 * --------------------------------------------------------------- */
const BackgroundStars = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
        // No demand-driven frameloop here — it animates continuously
      >
        <Suspense fallback={null}>
          <BackgroundContents />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BackgroundStars;
