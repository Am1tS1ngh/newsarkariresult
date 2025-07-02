import ListingTable from "@/components/ui/ListingTable";

export const metadata = {
  title: "Admission | Sarkari Result",
  description:
    "Find the latest admission notifications for various courses and universities. Get timely updates and direct links to apply.",
  alternates: {
    canonical: "https://newsarkariresult.co.in/admission",
  },
};

export default function AdmissionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admission</h1>
      <p className="mb-4">
        Welcome to Sarkari Result. Find the latest admission notifications here.
      </p>
      <ListingTable
        title="Admission"
        category="admission"
      />
    </div>
  );
}
