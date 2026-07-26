/**
 * Project index.
 *
 * Every entry is addressable by `slug` (canonical) or by its legacy numeric
 * `id`, so URLs shared before the slug migration still resolve.
 *
 * `cover` is a static import so Next can generate a blur placeholder and serve
 * responsive sizes. Projects without a screenshot declare an `artwork` kind and
 * get a generated SVG instead. See components/ui/ProjectArtwork.
 */

import launchPadCover from "@/public/projects/tokenlaudnch.png";
import sundialCover from "@/public/projects/sundial.png";
import withfundCover from "@/public/projects/withfund.png";
import binzCover from "@/public/projects/thebinzstore.png";
import predictionMarketCover from "@/public/projects/prediction-market.png";
import drixxCover from "@/public/projects/drixx.png";
import nleCover from "@/public/projects/nle-accounting.webp";
import leapforwordCover from "@/public/projects/leapforword.webp";

export const projects = [
  {
    id: 12,
    slug: "prediction-market-terminal",
    title: "Prediction Market Terminal",
    tagline: "Real-time arbitrage detection across Polymarket and Kalshi",
    category: "Fintech · Real-time",
    year: "2026",
    timeline: "March 2026",
    role: "Full-Stack Developer",
    featured: true,
    cover: predictionMarketCover,
    artwork: "chart",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Recharts",
      "SWR",
      "Socket.io",
      "Neon PostgreSQL",
    ],
    links: {
      source: "https://github.com/ead8/prediction-market-platform",
      live: "https://v0-prediction-market-platform.vercel.app/",
    },
    metrics: [
      { value: "400+", label: "Live markets tracked" },
      { value: "2", label: "Exchanges unified" },
      { value: "<1s", label: "Update latency" },
    ],
    summary: [
      "Prediction Market Terminal is a real-time analysis and arbitrage-detection platform that aggregates live market data from Polymarket and Kalshi, the two largest prediction-market exchanges. The dashboard surfaces 400+ live markets, cross-exchange arbitrage opportunities, and category-level analytics in a single unified interface.",
      "The arbitrage engine uses fuzzy matching with Jaccard similarity to pair equivalent markets across exchanges, then computes spread percentages, profit margins net of trading fees, and a confidence score for every opportunity. Real-time updates flow through Socket.io and persistent alerts live in Neon Postgres, all on a Next.js 16 + React 19 server-component stack.",
    ],
    highlights: [
      {
        title: "Multi-exchange aggregation",
        desc: "Real-time market data from Polymarket and Kalshi unified into a single browser, with category filtering and full-text search across 400+ live markets.",
      },
      {
        title: "Cross-exchange arbitrage engine",
        desc: "Fuzzy market matching using Jaccard similarity, with spread % and profit-margin calculations net of ~1% trading fees and a 0–1 confidence score per opportunity.",
      },
      {
        title: "Real-time updates & alerts",
        desc: "Socket.io streams live market data to the dashboard; alerts persist in Neon Postgres and notify users when configured spread, category, and confidence thresholds are met.",
      },
      {
        title: "Analytics dashboard",
        desc: "Aggregate market stats, category breakdowns, trending markets by 24h volume, top movers by price change, and price-distribution charts via Recharts.",
      },
    ],
  },

  {
    id: 16,
    slug: "riskrabbit",
    title: "RiskRabbit",
    tagline: "Zero-dependency position-size calculator for prop-firm traders",
    category: "Open source · Extension",
    year: "2026",
    timeline: "May – July 2026",
    role: "Author",
    featured: true,
    cover: null,
    artwork: "ladder",
    stack: [
      "JavaScript",
      "Chrome MV3",
      "Service Worker",
      "WebSocket",
      "Binance API",
      "Stooq",
    ],
    links: { source: "https://github.com/ead8/RiskRabbit", live: null },
    metrics: [
      { value: "118 KB", label: "Bundle, no framework" },
      { value: "0", label: "Runtime dependencies" },
      { value: "<100ms", label: "Popup interactive" },
    ],
    summary: [
      "RiskRabbit is a browser extension that answers one question fast: given this account, this risk tolerance, and this stop, how large should the position be? It opens over a live chart with Ctrl+Shift+Y, recalculates on every keystroke with no submit button anywhere, and Enter copies the size straight to the clipboard. It covers crypto on live Binance prices, plus US stocks and forex/metals, sizing forex in standard lots with the currency conversion handled.",
      "The engineering constraint was self-imposed and strict: no framework, no bundler runtime, no CSS framework, no web fonts, zero runtime dependencies. It ships at 118 KB against a 150 KB budget, and the popup is interactive in under 100 ms because the critical CSS is inlined, the form markup is static, and the service worker holds the price socket open so the popup reads the latest tick from memory instead of the network. All the sizing and prop-firm math lives in pure, unit-tested functions.",
    ],
    highlights: [
      {
        title: "Prop-firm rule engine",
        desc: "One-click FTMO, Topstep, and Apex templates with daily-loss and drawdown headroom, static or trailing. A trade that would breach a rule is hard-blocked, with the largest compliant size offered instead. Only realised losses consume headroom — a green day does not buy extra room.",
      },
      {
        title: "Three markets, one sizing model",
        desc: "Live Binance WebSocket prices across roughly 300 USDT pairs, with US stocks and forex/metals on batched Stooq quotes cached for the session. Delayed quotes are labelled as such, because they are fine for sizing and wrong for execution timing.",
      },
      {
        title: "A feed that survives a bad network",
        desc: "Exponential backoff from 250ms to a 30s cap, reset on every successful open, with favourites applied as SUBSCRIBE/UNSUBSCRIBE deltas rather than dropping the socket. Prices older than 5s are visibly marked stale, so a silent disconnect shows up within a second.",
      },
      {
        title: "Honest cost accounting",
        desc: "Effective risk includes round-trip fees and stop slippage, with break-even price and a red warning when liquidation would be reached before the stop loss. Leverage never changes the position size — size is risk-driven — it only affects margin and liquidation.",
      },
    ],
  },

  {
    id: 1,
    slug: "launchpad",
    title: "LaunchPad",
    tagline: "Premium token launch platform on BNB Chain",
    category: "Web3 · Platform",
    year: "2026",
    timeline: "May 2026",
    role: "Full-Stack Developer",
    featured: true,
    cover: launchPadCover,
    artwork: "network",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
      "Wagmi",
      "Viem",
      "Neon PostgreSQL",
      "BNB Chain",
      "Stripe",
      "SendGrid",
      "Firebase",
    ],
    links: {
      source: "https://github.com/ead8/bnb-token-launch-platform",
      live: null,
    },
    metrics: [
      { value: "BNB", label: "Chain integration" },
      { value: "E2E", label: "Launch to trade flow" },
      { value: "Fiat", label: "Stripe onramp" },
    ],
    summary: [
      "LaunchPad is a production-ready Web3 platform for launching, trading, and managing tokens on BNB Chain. Creators get an intuitive token-launch wizard, advanced analytics, and automated fee distribution across social platforms; traders get portfolio tracking, real-time charts, and security risk scoring before they ape in.",
      "The platform is built on Next.js 16 with App Router, server components, and a Neon Postgres backend. Bonding-curve trading enables fair price discovery, while a referral system, leaderboard, and email/push notifications drive engagement and retention.",
    ],
    highlights: [
      {
        title: "Token launch wizard",
        desc: "Step-by-step token creation flow with Flap.sh smart contracts on BNB Chain, automated bonding curves, and a creator dashboard for multi-token management.",
      },
      {
        title: "Real-time trading & analytics",
        desc: "Interactive Recharts price charts with multiple timeframes, volume tracking, holder distribution, and a price-history pipeline backed by CoinGecko.",
      },
      {
        title: "Security & trust layer",
        desc: "Token security verification with risk scoring, contract audit metadata, honeypot detection, and creator verification badges with reputation scores.",
      },
      {
        title: "Referrals, notifications & payments",
        desc: "Stripe-powered fiat onramps, SendGrid email and Firebase push notifications, plus a referral and leaderboard system that rewards top earners.",
      },
    ],
  },

  {
    id: 4,
    slug: "jsonguard",
    title: "JSONGuard",
    tagline: "Fast, pythonic JSON schema validation, published on PyPI",
    category: "Open source · Library",
    year: "2026",
    timeline: "April 2026",
    role: "Library Author",
    featured: true,
    cover: null,
    artwork: "validator",
    stack: ["Python", "orjson", "Type Hints", "Pytest", "Benchmark tooling"],
    links: {
      source: "https://github.com/ead8/jsonguard",
      live: "https://pypi.org/project/jsonguard/",
    },
    metrics: [
      { value: "116×", label: "Faster than fastjsonschema" },
      { value: "298×", label: "Faster than jsonschema" },
      { value: "~250", label: "Lines of core code" },
    ],
    summary: [
      "JSONGuard is a fast, pythonic JSON Schema validator distributed on PyPI. Schemas are defined directly with Python's built-in types and type hints (inspired by sqlmodel), so you skip the boilerplate of formal JSON Schema documents while still getting strict type enforcement, optional fields, and custom validator functions.",
      "The library is roughly 250 lines of optimised code and uses orjson under the hood. Benchmarks place it at ~116× faster than fastjsonschema on basic validation, with depth protection, payload size limits, and either fail-fast or collect-all-errors modes for diagnostics.",
    ],
    highlights: [
      {
        title: "Pythonic schema definitions",
        desc: "Schemas are plain Python dicts using built-in types, Union, and Optional. No separate JSON Schema document or DSL to learn.",
      },
      {
        title: "Composable custom validators",
        desc: "Any callable that returns True on valid input works as a validator, enabling regex, range, and domain-specific checks directly inside the schema.",
      },
      {
        title: "Performance-first implementation",
        desc: "Backed by orjson with a tight ~250-line core; benchmarks show ~116× faster basic validation than fastjsonschema and ~298× faster than jsonschema.",
      },
      {
        title: "Hardening options",
        desc: "Configurable max_size_in_bytes, max_depth, and loosely_typed flags protect against oversized payloads and deeply nested DoS attempts.",
      },
    ],
  },

  {
    id: 6,
    slug: "sundial-lands",
    title: "Sundial Lands",
    tagline: "Land-buying and cash-offer platform, built solo end to end",
    category: "Real estate · Platform",
    year: "2024",
    timeline: "2024",
    role: "Lead Full-Stack Developer (solo build)",
    featured: true,
    cover: sundialCover,
    artwork: "supply",
    stack: ["Next.js", "TypeScript", "Node.js", "FastAPI", "PostgreSQL"],
    links: { source: null, live: "https://sundiallands.com/" },
    metrics: [
      { value: "Solo", label: "Engineer on the build" },
      { value: "Days", label: "Offer turnaround" },
      { value: "E2E", label: "Frontend to pipeline" },
    ],
    summary: [
      "Sundial Lands is a land-buying platform that helps property owners sell raw land for cash by connecting them directly with high-value buyers and generating data-driven offers within days. The product replaces traditional real-estate agents and lengthy listing cycles with an evaluation pipeline backed by parcel-level property data.",
      "I built the entire platform end to end: Next.js frontend, Node.js and FastAPI backend services, evaluation pipeline, and admin tooling. The backend integrates with the Sundial evaluation API to score parcels, generate offers, and manage the seller workflow from inquiry through close.",
    ],
    highlights: [
      {
        title: "Automated property evaluation",
        desc: "Backend pipeline that ingests parcel data, scores properties against valuation models, and produces cash-offer ranges within days of submission.",
      },
      {
        title: "Seller onboarding flow",
        desc: "Guided intake form that captures parcel and contact details with progressive validation, designed for landowners with no real-estate experience.",
      },
      {
        title: "Internal admin & offer tooling",
        desc: "Admin dashboard for the operations team to review submissions, adjust offers, track status across the buying pipeline, and manage closings.",
      },
      {
        title: "FastAPI evaluation service",
        desc: "Python FastAPI service exposes the parcel scoring and valuation logic to the Next.js frontend through a typed REST interface.",
      },
    ],
  },

  {
    id: 13,
    slug: "drixx",
    title: "Drixx",
    tagline: "USDT crypto draw platform with multi-network payouts",
    category: "Web3 · Consumer",
    year: "2026",
    timeline: "March 2026",
    role: "Full-Stack Developer",
    featured: true,
    cover: drixxCover,
    artwork: "flow",
    stack: [
      "Next.js 15",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Radix UI",
      "React Hook Form",
      "Zod",
      "Recharts",
    ],
    links: {
      source: "https://github.com/ead8/Raffle-Crpto",
      live: "https://raffle-crpto-snvu.vercel.app/",
    },
    metrics: [
      { value: "3", label: "Chains supported" },
      { value: "4", label: "Draw tiers" },
      { value: "Hourly", label: "Draw cadence" },
    ],
    summary: [
      "Drixx is a USDT-based crypto draw and raffle platform that lets users buy tickets and join hourly draws across multiple tiers (Fast, Mega, Express, and Premium) with transparent winner selection and instant USDT payouts.",
      "The platform supports multi-network deposits and withdrawals across TRON, Solana, and BSC, layered with a referral system, daily-task rewards, and a leaderboard ranking players by winnings. The admin console manages draws, user balances, and the withdrawal approval pipeline.",
    ],
    highlights: [
      {
        title: "Multi-tier draw system",
        desc: "Fast, Mega, Express, and Premium draws with random 6-digit ticket generation, automatic next-round recreation when a draw closes, and transparent winner selection.",
      },
      {
        title: "Multi-network USDT wallet",
        desc: "Native USDT balance tracking with deposits and withdrawals across TRON, Solana, and BSC; withdrawal flow gated by admin approval with full transaction history.",
      },
      {
        title: "Referrals, tasks & leaderboard",
        desc: "Commission-based referral tracking on tickets bought by invitees, daily tasks plus registration bonuses, and a leaderboard ranking players by winnings and participation.",
      },
      {
        title: "Admin console",
        desc: "Full draw management (create, update, status control), user administration (balances, roles, account state), and a withdrawal approval pipeline with audit trail.",
      },
    ],
  },

  {
    id: 11,
    slug: "contentflow",
    title: "ContentFlow",
    tagline: "AI content generation and multi-platform publishing",
    category: "AI · SaaS",
    year: "2025",
    timeline: "2025",
    role: "Full-Stack Developer",
    featured: true,
    cover: null,
    artwork: "flow",
    stack: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "shadcn/ui",
      "Supabase",
      "Zod",
      "Stripe",
      "Shotstack",
      "Tavus",
    ],
    links: { source: "https://github.com/ead8/ContentFlow", live: null },
    metrics: [
      { value: "AI", label: "Generation pipeline" },
      { value: "OTP", label: "Custom auth flow" },
      { value: "Stripe", label: "Subscription billing" },
    ],
    summary: [
      "ContentFlow is an AI-powered content creation and management platform that helps creators generate, organise, and distribute social media content across multiple platforms from a single workspace. It pairs an AI generation pipeline with media management, post scheduling, and analytics so creators can take an idea from prompt to published post without leaving the dashboard.",
      "The platform is built on Next.js 14 with App Router and TypeScript, backed by Supabase for Postgres and email-OTP authentication. Stripe handles billing, while Shotstack and Tavus power video generation and AI video creation respectively, all wrapped in a UI built on Radix and shadcn/ui.",
    ],
    highlights: [
      {
        title: "AI content generation",
        desc: "AI-assisted generation pipeline that produces social media posts and creatives, with Shotstack and Tavus integrations for video and AI-avatar content.",
      },
      {
        title: "Email-OTP authentication & roles",
        desc: "Custom Supabase email-OTP flow with 6-digit codes (sign up, verify, set password, onboarding) plus role-based permissions for Creator and Admin user types.",
      },
      {
        title: "Media library & post scheduling",
        desc: "Centralised media management for assets and a scheduling layer that queues posts for future publishing across connected social platforms.",
      },
      {
        title: "Analytics dashboard & billing",
        desc: "Performance and engagement analytics surfaces paired with Stripe-powered subscription billing for creator accounts.",
      },
    ],
  },

  {
    id: 3,
    slug: "tao-detector",
    title: "TAO Detector",
    tagline: "Cryptocurrency new-listing detection and OHLCV backfill",
    category: "Data engineering",
    year: "2025",
    timeline: "July 2025",
    role: "Backend & Data Engineer",
    featured: false,
    cover: null,
    artwork: "chart",
    stack: ["Python", "Asyncio", "Binance API", "OKX API", "Pandas"],
    links: { source: "https://github.com/ead8/toa-detector", live: null },
    metrics: [
      { value: "2", label: "Exchanges monitored" },
      { value: "7d", label: "1-minute backfill" },
      { value: "Async", label: "Download pipeline" },
    ],
    summary: [
      "TAO Detector is a cryptocurrency new-listing detection system that continuously monitors Binance and OKX exchanges and identifies newly listed coins as early as possible. As soon as a new listing appears, the system automatically downloads the first 7 days of 1-minute OHLCV data from the genesis candle for early-pattern analysis.",
      "The pipeline is built around async candle downloaders and per-exchange detection scripts, with structured CSV storage organised for fast downstream analysis. The dataset is designed to support quantitative research on early price movements, volume patterns, and trading-strategy development for newly listed assets.",
    ],
    highlights: [
      {
        title: "Multi-exchange listing detection",
        desc: "Continuous monitoring of Binance and OKX with detection logic that flags new symbols the moment they become available on each exchange.",
      },
      {
        title: "Async OHLCV backfill",
        desc: "Async candle downloaders pull the first 7 days of 1-minute OHLCV from the genesis candle, with retry logic and storage management for large datasets.",
      },
      {
        title: "Structured CSV storage",
        desc: "Per-exchange CSV layout with full OHLCV columns plus trade counts and taker base/quote volumes, ready for direct ingestion into Pandas notebooks.",
      },
      {
        title: "Historical listing database",
        desc: "Maintains a full historical record of detected listings so quants can backtest strategies on early-listing behaviour across multiple coins and exchanges.",
      },
    ],
  },

  {
    id: 2,
    slug: "omilink",
    title: "Omilink",
    tagline: "Link-in-bio SaaS with access-gated private links",
    category: "SaaS · Product",
    year: "2026",
    timeline: "March 2026",
    role: "Full-Stack Developer",
    featured: false,
    cover: null,
    artwork: "network",
    stack: [
      "Next.js",
      "React",
      "shadcn/ui",
      "Tailwind CSS",
      "Clerk",
      "MongoDB",
      "Mongoose",
    ],
    links: { source: "https://github.com/ead8/Omilink", live: null },
    metrics: [
      { value: "7", label: "Link categories" },
      { value: "Clerk", label: "Auth provider" },
      { value: "Keys", label: "Private link gating" },
    ],
    summary: [
      "Omilink is a link-in-bio app that gives users a single shareable page for their socials, dev profiles, tipping links, and contact details. Built with Next.js App Router, shadcn/ui, and a MongoDB backend, it ships authenticated profile management with username-based public pages.",
      "The platform supports a wide range of link types (social, professional, dev platforms, creative, messaging, storefront, and miscellaneous) and includes an optional access-key gate for private links so users can share sensitive resources without exposing them publicly.",
    ],
    highlights: [
      {
        title: "Authenticated profile management",
        desc: "Clerk-powered authentication with username, name, bio, and avatar fields, plus a Manage dashboard for live link editing and publishing.",
      },
      {
        title: "Multi-type link support",
        desc: "First-class link types covering socials, dev platforms, messaging, storefronts, and creative profiles, all reorderable from the dashboard.",
      },
      {
        title: "Private links with access keys",
        desc: "Optional per-link access keys gate sensitive links so users can share private resources alongside public ones on the same page.",
      },
      {
        title: "Responsive public profile",
        desc: "Username-based public pages with a fully responsive layout that scales cleanly from mobile to desktop.",
      },
    ],
  },

  {
    id: 7,
    slug: "ofbusiness",
    title: "OfBusiness",
    tagline: "B2B raw-materials procurement and credit at national scale",
    category: "Client engagement",
    year: "Client",
    timeline: "Client engagement",
    role: "Full-Stack Developer (team member)",
    featured: false,
    cover: null,
    artwork: "supply",
    stack: ["Next.js", "TypeScript", "Node.js", "FastAPI"],
    links: { source: null, live: "https://www.ofbusiness.com/" },
    metrics: [
      { value: "500+", label: "Products priced live" },
      { value: "26+", label: "Indian states served" },
      { value: "15+", label: "Countries reached" },
    ],
    summary: [
      "OfBusiness is one of India's largest B2B raw-materials procurement and credit platforms, serving SMEs and corporations across steel, chemicals, polymers, energy, and agriculture sectors. The platform offers live commodity pricing across 500+ products, working-capital credit, and order tracking across 26+ Indian states and 15+ countries.",
      "I contributed as a full-stack developer on the engineering team, working across Next.js/TypeScript frontend surfaces and Node.js/FastAPI backend services. My work spanned feature development, integration with internal pricing and credit services, and performance improvements across customer-facing flows.",
    ],
    highlights: [
      {
        title: "Frontend feature development",
        desc: "Built and shipped customer-facing flows in Next.js and TypeScript, contributing to the live-pricing and ordering surfaces used by manufacturers and contractors.",
      },
      {
        title: "Backend API integration",
        desc: "Wired Node.js and FastAPI services to the frontend, integrating with internal pricing, inventory, and credit-evaluation endpoints.",
      },
      {
        title: "Cross-platform order tracking",
        desc: "Worked on order-tracking surfaces supporting the platform's reach across 26+ Indian states and 15+ international markets.",
      },
    ],
  },

  {
    id: 8,
    slug: "withfund",
    title: "Withfund",
    tagline: "Crowdfunding built for Ethiopian payment rails",
    category: "Client engagement",
    year: "Client",
    timeline: "Client engagement",
    role: "Full-Stack Developer (team member)",
    featured: false,
    cover: withfundCover,
    artwork: "network",
    stack: ["Next.js", "TypeScript", "Node.js", "FastAPI"],
    links: { source: null, live: "https://www.withfund.org/" },
    metrics: [
      { value: "740+", label: "Donors connected" },
      { value: "340K+", label: "ETB processed" },
      { value: "Live", label: "Donation tracking" },
    ],
    summary: [
      "Withfund is a crowdfunding and fundraising platform built for Ethiopia, enabling individuals to launch campaigns and receive donations for medical emergencies, education costs, and personal causes. The platform has connected 740+ donors and processed 340,500+ ETB in cumulative donations.",
      "I contributed as a full-stack developer on the team, working across the Next.js/TypeScript frontend and Node.js/FastAPI backend. My work covered campaign creation flows, real-time donation tracking, encrypted transactions, and direct bank-account withdrawal integration for fundraisers.",
    ],
    highlights: [
      {
        title: "Campaign launch workflow",
        desc: "Built guided campaign-creation flows that let users set goals, describe causes, and publish campaigns within minutes from any device.",
      },
      {
        title: "Real-time donation tracking",
        desc: "Implemented live-updating donation feeds and progress tracking so campaign owners and donors see contributions land in real time.",
      },
      {
        title: "Secure payments & withdrawals",
        desc: "Worked on encrypted-transaction handling and direct bank-account withdrawal flows tailored to Ethiopian payment rails.",
      },
    ],
  },

  {
    id: 9,
    slug: "moezbinz",
    title: "MoezBinz",
    tagline: "Treasure-hunt liquidation commerce with rotating inventory",
    category: "Client engagement",
    year: "Client",
    timeline: "Client engagement",
    role: "Full-Stack Developer (team member)",
    featured: false,
    cover: binzCover,
    artwork: "cart",
    stack: ["Next.js", "TypeScript", "Node.js", "FastAPI"],
    links: { source: null, live: "https://www.thebinzstore.com/" },
    metrics: [
      { value: "Bin", label: "Retail model" },
      { value: "Tiered", label: "Dynamic pricing" },
      { value: "Rotating", label: "Inventory cycles" },
    ],
    summary: [
      "MoezBinz is a treasure-hunt-themed e-commerce platform built around the bin-store retail model, where shoppers browse rotating inventory of liquidation merchandise at discount price tiers. The product blends a content-driven storefront with an inventory engine tuned for fast-moving, frequently changing stock.",
      "I contributed as a full-stack developer on the team, working across the Next.js/TypeScript frontend storefront and Node.js/FastAPI backend services. My work covered product surfaces, inventory rotation flows, and integration between the storefront and internal merchandising tooling.",
    ],
    highlights: [
      {
        title: "Storefront & catalog surfaces",
        desc: "Built customer-facing product browsing, catalog filtering, and price-tier surfaces in Next.js and TypeScript.",
      },
      {
        title: "Rotating inventory engine",
        desc: "Worked on backend logic for the bin-store model, including inventory rotation cycles and price-tier transitions tied to the treasure-hunt experience.",
      },
      {
        title: "Backend API layer",
        desc: "Integrated Node.js and FastAPI services with the storefront, exposing typed APIs for catalog, inventory, and merchandising operations.",
      },
    ],
  },

  {
    id: 10,
    slug: "shopcart",
    title: "Shopcart",
    tagline: "Multi-category electronics and gadget storefront",
    category: "Client engagement",
    year: "Client",
    timeline: "Client engagement",
    role: "Full-Stack Developer (team member)",
    featured: false,
    cover: null,
    artwork: "cart",
    stack: ["Next.js", "TypeScript", "Node.js", "FastAPI"],
    links: { source: null, live: "https://shopcart.reactbd.com/" },
    metrics: [
      { value: "Multi", label: "Product categories" },
      { value: "Cart", label: "Wishlist & orders" },
      { value: "Rules", label: "Promotion engine" },
    ],
    summary: [
      "Shopcart is a multi-category online storefront covering electronics, home appliances, and gadget accessories from brands like Apple, HP, Sony, and Huawei. The product spans browsing, wishlist, cart, and order flows with a content-driven blog layer for lifestyle and product education.",
      "I contributed as a full-stack developer on the team across the Next.js/TypeScript frontend and Node.js/FastAPI backend. My work covered catalog and cart surfaces, the wishlist and order pipeline, and backend integrations for product, pricing, and promotions data.",
    ],
    highlights: [
      {
        title: "Catalog, cart & wishlist flows",
        desc: "Built catalog browsing, wishlist management, and cart/checkout surfaces in Next.js and TypeScript across multiple product categories.",
      },
      {
        title: "Promotions & delivery logic",
        desc: "Implemented promotional banners, free-delivery thresholds, and money-back-guarantee surfaces tied to backend promotion rules.",
      },
      {
        title: "Backend catalog & order APIs",
        desc: "Wired Node.js and FastAPI services to the storefront, exposing typed endpoints for products, pricing, orders, and customer accounts.",
      },
    ],
  },

  {
    id: 14,
    slug: "nle-accounting",
    title: "NLE Accounting",
    tagline: "Bilingual accounting and tax platform for a London–Paris firm",
    category: "Client engagement",
    year: "2022",
    timeline: "2022",
    role: "Full-Stack Developer",
    featured: false,
    cover: nleCover,
    artwork: "chart",
    // Verified from the live site. Extend this list with the packages and
    // tooling you actually used — I only had "Laravel / PHP" to go on.
    stack: ["PHP", "Laravel", "MySQL"],
    links: { source: null, live: "https://nle-accounting.com/en" },
    metrics: [
      { value: "EN / FR", label: "Bilingual throughout" },
      { value: "2", label: "Tax jurisdictions" },
      { value: "Calculators", label: "Payroll & income simulators" },
    ],
    summary: [
      "NLE is an accounting, taxation, and financial services firm with offices in London and Paris, serving start-ups, SMEs, and international corporations that operate in France, the UK, or both. The platform is the firm's public product: service and advisory content, news, contact and onboarding flows, and a set of fee calculators, all delivered in English and French.",
      "I built it as a Laravel application. Every page, service module, and calculator exists in both languages, so localisation had to be part of the data model rather than a translation layer bolted on afterwards. The calculators — a French payroll estimator and a professional income simulator — encode real tax rules, which makes them the part of the site where correctness matters most.",
    ],
    highlights: [
      {
        title: "Bilingual by construction",
        desc: "English and French across every route, with locale carried through URLs so either language is directly shareable and indexable rather than hidden behind a client-side toggle.",
      },
      {
        title: "Fee calculators",
        desc: "A French payroll calculator and a professional income simulator that turn the firm's fee and tax rules into self-service tools, giving prospects a number before they ever make contact.",
      },
      {
        title: "Service and advisory content",
        desc: "Structured modules for accounting, taxation, business start-up, payroll, and individual tax services, each maintainable by the firm without a developer in the loop.",
      },
      {
        title: "Cross-border positioning",
        desc: "Content architecture built around the firm's dual British and French accreditation, so a visitor can find the treatment for their own jurisdiction quickly.",
      },
    ],
  },

  {
    id: 15,
    slug: "leapforword",
    title: "LeapForWord",
    tagline: "English-literacy platform for India, in six languages",
    category: "Client engagement",
    year: "Client",
    timeline: "Client engagement",
    role: "Frontend Developer",
    featured: false,
    cover: leapforwordCover,
    artwork: "phone",
    stack: ["Vue.js", "Nuxt", "JavaScript"],
    links: { source: null, live: "https://app.leapforword.org" },
    metrics: [
      { value: "6", label: "Interface languages" },
      { value: "WhatsApp", label: "Verification flow" },
      { value: "Nuxt", label: "Vue SSR frontend" },
    ],
    summary: [
      "LeapForWord is an English-literacy platform built around the goal of making India English literate. It teaches English through the learner's own first language, so the interface ships in English, Hindi, Marathi, Tamil, Telugu, and Gujarati, and the language choice is available before sign-in rather than buried in settings.",
      "I built the frontend in Vue with Nuxt. Two constraints shaped it: the audience is mobile-first on inconsistent connections, and authentication runs through WhatsApp number verification instead of email, because WhatsApp is the account these learners already have. That removes the password reset problem entirely and meets users where they are.",
    ],
    highlights: [
      {
        title: "Six-language interface",
        desc: "English, Hindi, Marathi, Tamil, Telugu, and Gujarati, selectable on the login screen so a learner never has to read English to start learning English.",
      },
      {
        title: "WhatsApp verification",
        desc: "Sign-in by WhatsApp number rather than email and password, matching the account the audience already uses daily and removing password recovery as a support burden.",
      },
      {
        title: "Nuxt frontend",
        desc: "Vue with Nuxt for server-rendered routes and file-based routing, keeping first paint fast on the low-bandwidth connections much of the audience is on.",
      },
      {
        title: "Mobile-first learning flows",
        desc: "Lesson and teaching-technique surfaces laid out for small screens first, since the platform is reached predominantly from phones.",
      },
    ],
  },

  {
    id: 5,
    slug: "mobile-lms",
    title: "Mobile LMS",
    tagline: "Cross-platform learning app from one TypeScript codebase",
    category: "Mobile",
    year: "2025",
    timeline: "March 2025",
    role: "Mobile Developer",
    featured: false,
    cover: null,
    artwork: "phone",
    stack: ["React Native", "Expo", "TypeScript", "Expo Router", "EAS Build"],
    links: { source: "https://github.com/ead8/mobile-LMS", live: null },
    metrics: [
      { value: "iOS+", label: "Android from one codebase" },
      { value: "OTA", label: "Updates via EAS" },
      { value: "Resume", label: "Playback positions" },
    ],
    summary: [
      "Mobile LMS is a cross-platform learning management system built with React Native and Expo, delivering a native iOS and Android experience from a single TypeScript codebase. The app provides students with a full learning loop of course browsing, lesson playback, and progress tracking, optimised for mobile network conditions.",
      "The architecture leans on Expo Router for file-based navigation and EAS Build for production binaries, keeping the development feedback loop tight while enabling over-the-air updates for fast iteration on content and UI without a full app-store roundtrip.",
    ],
    highlights: [
      {
        title: "Cross-platform from one codebase",
        desc: "React Native plus Expo delivers identical iOS and Android builds from a single TypeScript codebase, with platform-aware components where it matters.",
      },
      {
        title: "Native-feel navigation",
        desc: "Expo Router's file-based navigation produces native stack and tab transitions out of the box, plus deep linking support for shareable course URLs.",
      },
      {
        title: "Progress tracking & lesson playback",
        desc: "Course catalog with lesson-level progress tracking and a media player tuned for mobile network conditions, including resumable playback positions.",
      },
      {
        title: "OTA updates via EAS",
        desc: "EAS Build for production binaries paired with over-the-air content and UI updates, enabling rapid iteration without store-review delays.",
      },
    ],
  },
];

/** Projects surfaced on the home page, in order. */
export const featuredProjects = projects.filter((p) => p.featured);

/** Distinct categories, for the projects-index filter bar. */
export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

/**
 * Resolve a project by slug, falling back to the legacy numeric id so links
 * shared as /projects/12 keep working.
 */
export function getProject(param) {
  const key = String(param);
  return (
    projects.find((p) => p.slug === key) ??
    projects.find((p) => String(p.id) === key) ??
    null
  );
}

/** Every addressable route param, used by generateStaticParams. */
export function allProjectParams() {
  return projects.flatMap((p) => [{ projectId: p.slug }, { projectId: String(p.id) }]);
}

/** Next project in the index, for the "up next" footer on detail pages. */
export function nextProject(slug) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
}
