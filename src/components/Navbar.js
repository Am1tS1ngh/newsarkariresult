'use client';

import { useState } from "react";
import Link from "next/link";
import SearchModal from "./SearchModal";

const menuItems = [
    { label: "Home", href: "/" },
    { label: "Latest Job", href: "/jobs" },
    { label: "Admit Card", href: "/admit-cards" },
    { label: "Result", href: "/results" },
    { label: "Admission", href: "/admission" },
    { label: "Syllabus", href: "/syllabus" },
    { label: "Answer Key", href: "/answer-key" },
];

const moreItems = [
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
];

export default function Navbar() {
    const [showSearch, setShowSearch] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    return (
        <>
            <nav className="bg-[#05055f] h-[47px] flex items-center justify-between relative z-10 px-[9px] pl-[31px]">
                {/* Left Navigation */}
                <ul className="flex text-white font-semibold h-full items-center leading-tight tracking-normal">
                    {menuItems.map((item) => (
                        <li key={item.label} className="h-[47px]">
                            <Link
                                href={item.href}
                                className="px-2  hover:bg-[#982704] h-full flex items-center transition-colors duration-200"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}

                    {/* More dropdown */}
                    <li
                        className="relative group h-[47px]"
                        onMouseEnter={() => setIsMoreOpen(true)}
                        onMouseLeave={() => setIsMoreOpen(false)}
                    >
                        <button className="h-full hover:bg-[#982704] flex items-center">
                            <Link
                                href={"/more"}
                                className="pl-2   hover:bg-[#982704] h-full flex items-center transition-colors duration-200"
                            >
                                More 
                            </Link>
                            <span className="ml-1 p-1">▼</span>
                        </button>
                        {isMoreOpen && (
                            <ul className="absolute top-[47px] left-0 bg-[#4c4c4c]/80 text-white min-w-[180px] flex flex-col z-20 leading-none">
                                {moreItems.map((sub) => (
                                    <li key={sub.label}>
                                        <Link
                                            href={sub.href}
                                            className="block px-4 py-[10px] text-sm font-semibold hover:bg-[#cd0808] transition-colors duration-150"
                                            onClick={() => setIsMoreOpen(false)}
                                        >
                                            {sub.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>

                {/* Right Search Button */}
                <button
                    onClick={() => setShowSearch(true)}
                    className="text-white hover:bg-[#982704] px-3 h-full  rounded"
                >
                    🔍
                </button>
            </nav>

            {/* Search modal */}
            <SearchModal
                isOpen={showSearch}
                items={[...menuItems, ...moreItems]}
                onClose={() => setShowSearch(false)}
            />
        </>
    );
}
