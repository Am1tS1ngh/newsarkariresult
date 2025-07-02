import ListingTable from "@/components/ui/ListingTable";

export const metadata = {
  title: "Answer Key | Sarkari Result",
  description:
    "Download answer keys for all government exams. Verify your answers and estimate your score with our timely updates.",
  alternates: {
    canonical: "https://newsarkariresult.co.in/answer-key",
  },
};

export default function AnswerKeyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Answer Key</h1>
      <p className="mb-4">
        Welcome to Sarkari Result. Find and download answer keys for all government exams here.
      </p>
      <ListingTable
        title="Answer Key"
        category="answer-key"
      />
    </div>
  );
}
