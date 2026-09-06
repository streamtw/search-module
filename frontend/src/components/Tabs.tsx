'use client';

import styles from './Tabs.module.scss';
import { clsx } from 'clsx';

const tabs = ['公益團體', '捐款專案', '義賣商品'];

interface TabsProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <nav className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={clsx(styles.tab, activeTab === index && styles.active)}
            onClick={() => onTabChange(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
