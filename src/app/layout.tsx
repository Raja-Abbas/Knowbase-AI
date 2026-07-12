import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/providers";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "KnowBase AI — AI-Powered Knowledge Base for Teams",
    template: "%s | KnowBase AI",
  },
  description:
    "Transform scattered business documents into an intelligent, searchable knowledge base. AI-powered answers grounded in your actual business data. Used by teams at startups and enterprises worldwide.",
  keywords: [
    "knowledge base",
    "AI assistant",
    "RAG",
    "customer support",
    "documentation",
    "SaaS",
    "team collaboration",
    "business intelligence",
    "document management",
    "AI chatbot",
  ],
  authors: [{ name: "KnowBase AI" }],
  creator: "KnowBase AI",
  publisher: "KnowBase AI",
  metadataBase: new URL("https://knowbase.ai"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://knowbase.ai",
    siteName: "KnowBase AI",
    title: "KnowBase AI — AI-Powered Knowledge Base for Teams",
    description:
      "Transform scattered business documents into an intelligent, searchable knowledge base. AI-powered answers grounded in your actual business data.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KnowBase AI — AI-Powered Knowledge Base",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KnowBase AI — AI-Powered Knowledge Base for Teams",
    description:
      "Transform scattered business documents into an intelligent, searchable knowledge base. AI-powered answers grounded in your actual business data.",
    images: ["/og-image.png"],
    creator: "@knowbaseai",
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>
      <body
        className={`${jakarta.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--card)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              fontSize: "0.875rem",
            },
          }}
        />
        </Providers>
      </body>
    </html>
  );
}
