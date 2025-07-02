import ListingTable from "@/components/ui/ListingTable";

export const metadata = {
  title: "Latest Jobs | Sarkari Result",
  description:
    "Find the latest government job openings. Stay informed about various competitive exams and recruitment notifications from government bodies across India.",
  alternates: {
    canonical: "https://newsarkariresult.co.in/latest-jobs",
  },
};

export default function LatestJobsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Jobs</h1>
      <p className="mb-4">
        Welcome to Sarkari Result. Stay informed about the Latest Jobs of various competitive exams conducted by government bodies across India.
      </p>
      <ListingTable
        title="Latest Jobs"
        category="latest-jobs"
      />
    </div>
  );
}
