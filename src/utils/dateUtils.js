export const getCurrentMonthYear = () => {
  const now = new Date();
  return { month: now.getMonth() + 1, year: now.getFullYear() };
};

export const getLocalISODate = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const formatDateTR = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('T')[0].split('-');
  return `${day}.${month}.${year}`;
};

export const getMonthLabel = (month, year) => {
  return new Date(year, month - 1).toLocaleString('tr-TR', {
    month: 'long',
    year: 'numeric',
  });
};