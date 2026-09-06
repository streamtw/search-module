'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import Tabs from '@/components/Tabs';
import FilterSearch from '@/components/FilterSearch';
import CharityOrganization from '@/components/CharityOrganization';
import Footer from '@/components/Footer';
import EmptyState from '@/components/EmptyState';
import styles from './page.module.scss';

interface DonationItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const MOCK_DATA: DonationItem[] = [
  {
    id: 1,
    title: '公益團體名稱公益團體名稱公益團',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/1/200/300',
  },
  {
    id: 2,
    title: '公益團體名稱公益團體名稱公益團',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/2/200/300',
  },
  {
    id: 3,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/3/200/300',
  },
  {
    id: 4,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/4/200/300',
  },
  {
    id: 5,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/5/200/300',
  },
  {
    id: 6,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/6/200/300',
  },
  {
    id: 7,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/7/200/300',
  },
  {
    id: 8,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/8/200/300',
  },
  {
    id: 9,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/9/200/300',
  },
  {
    id: 10,
    title: '財團法人流浪動物基金會',
    description: '團體簡介團體簡介團體簡介團體簡介團體簡介',
    image: 'https://picsum.photos/id/110/200/300',
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className={styles.main}>
      <Header />
      <SearchBar />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={styles.contentWrapper}>
        {activeTab === 0 ? (
          <>
            <FilterSearch />
            <div className={styles.listContainer}>
              {MOCK_DATA.map((item) => (
                <CharityOrganization
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              ))}
            </div>
            <Footer />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </main>
  );
}
