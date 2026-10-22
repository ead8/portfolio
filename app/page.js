import Hero from "./components/sections/Hero";
import FactStrip from "./components/sections/FactStrip";
import AboutBlurb from "./components/sections/AboutBlurb";
import SelectedWork from "./components/sections/SelectedWork";
import Contact from "./components/sections/Contact";
import { projectIndex } from "./data/projectIndex";

export const metadata = {
  alternates: { canonical: "/" },
};

// Prints in the hero's polaroid pile, under the portrait, in this order
const PRINTS = ["prediction-market-terminal", "sundial-lands", "launchpad"];

/**
 * Five beats, nothing more: who (Hero), the facts in passing (FactStrip),
 * the person (AboutBlurb), the work (SelectedWork), and one next step
 * (Contact). Experience, stack, principles and the longer story live on
 * /about; every project lives on /projects.
 */
export default function HomePage() {
  // The listing subset is built here, on the server, so client components
  // never import the full corpus.
  const projects = projectIndex();
  const prints = PRINTS.map((slug) => projects.find((p) => p.slug === slug))
    .filter((p) => p?.cover)
    .map((p) => ({
      key: p.slug,
      src: p.cover,
      caption: p.title,
      href: `/projects/${p.slug}`,
    }));

  return (
    <>
      <Hero prints={prints} />
      <FactStrip />
      <AboutBlurb />
      <SelectedWork projects={projects} />
      <Contact />
    </>
  );
}
