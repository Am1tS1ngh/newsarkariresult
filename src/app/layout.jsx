import { Roboto } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSense from "@/components/ads/AdSense";
import AdBanner from "@/components/ads/AdBanner";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: "Sarkari Result , Sarkari Result 2025 | Sarkari Results | New Sarkari Result , New Sarkari Result 2025 | New Sarkari Results | newsarkariresult.com.in",
  description: "Sarkari Result Get Online Form, Results, Admit Card, Answer Key, Syllabus, Career News, Sarkari Yojana, Scholarship, Sarkari Notice etc. Button SSC CGL, etc.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  }
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
      <Head>
        {/* ✅ Basic Icons */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <meta name="theme-color" content="#cd0808"></meta>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ✅ Social Sharing (Open Graph / Twitter) */}
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/logo.png" />

        {/* ✅ Schema.org JSON-LD (Google Logo Rich Result) */}
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
        <link rel="canonical" href="https://newsarkariresult.co.in/" />
        <AdSense/>
      </Head>
      <body className={roboto.className}>
        <div className="flex flex-col min-h-screen font-arial md:flex-row">

          {/* Left Ad (for desktop and tablet landscape) */}
          <aside className="hidden ">
          {/* <aside className="block basis-[15%] max-w-[533px] p-4 border border-red-500"> */}
            <AdBanner dataAdFormat="auto" dataFullWidthResponsive={ true } dataAdSlot="3552186405"/>
          </aside>

          {/* Center Content */}
          <div className="flex-1 flex flex-col justify-between  max-w-[1070px] mx-auto min-w-0">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>

          {/* Right Ad (for desktop and tablet landscape) */}
          <aside className="hidden ">
            <AdBanner dataAdFormat="auto" dataFullWidthResponsive={ true } dataAdSlot="3552186405"/>

          </aside>

        </div>
      </body>
    </html>

  );
}

