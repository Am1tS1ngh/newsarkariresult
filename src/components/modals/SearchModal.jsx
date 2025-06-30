'use client';

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

export default function SearchModal({ onClose, onSearch }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus(); // Autofocus when modal opens
  }, []);

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setQuery('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex justify-center items-start pt-[200px]"
      onClick={onClose} // Clicking outside closes modal
    >
      <div
        className="flex items-center w-full max-w-xl px-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full py-3 pl-4 pr-10 rounded-l-md bg-white text-black text-sm outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="bg-red-600 text-white text-sm px-4 py-3 rounded-r-md hover:bg-red-700"
        >
          Search
        </button>
      </div>
    </div>
  );
}
