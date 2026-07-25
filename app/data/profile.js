/**
 * Single source of truth for identity, contact, and career facts.
 * Everything user-facing that isn't a project lives here so copy changes never
 * require touching a component.
 */

export const CAREER_START = "2021-04-12";

/** Years of experience, computed at render time so it never goes stale. */
export function yearsOfExperience() {
  const years =
    (Date.now() - new Date(CAREER_START).getTime()) /
    (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(years);
}

export const profile = {
  name: "Ebisa Dugo",
  firstName: "Ebisa",
  initials: "ED",
  role: "Senior Full-Stack Engineer",
  location: "Addis Ababa, Ethiopia",
  timezone: "Africa/Addis_Ababa",
  utcOffset: "UTC+3",
  email: "ebisadugo@gmail.com",
  calendly: "https://calendly.com/ebisadugo/30min",
  resume: "/doc/resume.pdf",
  avatar: "/other/profile.jpeg",

  available: true,
  availability: "Available for select projects",

  // Used verbatim in the hero, the OG card, and <meta> tags. One string, so
  // the headline can never drift out of sync with what gets shared.
  tagline:
    "I build AI platforms and backends that hold up in production.",
  summary:
    "Senior full-stack engineer specialising in AI platforms, high-throughput backends, and product surfaces built with Next.js, FastAPI, and Python.",
};

export const socials = [
  {
    label: "GitHub",
    handle: "@ead8",
    href: "https://github.com/ead8",
    icon: "github",
  },
  {
    label: "LinkedIn",
    handle: "ebisa-dugo",
    href: "https://www.linkedin.com/in/ebisa-dugo/",
    icon: "linkedin",
  },
  {
    label: "X",
    handle: "@ebisaadw",
    href: "https://twitter.com/ebisaadw",
    icon: "x",
  },
  {
    label: "Email",
    handle: "ebisadugo@gmail.com",
    href: "mailto:ebisadugo@gmail.com",
    icon: "mail",
  },
];

/**
 * Title-block rows, as on a drawing sheet. Rendered in the hero beside the
 * headline; the live time and status rows are appended at render time.
 */
export const specification = [
  { label: "Role", value: "Full-stack" },
  { label: "Since", value: "2021" },
  { label: "Shipped", value: "20+ systems" },
  { label: "Base", value: "Addis Ababa" },
];

/** The three figures worth putting on a social card. */
export const headlineFigures = [
  { label: "Shipped", value: "20+ systems" },
  { label: "Since", value: "2021" },
  { label: "Fastest", value: "116×" },
];

/** What I'm hired to do. Three lanes, ordered by depth. */
export const disciplines = [
  {
    id: "ai",
    title: "AI & LLM systems",
    description:
      "RAG pipelines, multi-agent automations, and evaluation workflows built on LangChain and the OpenAI API. Contributor at Outlier and Turing on model training and benchmarking projects.",
    keywords: ["RAG", "Agents", "Evals", "LangChain", "OpenAI API"],
  },
  {
    id: "backend",
    title: "Backend & data",
    description:
      "Scalable APIs and async ETL with FastAPI, Django, Pandas, and PostgreSQL. Processed millions of records and cut production API latency by up to 40%.",
    keywords: ["FastAPI", "Django", "PostgreSQL", "Async ETL", "Pandas"],
  },
  {
    id: "product",
    title: "Full-stack product",
    description:
      "End-to-end web products with Next.js, React, TypeScript, and Tailwind on the front, Node.js or Python services behind. Clean contracts, tight feedback loops.",
    keywords: ["Next.js", "TypeScript", "React", "Node.js", "Tailwind"],
  },
];

/**
 * Career timeline. Entries are ordered newest-first and reflect the
 * engagements represented in the project index.
 */
export const experience = [
  {
    period: "2024 – Present",
    role: "Senior Full-Stack Engineer",
    org: "Independent / Contract",
    location: "Remote",
    description:
      "Solo and lead engineer on production platforms across Web3, fintech, and real estate. Owns architecture, delivery, and operations end to end.",
    highlights: [
      "Built Sundial Lands end to end: Next.js frontend, Node.js and FastAPI services, and the parcel evaluation pipeline",
      "Shipped LaunchPad, a BNB Chain token-launch platform with bonding-curve trading and automated fee distribution",
      "Published JSONGuard to PyPI, a ~250-line validator benchmarked ~116× faster than fastjsonschema",
    ],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript", "Web3"],
  },
  {
    period: "2022 – 2024",
    role: "Full-Stack Engineer",
    org: "Client engagements",
    location: "Remote",
    description:
      "Team member on large-scale commerce and fintech platforms, working across Next.js/TypeScript surfaces and Node.js/FastAPI services.",
    highlights: [
      "OfBusiness, one of India's largest B2B procurement platforms: live pricing across 500+ products and 26+ states",
      "Withfund, an Ethiopian crowdfunding platform: campaign flows, real-time donation tracking, and bank withdrawal integration",
      "MoezBinz and Shopcart: storefront, catalog, and inventory-rotation surfaces",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "FastAPI"],
  },
  {
    period: "2021 – 2022",
    role: "Software Engineer",
    org: "Freelance / Upwork",
    location: "Remote",
    description:
      "Backend and data engineering for automation pipelines, crawlers, and API integrations delivered to clients across time zones.",
    highlights: [
      "Async data pipelines and exchange integrations processing millions of records",
      "20+ production systems delivered for direct and marketplace clients",
    ],
    stack: ["Python", "Django", "Flask", "Pandas", "PostgreSQL"],
  },
];

export const education = [
  {
    period: "In progress",
    degree: "MSc, Information Technology",
    org: "University of the People",
    href: "https://www.uopeople.edu/",
  },
  {
    period: "Completed",
    degree: "BSc, Computer Science",
    org: "Addis Ababa University",
    href: "https://www.aau.edu.et/",
  },
];

/** Short principles list, shown on the about page. */
export const principles = [
  {
    title: "Ship the thing that matters",
    body: "Every engagement is an engineering problem first: work out what actually needs to exist, cut the rest, keep the feedback loop tight.",
  },
  {
    title: "Boring where it counts",
    body: "Novelty belongs in the product, not the infrastructure. Predictable data models and typed contracts beat clever abstractions.",
  },
  {
    title: "Own it end to end",
    body: "Comfortable driving a project solo from empty repo to production, or plugging into an existing team and its conventions on day one.",
  },
  {
    title: "Measure, then optimise",
    body: "Latency budgets, benchmarks, and traces before rewrites. The 40% API improvement came from profiling, not guessing.",
  },
];
