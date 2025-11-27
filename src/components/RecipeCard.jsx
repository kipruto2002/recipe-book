import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function RecipeCard({ recipe, onDelete }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col">
      {/* Recipe Image */}
      <div className="relative overflow-hidden bg-gray-200 h-48 sm:h-56">
        {recipe.image ? (
          <img 
            src={recipe.image} 
            alt={recipe.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
            🍽️
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {recipe.name}
        </h3>

        <div className="mb-3">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
            {recipe.cuisine}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <span>⏱️</span>
            <span>{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>👥</span>
            <span>Serves {recipe.servings}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
          {recipe.description}
        </p>
        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Link
            to={`/recipe/${recipe.id}`}
            className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-center"
          >
            View
          </Link>
          {currentUser && currentUser.uid === recipe.createdBy && (
            <>
              <Link
                to={`/edit-recipe/${recipe.id}`}
                className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg font-semibold hover:bg-blue-200 transition-colors text-center"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(recipe.id)}
                className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}