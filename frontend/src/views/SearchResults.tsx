import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CharityOrganizationComp from '../components/CharityOrganization';
import DonationProjectComp from '../components/DonationProject';
import CharityProductComp from '../components/CharityProduct';
import FilterSearch from '../components/FilterSearch';
import SearchBar from '../components/SearchBar';
import Tabs from '../components/Tabs';
import Footer from '../components/Footer';
import EmptyState from '../components/EmptyState';
import styles from '../app/page.module.scss';
import {
  MOCK_CHARITY_ORGANIZATIONS,
  MOCK_DONATION_PROJECTS,
  MOCK_CHARITY_PRODUCTS
} from '../data/mockData';

export default function SearchResults() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleCancelSearch = () => {
    navigate('/donation-targets');
  };

  return (
    <>
      <SearchBar onCancel={handleCancelSearch} />

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={styles.contentWrapper}>
        <EmptyState />
      </div>
    </>
  );
}
