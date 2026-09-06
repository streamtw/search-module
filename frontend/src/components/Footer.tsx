import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.line}></div>
      <span className={styles.text}>愛心沒有底線</span>
      <div className={styles.line}></div>
    </footer>
  );
}
