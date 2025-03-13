"use client";

import React, { useEffect, useState } from "react";
import Figure from "../components/generic/Figure";
import aboutImg1 from "@/public/other/about-img-1.jpg";
import aboutImg2 from "@/public/other/about-img-2.jpg";
import aboutImg3 from "@/public/other/about-img-3.jpg";
import aboutImg4 from "@/public/other/about-img-4.jpg";
import { techLogosArrayComplete } from "../utils/iconExporter";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { motion } from "framer-motion";

const spotLightVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 3 } },
};

const contentContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.23,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
};

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <motion.div
      variants={contentContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
      }}
      id="about-section"
      className="flex flex-col w-full h-full mx-auto px-6 lg:px-32 overflow-hidden"
    >
      {isVisible && (
        <motion.div
          variants={spotLightVariants}
          initial="hidden"
          animate="visible"
          className="absolute flex -top-[300%] -left-[300%] bottom-0 right-0 blur-3xl"
          style={{
            background: `radial-gradient(circle at center, rgba(255,93,212, 1) 0%, rgba(255,93,212, 0.9) 50%, rgba(255,93,212, 0.3) 50%, rgba(255,93,212, 0), rgba(255,93,212, 0), transparent, transparent)`,
          }}
        />
      )}
      <div className="relative w-full flex flex-col items-center justify-between py-10 lg:py-16">
        {/* WHO AM I */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 z-10">
          <div className="w-full md:w-2/3">
            <motion.h1
              variants={contentVariants}
              className="font-display text-xs leading-snug tracking-wider text-secondary font-extrabold mb-2"
            >
              WHO AM I
            </motion.h1>
            <motion.p
              variants={contentVariants}
              className="text-sm leading-relaxed tracking-normal font-medium mb-3"
            >
              I’m <span className="text-secondary font-bold">Ebisa Dugo</span>,
              born and raised in Addis Ababa, Ethiopia. From an early age, I’ve
              been fascinated by the worlds of{" "}
              <span className="text-secondary">gaming</span>,{" "}
              <span className="text-secondary">anime</span>,{" "}
              <span className="text-secondary">mathematics</span>, and{" "}
              <span className="text-secondary">physics</span>. Whether I was
              exploring virtual realms, solving tricky math puzzles, or
              pondering the laws of the universe, I found endless ways to fuel
              my curiosity.
            </motion.p>
            <motion.p
              variants={contentVariants}
              className="text-sm leading-relaxed tracking-normal font-medium mb-3"
            >
              Growing up, anime series like{" "}
              <Link
                href="https://www.crunchyroll.com/"
                target="_blank"
                className="underline underline-offset-2 text-secondary hover:text-accent"
              >
                Naruto
              </Link>{" "}
              and{" "}
              <Link
                href="https://www.crunchyroll.com/attack-on-titan"
                target="_blank"
                className="underline underline-offset-2 text-secondary hover:text-accent"
              >
                Attack on Titan
              </Link>{" "}
              sparked my imagination, while online multiplayer games taught me
              about collaboration and strategy. It was a thrilling mix of fun
              and learning that shaped who I am today.
            </motion.p>
          </div>
          <div className="hidden w-full h-full lg:w-1/2 lg:flex justify-center">
            <Figure
              src={aboutImg1.src}
              size="w-[400px] h-[300px]"
              caption="Discovering new worlds"
              tag="IMAGINE"
            />
          </div>
        </div>

        <Stripes position="right" rotation="rotate-45" isTop={true} isLeft={true} />

        {/* PRO-GAMING TO PROGRAMMING */}
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-5 z-10">
          <div className="w-full md:w-2/3">
            <motion.h1
              variants={contentVariants}
              className="font-display text-xs leading-snug tracking-wider text-secondary font-extrabold mb-2"
            >
              PRO-GAMING TO PROGRAMMING
            </motion.h1>
            <motion.p
              variants={contentVariants}
              className="text-sm leading-relaxed tracking-normal font-medium mb-3"
            >
              At one point, I was fully convinced I’d become a professional
              gamer. Hours of practice in competitive titles like{" "}
              <Link
                href="https://store.steampowered.com/app/730/CounterStrike_2/"
                target="_blank"
                className="underline underline-offset-2 text-secondary hover:text-accent"
              >
                Counter-Strike
              </Link>{" "}
              fueled a dream of competing on the biggest stages. However, an
              unexpected introduction to{" "}
              <span className="text-secondary">programming</span> completely
              changed my trajectory.
            </motion.p>
            <motion.p
              variants={contentVariants}
              className="text-sm leading-relaxed tracking-normal font-medium mb-3"
            >
              I discovered a local initiative offering courses in{" "}
              <span className="text-secondary">web development</span> and{" "}
              <span className="text-secondary">mobile app creation</span>.
              Curious about building my own digital worlds, I dove in headfirst.
              It was the perfect blend of logical problem-solving (just like
              math) and boundless creativity (the same spark that drew me to
              anime and gaming).
            </motion.p>
            <motion.p
              variants={contentVariants}
              className="text-sm leading-relaxed tracking-normal font-medium mb-3"
            >
              Eager to expand my knowledge, I then enrolled in a{" "}
              <span className="text-secondary">Computer Science</span> program
              at{" "}
              <Link
                href="https://www.aau.edu.et/"
                target="_blank"
                className="underline underline-offset-2 text-secondary hover:text-accent"
              >
                Addis Ababa University
              </Link>
              . Each course and project felt like leveling up in a game—except
              this time, the high score meant real-world impact.
            </motion.p>
          </div>
          <div className="hidden w-full h-full lg:w-1/2 lg:flex justify-center">
            <Figure
              src={aboutImg4.src}
              size="w-[400px] h-[300px]"
              caption="From console to code"
              tag="IMAGINE"
            />
          </div>
        </div>

        <Stripes position="left" rotation="-rotate-45" isTop={false} isLeft={false} />

        {/* HOW DO I SPEND MY SPARE TIME */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 z-10">
          <div className="w-full md:w-2/3">
            <motion.h1
              variants={contentVariants}
              className="font-display text-xs leading-snug tracking-wider text-secondary font-extrabold mb-2"
            >
              HOW DO I SPEND MY SPARE TIME
            </motion.h1>
            <motion.p
              variants={contentVariants}
              className="text-sm leading-relaxed tracking-normal font-medium mb-3"
            >
              When I’m not coding or reviewing the latest tech news, you’ll
              likely find me catching up on a new anime series, exploring a
              complex math problem, or immersing myself in physics articles
              about the cosmos. I love the way these interests spark my
              imagination and fuel my desire to create something extraordinary.
            </motion.p>
            <motion.p
              variants={contentVariants}
              className="text-sm leading-relaxed tracking-normal font-medium mb-3"
            >
              I also enjoy experimenting with{" "}
              <Link
                href="https://leonardo.ai/"
                target="_blank"
                className="underline underline-offset-2 text-secondary hover:text-accent"
              >
                AI art tools
              </Link>
              , discovering how emerging technologies can bridge art and
              science. And let’s not forget the occasional online match in{" "}
              <Link
                href="https://www.chess.com/"
                target="_blank"
                className="underline underline-offset-2 text-secondary hover:text-accent"
              >
                Chess
              </Link>{" "}
              to keep my strategic thinking sharp!
            </motion.p>
            <motion.p
              variants={contentVariants}
              className="text-sm leading-relaxed tracking-normal font-medium mb-3"
            >
              Every day, I’m reminded that my passions—gaming, anime, math, and
              physics—are not just hobbies. They’re lenses through which I view
              the world, and they continuously inspire me to innovate, explore,
              and create.
            </motion.p>
          </div>
          <div className="hidden w-full h-full lg:w-1/2 lg:flex justify-center">
            <Figure
              src={aboutImg3.src}
              size="w-[400px] h-[300px]"
              caption="Learning never stops"
              tag="IMAGINE"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;

const Stripes = ({
  isTop = true,
  isLeft = true,
  position = "left",
  rotation = "rotate-90",
}) => {
  return (
    <div className="my-10">
      <div
        className={`${isTop ? "top-0" : "bottom-0"} ${
          isLeft ? "left-0" : "right-0"
        } absolute w-full flex flex-col gap-1 ${rotation}`}
      >
        <Marquee
          direction={position}
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, #fff, #fff, transparent)",
          }}
        >
          {techLogosArrayComplete?.map((item, index) => (
            <div
              key={index}
              className="bg-base-100 p-2 flex items-center gap-1 rounded"
            >
              <img
                className="w-[16px] h-[16px]"
                src={item.src}
                alt={item?.title}
              />
              <span className="text-sm">{item?.title}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};
