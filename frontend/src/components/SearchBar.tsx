import { Search } from 'lucide-react';
import styles from './SearchBar.module.scss';

export default function SearchBar() {
  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <Search className={styles.icon} size={20} />
        <input 
          type="text" 
          placeholder="搜尋" 
          defaultValue="流浪動物"
          className={styles.input}
        />
      </div>
      <button className={styles.cancelButton}>取消</button>
    </div>
  );
}
