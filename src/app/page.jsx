'use client';

import { useState } from 'react';
import Link from 'next/link';
import LatestUpdates from "@/components/sections/LatestUpdates";
import CategoryColumns from "@/components/sections/CategoryColumns";
import SearchInput from "@/components/search/SearchInput";
import { fetchRecords } from "../lib/api";

export default function Page() {
  const [searchResults, setSearchResults] = useState([]);
  const [pagination, setPagination] = useState({ index: 1, items: 10, count: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  const handleSearch = async (searchTerm, pageIndex = 1) => {
    setCurrentSearchTerm(searchTerm);
    if (!searchTerm) {
      setHasSearched(false);
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await fetchRecords({ searchTerm, index: pageIndex, items: 20 });
      console.log(`Fetched records with searchTerm "${searchTerm}" at index ${pageIndex}`, data);
      if (data && data.list) {
        setSearchResults(data.list);
        setPagination({
          index: data.index,
          items: data.items,
          count: data.count,
        });
      } else {
        setSearchResults([]);
        setPagination({ index: 1, items: 10, count: 0 });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formattedRecords = searchResults.map(record => ({
    label: record.title,
    href: `/${record.title_slug}`,
  }));

  return (
    <div className="w-full flex flex-col py-6">
      {/* Text + LIVE Badge - Centered */}
      <div className="flex flex-col items-center justify-center gap-2 px-2 text-center">
        <p className="text-[1.05rem] max-w-4xl leading-none">
          <span className="font-bold">Sarkari Result</span> Get Online Form, Results, Admit Card, Answer Key, Syllabus, Career News, Sarkari Yojana, Scholarship, Sarkari Notice etc.
        </p>
        <div
          className="flex items-center space-x-1 bg-yellow-700 text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse"
          role="status"
          aria-label="Live updates"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>Coming Soon 😊</span>
        </div>
      </div>
    
      <div className="flex justify-between items-center mt-4 px-4">
        <h2 className="text-2xl font-bold">Latest Updates</h2>
        <SearchInput onSearch={handleSearch} />
      </div>

      {hasSearched ? (
        <div className="px-4 mt-6">
          <div className="border border-gray-300 rounded-sm overflow-hidden mb-6">
            <div className="bg-[#A80909] text-white text-center font-bold text-base md:text-lg lg:text-xl px-4 py-3">
              Matched Records
            </div>
            <ul className="divide-y divide-gray-300 min-h-[100px]">
              {isLoading ? (
                <li className="p-4 text-center">Loading...</li>
              ) : error ? (
                <li className="p-4 text-center text-red-500">Error: {error}</li>
              ) : formattedRecords.length === 0 ? (
                <li className="p-4 text-center">Sorry, but nothing matched your search terms. Please try again with some different keywords.</li>
              ) : (
                formattedRecords.map((item, index) => (
                  <li key={index} className="bg-white hover:bg-gray-50 ">
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-2 text-blue-700 hover:underline leading-tight md:text-lg lg:text-lg font-semibold"
                    >
                      <span className=" mr-2">•</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {!isLoading && !error && pagination.count > pagination.items && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => handleSearch(currentSearchTerm, pagination.index - 1)}
                disabled={pagination.index <= 1}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {pagination.index} of {Math.ceil(pagination.count / pagination.items)}
              </span>
              <button
                onClick={() => handleSearch(currentSearchTerm, pagination.index + 1)}
                disabled={pagination.index * pagination.items >= pagination.count}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <LatestUpdates />
          <CategoryColumns />
        </>
      )}
    </div>
  );
}