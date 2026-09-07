import { Search } from 'lucide-react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onCancel?: () => void;
  value?: string;
  onChange?: (value: string) => void;
}

export default function SearchBar({ onCancel, value, onChange }: SearchBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <Search className={styles.icon} size={20} />
        <input
          type="text"
          placeholder="搜尋"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={styles.input}
        />
      </div>
      <button className={styles.cancelButton} onClick={onCancel}>取消</button>
    </div>
  );
}
