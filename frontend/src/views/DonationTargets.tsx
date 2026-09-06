'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CharityOrganizationComp from '../components/CharityOrganization';
import DonationProjectComp from '../components/DonationProject';
import CharityProductComp from '../components/CharityProduct';
import FilterSearch from '../components/FilterSearch';
import Tabs from '../components/Tabs';
import Footer from '../components/Footer';
import styles from '../app/page.module.scss';
import {
  MOCK_CHARITY_ORGANIZATIONS,
  MOCK_DONATION_PROJECTS,
  MOCK_CHARITY_PRODUCTS
} from '../data/mockData';

export default function DonationTargets() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search-results');
  };

  return (
    <>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={styles.contentWrapper}>
        <>
          {activeTab === 0 && (
            <>
              <FilterSearch onSearchClick={handleSearchClick} />
              <div className={styles.listContainer}>
                {MOCK_CHARITY_ORGANIZATIONS.map((item) => (
                  <CharityOrganizationComp
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
              <FilterSearch onSearchClick={handleSearchClick} />
              <div className={styles.listContainer}>
                {MOCK_DONATION_PROJECTS.map((project) => (
                  <DonationProjectComp
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
            <>
              <FilterSearch filterLabel="身心障礙服務" onSearchClick={handleSearchClick} />
              <div className={styles.productGrid}>
                {MOCK_CHARITY_PRODUCTS.map((product) => (
                  <CharityProductComp
                    key={product.id}
                    title={product.title}
                    organization={product.organization}
                    price={product.price}
                    image={product.image}
                  />
                ))}
              </div>
              <Footer />
            </>
          )}
        </>
      </div>
    </>
  );
}
