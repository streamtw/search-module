import { Search, ChevronDown } from 'lucide-react';
import styles from './FilterSearch.module.scss';

export default function FilterSearch() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <button className={styles.filterButton}>
          全部 <ChevronDown size={16} />
        </button>
        <button className={styles.searchButton}>
          <Search size={20} color="#999" />
        </button>
      </div>
    </div>
  );
}
