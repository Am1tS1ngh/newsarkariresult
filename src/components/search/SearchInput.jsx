'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch(''); // Notify parent to clear results
  };

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        name="search"
        placeholder="Search all records..."
        className="w-full border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => {e.target.value == '' && handleClear(); setSearchTerm(e.target.value)}}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      {searchTerm && (
        <button
          className="absolute top-1/2 right-10 -translate-y-1/2 text-gray-500 hover:text-red-500"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-black hover:scale-110 transition-transform"
        onClick={handleSearch}
        aria-label="Submit search"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchInput;