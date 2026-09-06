import Image from 'next/image';
import styles from './Card.module.scss';

interface CardProps {
  title: string;
  description: string;
}

export default function Card({ title, description }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.logoContainer}>
        {/* Mock logo using a placeholder or div with icon if image not available */}
        <div className={styles.mockLogo}>
            <div className={styles.heartShape}>
                <div className={styles.animalSilhouettes}></div>
            </div>
            <div className={styles.logoText}>
                希望從主人手裡展開新生命<br/>
                Help build a Pet-loyal nation
            </div>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
