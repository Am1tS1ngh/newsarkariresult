import ListingTable from "@/components/ui/ListingTable";

export const metadata = {
  title: "Admit Cards | Sarkari Result",
  description:
    "Download admit cards for all government exams. Get timely updates and direct links to download your admit cards.",
  alternates: {
    canonical: "https://newsarkariresult.co.in/admit-cards",
  },
};

export default function AdmitCardsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admit Cards</h1>
      <p className="mb-4">
        Welcome to Sarkari Result. Find and download admit cards for all government exams here.
      </p>
      <ListingTable
        title="Admit Cards"
        category="admit-cards"
      />
    </div>
  );
}
