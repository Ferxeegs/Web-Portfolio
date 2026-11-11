import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://ferxcode.my.id";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ferxcode",
  alternateName: ["Fadlil Ferdiansyah"],
  url: siteUrl,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fadlil Ferdiansyah",
  alternateName: "Ferxcode",
  url: siteUrl,
  jobTitle: "Software Developer",
  sameAs: [
    "https://linkedin.com/in/fadlilfer",
    "https://github.com/Ferxeegs",
    "https://instagram.com/fadlilfer_",
    "https://wa.me/6282133513522",
  ],
};

function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Ferxcode",
  title: "Ferxcode | Fadlil Ferdiansyah – Software Developer",
  description: "Ferxcode is the official portfolio of Fadlil Ferdiansyah, showcasing a passion for technology through clean code and impactful projects.",
  keywords: ["Ferxcode", "Fadlil Ferdiansyah", "Software Developer", "Full Stack Developer Indonesia"],
  authors: [{ name: "Fadlil Ferdiansyah", url: siteUrl }],
  creator: "Fadlil Ferdiansyah",
  publisher: "Ferxcode",
  openGraph: {
    title: "Ferxcode | Fadlil Ferdiansyah",
    description: "Showcasing clean code and impactful projects.",
    url: siteUrl,
    siteName: "Ferxcode",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ferxcode Portfolio Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}