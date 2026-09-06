'use client';

import { useState } from 'react';
import styles from './Tabs.module.scss';
import { clsx } from 'clsx';

const tabs = ['公益團體', '捐款專案', '義賣商品'];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <nav className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={clsx(styles.tab, activeTab === index && styles.active)}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
