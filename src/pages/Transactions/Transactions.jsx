import { useState, useEffect } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { useCategories } from '../../hooks/useCategories';
import { formatCurrency, buildInstallmentRecords } from '../../utils/financeUtils';
import { getLocalISODate, formatDateTR } from '../../utils/dateUtils';
import Button from '../../components/ui/Button/Button';
import Badge from '../../components/ui/Badge/Badge';
import styles from './Transactions.module.css';

export default function Transactions() {
  const { transactions, loading, fetchTransactions, removeTransaction, addTransactions, editTransaction } = useTransactions();
  const { categories } = useCategories();
  
  // Filter States
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetchTransactions({ month: filterMonth, year: filterYear, categoryId: filterCategory });
  }, [fetchTransactions, filterMonth, filterYear, filterCategory]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    category_id: '',
    amount: '',
    date: getLocalISODate(),
    description: '',
    is_installment: false,
    installments: 1
  });

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      category_id: '', amount: '', date: getLocalISODate(),
      description: '', is_installment: false, installments: 1
    });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (t) => {
    setEditingId(t.id);
    setFormData({
      category_id: t.category_id,
      amount: t.amount,
      date: t.date,
      description: t.description || '',
      is_installment: t.is_installment,
      installments: t.installment_total || 1
    });
    setShowAddModal(true);
  };

  const handleAddSelect = async (e) => {
    e.preventDefault();
    if (!formData.category_id || !formData.amount) return;

    if (editingId) {
      await editTransaction(editingId, {
        category_id: formData.category_id,
        amount: Number(formData.amount),
        date: formData.date,
        description: formData.description
      });
    } else {
      if (formData.is_installment && formData.installments > 1) {
         const records = buildInstallmentRecords({
           categoryId: formData.category_id,
           totalAmount: Number(formData.amount),
           startDate: formData.date,
           installments: Number(formData.installments),
           description: formData.description
         });
         await addTransactions(records);
      } else {
         await addTransactions([{
           category_id: formData.category_id,
           amount: Number(formData.amount),
           date: formData.date,
           description: formData.description
         }]);
      }
    }
    
    setShowAddModal(false);
    setEditingId(null);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Harcamalar</h2>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
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

          <Button onClick={handleOpenAddModal}>+ Yeni İşlem Ekle</Button>
        </div>
      </header>

      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>{editingId ? 'İşlemi Düzenle' : 'Yeni İşlem Ekle'}</h3>
            <form onSubmit={handleAddSelect} className={styles.form}>
              <select 
                required
                className={styles.input} 
                value={formData.category_id} 
                onChange={e => setFormData({...formData, category_id: e.target.value})}
              >
                <option value="">Kategori Seçin</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name} ({c.type})</option>)}
              </select>

              <input 
                required type="number" step="0.01" className={styles.input} 
                placeholder="Tutar" value={formData.amount} 
                onChange={e => setFormData({...formData, amount: e.target.value})} 
              />
              
              <input 
                required type="date" className={styles.input} 
                value={formData.date} 
                onChange={e => setFormData({...formData, date: e.target.value})} 
              />
              
              <textarea 
                className={styles.input} placeholder="Açıklama (Opsiyonel)" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
              />
              
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  checked={formData.is_installment} 
                  onChange={e => setFormData({...formData, is_installment: e.target.checked})} 
                />
                Taksitli İşlem mi?
              </label>

              {formData.is_installment && !editingId && (
                <input 
                  type="number" min="2" max="36" className={styles.input} 
                  placeholder="Taksit Sayısı" value={formData.installments} 
                  onChange={e => setFormData({...formData, installments: e.target.value})} 
                />
              )}

              <div className={styles.modalActions}>
                <Button variant="outline" type="button" onClick={() => setShowAddModal(false)}>İptal</Button>
                <Button variant="primary" type="submit">{editingId ? 'Güncelle' : 'Kaydet'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className={styles.listSection}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tarih</th>
                <th>Kategori</th>
                <th>Açıklama</th>
                <th>Taksit</th>
                <th>Tutar</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr><td colSpan="6" className={styles.empty}>Henüz işlem kaydedilmemiş.</td></tr>
              ) : (
                (() => {
                  let currentMonthYear = null;
                  const rows = [];

                  transactions.forEach(t => {
                    const dateObj = new Date(t.date);
                    const monthYearKey = dateObj.toLocaleString('tr-TR', { month: 'long', year: 'numeric' }).toUpperCase();

                    // Ay değiştiğinde ayıraç satırı ekle
                    if (monthYearKey !== currentMonthYear) {
                      currentMonthYear = monthYearKey;
                      rows.push(
                        <tr key={`month-divider-${currentMonthYear}`} className={styles.monthDivider}>
                          <td colSpan="6">{currentMonthYear}</td>
                        </tr>
                      );
                    }

                    const type = t.categories?.type;
                    const bannerStyle = type === 'GELİR' ? styles.bannerGelir : type === 'GİDER' ? styles.bannerGider : styles.bannerYatirim;

                    rows.push(
                      <tr key={t.id} style={{ position: 'relative' }}>
                        <div className={`${styles.typeBanner} ${bannerStyle}`} />
                        <td>{formatDateTR(t.date)}</td>
                        <td>
                          {t.categories?.name} <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>({type})</span>
                        </td>
                        <td>{t.description || '-'}</td>
                        <td>
                          {t.is_installment && t.installment_total > 1 ? (
                            <Badge color="purple">Taksit ({t.installment_index}/{t.installment_total})</Badge>
                          ) : '-'}
                        </td>
                        <td>{formatCurrency(t.amount)}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button variant="outline" size="sm" onClick={() => handleOpenEditModal(t)}>Düzenle</Button>
                            <Button variant="danger" size="sm" onClick={() => removeTransaction(t.id)}>Sil</Button>
                          </div>
                        </td>
                      </tr>
                    );
                  });

                  return rows;
                })()
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
