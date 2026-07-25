import "./globals.css";
import { Archivo, Martian_Mono } from "next/font/google";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScaleAxis from "./components/layout/ScaleAxis";
import SmoothScroll from "./components/layout/SmoothScroll";
import { ThemeProvider, themeScript } from "./components/layout/ThemeProvider";

import { profile, socials } from "./data/profile";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, personJsonLd } from "./lib/site";

// Archivo: an industrial grotesque with enough character to carry a headline,
// and not one of the three faces every generated interface defaults to.
const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Martian Mono is drawn for exactly this job — small technical labels — and is
// wide and mechanical enough to read as instrumentation rather than as code.
const mono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
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
    "full-stack engineer",
    "software engineer portfolio",
    "Next.js developer",
    "FastAPI",
    "Python developer",
    "AI engineer",
    "TypeScript",
    "Ethiopia",
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
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0e" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Sets data-theme before first paint so the page never flashes */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd({ socials })),
          }}
        />
        {/* Scroll entrances start at opacity 0 and are flipped by JS. Without
            this, a visitor with scripting off would get a blank page. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.text-reveal-word{transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${sans.variable} ${mono.variable} font-sans`}>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
          >
            Skip to content
          </a>

          <SmoothScroll />
          <ScaleAxis />
          <Header />

          <main id="main" className="relative pt-[var(--header-height)]">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
