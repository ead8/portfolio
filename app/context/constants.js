// THIS FILE HOLD THE DYNAMIC DATA OF THIS WEBSITE
import noImage from "@/public/backgrounds/card-bg-img.jpg";

// REAL PROJECT SCREENSHOTS — supplied in /public/projects/
import launchPadImg from "@/public/projects/tokenlaudnch.png";
import sundialImg from "@/public/projects/sundial.png";
import withfundImg from "@/public/projects/withfund.png";
import binzImg from "@/public/projects/thebinzstore.png";
import predictionMarketImg from "@/public/projects/prediction-market.png";
import drixxImg from "@/public/projects/drixx.png";

export const caseStudyNotFound = {
  id: 0,
  title: "Case Study Not Found",
  subTitle: "Project Management Tool",
  url: "https://www.taskvare.com/",
  imgSrc: noImage.src,
};

export const workListData = [];
export const projectListData = [
  {
    id: 1,
    title: "LaunchPad",
    subTitle: "Premium Token Launch Platform on BNB Chain",
    imgSrc: launchPadImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: launchPadImg.src,
      overview: {
        myRole: "Full Stack Developer",
        techUsed: "Next.js 16, TypeScript, Tailwind CSS v4, Wagmi, Viem, Neon PostgreSQL, BNB Chain, Stripe, SendGrid, Firebase",
        timeline: "May 2026",
        sourceCode: "https://github.com/ead8/bnb-token-launch-platform",
        liveUrl: null,
        projectDesc: {
          para1: "LaunchPad is a production-ready Web3 platform for launching, trading, and managing tokens on BNB Chain. Creators get an intuitive token-launch wizard, advanced analytics, and automated fee distribution across social platforms; traders get portfolio tracking, real-time charts, and security risk scoring before they ape in.",
          para2: "The platform is built on Next.js 16 with App Router, server components, and a Neon Postgres backend. Bonding-curve trading enables fair price discovery, while a referral system, leaderboard, and email/push notifications drive engagement and retention.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "Token Launch Wizard",
            desc: "Step-by-step token creation flow with Flap.sh smart contracts on BNB Chain, automated bonding curves, and a creator dashboard for multi-token management.",
          },
          {
            title: "Real-Time Trading & Analytics",
            desc: "Interactive Recharts price charts with multiple timeframes, volume tracking, holder distribution, and a price-history pipeline backed by CoinGecko.",
          },
          {
            title: "Security & Trust Layer",
            desc: "Token security verification with risk scoring, contract audit metadata, honeypot detection, and creator verification badges with reputation scores.",
          },
          {
            title: "Referrals, Notifications & Payments",
            desc: "Stripe-powered fiat onramps, SendGrid email and Firebase push notifications, plus a referral and leaderboard system that rewards top earners.",
          },
        ],
      },
    },
  },
  {
    id: 2,
    title: "Omilink",
    subTitle: "Modern Link-in-Bio SaaS Platform",
    imgSrc: null,
    artworkKind: "network",
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: null,
      artworkKind: "network",
      overview: {
        myRole: "Full Stack Developer",
        techUsed: "Next.js (App Router), React, shadcn/ui, Tailwind CSS, Clerk, MongoDB, Mongoose",
        timeline: "March 2026",
        sourceCode: "https://github.com/ead8/Omilink",
        liveUrl: null,
        projectDesc: {
          para1: "Omilink is a link-in-bio app that gives users a single shareable page for their socials, dev profiles, tipping links, and contact details. Built with Next.js App Router, shadcn/ui, and a MongoDB backend, it ships authenticated profile management with username-based public pages at the route /<username>.",
          para2: "The platform supports a wide range of link types — social, professional, dev platforms, creative, messaging, storefront, and miscellaneous — and includes an optional access-key gate for private links so users can share sensitive resources without exposing them publicly.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "Authenticated Profile Management",
            desc: "Clerk-powered authentication with username, name, bio, and avatar fields, plus a Manage dashboard for live link editing and publishing.",
          },
          {
            title: "Multi-Type Link Support",
            desc: "First-class link types covering socials, dev platforms (GitHub, GitLab, etc.), messaging, storefronts, and creative profiles, all reorderable from the dashboard.",
          },
          {
            title: "Private Links with Access Keys",
            desc: "Optional per-link access keys gate sensitive miscellaneous links so users can share private resources alongside public ones on the same page.",
          },
          {
            title: "Responsive Public Profile",
            desc: "Username-based public pages at /<username> with a fully responsive layout that scales cleanly from mobile to desktop.",
          },
        ],
      },
    },
  },
  {
    id: 3,
    title: "TAO Detector",
    subTitle: "Cryptocurrency New-Listing Detection System",
    imgSrc: null,
    artworkKind: "chart",
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: null,
      artworkKind: "chart",
      overview: {
        myRole: "Backend & Data Engineer",
        techUsed: "Python, Asyncio, Binance API, OKX API, Pandas, CSV-based time-series storage",
        timeline: "July 2025",
        sourceCode: "https://github.com/ead8/toa-detector",
        liveUrl: null,
        projectDesc: {
          para1: "TAO Detector is a cryptocurrency new-listing detection system that continuously monitors Binance and OKX exchanges and identifies newly listed coins as early as possible. As soon as a new listing appears, the system automatically downloads the first 7 days of 1-minute OHLCV data from the genesis candle for early-pattern analysis.",
          para2: "The pipeline is built around async candle downloaders and per-exchange detection scripts, with structured CSV storage organized for fast downstream analysis. The dataset is designed to support quantitative research on early price movements, volume patterns, and trading-strategy development for newly listed assets.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "Multi-Exchange Listing Detection",
            desc: "Continuous monitoring of Binance and OKX with detection logic that flags new symbols the moment they become available on each exchange.",
          },
          {
            title: "Async OHLCV Backfill",
            desc: "Async candle downloaders pull the first 7 days of 1-minute OHLCV from the genesis candle, with retry logic and storage management for large datasets.",
          },
          {
            title: "Structured CSV Storage",
            desc: "Per-exchange CSV layout with full OHLCV columns plus trade counts and taker base/quote volumes, ready for direct ingestion into Pandas notebooks.",
          },
          {
            title: "Historical Listing Database",
            desc: "Maintains a full historical record of detected listings so quants can backtest strategies on early-listing behavior across multiple coins and exchanges.",
          },
        ],
      },
    },
  },
  {
    id: 4,
    title: "JSONGuard",
    subTitle: "Fast & Pythonic JSON Schema Validator",
    imgSrc: null,
    artworkKind: "validator",
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: null,
      artworkKind: "validator",
      overview: {
        myRole: "Library Author",
        techUsed: "Python, orjson, Type Hints, Pytest, Benchmark Tooling",
        timeline: "April 2026",
        sourceCode: "https://github.com/ead8/jsonguard",
        liveUrl: "https://pypi.org/project/jsonguard/",
        projectDesc: {
          para1: "JSONGuard is a fast, pythonic JSON Schema validator distributed on PyPI. Schemas are defined directly with Python's built-in types and type hints (inspired by sqlmodel), so you skip the boilerplate of formal JSON Schema documents while still getting strict type enforcement, optional fields, and custom validator functions.",
          para2: "The library is roughly 250 lines of optimized code and uses orjson under the hood. Benchmarks place it at ~116x faster than fastjsonschema on basic validation, with depth protection, payload size limits, and either fail-fast or collect-all-errors modes for diagnostics.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "Pythonic Schema Definitions",
            desc: "Schemas are plain Python dicts using built-in types, Union, and Optional — no separate JSON Schema document or DSL to learn.",
          },
          {
            title: "Composable Custom Validators",
            desc: "Any callable that returns True on valid input works as a validator, enabling regex, range, and domain-specific checks directly inside the schema.",
          },
          {
            title: "Performance-First Implementation",
            desc: "Backed by orjson with a tight ~250-line core; benchmarks show ~116x faster basic validation than fastjsonschema and ~298x faster than jsonschema.",
          },
          {
            title: "Hardening Options",
            desc: "Configurable max_size_in_bytes, max_depth, and loosely_typed flags protect against oversized payloads and deeply nested DoS attempts.",
          },
        ],
      },
    },
  },
  {
    id: 5,
    title: "Mobile LMS",
    subTitle: "Cross-Platform Learning Management System",
    imgSrc: null,
    artworkKind: "phone",
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: null,
      artworkKind: "phone",
      overview: {
        myRole: "Mobile Developer",
        techUsed: "React Native, Expo, TypeScript, Expo Router, EAS Build",
        timeline: "March 2025",
        sourceCode: "https://github.com/ead8/mobile-LMS",
        liveUrl: null,
        projectDesc: {
          para1: "Mobile LMS is a cross-platform learning management system built with React Native and Expo, delivering a native iOS and Android experience from a single TypeScript codebase. The app provides students with a full learning loop — course browsing, lesson playback, and progress tracking — optimized for mobile network conditions.",
          para2: "The architecture leans on Expo Router for file-based navigation and EAS Build for production binaries, keeping the development feedback loop tight while enabling over-the-air updates for fast iteration on content and UI without a full app-store roundtrip.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "Cross-Platform from One Codebase",
            desc: "React Native plus Expo delivers identical iOS and Android builds from a single TypeScript codebase, with platform-aware components where it matters.",
          },
          {
            title: "Native-Feel Navigation",
            desc: "Expo Router's file-based navigation produces native stack and tab transitions out of the box, plus deep linking support for shareable course URLs.",
          },
          {
            title: "Progress Tracking & Lesson Playback",
            desc: "Course catalog with lesson-level progress tracking and a media player tuned for mobile network conditions, including resumable playback positions.",
          },
          {
            title: "OTA Updates via EAS",
            desc: "EAS Build for production binaries paired with over-the-air content and UI updates, enabling rapid iteration without store-review delays.",
          },
        ],
      },
    },
  },
  {
    id: 6,
    title: "Sundial Lands",
    subTitle: "Land-Buying & Cash-Offer Real Estate Platform",
    imgSrc: sundialImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: sundialImg.src,
      overview: {
        myRole: "Lead Full-Stack Developer (Solo Build)",
        techUsed: "Next.js, TypeScript, Node.js, FastAPI, PostgreSQL",
        timeline: "2024",
        sourceCode: null,
        liveUrl: "https://sundiallands.com/",
        projectDesc: {
          para1: "Sundial Lands is a land-buying platform that helps property owners sell raw land for cash by connecting them directly with high-value buyers and generating data-driven offers within days. The product replaces traditional real-estate agents and lengthy listing cycles with a streamlined evaluation pipeline backed by parcel-level property data.",
          para2: "I built the entire platform end-to-end — Next.js frontend, Node.js and FastAPI backend services, evaluation pipeline, and admin tooling. The backend integrates with the Sundial evaluation API to score parcels, generate offers, and manage the seller workflow from inquiry through close.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "Automated Property Evaluation",
            desc: "Backend pipeline that ingests parcel data, scores properties against valuation models, and produces cash-offer ranges within days of submission.",
          },
          {
            title: "Seller Onboarding Flow",
            desc: "Guided intake form that captures parcel and contact details with progressive validation, designed for landowners with no real-estate experience.",
          },
          {
            title: "Internal Admin & Offer Tooling",
            desc: "Admin dashboard for the operations team to review submissions, adjust offers, track status across the buying pipeline, and manage closings.",
          },
          {
            title: "FastAPI Evaluation Service",
            desc: "Python FastAPI service exposes the parcel scoring and valuation logic to the Next.js frontend through a typed REST interface.",
          },
        ],
      },
    },
  },
  {
    id: 7,
    title: "OfBusiness",
    subTitle: "B2B Raw Materials Procurement & Credit Platform",
    imgSrc: null,
    artworkKind: "supply",
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: null,
      artworkKind: "supply",
      overview: {
        myRole: "Full-Stack Developer (Team Member)",
        techUsed: "Next.js, TypeScript, Node.js, FastAPI",
        timeline: "Client Engagement",
        sourceCode: null,
        liveUrl: "https://www.ofbusiness.com/",
        projectDesc: {
          para1: "OfBusiness is one of India's largest B2B raw-materials procurement and credit platforms, serving SMEs and corporations across steel, chemicals, polymers, energy, and agriculture sectors. The platform offers live commodity pricing across 500+ products, working-capital credit, and order tracking across 26+ Indian states and 15+ countries.",
          para2: "I contributed as a full-stack developer on the engineering team, working across Next.js/TypeScript frontend surfaces and Node.js/FastAPI backend services. My work spanned feature development, integration with internal pricing and credit services, and performance improvements across customer-facing flows.",
        },
      },
      features: {
        para: "Key contributions:",
        list: [
          {
            title: "Frontend Feature Development",
            desc: "Built and shipped customer-facing flows in Next.js and TypeScript, contributing to the live-pricing and ordering surfaces used by manufacturers and contractors.",
          },
          {
            title: "Backend API Integration",
            desc: "Wired Node.js and FastAPI services to the frontend, integrating with internal pricing, inventory, and credit-evaluation endpoints.",
          },
          {
            title: "Cross-Platform Order Tracking",
            desc: "Worked on order-tracking surfaces supporting the platform's reach across 26+ Indian states and 15+ international markets.",
          },
        ],
      },
    },
  },
  {
    id: 8,
    title: "Withfund",
    subTitle: "Crowdfunding & Fundraising Platform for Ethiopia",
    imgSrc: withfundImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: withfundImg.src,
      overview: {
        myRole: "Full-Stack Developer (Team Member)",
        techUsed: "Next.js, TypeScript, Node.js, FastAPI",
        timeline: "Client Engagement",
        sourceCode: null,
        liveUrl: "https://www.withfund.org/",
        projectDesc: {
          para1: "Withfund is a crowdfunding and fundraising platform built for Ethiopia, enabling individuals to launch campaigns and receive donations for medical emergencies, education costs, and personal causes. The platform has connected 740+ donors and processed 340,500+ ETB in cumulative donations.",
          para2: "I contributed as a full-stack developer on the team, working across the Next.js/TypeScript frontend and Node.js/FastAPI backend. My work covered campaign creation flows, real-time donation tracking, encrypted transactions, and direct bank-account withdrawal integration for fundraisers.",
        },
      },
      features: {
        para: "Key contributions:",
        list: [
          {
            title: "Campaign Launch Workflow",
            desc: "Built guided campaign-creation flows that let users set goals, describe causes, and publish campaigns within minutes from any device.",
          },
          {
            title: "Real-Time Donation Tracking",
            desc: "Implemented live-updating donation feeds and progress tracking so campaign owners and donors see contributions land in real time.",
          },
          {
            title: "Secure Payments & Withdrawals",
            desc: "Worked on encrypted-transaction handling and direct bank-account withdrawal flows tailored to Ethiopian payment rails.",
          },
        ],
      },
    },
  },
  {
    id: 9,
    title: "MoezBinz",
    subTitle: "Treasure-Hunt E-Commerce Liquidation Store",
    imgSrc: binzImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: binzImg.src,
      overview: {
        myRole: "Full-Stack Developer (Team Member)",
        techUsed: "Next.js, TypeScript, Node.js, FastAPI",
        timeline: "Client Engagement",
        sourceCode: null,
        liveUrl: "https://www.thebinzstore.com/",
        projectDesc: {
          para1: "MoezBinz is a treasure-hunt-themed e-commerce platform built around the bin-store retail model, where shoppers browse rotating inventory of liquidation merchandise at discount price tiers. The product blends a content-driven storefront with an inventory engine tuned for fast-moving, frequently changing stock.",
          para2: "I contributed as a full-stack developer on the team, working across the Next.js/TypeScript frontend storefront and Node.js/FastAPI backend services. My work covered product surfaces, inventory rotation flows, and integration between the storefront and internal merchandising tooling.",
        },
      },
      features: {
        para: "Key contributions:",
        list: [
          {
            title: "Storefront & Catalog Surfaces",
            desc: "Built customer-facing product browsing, catalog filtering, and price-tier surfaces in Next.js and TypeScript.",
          },
          {
            title: "Rotating Inventory Engine",
            desc: "Worked on backend logic for the bin-store model, including inventory rotation cycles and price-tier transitions tied to the treasure-hunt experience.",
          },
          {
            title: "Backend API Layer",
            desc: "Integrated Node.js and FastAPI services with the storefront, exposing typed APIs for catalog, inventory, and merchandising operations.",
          },
        ],
      },
    },
  },
  {
    id: 10,
    title: "Shopcart",
    subTitle: "Multi-Category E-Commerce Storefront",
    imgSrc: null,
    artworkKind: "cart",
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: null,
      artworkKind: "cart",
      overview: {
        myRole: "Full-Stack Developer (Team Member)",
        techUsed: "Next.js, TypeScript, Node.js, FastAPI",
        timeline: "Client Engagement",
        sourceCode: null,
        liveUrl: "https://shopcart.reactbd.com/",
        projectDesc: {
          para1: "Shopcart is a multi-category online storefront covering electronics, home appliances, and gadget accessories from brands like Apple, HP, Sony, and Huawei. The product spans browsing, wishlist, cart, and order flows with a content-driven blog layer for lifestyle and product education.",
          para2: "I contributed as a full-stack developer on the team across the Next.js/TypeScript frontend and Node.js/FastAPI backend. My work covered catalog and cart surfaces, the wishlist and order pipeline, and backend integrations for product, pricing, and promotions data.",
        },
      },
      features: {
        para: "Key contributions:",
        list: [
          {
            title: "Catalog, Cart & Wishlist Flows",
            desc: "Built catalog browsing, wishlist management, and cart/checkout surfaces in Next.js and TypeScript across multiple product categories.",
          },
          {
            title: "Promotions & Delivery Logic",
            desc: "Implemented promotional banners, free-delivery thresholds, and money-back-guarantee surfaces tied to backend promotion rules.",
          },
          {
            title: "Backend Catalog & Order APIs",
            desc: "Wired Node.js and FastAPI services to the storefront, exposing typed endpoints for products, pricing, orders, and customer accounts.",
          },
        ],
      },
    },
  },
  {
    id: 11,
    title: "ContentFlow",
    subTitle: "AI-Powered Content Creation & Multi-Platform Management",
    imgSrc: null,
    artworkKind: "flow",
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: null,
      artworkKind: "flow",
      overview: {
        myRole: "Full Stack Developer",
        techUsed: "Next.js 14, React 18, TypeScript, Tailwind CSS, Radix UI, shadcn/ui, Supabase (Auth + Postgres), React Hook Form, Zod, Stripe, Shotstack, Tavus",
        timeline: "2025",
        sourceCode: "https://github.com/ead8/ContentFlow",
        liveUrl: null,
        projectDesc: {
          para1: "ContentFlow is an AI-powered content creation and management platform that helps creators generate, organize, and distribute social media content across multiple platforms from a single workspace. It pairs an AI generation pipeline with media management, post scheduling, and analytics so creators can take an idea from prompt to published post without leaving the dashboard.",
          para2: "The platform is built on Next.js 14 with App Router and TypeScript, backed by Supabase for Postgres and email-OTP authentication. Stripe handles billing, while Shotstack and Tavus power video generation and AI video creation respectively, all wrapped in a polished UI built on Radix and shadcn/ui.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "AI Content Generation",
            desc: "AI-assisted generation pipeline that produces social media posts and creatives, with Shotstack and Tavus integrations for video and AI-avatar content.",
          },
          {
            title: "Email-OTP Authentication & Roles",
            desc: "Custom Supabase email-OTP flow with 6-digit codes (sign up, verify, set password, onboarding) plus role-based permissions for Creator and Admin user types.",
          },
          {
            title: "Media Library & Post Scheduling",
            desc: "Centralized media management for assets and a scheduling layer that queues posts for future publishing across connected social platforms.",
          },
          {
            title: "Analytics Dashboard & Billing",
            desc: "Performance and engagement analytics surfaces paired with Stripe-powered subscription billing for creator accounts.",
          },
        ],
      },
    },
  },
  {
    id: 12,
    title: "Prediction Market Terminal",
    subTitle: "Real-Time Arbitrage Detection Across Polymarket & Kalshi",
    imgSrc: predictionMarketImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: predictionMarketImg.src,
      overview: {
        myRole: "Full Stack Developer",
        techUsed: "Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Recharts, SWR, Socket.io, Neon PostgreSQL",
        timeline: "March 2026",
        sourceCode: "https://github.com/ead8/prediction-market-platform",
        liveUrl: "https://v0-prediction-market-platform.vercel.app/",
        projectDesc: {
          para1: "Prediction Market Terminal is a real-time analysis and arbitrage-detection platform that aggregates live market data from Polymarket and Kalshi — the two largest prediction-market exchanges. The dashboard surfaces 400+ live markets, cross-exchange arbitrage opportunities, and category-level analytics in a single unified interface.",
          para2: "The arbitrage engine uses fuzzy matching with Jaccard similarity to pair equivalent markets across exchanges, then computes spread percentages, profit margins net of trading fees, and a confidence score for every opportunity. Real-time updates flow through Socket.io and persistent alerts live in Neon Postgres — all on a Next.js 16 + React 19 server-component stack.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "Multi-Exchange Aggregation",
            desc: "Real-time market data from Polymarket and Kalshi unified into a single browser, with category filtering and full-text search across 400+ live markets.",
          },
          {
            title: "Cross-Exchange Arbitrage Engine",
            desc: "Fuzzy market matching using Jaccard similarity, with spread % and profit-margin calculations net of ~1% trading fees and a 0–1 confidence score per opportunity.",
          },
          {
            title: "Real-Time Updates & Alerts",
            desc: "Socket.io streams live market data to the dashboard; alerts persist in Neon Postgres and notify users when configured spread, category, and confidence thresholds are met.",
          },
          {
            title: "Analytics Dashboard",
            desc: "Aggregate market stats, category breakdowns, trending markets by 24h volume, top movers by price change, and price-distribution charts via Recharts.",
          },
        ],
      },
    },
  },
  {
    id: 13,
    title: "Drixx",
    subTitle: "USDT-Based Crypto Draw & Raffle Platform",
    imgSrc: drixxImg.src,
    isFeatured: true,
    isLocked: false,
    details: {
      coverImgSrc: drixxImg.src,
      overview: {
        myRole: "Full Stack Developer",
        techUsed: "Next.js 15, Supabase (Postgres + Auth), Tailwind CSS, Radix UI, React Hook Form, Zod, Recharts, Lucide",
        timeline: "March 2026",
        sourceCode: "https://github.com/ead8/Raffle-Crpto",
        liveUrl: "https://raffle-crpto-snvu.vercel.app/",
        projectDesc: {
          para1: "Drixx is a USDT-based crypto draw and raffle platform that lets users buy tickets and join hourly draws across multiple tiers — Fast, Mega, Express, and Premium — with transparent winner selection and instant USDT payouts.",
          para2: "The platform supports multi-network deposits and withdrawals across TRON, Solana, and BSC, layered with a referral system, daily-task rewards, and a leaderboard ranking players by winnings. The admin console manages draws, user balances, and the withdrawal approval pipeline.",
        },
      },
      features: {
        para: "Key features:",
        list: [
          {
            title: "Multi-Tier Draw System",
            desc: "Fast, Mega, Express, and Premium draws with random 6-digit ticket generation, automatic next-round recreation when a draw closes, and transparent winner selection.",
          },
          {
            title: "Multi-Network USDT Wallet",
            desc: "Native USDT balance tracking with deposits and withdrawals across TRON, Solana, and BSC; withdrawal flow gated by admin approval with full transaction history.",
          },
          {
            title: "Referrals, Tasks & Leaderboard",
            desc: "Commission-based referral tracking on tickets bought by invitees, daily tasks plus registration bonuses, and a leaderboard ranking players by winnings and participation.",
          },
          {
            title: "Admin Console",
            desc: "Full draw management (create, update, status control), user administration (balances, roles, account state), and a withdrawal approval pipeline with audit trail.",
          },
        ],
      },
    },
  }
];
