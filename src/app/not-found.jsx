'use client';
import Link from "next/link";

export default function NotFound() {
  const handleHardRefresh = () => {
    // Force a hard reload
    window.location.reload(true);
  };

  return (
    <div className="h-[100%] w-[100%] flex-1 max-w-[1070px] mx-auto min-w-0 flex items-center justify-center bg-gradient-to-br from-red-500 to-blue-500 text-center p-6">
      <div className=" bg-white shadow-lg rounded-xl p-8 border border-gray-200 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">🚧 Server is Too Busy</h1>

        <p className="text-lg text-gray-600 mb-4">
          Press{" "}
          <button
            onClick={handleHardRefresh}
            className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-bold px-4 py-1 rounded-full shadow-md transition duration-300"
          >
            🔁 Refresh Like a Boss
          </button>
        </p>

        <p className="text-gray-500 mb-6">
          If the problem persists, please visit our main site for updates.
        </p>

        <Link
          href="https://newrojgarresult.com"
          target="_blank"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition"
        >
          Visit newrojgarresult.com 🔗
        </Link>

        <div className="mt-4">
          <Link href="/" className="text-sm text-blue-500 hover:underline">
            ⬅️ Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
