import { useContext } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import { RecipeContext } from '../context/RecipeContext';

export default function Home() {
  const { loading, error } = useContext(RecipeContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {loading && (
        <div className="py-4 text-center text-gray-600">
          Loading recipes...
        </div>
      )}
      {error && (
        <div className="py-2 text-center text-red-600 text-sm">
          {error}
        </div>
      )}
      <SearchBar />
      <RecipeList />
    </div>
  );
}