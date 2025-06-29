// components/AdLeft.js
'use client';

import { useEffect, useRef } from "react";

const AdBanner = ({dataAdSlot, dataAdFormat, dataFullWidthResponsive}) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error(error.message);
        }
    }, []);

  return (
    <ins 
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
      data-ad-slot={dataAdSlot} // Replace with your actual ad slot ID
      data-ad-format={dataAdFormat} // Replace with your actual ad format
      data-full-width-responsive={dataFullWidthResponsive} // Replace with your actual responsive setting
    ></ins>
  );
}

export default AdBanner;

