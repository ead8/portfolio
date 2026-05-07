"use client";

import React from "react";
import Tilt from "react-parallax-tilt";
import CardLock from "./CardLock";
import ProjectArtwork from "./ProjectArtwork";

const ImageCard = ({ data, clickHandler }) => {
  const { title, subTitle, imgSrc, isLocked, artworkKind } = data ?? {};
  const hasImage = Boolean(imgSrc);

  return (
    <Tilt
      perspective={1400}
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      glareEnable
      glareMaxOpacity={0.12}
      glareColor="#ff5c00"
      glarePosition="all"
      transitionSpeed={1500}
      scale={1.015}
      tiltReverse={false}
      className="tilt-3d w-full h-full"
    >
      <div
        onClick={() => !isLocked && clickHandler && clickHandler()}
        className="group relative bg-void border border-ghost-16 hover:border-ghost transition-colors duration-300 cursor-pointer overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* INDEX METADATA */}
        <div
          className="flex items-center justify-between px-4 pt-4 meta-mono text-ghost-32"
          style={{ transform: "translateZ(20px)" }}
        >
          <span>[ {String(data?.id ?? "—").padStart(2, "0")} ]</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-ember">
            OPEN →
          </span>
        </div>

        {/* IMAGE OR ARTWORK — full image visible, never cropped */}
        <div
          className="relative aspect-video overflow-hidden mt-4 mx-4 mb-4 border border-ghost-16 bg-void"
          style={{ width: "calc(100% - 2rem)", transform: "translateZ(35px)" }}
        >
          {hasImage ? (
            <img
              src={imgSrc}
              alt={title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain object-center grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out"
            />
          ) : (
            <ProjectArtwork kind={artworkKind} />
          )}
          {isLocked && <CardLock />}
        </div>

        {/* CAPTION */}
        <div className="px-4 pb-5" style={{ transform: "translateZ(15px)" }}>
          <p className="meta-mono text-ash mb-2">{subTitle}</p>
          <h3 className="font-display text-[24px] lg:text-[28px] leading-tight uppercase tracking-[-0.02em] text-ghost group-hover:text-ember transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </Tilt>
  );
};

export default ImageCard;
