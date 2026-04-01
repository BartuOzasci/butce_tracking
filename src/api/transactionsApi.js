import { supabase } from './supabaseClient';

export const getTransactions = async ({ month, year, categoryId } = {}) => {
  let query = supabase
    .from('transactions')
    .select(`*, categories(id, name, type)`)
    .order('date', { ascending: false });

  if (month && year) {
    const start = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const end = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
    query = query.gte('date', start).lte('date', end);
  }
  if (categoryId) query = query.eq('category_id', categoryId);

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const createTransactions = async (transactionsArray) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transactionsArray)
    .select();
  if (error) throw error;
  return data;
};

export const updateTransaction = async (id, updates) => {
  const { data, error } = await supabase
    .from('transactions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteTransaction = async (id) => {
  const { error } = await supabase.from('transactions').delete().eq('id', id);
  if (error) throw error;
};

export const deleteInstallmentGroup = async (groupId) => {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('installment_group_id', groupId);
  if (error) throw error;
};