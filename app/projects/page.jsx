import ProjectsIndex from "@/app/components/sections/ProjectsIndex";
import Contact from "@/app/components/sections/Contact";
import { projects } from "@/app/data/projects";

export const metadata = {
  title: "Work",
  description: `Selected engineering work — ${projects.length} production platforms, open-source libraries, and client engagements across AI, Web3, fintech, and commerce.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Work",
    description: `${projects.length} shipped projects — full case studies with architecture, stack, and ownership.`,
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsIndex />
      <Contact />
    </>
  );
}
