import { useState, useEffect, useCallback } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/categoriesApi';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const addCategory = async (payload) => {
    const newCat = await createCategory(payload);
    setCategories(prev => [newCat, ...prev]);
    return newCat;
  };

  const editCategory = async (id, payload) => {
    const updated = await updateCategory(id, payload);
    setCategories(prev => prev.map(c => c.id === id ? updated : c));
  };

  const removeCategory = async (id) => {
    await deleteCategory(id);
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return { categories, loading, error, addCategory, editCategory, removeCategory, refetch: fetchCategories };
};