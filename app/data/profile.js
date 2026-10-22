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
 * Layers of a typical build, ordered top of the stack downward.
 *
 * Drives the exploded assembly diagram on the home page. Index 0 ends up
 * nearest the viewer when the assembly separates, so the order here is the
 * order the reader sees from the top down.
 */
export const systemLayers = [
  {
    id: "interface",
    label: "Interface",
    stack: "Next.js · React · Vue · Tailwind",
    note: "Server components by default, client only where state lives",
  },
  {
    id: "contract",
    label: "Contract",
    stack: "REST · WebSockets · Zod",
    note: "Typed at the boundary, so the client cannot ask a wrong question",
  },
  {
    id: "services",
    label: "Services",
    stack: "FastAPI · Laravel · Node.js",
    note: "Async handlers, queue-backed work, no request left holding a lock",
  },
  {
    id: "data",
    label: "Data",
    stack: "PostgreSQL · MySQL · Redis",
    note: "Migrations in version control, indices chosen from real query plans",
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
      "Delivery work for clients across commerce, fintech, professional services, and education, on stacks chosen by the product rather than by preference.",
    highlights: [
      "OfBusiness, one of India's largest B2B procurement platforms: live pricing across 500+ products and 26+ states",
      "NLE Ltd, an accounting firm in London and Paris: bilingual Laravel platform with French payroll and income calculators",
      "LeapForWord: Vue and Nuxt frontend for an English-literacy platform serving six Indian languages",
      "Withfund, an Ethiopian crowdfunding platform: campaign flows, real-time donation tracking, and bank withdrawal integration",
      "MoezBinz and Shopcart: storefront, catalog, and inventory-rotation surfaces",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "FastAPI", "Laravel", "Vue"],
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

/* ---------------------------------------------------------------------------
   PROOF LAYER
   Everything below exists to make a stranger take the work seriously in the
   first few seconds. Every entry must be verifiable: a name that appears in a
   case study, a number that appears in a benchmark, a link that resolves.
   Nothing here is invented, and nothing here should be added unless it can be
   checked. See components/sections/ProofStrip and Receipts.
   ------------------------------------------------------------------------ */

/**
 * Headline numbers for the proof strip under the hero. `value` is the target
 * the counter animates to; `suffix` is appended after the count finishes.
 * `href` makes the figure a link to where it can be checked.
 */
export const proofFigures = [
  {
    value: 116,
    suffix: "×",
    label: "faster JSON validation than fastjsonschema",
    href: "/projects/jsonguard",
  },
  {
    value: 400,
    suffix: "+",
    label: "live markets tracked in under a second",
    href: "/projects/prediction-market-terminal",
  },
  {
    value: 20,
    suffix: "+",
    label: "production systems shipped since 2021",
    href: "/projects",
  },
  {
    value: 4,
    suffix: "",
    label: "continents of clients, one timezone of replies",
    href: "/about",
  },
];

/**
 * Names that have shipped work by me. Rendered as a running marquee: text
 * only, because a wall of borrowed logos is a design cliché and several of
 * these are private engagements with no public mark.
 */
export const shippedFor = [
  { name: "OfBusiness", note: "B2B procurement, India", href: "/projects/ofbusiness" },
  { name: "Sundial Lands", note: "Land buying, US", href: "/projects/sundial-lands" },
  { name: "NLE Ltd", note: "Accounting, London & Paris", href: "/projects/nle-accounting" },
  { name: "LeapForWord", note: "English literacy, India", href: "/projects/leapforword" },
  { name: "Withfund", note: "Crowdfunding, Ethiopia", href: "/projects/withfund" },
  { name: "LaunchPad", note: "Token launches, BNB Chain", href: "/projects/launchpad" },
  { name: "Drixx", note: "Crypto draws", href: "/projects/drixx" },
  { name: "MoezBinz", note: "Retail, Canada", href: "/projects/moezbinz" },
  { name: "Outlier", note: "Model training contributor" },
  { name: "Turing", note: "Benchmarking contributor" },
];

/**
 * Where the claims on this site can be checked without asking me.
 * A portfolio is a set of assertions; this is the evidence column.
 */
export const receipts = [
  {
    label: "PyPI",
    title: "jsonguard on PyPI",
    body: "Installable today. The benchmark script is in the repo.",
    href: "https://pypi.org/project/jsonguard/",
    handle: "pip install jsonguard",
  },
  {
    label: "GitHub",
    title: "Source for the open work",
    body: "JSONGuard, RiskRabbit, the prediction-market terminal, LaunchPad, and Drixx.",
    href: "https://github.com/ead8",
    handle: "github.com/ead8",
  },
  {
    label: "Live",
    title: "Prediction Market Terminal",
    body: "Polymarket and Kalshi, aggregated and arbitrage-scored in real time.",
    href: "https://v0-prediction-market-platform.vercel.app/",
    handle: "Open the terminal",
  },
  {
    label: "Live",
    title: "Sundial Lands",
    body: "Solo build, in production, taking real land offers.",
    href: "https://sundiallands.com/",
    handle: "sundiallands.com",
  },
  {
    label: "Résumé",
    title: "One page, dated",
    body: "The same facts as this site, in the format a hiring manager forwards.",
    href: "/doc/resume.pdf",
    handle: "Download PDF",
  },
  {
    label: "LinkedIn",
    title: "Work history",
    body: "Roles, dates, and the people who can vouch for them.",
    href: "https://www.linkedin.com/in/ebisa-dugo/",
    handle: "in/ebisa-dugo",
  },
];

/**
 * How an engagement runs, first call to handover. Shown as a numbered
 * sequence so the visitor can picture working with me before they email.
 */
export const process = [
  {
    step: "Scope",
    title: "A short written brief before any code",
    body: "What has to exist, what can wait, and how we will know it works. You get an architecture note you can hand to anyone.",
  },
  {
    step: "Slice",
    title: "One thin path to production first",
    body: "The riskiest piece goes end to end early: real data, real deploy, real numbers. Surprises show up in week one instead of month three.",
  },
  {
    step: "Harden",
    title: "Measure, then make it fast",
    body: "Latency budgets, traces, and benchmarks before any rewrite. The 40% API improvement came from a profiler, not a hunch.",
  },
  {
    step: "Hand over",
    title: "Leave it runnable without me",
    body: "Typed contracts, migrations in version control, a README that a new hire can follow. You should be able to fire me without pain.",
  },
];

/**
 * Client quotes. Empty until there are real ones to show: the section that
 * renders these hides itself when the list is empty, and it should stay that
 * way rather than carry invented praise. Add entries as
 *   { quote, name, role, org, href? }
 */
export const testimonials = [];
