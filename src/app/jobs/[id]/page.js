// app/jobs/[id]/page.js
import Head from "next/head";
import { fetchJobById } from "../../lib/api";

export default async function JobPage({ params }) {
  const job = await fetchJobById(params.id);
  return (
    <>
      <Head>
        <title>{job.title} | Sarkari Result</title>
        <meta name="description" content={job.description} />
      </Head>
      <div>
        <h1>{job.title}</h1>
        <p>{job.description}</p>
      </div>
    </>
  );
}