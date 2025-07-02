import ListingTable from "@/components/ui/ListingTable";

export const metadata = {
  title: "Results | Sarkari Result",
  description:
    "Check the latest government exam results. Get timely updates and direct links to view your results.",
  alternates: {
    canonical: "https://newsarkariresult.co.in/result",
  },
};

export default function ResultPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Results</h1>
      <p className="mb-4">
        Welcome to Sarkari Result. Find and check the latest government exam results here.
      </p>
      <ListingTable
        title="Latest Results"
        category="result"
      />
    </div>
  );
}
