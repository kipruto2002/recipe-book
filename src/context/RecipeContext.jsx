import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { db } from '../config/firebase';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      setRecipes([]);
      return;
    }
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, 'recipes'), (snapshot) => {
      setRecipes(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [currentUser]);

  const addRecipe = async (recipe) => {
    if (!currentUser) {
      setError('You must be logged in to add recipes');
      return;
    }
    try {
      setError('');
      // Always add createdBy field!
      await addDoc(collection(db, 'recipes'), {
        ...recipe,
        createdBy: currentUser.uid,
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteRecipe = async (id) => {
    if (!currentUser) return;
    try {
      setError('');
      await deleteDoc(doc(db, 'recipes', id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateRecipe = async (id, updatedRecipe) => {
    if (!currentUser) return;
    try {
      setError('');
      await updateDoc(doc(db, 'recipes', id), {
        ...updatedRecipe,
        createdBy: currentUser.uid,
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <RecipeContext.Provider value={{
      recipes,
      filteredRecipes,
      addRecipe,
      deleteRecipe,
      updateRecipe,
      searchQuery,
      setSearchQuery,
      loading,
      error,
    }}>
      {children}
    </RecipeContext.Provider>
  );
};