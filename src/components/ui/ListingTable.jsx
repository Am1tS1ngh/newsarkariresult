'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchCategoryRecords } from '@/lib/api';

const ListingTable = ({ title, category, searchTerm = '' }) => {
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({
    index: 1,
    items: 10,
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
      if (data === null || !data.list) {
        throw new Error('Failed to fetch records.');
      }
      setRecords(data.list);
      setPagination({
        index: data.index,
        items: data.items,
        count: data.count,
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
    <div>
      <div className="border border-gray-300 rounded-sm overflow-hidden mb-2">
        <div className="bg-[#A80909] text-white text-center font-bold text-2xl px-4 py-2">
          {title}
        </div>
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
                  <span className='text-lg hover:underline'>{item.label}</span>
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
