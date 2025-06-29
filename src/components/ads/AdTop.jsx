// components/AdLeft.js
'use client';

import { useEffect } from "react";

export default function AdTop() {
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://your-adsterra-snippet-url.js"; // replace with actual Adsterra URL
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <div className="w-full h-full">
      Adsterra should load automatically via script
      {/* Adsterra should load automatically via script */}
    </div>
  );
}
