import { ChevronLeft } from 'lucide-react';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.backButton}>
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.title}>所有捐款項目</h1>
      </div>
    </header>
  );
}
