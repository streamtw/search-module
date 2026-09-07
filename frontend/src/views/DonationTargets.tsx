'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CharityOrganizationComp from '../components/CharityOrganization';
import DonationProjectComp from '../components/DonationProject';
import CharityProductComp from '../components/CharityProduct';
import FilterSearch from '../components/FilterSearch';
import Tabs from '../components/Tabs';
import Footer from '../components/Footer';
import EmptyState from '../components/EmptyState';
import styles from '../app/page.module.scss';
import type { CharityOrganization, DonationProject, CharityProduct } from '../types';

export default function DonationTargets() {
  const [activeTab, setActiveTab] = useState(0);
  const [organizations, setOrganizations] = useState<CharityOrganization[]>([]);
  const [projects, setProjects] = useState<DonationProject[]>([]);
  const [products, setProducts] = useState<CharityProduct[]>([]);
  const [loadingMap, setLoadingMap] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingMap((prev) => ({ ...prev, [activeTab]: true }));
      try {
        if (activeTab === 0) {
          const res = await fetch('http://localhost:3001/api/charity-organizations');
          const data = await res.json();
          setOrganizations(data);
        } else if (activeTab === 1) {
          const res = await fetch('http://localhost:3001/api/donation-projects');
          const data = await res.json();
          setProjects(data);
        } else if (activeTab === 2) {
          const res = await fetch('http://localhost:3001/api/charity-products');
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingMap((prev) => ({ ...prev, [activeTab]: false }));
      }
    };

    fetchData();
  }, [activeTab, organizations.length, projects.length, products.length]);

  const handleSearchClick = () => {
    navigate('/search-results');
  };

  const renderContent = () => {
    if (loadingMap[activeTab]) {
      return (
        <div className={styles.loading}>
          <span className={styles.loader}></span>
        </div>
      );
    }

    if (activeTab === 0) {
      return (
        <>
          <FilterSearch onSearchClick={handleSearchClick} />
          {organizations.length > 0 ? (
            <div className={styles.listContainer}>
              {organizations.map((item) => (
                <CharityOrganizationComp
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
          <Footer />
        </>
      );
    }

    if (activeTab === 1) {
      return (
        <>
          <FilterSearch onSearchClick={handleSearchClick} />
          {projects.length > 0 ? (
            <div className={styles.listContainer}>
              {projects.map((project) => (
                <DonationProjectComp
                  key={project.id}
                  organization={project.organization}
                  title={project.title}
                  tags={project.tags}
                  image={project.image}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
          <Footer />
        </>
      );
    }

    if (activeTab === 2) {
      return (
        <>
          <FilterSearch filterLabel="身心障礙服務" onSearchClick={handleSearchClick} />
          {products.length > 0 ? (
            <div className={styles.productGrid}>
              {products.map((product) => (
                <CharityProductComp
                  key={product.id}
                  title={product.title}
                  organization={product.organization}
                  price={product.price}
                  image={product.image}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
          <Footer />
        </>
      );
    }

    return null;
  };

  return (
    <>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={styles.contentWrapper}>
        {renderContent()}
      </div>
    </>
  );
}
