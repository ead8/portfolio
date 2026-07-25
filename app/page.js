import Hero from "./components/sections/Hero";
import SelectedWork from "./components/sections/SelectedWork";
import Capabilities from "./components/sections/Capabilities";
import Assembly from "./components/sections/Assembly";
import Experience from "./components/sections/Experience";
import Stack from "./components/sections/Stack";
import Contact from "./components/sections/Contact";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      {/* Capabilities says what I build; Assembly shows how it's put together,
          so the exploded drawing follows the claim it illustrates. */}
      <Capabilities />
      <Assembly />
      <Experience />
      <Stack />
      <Contact />
    </>
  );
}
