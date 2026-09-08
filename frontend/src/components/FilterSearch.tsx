import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import DonationCategory from './DonationCategory';
import type { DonationCategory as CategoryType } from '../types';
import styles from './FilterSearch.module.scss';

interface FilterSearchProps {
  filterLabel?: string;
  onSearchClick?: () => void;
  onFilterChange?: (category: CategoryType) => void;
}

export default function FilterSearch({
  filterLabel = '全部',
  onSearchClick,
  onFilterChange
}: FilterSearchProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <button
          className={styles.filterButton}
          onClick={() => setIsCategoryOpen(true)}
        >
          {filterLabel} <ChevronDown size={16} />
        </button>
        <button className={styles.searchButton} onClick={onSearchClick}>
          <Search size={20} color="#999" />
        </button>
      </div>

      <DonationCategory
        isOpen={isCategoryOpen}
        onClose={() => setIsCategoryOpen(false)}
        onSelect={onFilterChange || (() => {})}
        selectedCategoryName={filterLabel}
      />
    </div>
  );
}
