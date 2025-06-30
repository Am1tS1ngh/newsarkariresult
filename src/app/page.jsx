// app/page.js
import LatestUpdates from "@/components/sections/LatestUpdates";
import { fetchLatestUpdates } from "../lib/api";
import CategoryColumns from "@/components/sections/CategoryColumns";
// import SearchBar from "@/components/SearchBar";
export const metadata = {
  title: "Home | Sarkari Result 2025",
};

export default async function Page() {
  const updates = await fetchLatestUpdates();
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

      {/* Search Bar */}
      {/* <SearchBar className="mt-6 px-4" /> */}
      {/* <ManageRecordForm /> */}

      <h2 className="text-2xl font-bold mt-4 px-4">Latest Updates</h2>

      <LatestUpdates />

      {/* Category Columns */}
      <CategoryColumns />
      
    </div>
  );
}