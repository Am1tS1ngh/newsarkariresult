"use client";
import Link from "next/link";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header>
      <div className="bg-[#cd0808] py-4">
        <div className="h-[160px] flex flex-col justify-center items-center text-center" style={{ fontFamily: 'Arial, sans-serif' }}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight ">NEW SARKARI RESULT</h1>
          <p className="text-xl sm:text-2xl md:text-[25px] font-bold text-white leading-tight ">
            NewSarkariResult.co.in
          </p>
        </div>
      </div>
      <Navbar />
    </header>
  );
}
