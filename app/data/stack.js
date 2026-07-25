/**
 * Technology stack, grouped by layer.
 *
 * Rendered as a table of names. Brand logos were dropped along with the
 * marquee: a wall of marks is decoration, and the names carry the same
 * information at a fraction of the visual weight.
 */

export const stackGroups = [
  {
    id: "languages",
    label: "Languages",
    items: [
      { name: "Python" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "PHP" },
      { name: "SQL" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "Next.js" },
      { name: "React" },
      { name: "Tailwind CSS" },
      { name: "Redux" },
      { name: "Radix UI" },
      { name: "shadcn/ui" },
      { name: "Vue" },
      { name: "Nuxt" },
      { name: "React Native" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "FastAPI" },
      { name: "Django" },
      { name: "Flask" },
      { name: "Laravel" },
      { name: "Node.js" },
      { name: "REST" },
      { name: "WebSockets" },
    ],
  },
  {
    id: "data",
    label: "Data & infra",
    items: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Supabase" },
      { name: "Redis" },
      { name: "Pandas" },
      { name: "Docker" },
      { name: "Vercel" },
    ],
  },
  {
    id: "ai",
    label: "AI",
    items: [
      { name: "OpenAI API" },
      { name: "LangChain" },
      { name: "RAG pipelines" },
      { name: "Vector search" },
      { name: "Gemini" },
    ],
  },
  {
    id: "tooling",
    label: "Tooling",
    items: [
      { name: "Git" },
      { name: "VS Code" },
      { name: "Vite" },
      { name: "Figma" },
      { name: "Pytest" },
    ],
  },
];
