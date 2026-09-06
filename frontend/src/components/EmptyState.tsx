import Image from 'next/image';
import styles from './EmptyState.module.scss';

export default function EmptyState() {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Image
          src="/No-data.png"
          alt="No data found"
          width={160}
          height={160}
          className={styles.image}
        />
      </div>
      <h2 className={styles.title}>查無相關資料</h2>
      <p className={styles.description}>請調整關鍵字再重新搜尋</p>
    </div>
  );
}
