import "./globals.css";
import dynamic from "next/dynamic";
import SideBar from "./components/navigation/SideBar";
import Footer from "./components/generic/Footer";
import GeneralProvider from "./context/GeneralContext";
import { Staatliches, Inter, JetBrains_Mono } from "next/font/google";

// Persistent multi-layer starfield behind every page — client-only WebGL
const BackgroundStars = dynamic(
  () => import("./components/generic/BackgroundStars"),
  { ssr: false }
);

// Warp-jump overlay shown briefly on every route change
const WarpOverlay = dynamic(
  () => import("./components/generic/WarpOverlay"),
  { ssr: false }
);

const display = Staatliches({
  subsets: ["latin"],
  variable: "--display",
  weight: ["400"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  weight: ["400", "500"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--mono",
  weight: ["400", "500"],
});

export const metadata = {
  title: "Ebisa Dugo — Full-Stack Developer",
  description:
    "Senior full-stack developer building AI-powered platforms, scalable backend systems, and modern web products with Next.js, FastAPI, and Python.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-void text-ghost">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${display.variable} ${inter.variable} ${mono.variable}`}>
        <GeneralProvider>
          {/* Persistent universe background — sits behind all content */}
          <BackgroundStars />
          {/* Warp transition between routes */}
          <WarpOverlay />

          <main className="font-inter relative z-10 flex flex-col items-center bg-transparent text-ghost w-full min-h-screen">
            <SideBar />
            <div className="relative w-full min-h-screen scroll-smooth">
              <div className="relative w-full max-w-page mx-auto px-4 lg:px-6 pt-20 pb-20">
                {children}
              </div>
              <Footer />
            </div>
          </main>
        </GeneralProvider>
      </body>
    </html>
  );
}
