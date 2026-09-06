import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import FilterSearch from '@/components/FilterSearch';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import styles from './page.module.scss';

interface DonationItem {
  id: number;
  title: string;
  description: string;
}

const MOCK_DATA: DonationItem[] = [
  {
    id: 1,
    title: '公益團體名稱公益團體名稱公益團',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
  },
  {
    id: 2,
    title: '公益團體名稱公益團體名稱公益團',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
  },
  {
    id: 3,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
  },
  {
    id: 4,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
  },
  {
    id: 5,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
  },
  {
    id: 6,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
  },
  {
    id: 7,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
  },
  {
    id: 8,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
  },
  {
    id: 9,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
  },
  {
    id: 10,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Tabs />
      <div className={styles.contentWrapper}>
        <FilterSearch />
        <div className={styles.listContainer}>
          {MOCK_DATA.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
        <Footer />
      </div>
    </main>
  );
}
