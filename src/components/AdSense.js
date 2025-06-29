import Script from 'next/script';
import React from 'react';
// components/AdSense.js
const AdSense = () => {
    return (
        <Script 
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    )
};

export default AdSense;
