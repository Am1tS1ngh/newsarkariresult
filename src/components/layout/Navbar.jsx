'use client';

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Menu as MenuIcon, Search, ChevronDown } from "lucide-react";

// Lazy load SearchModal to avoid SSR issues
const SearchModal = dynamic(() => import("../modals/SearchModal"), {
    ssr: false,
});

const menuItems = [
    { label: "Home", href: "/" },
    { label: "Latest Job", href: "/latest-jobs" },
    { label: "Admit Card", href: "/admit-cards" },
    { label: "Result", href: "/result" },
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
    const [showModal, setShowModal] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearch = (query) => {
        console.log("Searching:", query);
        setShowModal(false);
    };
    // useEffect(() => {
    //     // Close mobile menu when navigating to a new page 
    //     if (isMobileMenuOpen) alert("this is a test message")
    // }, [isMobileMenuOpen]);

    return (
        <>
            <nav className="bg-[#05055f] h-[47px] flex items-center justify-between px-4 relative z-30">
                {/* Mobile hamburger */}
                <div
                    className="md:hidden text-white flex items-center cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <MenuIcon className="w-6 h-6 mr-1" />
                    <span className="text-sm font-semibold">Menu</span>
                </div>

                {/* Desktop menu */}
                <ul className="hidden md:flex text-white h-full items-center leading-tight tracking-wide">
                    {menuItems.map((item) => (
                        <li key={item.label} className="h-[47px]">
                            <Link
                                href={item.href}
                                className="px-2 hover:bg-[#982704] h-full flex items-center transition-colors duration-200"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li
                        className="relative h-[47px]"
                        onMouseEnter={() => setIsMoreOpen(true)}
                        onMouseLeave={() => setIsMoreOpen(false)}
                    >
                        <div className="h-full flex items-center px-2 cursor-pointer hover:bg-[#982704]">
                            <span className="text-sm font-semibold">More</span>
                            <ChevronDown className="w-4 h-4 ml-1 text-white" />
                        </div>
                        {isMoreOpen && (
                            <ul className="absolute top-[47px] left-0 bg-[#4c4c4c]/90 text-white min-w-[180px] flex flex-col z-40">
                                {moreItems.map((sub) => (
                                    <li key={sub.label}>
                                        <Link
                                            href={sub.href}
                                            className="block px-4 py-2 text-sm font-semibold hover:bg-[#cd0808]"
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

                {/* Search button */}
                <button
                    onClick={() => setShowModal(true)}
                    className="text-white hover:bg-[#982704] px-3 h-full rounded"
                >
                    <Search className="w-5 h-5" />
                </button>
            </nav>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#05055f] text-white flex flex-col p-4 gap-2 z-35">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="block hover:bg-[#982704] px-3 py-2 rounded"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <details className="group">
                        <summary className="cursor-pointer px-3 py-2 rounded hover:bg-[#982704] flex items-center justify-between">
                            <span>More</span>
                            <ChevronDown className="w-4 h-4" />
                        </summary>
                        <div className="pl-3 flex flex-col mt-1">
                            {moreItems.map((sub) => (
                                <Link
                                    key={sub.label}
                                    href={sub.href}
                                    className="text-sm py-1 hover:text-red-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {sub.label}
                                </Link>
                            ))}
                        </div>
                    </details>
                </div>
            )}

            {/* Search Modal */}
            {showModal && (
                <SearchModal onClose={() => setShowModal(false)} onSearch={handleSearch} />
            )}
        </>
    );
}
