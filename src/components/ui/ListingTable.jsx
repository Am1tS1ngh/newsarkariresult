import React from "react";
import Link from "next/link";

const ListingTable = ({ title, items }) => {
  return (
    <div className="border border-gray-300 rounded-sm overflow-hidden mb-6">
      {/* Table Head */}
      <div className="bg-[#A80909] text-white text-center font-bold text-2xl px-4 py-3">
        {title}
      </div>

      {/* Table Rows */}
      <ul className="divide-y divide-gray-300">
        
        {items.map((item, index) => (
          <li key={index} className="bg-white hover:bg-gray-50">
            <Link
              href={item.href}
              className="flex items-center px-4 py-3 text-blue-700 hover:underline"
            >
              {/* <span className="text-green-600 text-lg mr-2">›</span> */}
              <span className=" mr-2">•</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingTable;
