import { fetchJobById } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Send, ExternalLink } from 'lucide-react';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const post = await fetchJobById(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.name_of_post} - Sarkari Result`,
    description: post.short_information || `Details about ${post.name_of_post}`,
    keywords: post.keywords || [post.name_of_post, 'sarkari result', 'government jobs'],
  };
}

// Helper component for table rows
const InfoRow = ({ label, children }) => (
  <tr className="border-b border-gray-300 hover:bg-gray-100">
    <td className="py-3 px-4 font-semibold text-gray-800 w-1/3">{label}</td>
    <td className="py-3 px-4 text-gray-700">{children}</td>
  </tr>
);

// Helper component for important links
const ImportantLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between bg-blue-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
    aria-label={`Link to ${children}`}
  >
    {children}
    <ExternalLink className="ml-3 h-5 w-5" />
  </a>
);

export default async function PostDetailPage({ params }) {
  const { slug } = params;
  const post = await fetchJobById(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className=" mx-auto bg-gray-50">
      <article className="bg-white shadow-2xl rounded-lg overflow-hidden">
        <header className="p-6 border-b-2 border-red-600 bg-red-50">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-red-700">
            {post.name_of_post}
          </h1>
          <p className="text-center text-gray-600 mt-2 text-sm md:text-base">
            Post Date: {new Date(post.post_date).toLocaleString()}
          </p>
        </header>

        <section className="p-6">
          <p className="text-base md:text-lg text-gray-800 leading-relaxed">
            {post.short_information}
          </p>
        </section>

        <section className="flex flex-col sm:flex-row justify-center items-center gap-4 p-4 bg-gray-100">
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-semibold">
            <Send className="mr-2 h-5 w-5" /> WhatsApp
          </a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
            <Send className="mr-2 h-5 w-5" /> Telegram
          </a>
        </section>

        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-red-700">{post.name_of_organisation}</h2>
            <p className="text-lg text-gray-800">{post.name_of_post} Recruitment 2025</p>
            <a href="https://sarkariresult.com.cm" className="text-blue-600 hover:underline font-bold">SarkariResult.Com.Cm</a>
          </div>

          {/* Main Details Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Important Dates */}
            <section aria-labelledby="important-dates">
              <h3 id="important-dates" className="text-xl font-bold text-white bg-red-700 p-3 rounded-t-lg text-center">Important Dates</h3>
              <table className="w-full text-left border-collapse border border-gray-300">
                <tbody>
                  <InfoRow label="Application Begin">{new Date(post.application_start_date).toLocaleDateString()}</InfoRow>
                  <InfoRow label="Last Date for Apply Online">{new Date(post.application_end_date).toLocaleDateString()}</InfoRow>
                  <InfoRow label="Pay Exam Fee Last Date">{new Date(post.fee_payment_end_date).toLocaleDateString()}</InfoRow>
                  <InfoRow label="Exam Date">{post.exam_date_details}</InfoRow>
                  <InfoRow label="Admit Card Available">{post.admit_card_availability}</InfoRow>
                </tbody>
              </table>
            </section>

            {/* Application Fee */}
            <section aria-labelledby="application-fee">
              <h3 id="application-fee" className="text-xl font-bold text-white bg-red-700 p-3 rounded-t-lg text-center">Application Fee</h3>
              <table className="w-full text-left border-collapse border border-gray-300">
                <tbody>
                  {Array.isArray(post.application_fee) && post.application_fee.map((fee) => (
                    <InfoRow key={fee.category} label={fee.category.replace(/_/g, ' ')}>
                      {fee.amount}
                    </InfoRow>
                  ))}
                  <InfoRow label="Payment Mode">
                    {Array.isArray(post.payment_mode) ? post.payment_mode.join(', ') : 'N/A'}
                  </InfoRow>
                </tbody>
              </table>
            </section>
          </div>

          {/* Age Limit */}
          <section aria-labelledby="age-limit" className="mt-8">
            <h3 id="age-limit" className="text-xl font-bold text-white bg-green-700 p-3 rounded-t-lg text-center">
              Age Limit as on {new Date(post.age_limit.as_on_date).toLocaleDateString()}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 text-center border border-gray-300 rounded-b-lg p-4 gap-4">
              <div>
                <p className="font-bold text-lg">Minimum Age</p>
                <p className="text-xl">{post.age_limit.minimum} Years</p>
              </div>
              <div>
                <p className="font-bold text-lg">Maximum Age</p>
                <p className="text-xl">{post.age_limit.maximum} Years</p>
              </div>
              <div>
                <p className="font-bold text-lg">Age Relaxation</p>
                <p className="text-base">{post.age_limit.relaxation_details}</p>
              </div>
            </div>
          </section>

          {/* Vacancy Details */}
          <section aria-labelledby="vacancy-details" className="mt-8">
            <h3 id="vacancy-details" className="text-xl font-bold text-white bg-purple-700 p-3 rounded-t-lg text-center">
              Vacancy Details Total: {post.total_posts} Post
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-4 font-bold uppercase text-sm text-gray-600">Post Name</th>
                    <th className="py-3 px-4 font-bold uppercase text-sm text-gray-600">Total Post</th>
                    <th className="py-3 px-4 font-bold uppercase text-sm text-gray-600">Eligibility</th>
                  </tr>
                </thead>
                <tbody>
                  {post.vacancy_details.map((vacancy, index) => (
                    <InfoRow key={index} label={vacancy.post_name}>
                      <td>{vacancy.total_posts}</td>
                      <td>{vacancy.eligibility}</td>
                    </InfoRow>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Important Links */}
          <section aria-labelledby="important-links" className="mt-8">
            <h3 id="important-links" className="text-xl font-bold text-white bg-indigo-700 p-3 rounded-t-lg text-center">
              Important Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 border border-gray-300 rounded-b-lg">
              {post.important_links.map((link, index) => (
                <ImportantLink key={index} href={link.url}>{link.title}</ImportantLink>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
