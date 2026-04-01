import { useState, useCallback } from 'react';
import { getTransactions, createTransactions, updateTransaction, deleteTransaction, deleteInstallmentGroup } from '../api/transactionsApi';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      const data = await getTransactions(filters);
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTransactions = async (payloadArray) => {
    const newTx = await createTransactions(payloadArray);
    if (newTx && newTx.length) {
      setTransactions(prev => [...newTx, ...prev].sort((a,b) => new Date(b.date) - new Date(a.date)));
    }
    return newTx;
  };

  const editTransaction = async (id, payload) => {
    const updated = await updateTransaction(id, payload);
    setTransactions(prev => prev.map(t => t.id === id ? updated : t));
  };

  const removeTransaction = async (id) => {
    await deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const removeGroup = async (groupId) => {
    await deleteInstallmentGroup(groupId);
    setTransactions(prev => prev.filter(t => t.installment_group_id !== groupId));
  };

  return { transactions, loading, error, fetchTransactions, addTransactions, editTransaction, removeTransaction, removeGroup };
};