import { TypeAnimation } from 'react-type-animation';
import ParticlesBackground from './ParticleBackground';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <ParticlesBackground />
      <div className={styles.heroContent}>
        <TypeAnimation
          sequence={[
            'Hoşgeldin Bartu Özaşçı',
            1000,
            'Kişisel Bütçeni Yönet',
            1000,
            'Giderlerini Takip Et',
            1000,
          ]}
          wrapper="h2"
          speed={50}
          className={styles.typewriter}
          repeat={Infinity}
        />
        <h1 className={styles.title}>Bartu Bütçe Kontrol</h1>
        <p className={styles.subtitle}>Modern Bütçe Kontrol ve Yönetim Platformu</p>
      </div>
    </div>
  );
}