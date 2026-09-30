import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D0308",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lashkarigroup.online"),
  title: {
    default: "LGC — Lashkari Group of Companies | Ventures Without Limits",
    template: "%s | Lashkari Group of Companies",
  },
  description:
    "Lashkari Group of Companies (LGC) — Where Ideas Become Industries. Global parent conglomerate managing high-growth technology, healthcare, frontier AI, mobility, and market ventures.",
  keywords: [
    // Core Conglomerate & Holding Keywords
    "Lashkari Group of Companies",
    "Lashkari Group",
    "LGC",
    "Global Venture Conglomerate",
    "Sovereign Tech Holding",
    "Enterprise Venture Studio",
    "Deep Tech Holding Company",
    "Founder-Led Conglomerate",
    "High-Growth Venture Studio",
    "Multi-Industry Holding Company",
    // Core Ventures Portfolio
    "PEROIX Web & Digital Presence",
    "VOIDEX Frontier AI",
    "MEETRIX Matchmaking Platform",
    "FOODTRAF Subscription Dining",
    "Lashkari Mobility EV Transit",
    "QUANT AUTOMATION Trading Systems",
    // Technology, AI & Infrastructure
    "Frontier Artificial Intelligence",
    "Autonomous Agent Systems",
    "NATSU Neural Engine",
    "Sovereign Cloud Infrastructure",
    "Generative AI Architecture",
    "Zero-Trust Enterprise Systems",
    "Spatial Computing WebGL",
    "Next-Gen Enterprise Platforms",
    // Healthcare & Life Sciences
    "Healthtech Ventures",
    "Clinic Digital Presence Portals",
    "Doctor Portfolio Engineering",
    "Medical Technology Innovation",
    "Bio-Venture Incubation",
    // Algorithmic Trading & Finance
    "Algorithmic Trading Software",
    "Low-Latency Trading Infrastructure",
    "Quantitative Finance Execution",
    "Statistical Arbitrage Systems",
    // Mobility & Urban Logistics
    "Clean Urban EV Transit",
    "Electric Mobility Fleet Solutions",
    "Micro-Logistics Network",
    "Sustainable Urban Transportation",
    // Recognized Enterprise & Regional Keywords
    "Ahmedabad Technology Ventures",
    "Mumbai Technology Holdings",
    "Indian Deep Tech Conglomerate",
    "Startup Incubator & Venture Studio",
    "Institutional Capital Partner",
    "Enterprise Digital Transformation",
    "Scale-Up Venture Engineering",
    "Sovereign Digital Ecosystem",
    "Global Innovation Holdings",
    "Berkshire Hathaway of Technology Model",
    "SoftBank Vision Style Studio",
  ],
  authors: [
    {
      name: "Lashkari Group of Companies",
      url: "https://lashkarigroup.online",
    },
  ],
  creator: "Lashkari Group Executive Council",
  publisher: "Lashkari Group of Companies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://lashkarigroup.online",
  },
  openGraph: {
    title: "LGC — Lashkari Group of Companies | Ventures Without Limits",
    description:
      "Where Ideas Become Industries. Global parent conglomerate managing technology, healthcare, frontier AI, mobility, and market ventures.",
    url: "https://lashkarigroup.online",
    siteName: "Lashkari Group of Companies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/luminous-tree.jpg",
        width: 1200,
        height: 630,
        alt: "Lashkari Group of Companies Sovereign Holding Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lashkari Group of Companies (LGC) | Where Ideas Become Industries",
    description:
      "Global parent conglomerate managing visionary technology, healthcare, and market ventures.",
    images: ["/images/luminous-tree.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Comprehensive Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Corporation",
        "@id": "https://lashkarigroup.online/#organization",
        name: "Lashkari Group of Companies",
        alternateName: ["LGC", "Lashkari Group"],
        url: "https://lashkarigroup.online",
        logo: "https://lashkarigroup.online/images/luminous-tree.jpg",
        description:
          "Global parent conglomerate managing visionary technology, healthcare, AI, mobility, and market ventures. Where Ideas Become Industries.",
        foundingDate: "2026",
        founders: [
          {
            "@type": "Person",
            name: "Paras Lashkari",
            jobTitle: "Chief Executive Officer & Ecosystem Architect",
          },
          {
            "@type": "Person",
            name: "Devashish Lashkari",
            jobTitle: "Chief Technology Officer & Infrastructure Lead",
          },
          {
            "@type": "Person",
            name: "Dr. Aneri Lashkari",
            jobTitle: "Chief Medical Officer & Healthtech Director",
          },
          {
            "@type": "Person",
            name: "Dr. Mitu Lashkari",
            jobTitle: "Chief Scientific Officer & Bio-Venture Lead",
          },
          {
            "@type": "Person",
            name: "Muskan Lashkari",
            jobTitle: "Chief Operating Officer & Global Talent Partner",
          },
          {
            "@type": "Person",
            name: "Payal Lashkari",
            jobTitle: "Chief Strategy Officer & Brand Governance Lead",
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "lashkarigroupofcompanies@gmail.com",
          contactType: "institutional relations",
          availableLanguage: ["English", "Hindi", "Gujarati"],
        },
        subOrganization: [
          {
            "@type": "Organization",
            name: "PEROIX",
            description: "High-conversion web architecture and doctor digital presence.",
            url: "https://peroix.lashkarigroup.online",
          },
          {
            "@type": "Organization",
            name: "VOIDEX",
            description: "Frontier AI solutions, custom neural networks, and NATSU intelligence.",
            url: "https://voidex.lashkarigroup.online",
          },
          {
            "@type": "Organization",
            name: "MEETRIX",
            description: "Executive and creator matchmaking platform.",
            url: "https://meetrix.lashkarigroup.online",
          },
          {
            "@type": "Organization",
            name: "FOODTRAF",
            description: "Subscription dining networks and micro-logistics.",
            url: "https://foodtraf.lashkarigroup.online",
          },
          {
            "@type": "Organization",
            name: "LASHKARI MOBILITY",
            description: "Clean electric mobility and sustainable urban logistics.",
            url: "https://mobility.lashkarigroup.online",
          },
          {
            "@type": "Organization",
            name: "QUANT AUTOMATION",
            description: "Low-latency algorithmic execution and proprietary financial systems.",
            url: "https://quant.lashkarigroup.online",
          },
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://lashkarigroup.online/#localbusiness",
        name: "Lashkari Group of Companies Headquarters",
        image: "https://lashkarigroup.online/images/luminous-tree.jpg",
        url: "https://lashkarigroup.online",
        telephone: "+91-9876543210",
        priceRange: "$$$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ahmedabad",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://lashkarigroup.online/#website",
        url: "https://lashkarigroup.online",
        name: "Lashkari Group of Companies",
        publisher: {
          "@id": "https://lashkarigroup.online/#organization",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://lashkarigroup.online/#breadcrumbs",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://lashkarigroup.online",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Philosophy",
            item: "https://lashkarigroup.online/#about",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Ventures Portfolio",
            item: "https://lashkarigroup.online/#ventures",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Executive Council",
            item: "https://lashkarigroup.online/#founders",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Institutional Contact",
            item: "https://lashkarigroup.online/#contact",
          },
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/sakura-branch-intermediate.webp"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#FAF6F8] text-[#1A1A1A] overflow-x-hidden">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
