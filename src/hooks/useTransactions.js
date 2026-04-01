import { useState, useCallback, useRef } from 'react';
import { getTransactions, createTransactions, updateTransaction, deleteTransaction, deleteInstallmentGroup } from '../api/transactionsApi';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const lastFiltersRef = useRef({});

  const fetchTransactions = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      lastFiltersRef.current = filters;
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
    await fetchTransactions(lastFiltersRef.current);
    return newTx;
  };

  const editTransaction = async (id, payload) => {
    await updateTransaction(id, payload);
    await fetchTransactions(lastFiltersRef.current);
  };

  const removeTransaction = async (id) => {
    await deleteTransaction(id);
    await fetchTransactions(lastFiltersRef.current);
  };

  const removeGroup = async (groupId) => {
    await deleteInstallmentGroup(groupId);
    await fetchTransactions(lastFiltersRef.current);
  };

  return { transactions, loading, error, fetchTransactions, addTransactions, editTransaction, removeTransaction, removeGroup };
};