"use client";

import ContactSection from "./components/contact/ContactSection";
import HeroSection from "./components/hero/HeroSection";

export default function Home() {
  return (
    <div className="page-warp-in flex flex-col w-full">
      <HeroSection />
      <ContactSection />
    </div>
  );
}
