import styles from './Badge.module.css';

export default function Badge({ children, color = 'blue' }) {
  return (
    <span className={`${styles.badge} ${styles[color]}`}>
      {children}
    </span>
  );
}