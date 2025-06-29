// components/AdLeft.js
'use client';

import { useEffect, useRef } from "react";

export default function AdAside() {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;
    const script = document.createElement("script");
    script.src = "//pl27034247.profitableratecpm.com/981a56b24361e5dfa1ede6bd998c7767/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    adRef.current.innerHTML = "";
    adRef.current.appendChild(script);
  }, []);

  return (
      <div id="container-981a56b24361e5dfa1ede6bd998c7767" ref={adRef}></div>
  );
}

