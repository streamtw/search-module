import Image from 'next/image';
import styles from './CharityProduct.module.scss';

interface CharityProductProps {
  title: string;
  organization: string;
  price: string;
  image: string;
}

export default function CharityProduct({ title, organization, price, image }: CharityProductProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image 
          src={image} 
          alt={title} 
          fill
          className={styles.image}
          sizes="(max-width: 600px) 50vw, 300px"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.organization}>{organization}</p>
        {price && <p className={styles.price}>{price}</p>}
      </div>
    </div>
  );
}
