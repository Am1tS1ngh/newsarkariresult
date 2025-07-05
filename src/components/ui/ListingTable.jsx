'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchCategoryRecords } from '@/lib/api';

const ListingTable = ({ title, category, searchTerm = '' }) => {
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({
    index: 1,
    items: 25, // Items per page
    count: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRecords = async (pageIndex = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCategoryRecords({
        category,
        searchTerm: searchTerm,
        index: pageIndex,
        items: pagination.items,
      });
      console.log(`Fetched records for category "${category}" with searchTerm "${searchTerm}"`, data);
      if (data === null || !data.list) {
        throw new Error('Failed to fetch records.');
      }
      setRecords(data.list);
      setPagination({
        index: parseInt(data.index || 1),
        items: parseInt(data.items || 0),
        count: parseInt(data.count || 0),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, [category, searchTerm]);

  const formattedRecords = records.map(record => ({
    label: record.title,
    href: `/${record.title_slug}`,
  }));

  return (
    <div className='w-full'>
      <div className="border border-gray-300 rounded-sm overflow-hidden mb-2 flex flex-col">
        <h2 className="bg-[#A80909] text-white text-base md:text-2xl lg:text-3xl tracking-wide text-center font-bold [h-30px] px-4">
          {title}
        </h2>
        <ul className="divide-y divide-gray-300 min-h-[100px]">
          {isLoading ? (
            <li className="p-4 text-center">Loading...</li>
          ) : error ? (
            <li className="p-4 text-center text-red-500">Error: {error}</li>
          ) : formattedRecords.length === 0 ? (
            <li className="p-4 text-center">No records found.</li>
          ) : (
            formattedRecords.map((item, index) => (
              <li key={index} className="bg-white hover:bg-gray-50">
                <Link
                  href={item.href}
                  className="flex items-center pl-2 py-2 text-blue-700  leading-tight  font-semibold"
                >
                <p>
                  <span className="mr-1">•</span>
                  <span className='text-base md:text-lg lg:text-lg hover:underline'>{item.label}</span>
                </p>
                
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>

      {!isLoading && !error && pagination.count > pagination.items && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => loadRecords(pagination.index - 1)}
            disabled={pagination.index <= 1}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {pagination.index} of {Math.ceil(pagination.count / pagination.items)}
          </span>
          <button
            onClick={() => loadRecords(pagination.index + 1)}
            disabled={pagination.index * pagination.items >= pagination.count}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingTable;
