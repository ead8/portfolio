"use client";

import React from "react";

const WireframeCube = ({ size = 80 }) => {
  const half = size / 2;
  const faceStyle = {
    width: `${size}px`,
    height: `${size}px`,
    position: "absolute",
    border: "1px solid rgba(255, 255, 255, 0.45)",
    background: "rgba(0, 0, 0, 0.2)",
  };

  return (
    <div
      className="wireframe-cube-scene"
      style={{
        perspective: `${size * 12}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      aria-hidden
    >
      <div className="wireframe-cube">
        <div style={{ ...faceStyle, transform: `translateZ(${half}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${half}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${half}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${half}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
      </div>
    </div>
  );
};

export default WireframeCube;
