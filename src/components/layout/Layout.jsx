import { Outlet, NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import styles from './Layout.module.css';
import { useState } from 'react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <img src="/img/logo.png" alt="Bartu Bütçe Kontrol Logo" height="40" />
            <span>Bartu Bütçe Kontrol</span>
          </div>

          <div className={styles.desktopNav}>
            <NavLink to={ROUTES.HOME} className={({ isActive }) => (isActive ? styles.active : '')}>
              Ana Sayfa
            </NavLink>
            <NavLink to={ROUTES.DASHBOARD} className={({ isActive }) => (isActive ? styles.active : '')}>
              Genel Tablo
            </NavLink>
            <NavLink to={ROUTES.TRANSACTIONS} className={({ isActive }) => (isActive ? styles.active : '')}>
              Harcamalar
            </NavLink>
            <NavLink to={ROUTES.CATEGORIES} className={({ isActive }) => (isActive ? styles.active : '')}>
              Kategoriler
            </NavLink>
          </div>

          <button 
            className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.mobileMenuBtnActive : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className={styles.mobileNav}>
            <NavLink to={ROUTES.HOME} className={({ isActive }) => (isActive ? styles.active : '')} onClick={() => setIsMobileMenuOpen(false)}>Ana Sayfa</NavLink>
            <NavLink to={ROUTES.DASHBOARD} className={({ isActive }) => (isActive ? styles.active : '')} onClick={() => setIsMobileMenuOpen(false)}>Genel Tablo</NavLink>
            <NavLink to={ROUTES.TRANSACTIONS} className={({ isActive }) => (isActive ? styles.active : '')} onClick={() => setIsMobileMenuOpen(false)}>Harcamalar</NavLink>
            <NavLink to={ROUTES.CATEGORIES} className={({ isActive }) => (isActive ? styles.active : '')} onClick={() => setIsMobileMenuOpen(false)}>Kategoriler</NavLink>
          </div>
        )}
      </nav>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}