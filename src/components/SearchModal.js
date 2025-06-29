'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SearchModal({ open, onClose, items }) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(items);
  const modalRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    const results = items.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search, items]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div ref={modalRef} className="bg-white rounded-md p-4 w-[90%] max-w-md shadow-lg">
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full h-[60px] px-[15px] pr-14 text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-10 top-[50%] transform -translate-y-1/2 text-gray-400 hover:text-black"
            >
              ❌
            </button>
          )}
          <button
            className="absolute right-3 top-[50%] transform -translate-y-1/2 text-gray-600 hover:text-black"
            onClick={() => console.log("Search:", search)}
          >
            🔍
          </button>
        </div>
        <ul className="mt-4">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <li key={item.label} className="py-1 border-b">
                <Link
                  href={item.href}
                  className="block text-blue-600 hover:underline"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-sm mt-2">No results found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
