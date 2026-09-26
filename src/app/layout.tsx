import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import { WishlistProvider } from "@/components/activation-menu/WishlistProvider";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GatherUp Wellness | Wellness that works.",
  description: "GatherUp Wellness helps organizations build a culture of connection and well-being through mindfulness and community.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gatherupwellness.com'),
  openGraph: {
    title: "GatherUp Wellness | Wellness that works.",
    description: "GatherUp Wellness helps organizations build a culture of connection and well-being through mindfulness and community.",
    url: '/',
    siteName: 'GatherUp Wellness',
    images: [
      {
        url: '/assets/images/ps-outdoor-yoga-class-atlanta-laure-photography-45_edited.jpg',
        width: 1200,
        height: 630,
        alt: 'GatherUp Wellness - Outdoor Yoga Class',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "GatherUp Wellness | Wellness that works.",
    description: "GatherUp Wellness helps organizations build a culture of connection and well-being through mindfulness and community.",
    images: ['/assets/images/ps-outdoor-yoga-class-atlanta-laure-photography-45_edited.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <body className="antialiased" style={{ isolation: 'isolate' }}>
        <WishlistProvider>{children}</WishlistProvider>
      </body>
    </html>
  );
}
