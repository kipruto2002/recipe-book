import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

const RECIPES_COLLECTION = 'recipes';

// Add a new recipe
export const addRecipe = async (userId, recipeData) => {
  try {
    const userRecipesRef = collection(db, RECIPES_COLLECTION, userId, 'userRecipes');
    const docRef = await addDoc(userRecipesRef, {
      ...recipeData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
};

// Get all recipes for a user (real-time listener)
export const subscribeToRecipes = (userId, callback) => {
  try {
    const userRecipesRef = collection(db, RECIPES_COLLECTION, userId, 'userRecipes');
    
    const unsubscribe = onSnapshot(userRecipesRef, (snapshot) => {
      const recipes = [];
      snapshot.forEach((doc) => {
        recipes.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      callback(recipes);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to recipes:', error);
    throw error;
  }
};

// Delete a recipe
export const deleteRecipe = async (userId, recipeId) => {
  try {
    const recipeRef = doc(db, RECIPES_COLLECTION, userId, 'userRecipes', recipeId);
    await deleteDoc(recipeRef);
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};

// Update a recipe
export const updateRecipe = async (userId, recipeId, updatedData) => {
  try {
    const recipeRef = doc(db, RECIPES_COLLECTION, userId, 'userRecipes', recipeId);
    await updateDoc(recipeRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};