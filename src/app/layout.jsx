import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSense from "@/components/ads/AdSense";
import AdBanner from "@/components/ads/AdBanner";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL('https://newsarkariresult.co.in'),
  title: "New Sarkari Result | Sarkari Result 2025 | newsarkariresult.co.in",
  description: "Find the latest Sarkari Result, Online Forms, Admit Cards, Answer Keys, Syllabus, and updates on Government Jobs, Sarkari Yojana, and Scholarships. Your one-stop portal for all government job alerts.",
  verification: {
    google: 'googlec7bba8d22d0ca581',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Sarkari Result 2025 | New Sarkari Result | newsarkariresult.co.in",
    description: "Find the latest Sarkari Result, Online Forms, Admit Cards, Answer Keys, Syllabus, and updates on Government Jobs, Sarkari Yojana, and Scholarships. Your one-stop portal for all government job alerts.",
    url: 'https://newsarkariresult.co.in',
    siteName: 'New Sarkari Result',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'New Sarkari Result Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sarkari Result 2025 | New Sarkari Result | newsarkariresult.co.in",
    description: "Find the latest Sarkari Result, Online Forms, Admit Cards, Answer Keys, Syllabus, and updates on Government Jobs, Sarkari Yojana, and Scholarships. Your one-stop portal for all government job alerts.",
    images: ['/logo.png'],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#cd0808",
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="flex flex-col min-h-screen font-arial md:flex-row md:justify-center">

          {/* Left Ad (for desktop and tablet landscape) */}
          <aside className="hidden lg:block w-[160px] p-4">
            <AdBanner dataAdFormat="auto" dataFullWidthResponsive={ true } dataAdSlot="3552186405"/>
          </aside>

          {/* Center Content */}
          <div className="flex-1 flex flex-col max-w-[1070px] min-w-0">
            <Header />
            <main className="flex-grow ">{children}</main>
            <Footer />
          </div>

          {/* Right Ad (for desktop and tablet landscape) */}
          <aside className="hidden lg:block w-[160px] p-4">
            <AdBanner dataAdFormat="auto" dataFullWidthResponsive={ true } dataAdSlot="3552186405"/>
          </aside>

        </div>
        <AdSense/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://newsarkariresult.co.in",
              logo: "https://newsarkariresult.co.in/logo.png",
            }),
          }}
        />
      </body>
    </html>

  );
}

