import { supabase } from './supabaseClient';

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createCategory = async ({ type, name }) => {
  const { data, error } = await supabase
    .from('categories')
    .insert([{ type, name }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateCategory = async (id, { type, name }) => {
  const { data, error } = await supabase
    .from('categories')
    .update({ type, name })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteCategory = async (id) => {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
};