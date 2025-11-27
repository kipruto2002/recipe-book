import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import { RecipeContext } from '../context/RecipeContext';

export default function AddRecipe() {
  const { addRecipe } = useContext(RecipeContext);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      // RecipeForm already converts ingredients/instructions to arrays
      await addRecipe({
        ...formData,
        // No need to do .split('\n') here!
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
}