import type { Metadata, Viewport } from "next";
import Script from "next/script";
import ClientLayout from "@/components/layout/ClientLayout";
import "./globals.css";

const GA_ID = "G-BCR4RWJWQ5";

export const metadata: Metadata = {
  metadataBase: new URL("https://kita-sehat.id"),
  title: {
    default: "Kita-Sehat.id — Portal Kesehatan Keluarga Terpercaya",
    template: "%s | Kita Sehat",
  },
  description: "Dapatkan artikel kesehatan terpercaya, tips gaya hidup sehat, nutrisi, dan panduan medis untuk keluarga Indonesia hanya di Kita-Sehat.id.",
  keywords: ["kesehatan", "tips kesehatan", "keluarga sehat", "nutrisi", "gaya hidup sehat", "kita sehat"],
  authors: [{ name: "Redaksi Kita Sehat" }],
  creator: "Kita Sehat",
  publisher: "Kita Sehat",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kita-sehat.id",
    siteName: "Kita-Sehat.id",
    title: "Kita-Sehat.id — Portal Kesehatan Keluarga Terpercaya",
    description: "Artikel terpercaya dan tips kesehatan keluarga untuk membantu Anda tetap bugar dan sehat.",
    images: [
      {
        url: "/og-image.jpg", // Make sure this exists or replace with actual URL
        width: 1200,
        height: 630,
        alt: "Kita-Sehat.id",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kita-Sehat.id — Portal Kesehatan Keluarga Terpercaya",
    description: "Dapatkan artikel kesehatan terpercaya dan tips gaya hidup sehat untuk keluarga.",
    images: ["/og-image.jpg"],
  },
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

export const viewport: Viewport = {
  themeColor: "#0098b0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white antialiased" suppressHydrationWarning>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

