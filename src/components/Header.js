"use client"; // This file is a client component
// components/Header.js
import Link from "next/link";
import Navbar from "./Navbar";

export default function Header() {

    return <header>
        {/* Branding Section */}
        <div className="bg-[#cd0808] py-4">
            <div className="h-[160px] flex flex-col justify-center items-center text-center"  style={{ fontFamily: 'Arial, sans-serif' }}>
                {/* <h1 className="text-5xl font-bold text-white leading-tight tracking-wide">NEW SARKARI RESULT</h1> */}
                <h1 className="text-5xl font-bold text-white leading-none tracking-tight">NEW SARKARI RESULT</h1>

                <p className="text-white font-bold text-[25px] leading-tight tracking-wide">
                    NewSarkariResult.co.in
                </p>

            </div>
        </div>


        {/* Navigation Bar */}
        <Navbar />


    </header>
}