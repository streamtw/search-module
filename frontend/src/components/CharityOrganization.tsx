import Image from 'next/image';
import styles from './CharityOrganization.module.scss';

interface CharityOrganizationProps {
  title: string;
  description: string;
  image: string;
}

export default function CharityOrganization({ title, description, image }: CharityOrganizationProps) {
  return (
    <div className={styles.card}>
      <div className={styles.logoContainer}>
        <Image
          src={image}
          alt={title}
          width={80}
          height={80}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
