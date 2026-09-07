'use client';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DonationTargets from '@/views/DonationTargets';
import SearchResults from '@/views/SearchResults';
import Header from '@/components/Header';
import styles from '@/app/page.module.scss';

export default function AppRouter() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Router>
      <main className={styles.main}>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/donation-targets" replace />} />
          <Route path="/donation-targets" element={<DonationTargets />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
      </main>
    </Router>
  );
}
