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

export const metadata: Metadata = {
  metadataBase: new URL('https://ferxcode.my.id'),
  title: "Ferxcode | Fadlil Ferdiansyah – Software Developer", 
  description: "Ferxcode is the official portfolio of Fadlil Ferdiansyah, showcasing a passion for technology through clean code and impactful projects.",
  keywords: ["Ferxcode", "Fadlil Ferdiansyah", "Software Developer", "Full Stack Developer Indonesia"],
  openGraph: {
    title: "Ferxcode | Fadlil Ferdiansyah",
    description: "Showcasing clean code and impactful projects.",
    url: "https://ferxcode.my.id",
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
    canonical: 'https://ferxcode.my.id',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Fadlil Ferdiansyah",
              "alternateName": "Ferxcode",
              "url": "https://ferxcode.my.id",
              "jobTitle": "Software Developer",
              "sameAs": [
                "https://linkedin.com/in/fadlilfer", 
                "https://github.com/Ferxeegs",     
                "https://instagram.com/fadlilfer_", 
                "https://wa.me/6282133513522"          
              ]
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}