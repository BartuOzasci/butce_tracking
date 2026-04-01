import { v4 as uuidv4 } from 'uuid';

/**
 * Taksitli harcama için veritabanına girilecek kayıt dizisini üretir.
 * @param {object} params
 * @param {string} params.categoryId
 * @param {number} params.totalAmount  - Toplam tutar (örn: 1000)
 * @param {string} params.startDate   - 'YYYY-MM-DD' formatında başlangıç tarihi
 * @param {number} params.installments - Taksit sayısı (örn: 6)
 * @param {string} params.description
 * @returns {Array} Supabase insert için kayıt dizisi
 */
export const buildInstallmentRecords = ({
  categoryId,
  totalAmount,
  startDate,
  installments,
  description,
}) => {
  const groupId = uuidv4();
  const perInstallment = parseFloat((totalAmount / installments).toFixed(2));
  const records = [];
  
  const [yearStr, monthStr, dayStr] = startDate.split('-');
  const startY = parseInt(yearStr, 10);
  const startM = parseInt(monthStr, 10);
  const startD = parseInt(dayStr, 10);

  for (let i = 0; i < installments; i++) {
    let targetM = startM + i;
    let targetY = startY;
    
    // Yıl atlamasını hesapla
    if (targetM > 12) {
      targetY += Math.floor((targetM - 1) / 12);
      targetM = ((targetM - 1) % 12) + 1;
    }
    
    // O ayın maksimum gün sayısını bul (şubat 28/29, diğerleri 30/31)
    const maxDaysInMonth = new Date(targetY, targetM, 0).getDate();
    // Eğer girilen gün (örn 31), hedef ayın maksimum gününden büyükse (örn nisan 30) o ayın son gününü al.
    const actualD = Math.min(startD, maxDaysInMonth);

    const mFormatted = String(targetM).padStart(2, '0');
    const dFormatted = String(actualD).padStart(2, '0');

    records.push({
      category_id: categoryId,
      amount: perInstallment,
      date: `${targetY}-${mFormatted}-${dFormatted}`,
      description,
      is_installment: true,
      installment_index: i + 1,
      installment_total: installments,
      installment_group_id: groupId,
    });
  }
  return records;
};

/**
 * Para miktarını Türk Lirası formatında biçimlendirir.
 */
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);