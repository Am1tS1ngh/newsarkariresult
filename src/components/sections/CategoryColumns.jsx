import ListingTable from "@/components/ui/ListingTable";

const data = [
  { label: "Rajasthan REET Certificate Download 2025", href: "/reet-2025" },
  { label: "Rajasthan High Court Class VI Peon Online Form 2025 – Start", href: "/highcourt-peon-2025" },
  { label: "Rajasthan RSMSSB Patwari Online Form 2025 (3705 Post)", href: "/patwari-2025" },
  { label: "Rajasthan Cooperative Bank RCRB Result 2025 – Out", href: "/rcrb-result-2025" },
  { label: "Rajasthan PTET Answer Key 2025 – Out", href: "/ptet-key-2025" },
  { label: "Rajasthan Police Constable Exam Date 2025 – Out", href: "/police-date-2025" },
  { label: "Police Constable Telecom Edit Form 2025 – Extend", href: "/telecom-edit-2025" },
  { label: "Rajasthan Board 5th Result 2025 – Out", href: "/board-5th-2025" },
  { label: "Rajasthan Board 10th Result 2025 – Out", href: "/board-10th-2025" },
  { label: "Rajasthan Board 8th Result 2025 – Out", href: "/board-8th-2025" },
];

export default function CategoryColumns() {
    return (
      <div className="container mx-auto p-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          <ListingTable title="Results" items={data} />
          <ListingTable title="Admit Cards" items={data} />
          <ListingTable title="Latest Jobs" items={data} />
          <ListingTable title="Answer Key" items={data} />
          <ListingTable title="Documents" items={data} />
          <ListingTable title="Admission" items={data} />
        </div>
      </div>
    );
}
