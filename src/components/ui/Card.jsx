import Link from 'next/link';

export default function Card({ title, posts, year, color }) {
  const colorClasses = {
    'red': 'bg-red-600',
    'orange': 'bg-orange-500',
    'purple': 'bg-purple-600',
    'blue': 'bg-blue-700',
    'green': 'bg-green-600',
    'olive': 'bg-lime-700',
    'maroon': 'bg-red-800',
  };

  return (
    <div className={`rounded-lg overflow-hidden shadow-md ${colorClasses[color] || 'bg-gray-500'}`}>
      <Link href={`/form/${title.toLowerCase().replace(/ /g, '-')}`}>
        <div className="p-2 text-white text-center">
          <h3 className="font-semibold">{title} {year} {posts}</h3>
          {/* <p className="text-sm">({posts} Post{posts !== 1 ? 's' : ''})</p> */}
          {/* <p className="text-xs">Online Form {year}</p> */}
        </div>
      </Link>
    </div>
  );
}