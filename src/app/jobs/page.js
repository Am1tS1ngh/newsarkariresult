// app/jobs/page.js
import { fetchJobs } from "@/lib/api";

export const metadata = {
  title: "Jobs | Sarkari Result",
  description:
    "Welcome to Sarkari Result. Stay informed about the Latest Jobs of various competitive exams conducted by government bodies across India, whether you are waiting for the Job Notification of any recruitment exam, entrance exam or any other government exam then we update the Latest Job from time to time to keep you informed.",
  alternates: {
    canonical: "https://newsarkariresult.co.in/jobs",
  },
};

export default async function JobsPage() {
  const jobs = await fetchJobs();
  return (
    <div>
      <h2>All Jobs</h2>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <a href={`/jobs/${job.id}`}>{job.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
}
