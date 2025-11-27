import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

export default function RecipeDetail() {
  const { id } = useParams();
  const { recipes } = useContext(RecipeContext);
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="bg-white rounded-lg shadow p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold mb-3 text-gray-800">Recipe not found</h1>
          <p className="text-gray-600 mb-6">
            This recipe may have been deleted or you do not have access to it.
          </p>
          <Link
            to="/"
            className="inline-block bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white rounded-lg shadow p-8">
      {recipe.image ? (
        <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover rounded-lg mb-6" onError={e => e.target.style.display = 'none'} />
      ) : (
        <div className="w-full h-64 flex items-center justify-center text-gray-300 text-6xl mb-6 bg-gray-100 rounded-lg">🍳</div>
      )}
      <h1 className="text-3xl font-bold">{recipe.name}</h1>
      <p className="mt-2">{recipe.description}</p>
      <h2 className="mt-4 font-semibold">Ingredients</h2>
      <ul className="list-disc pl-6">
        {recipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
      </ul>
      <h2 className="mt-4 font-semibold">Instructions</h2>
      <ol className="list-decimal pl-6">
        {recipe.instructions.map((inst, idx) => <li key={idx}>{inst}</li>)}
      </ol>
    </div>
  );
}