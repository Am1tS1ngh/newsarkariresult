// app/jobs/[id]/page.js
import { fetchRecordById } from "@/lib/api";
import Head from "next/head";


export default async function JobPage({ params }) {
  const job = await fetchRecordById(params.id);
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