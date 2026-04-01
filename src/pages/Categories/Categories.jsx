import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { CATEGORY_TYPES, CATEGORY_EMOJIS } from '../../utils/constants';
import Button from '../../components/ui/Button/Button';
import Badge from '../../components/ui/Badge/Badge';
import styles from './Categories.module.css';

export default function Categories() {
  const { categories, loading, addCategory, editCategory, removeCategory } = useCategories();
  const [type, setType] = useState(CATEGORY_TYPES.GIDER);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    if (editingId) {
      await editCategory(editingId, { type, name: name.trim() });
      setEditingId(null);
    } else {
      await addCategory({ type, name: name.trim() });
    }
    setName('');
  };

  const startEditing = (cat) => {
    setEditingId(cat.id);
    setType(cat.type);
    setName(cat.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setType(CATEGORY_TYPES.GIDER);
    setName('');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Kategori Yönetimi</h2>
      </header>

      <section className={styles.addSection}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.typeSelector}>
            {Object.values(CATEGORY_TYPES).map(t => (
              <button
                key={t}
                type="button"
                className={`${styles.typeCard} ${type === t ? styles.active : ''}`}
                onClick={() => setType(t)}
              >
                <span className={styles.emoji}>{CATEGORY_EMOJIS[t]}</span>
                <span>{t}</span>
              </button>
            ))}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Yeni alt kategori adı (örn: Market, Kira...)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
            {editingId && (
              <Button type="button" variant="outline" onClick={cancelEditing}>İptal</Button>
            )}
            <Button type="submit" variant="primary" disabled={loading || !name.trim()}>
              {editingId ? 'Güncelle' : 'Ekle'}
            </Button>
          </div>
        </form>
      </section>

      <section className={styles.listSection}>
        {loading ? (
          <p>Yükleniyor...</p>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Tip</th>
                  <th>Kategori Adı</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="3" className={styles.empty}>Henüz kategori eklenmedi.</td>
                  </tr>
                ) : (
                  categories.map(cat => (
                     <tr key={cat.id}>
                        <td>
                          <Badge color={cat.type === 'GELİR' ? 'green' : cat.type === 'GİDER' ? 'red' : 'yellow'}>
                            {CATEGORY_EMOJIS[cat.type]} {cat.type}
                          </Badge>
                        </td>
                        <td>{cat.name}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button variant="outline" size="sm" onClick={() => startEditing(cat)}>
                              Düzenle
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => removeCategory(cat.id)}>
                              Sil
                            </Button>
                          </div>
                        </td>
                     </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
