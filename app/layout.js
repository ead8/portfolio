import "./globals.css";
import { Bricolage_Grotesque, Caveat, Silkscreen } from "next/font/google";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SmoothScroll from "./components/layout/SmoothScroll";
import PixelField from "./components/layout/PixelField";
import { ThemeProvider, themeScript } from "./components/layout/ThemeProvider";

import { profile, socials } from "./data/profile";
import { commandItems } from "./data/projectIndex";
import { BUILD_DATE, SITE_DESCRIPTION, SITE_NAME, SITE_URL, personJsonLd } from "./lib/site";

// One variable family carries every heading and paragraph (groq: never a second
// display face). Its weight axis is what the hero name plays with.
const sans = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
  axes: ["opsz", "wdth"],
  display: "swap",
});

// Handwriting for notes in the margins (novatsega)
const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

// Pixel face for labels, figures and the critters' scoreboard
const pixel = Silkscreen({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${profile.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Ebisa Dugo",
    "Senior Full-Stack Engineer",
    "AI Platform Developer",
    "FastAPI",
    "Python",
    "Next.js",
    "TypeScript",
    "JSONGuard PyPI",
    "Prediction Market Terminal",
    "Web3 Engineer",
    "Ethiopia Software Engineer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: profile.name,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: "@ebisaadw",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.ico" },
  category: "technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0b" },
    { media: "(prefers-color-scheme: light)", color: "#f2efe4" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd({ socials })),
          }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}.text-reveal-word{transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${sans.variable} ${hand.variable} ${pixel.variable} font-sans relative antialiased`}>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
          >
            Skip to content
          </a>

          <SmoothScroll />
          <PixelField />
          <Header paletteProjects={commandItems()} />

          <main id="main" className="relative pt-[var(--header-height)]">
            {children}
          </main>

          <Footer revised={BUILD_DATE} />
        </ThemeProvider>
      </body>
    </html>
  );
}
