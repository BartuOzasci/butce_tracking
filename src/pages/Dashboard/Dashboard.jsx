import { useMemo, useEffect, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { useCategories } from '../../hooks/useCategories';
import { formatCurrency } from '../../utils/financeUtils';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { transactions, fetchTransactions } = useTransactions();
  const { categories } = useCategories();

  const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetchTransactions({ month: filterMonth, year: filterYear, categoryId: filterCategory });
  }, [fetchTransactions, filterMonth, filterYear, filterCategory]);

  const { income, expense, investment } = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        if (!t.categories) return acc;
        if (t.categories.type === 'GELİR') acc.income += Number(t.amount);
        if (t.categories.type === 'GİDER') acc.expense += Number(t.amount);
        if (t.categories.type === 'YATIRIM') acc.investment += Number(t.amount);
        return acc;
      },
      { income: 0, expense: 0, investment: 0 }
    );
  }, [transactions]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Genel Bütçe Tablosu</h2>

        <div className={styles.filterGroup}>
          <select 
            className={styles.filterSelect}
            value={filterMonth} 
            onChange={(e) => setFilterMonth(e.target.value ? Number(e.target.value) : '')}
          >
            <option value="">Tüm Aylar</option>
            {Array.from({length: 12}, (_, i) => i + 1).map(m => (
              <option key={m} value={m}>{new Date(2000, m - 1).toLocaleString('tr-TR', { month: 'long' })}</option>
            ))}
          </select>

          <select 
            className={styles.filterSelect}
            value={filterYear} 
            onChange={(e) => setFilterYear(e.target.value ? Number(e.target.value) : '')}
          >
            <option value="">Tüm Yıllar</option>
            {Array.from({length: 10}, (_, i) => new Date().getFullYear() - 5 + i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select 
            className={styles.filterSelect}
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Tüm Kategoriler</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </header>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Özet</h3>
          <div className={styles.summaryStats}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Toplam Gelir 💰</span>
              <span className={styles.statValueIncome}>{formatCurrency(income)}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Toplam Gider 💸</span>
              <span className={styles.statValueExpense}>{formatCurrency(expense)}</span>
            </div>
            <div className={`${styles.statBox} ${styles.glowBox}`}>
              <span className={styles.statLabel}>Toplam Yatırım 📈</span>
              <span className={styles.statValueInvestment}>{formatCurrency(investment)}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Kalan Bakiye 💳</span>
              <span className={styles.statValueBalance}>{formatCurrency(income - expense - investment)}</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3>En Yüksek 5 Harcama Tablosu (Giderler)</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Kategori</th>
                <th>Tutar</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                .filter(t => t.categories?.type === 'GİDER')
                .sort((a, b) => Number(b.amount) - Number(a.amount))
                .slice(0, 5)
                .map((t, idx) => (
                  <tr key={t.id}>
                    <td>
                      {idx === 0 ? '🥇 ' : idx === 1 ? '🥈 ' : idx === 2 ? '🥉 ' : ''}
                      {t.categories?.name}
                    </td>
                    <td>{formatCurrency(t.amount)}</td>
                  </tr>
                ))}
              {transactions.filter(t => t.categories?.type === 'GİDER').length === 0 && (
                 <tr><td colSpan="2" style={{textAlign:'center', color: 'var(--color-text-secondary)'}}>Gider bulunamadı.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
