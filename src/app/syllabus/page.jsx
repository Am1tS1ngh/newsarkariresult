import ListingTable from "@/components/ui/ListingTable";

export const metadata = {
  title: "Syllabus | Sarkari Result",
  description:
    "Find the latest syllabus for all government exams. Stay updated with the latest exam patterns and syllabus details.",
  alternates: {
    canonical: "https://newsarkariresult.co.in/syllabus",
  },
};

export default function SyllabusPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Syllabus</h1>
      <p className="mb-4">
        Welcome to Sarkari Result. Here you can find the latest syllabus for all government exams. Stay updated with the latest exam patterns and syllabus details to prepare effectively.
      </p>
      <ListingTable
        title="Syllabus"
        category="syllabus"
      />
    </div>
  );
}
