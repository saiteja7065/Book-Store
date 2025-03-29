import React from 'react';
import { BookOpen, Library } from 'lucide-react';
import { GENRES } from '../data/books';

const GenreList = ({ selectedGenre, onSelectGenre }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Browse by Genre</h2>
      <div className="space-y-3">
        <button
          onClick={() => onSelectGenre('All')}
          className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
            selectedGenre === 'All'
              ? 'bg-indigo-50 dark:bg-indigo-900'
              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <Library 
              className={`${
                selectedGenre === 'All'
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`} 
              size={20} 
            />
            <span className={`${
              selectedGenre === 'All'
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-gray-700 dark:text-gray-300'
            }`}>
              All Books
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({Object.values(GENRES).reduce((sum, genre) => sum + genre.count, 0)})
          </span>
        </button>
        {GENRES.map((genre) => (
          <button
            key={genre.name}
            onClick={() => onSelectGenre(genre.name)}
            className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
              selectedGenre === genre.name
                ? 'bg-indigo-50 dark:bg-indigo-900'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen 
                className={`${
                  selectedGenre === genre.name
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`} 
                size={20} 
              />
              <span className={`${
                selectedGenre === genre.name
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {genre.name}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">({genre.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreList;