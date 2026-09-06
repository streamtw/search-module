'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import Tabs from '@/components/Tabs';
import FilterSearch from '@/components/FilterSearch';
import CharityOrganization from '@/components/CharityOrganization';
import DonationProject from '@/components/DonationProject';
import Footer from '@/components/Footer';
import EmptyState from '@/components/EmptyState';
import styles from './page.module.scss';

interface CharityOrganization {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface DonationProject {
  id: number;
  organization: string;
  title: string;
  tags: string[];
  image: string;
}

const MOCK_CHARITY_ORGANIZATIONS: CharityOrganization[] = [
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

const MOCK_DONATION_PROJECTS: DonationProject[] = [
  {
    id: 1,
    organization: '社團法人台灣善耘社福協會',
    title: '助學金 | 點亮弱勢孩子的求學路',
    tags: ['兒少照護', '婦女關懷', '弱勢扶貧'],
    image: 'https://picsum.photos/id/20/600/400',
  },
  {
    id: 2,
    organization: '社團法人苗栗縣社會福利促進協會',
    title: '健康老化，從社區開始—長者延緩失能陪伴',
    tags: ['老人照護', '公共議題', '社區發展'],
    image: 'https://picsum.photos/id/25/600/400',
  },
  {
    id: 3,
    organization: 'RE-THINK 重新思考',
    title: '垃圾在哪，我們就到哪！',
    tags: ['環境保護', '生態保育'],
    image: 'https://picsum.photos/id/30/600/400',
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
        {activeTab === 0 && (
          <>
            <FilterSearch />
            <div className={styles.listContainer}>
              {MOCK_CHARITY_ORGANIZATIONS.map((item) => (
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
        )}

        {activeTab === 1 && (
          <>
            <FilterSearch />
            <div className={styles.listContainer}>
              {MOCK_DONATION_PROJECTS.map((project) => (
                <DonationProject
                  key={project.id}
                  organization={project.organization}
                  title={project.title}
                  tags={project.tags}
                  image={project.image}
                />
              ))}
            </div>
            <Footer />
          </>
        )}

        {activeTab === 2 && (
          <EmptyState />
        )}
      </div>
    </main>
  );
}
