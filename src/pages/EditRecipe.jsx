import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { AuthContext } from '../context/AuthContext';
import RecipeForm from '../components/RecipeForm';

export default function EditRecipe() {
  const { id } = useParams();
  const { recipes, updateRecipe } = useContext(RecipeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return <div className="text-center p-10">Recipe not found.</div>;
  if (recipe.createdBy !== currentUser.uid) return <div className="text-center p-10 text-red-600">You are not allowed to edit this recipe.</div>;

  const handleUpdate = async (data) => {
    await updateRecipe(id, { ...data, createdBy: currentUser.uid });
    navigate(`/recipe/${id}`);
  };

  return <RecipeForm initialData={recipe} onSubmit={handleUpdate} />;
}