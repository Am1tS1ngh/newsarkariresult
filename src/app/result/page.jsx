// app/jobs/page.js
import ListingTable from "@/components/ui/ListingTable";
import { fetchJobs } from "@/lib/api";

export const metadata = {
  title: "Result | Sarkari Result",
  description:
    "Welcome to Sarkari Result. Stay informed about the Latest Jobs of various competitive exams conducted by government bodies across India, whether you are waiting for the Job Notification of any recruitment exam, entrance exam or any other government exam then we update the Latest Job from time to time to keep you informed.",
  alternates: {
    canonical: "https://newsarkariresult.co.in/jobs",
  },
};

const data = [
  {
    label: "UPSC Civil Services Exam 2025",
    href: "/jobs/upsc-civil-services-exam-2025",
  },
  {
    label: "SSC CGL 2025 Notification",
    href: "/jobs/ssc-cgl-2025-notification",
  },
  {
    label: "IBPS PO Recruitment 2025",
    href: "/jobs/ibps-po-recruitment-2025",
  },
  {
    label: "Railway Group D Exam 2025",
    href: "/jobs/railway-group-d-exam-2025",
  },
];

export default async function JobsPage() {
  const jobs = await fetchJobs();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Results</h1>
      <p className="mb-4">
        Welcome to Sarkari Result. Stay informed about the Latest Jobs of various competitive exams conducted by government bodies across India, whether you are waiting for the Job Notification of any recruitment exam, entrance exam or any other government exam then we update the Latest Job from time to time to keep you informed.
      </p>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <ListingTable title="Result" items={data} />
        </div>
        <div className="col-span-2"></div>
      </div>
    </div>

  );
}
