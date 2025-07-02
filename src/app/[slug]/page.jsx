import { fetchRecordById } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Star, ExternalLink, Send } from 'lucide-react';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const post = await fetchRecordById(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  // Assuming the new structure has a top-level title and a summary/description field
  const mainTitle = post.title || 'Untitled Post';
  const description = post.short_information || `Details about ${mainTitle}`;

  return {
    title: `${mainTitle} - Sarkari Result`,
    description: description,
    keywords: post.keywords || [mainTitle, 'sarkari result', 'government jobs'],
  };
}

// --- DYNAMIC CONTENT RENDERER COMPONENTS ---

const FieldRenderer = ({ element }) => {
  const { label, value, fieldType, important, key } = element;

  const renderValue = () => {
    switch (fieldType) {
      case 'date':
        return new Date(value).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
      case 'textarea':
        return <p className="text-gray-700 whitespace-pre-wrap">{value}</p>;
      case 'key_value_pair':
        return (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
            {key || 'Link'} <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        );
      default:
        return <span className="text-gray-800 font-medium">{value}</span>;
    }
  };

  return (
    <div className={`flex justify-between items-start p-3 rounded-md ${important ? 'bg-yellow-50 border-l-4 border-yellow-400' : 'bg-gray-50'}`}>
      <dt className="font-semibold text-gray-600 flex items-center">
        {important && <Star className="w-4 h-4 mr-2 text-yellow-500" />}
        {label}
      </dt>
      <dd className="text-right">{renderValue()}</dd>
    </div>
  );
};

const TableRenderer = ({ element }) => {
  const { name, columns, rows } = element;
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-700 mb-2">{name}</h4>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {columns.map(col => (
                <th key={col.id} scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {columns.map((col, i) => (
                  <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {row.cells[i]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SectionRenderer = ({ section }) => (
  <section className="mb-8">
    <h3 className="text-2xl font-bold text-white bg-red-700 p-3 rounded-t-lg text-center mb-4">
      {section.title}
    </h3>
    <div className="space-y-3 p-4 bg-white border border-gray-200 rounded-b-lg">
      {section.elements.map(element => {
        if (element.type === 'field') {
          return <FieldRenderer key={element.id} element={element} />;
        }
        if (element.type === 'table') {
          return <TableRenderer key={element.id} element={element} />;
        }
        return null;
      })}
    </div>
  </section>
);


export default async function PostDetailPage({ params }) {
  const { slug } = params;
  const post = await fetchRecordById(slug);
  console.log(`Fetched for slug: ${slug}`, post);
  if (!post || !post.sections) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-50">
      <article className="bg-white shadow-xl rounded-lg overflow-hidden">
        <header className="p-6 border-b-4 border-red-600 bg-red-50 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-red-800">
            {post.title}
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Published on: {new Date(post.post_date || Date.now()).toLocaleDateString()}
          </p>
        </header>

        <div className="p-6">
          {post.sections.map(section => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </div>
        
        <footer className="p-6 bg-gray-100 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-center text-gray-700 mb-4">Stay Connected</h3>
             <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
               <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-semibold w-full sm:w-auto justify-center">
                 <Send className="mr-2 h-5 w-5" /> Join WhatsApp
               </a>
               <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold w-full sm:w-auto justify-center">
                 <Send className="mr-2 h-5 w-5" /> Join Telegram
               </a>
            </div>
        </footer>
      </article>
    </main>
  );
}
