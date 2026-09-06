import Image from 'next/image';
import { Tag } from 'lucide-react';
import styles from './DonationProject.module.scss';

interface DonationProjectProps {
  organization: string;
  title: string;
  tags: string[];
  image: string;
}

export default function DonationProject({ organization, title, tags, image }: DonationProjectProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image 
          src={image} 
          alt={title} 
          fill
          className={styles.image}
          sizes="(max-width: 600px) 100vw, 600px"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.organization}>{organization}</div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.tagWrapper}>
          <Tag size={14} className={styles.tagIcon} />
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={tag}>
                {tag}
                {index < tags.length - 1 && <span className={styles.separator}> · </span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
