import Hero from "./components/sections/Hero";
import SelectedWork from "./components/sections/SelectedWork";
import Capabilities from "./components/sections/Capabilities";
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
      <Capabilities />
      <Experience />
      <Stack />
      <Contact />
    </>
  );
}
