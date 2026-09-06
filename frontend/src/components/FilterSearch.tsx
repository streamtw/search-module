import { Search, ChevronDown } from 'lucide-react';
import styles from './FilterSearch.module.scss';

interface FilterSearchProps {
  filterLabel?: string;
}

export default function FilterSearch({ filterLabel = '全部' }: FilterSearchProps) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <button className={styles.filterButton}>
          {filterLabel} <ChevronDown size={16} />
        </button>
        <button className={styles.searchButton}>
          <Search size={20} color="#999" />
        </button>
      </div>
    </div>
  );
}
