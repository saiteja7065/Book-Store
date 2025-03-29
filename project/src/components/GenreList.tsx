import React from 'react';
import { BookOpen } from 'lucide-react';

const genres = [
  { name: 'Fiction', count: 245 },
  { name: 'Mystery', count: 189 },
  { name: 'Sci-Fi', count: 156 },
  { name: 'Fantasy', count: 178 },
  { name: 'Romance', count: 203 },
  { name: 'Drama', count: 134 },
  { name: 'Comedy', count: 98 },
  { name: 'Educational', count: 167 },
  { name: 'Dictionary', count: 45 },
  { name: 'Essays', count: 89 },
  { name: 'Novel', count: 276 },
];

const GenreList = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Browse by Genre</h2>
      <div className="space-y-3">
        {genres.map((genre) => (
          <a
            key={genre.name}
            href="#"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="text-indigo-600" size={20} />
              <span className="text-gray-700">{genre.name}</span>
            </div>
            <span className="text-sm text-gray-500">({genre.count})</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GenreList;