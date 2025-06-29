'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function GoogleAdRight() {
  const adRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.warn('Ad already loaded or error occurred:', e);
      }
    }
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9894115634285043"
        crossOrigin="anonymous"
      />
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9894115634285043"
        data-ad-slot="3552186405"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
}
