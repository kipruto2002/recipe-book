import { useState } from 'react';

export default function RecipeForm({ onSubmit, initialData = null }) {
  const arrayToString = value =>
    Array.isArray(value) ? value.join('\n') : value || '';

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    cuisine: initialData?.cuisine || '',
    description: initialData?.description || '',
    cookTime: initialData?.cookTime || '',
    servings: initialData?.servings || '',
    ingredients: arrayToString(initialData?.ingredients),
    instructions: arrayToString(initialData?.instructions),
    image: initialData?.image || '',
  });

  const [errors, setErrors] = useState({});

  // Limit constants
  const MAX_DESC = 500;
  const MAX_ING_LINES = 50;
  const MAX_INST_LINES = 100;

  const validateForm = () => {
    const newErrors = {};

    const ingredientsStr = typeof formData.ingredients === 'string'
      ? formData.ingredients
      : arrayToString(formData.ingredients);
    const instructionsStr = typeof formData.instructions === 'string'
      ? formData.instructions
      : arrayToString(formData.instructions);

    if (!formData.name.trim()) newErrors.name = 'Recipe name is required';
    if (formData.name.length > 100) newErrors.name = 'Name is too long';
    if (!formData.cuisine.trim()) newErrors.cuisine = 'Cuisine type is required';
    if (!formData.cookTime || formData.cookTime <= 0) newErrors.cookTime = 'Cook time must be greater than 0';
    if (!formData.servings || formData.servings <= 0) newErrors.servings = 'Servings must be greater than 0';
    if (formData.description.length > MAX_DESC)
      newErrors.description = `Description must be <= ${MAX_DESC} chars`;

    const ingLines = ingredientsStr.split('\n').filter(l => l.trim());
    const instLines = instructionsStr.split('\n').filter(l => l.trim());

    if (!ingLines.length) newErrors.ingredients = 'Ingredients are required';
    if (ingLines.length > MAX_ING_LINES)
      newErrors.ingredients = `Max ${MAX_ING_LINES} ingredients`;

    if (!instLines.length) newErrors.instructions = 'Instructions are required';
    if (instLines.length > MAX_INST_LINES)
      newErrors.instructions = `Max ${MAX_INST_LINES} steps`;

    if (
      formData.image &&
      !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)$/i.test(formData.image.trim())
    ) {
      newErrors.image = 'Must be a valid image URL (http/https, ends in jpg/png/webp/gif/svg)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        ingredients: formData.ingredients.split('\n').filter(i => i.trim()),
        instructions: formData.instructions.split('\n').filter(i => i.trim()),
      });
      setFormData({
        name: '',
        cuisine: '',
        description: '',
        cookTime: '',
        servings: '',
        ingredients: '',
        instructions: '',
        image: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {initialData ? 'Edit Recipe' : 'Add New Recipe'}
      </h2>

      {/* Recipe Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Recipe Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength="100"
          placeholder="e.g., Spaghetti Carbonara"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Cuisine Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cuisine Type *
          </label>
          <select
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.cuisine ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select a cuisine</option>
            <option value="Italian">Italian</option>
            <option value="Indian">Indian</option>
            <option value="Mexican">Mexican</option>
            <option value="Asian">Asian</option>
            <option value="American">American</option>
            <option value="French">French</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Other">Other</option>
          </select>
          {errors.cuisine && <p className="text-red-500 text-sm mt-1">{errors.cuisine}</p>}
        </div>

        {/* Cook Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cook Time (minutes) *
          </label>
          <input
            type="number"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
            placeholder="30"
            min="1"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.cookTime ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.cookTime && <p className="text-red-500 text-sm mt-1">{errors.cookTime}</p>}
        </div>
      </div>

      {/* Servings */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Servings *
        </label>
        <input
          type="number"
          name="servings"
          value={formData.servings}
          onChange={handleChange}
          placeholder="4"
          min="1"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.servings ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.servings && <p className="text-red-500 text-sm mt-1">{errors.servings}</p>}
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength={MAX_DESC}
          placeholder="Brief description of your recipe..."
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        <div className="text-xs text-gray-500 text-right mt-1">{formData.description.length}/{MAX_DESC}</div>
      </div>

      {/* Ingredients */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ingredients * (one per line)
        </label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="2 cups flour\n1 egg\n1/2 cup milk"
          rows="5"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
      </div>

      {/* Instructions */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Instructions * (one per line)
        </label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Step 1\nStep 2\nStep 3"
          rows="5"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm ${errors.instructions ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
      </div>

      {/* Image URL */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL
        </label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.image ? 'border-red-500' : ''}`}
        />
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"
      >
        {initialData ? 'Update Recipe' : 'Add Recipe'}
      </button>
    </form>
  );
}