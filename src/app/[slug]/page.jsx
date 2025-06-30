// app/[postId]/page.jsx
import { fetchJobById } from '@/lib/api';

export default async function PostDetailPage({ params }) {
  const { slug } = params;
  const post = await fetchJobById(slug);

  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 whitespace-pre-line">{post.description}</p>

      {/* Add more fields as needed */}
    </div>
  );
}
