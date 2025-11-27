import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from './RecipeCard';

export default function RecipeList() {
  const { filteredRecipes, deleteRecipe } = useContext(RecipeContext);

  if (filteredRecipes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-xl mb-4">No recipes found</p>
        <p className="text-gray-400">Start by adding your first recipe!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 pb-12">
      {filteredRecipes.map(recipe => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          onDelete={deleteRecipe}
        />
      ))}
    </div>
  );
}