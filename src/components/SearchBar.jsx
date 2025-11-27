import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useContext(RecipeContext);

  return (
    <div className="w-full max-w-2xl mx-auto my-8 px-4">
      <input
        type="text"
        placeholder="Search recipes by name or cuisine..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
      />
    </div>
  );
}