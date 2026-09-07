import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CharityOrganizationComp from '../components/CharityOrganization';
import DonationProjectComp from '../components/DonationProject';
import CharityProductComp from '../components/CharityProduct';
import SearchBar from '../components/SearchBar';
import Tabs from '../components/Tabs';
import Footer from '../components/Footer';
import EmptyState from '../components/EmptyState';
import styles from '../app/page.module.scss';
import type { CharityOrganization, DonationProject, CharityProduct } from '../types';

export default function SearchResults() {
  const [activeTab, setActiveTab] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [organizations, setOrganizations] = useState<CharityOrganization[]>([]);
  const [projects, setProjects] = useState<DonationProject[]>([]);
  const [products, setProducts] = useState<CharityProduct[]>([]);
  const [loadingMap, setLoadingMap] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
  });
  const navigate = useNavigate();

  const fetchData = useCallback(async (tabIndex: number, currentKeyword: string) => {
    setLoadingMap((prev) => ({ ...prev, [tabIndex]: true }));
    try {
      let url = '';
      if (tabIndex === 0) {
        url = `http://localhost:3001/api/charity-organizations?keyword=${encodeURIComponent(currentKeyword)}`;
      } else if (tabIndex === 1) {
        url = `http://localhost:3001/api/donation-projects?keyword=${encodeURIComponent(currentKeyword)}`;
      } else if (tabIndex === 2) {
        url = `http://localhost:3001/api/charity-products?keyword=${encodeURIComponent(currentKeyword)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (tabIndex === 0) setOrganizations(data);
      else if (tabIndex === 1) setProjects(data);
      else if (tabIndex === 2) setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingMap((prev) => ({ ...prev, [tabIndex]: false }));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(activeTab, keyword);
    }, 300); // Debounce 300ms

    return () => clearTimeout(timer);
  }, [activeTab, keyword, fetchData]);

  const handleCancelSearch = () => {
    navigate('/donation-targets');
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
          {organizations.length > 0 ? (
            <div className={`mt-3 ${styles.listContainer}`}>
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
          {projects.length > 0 ? (
            <div className={`mt-3 ${styles.listContainer}`}>
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
          {products.length > 0 ? (
            <div className={`mt-3 ${styles.productGrid}`}>
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
      <SearchBar value={keyword} onChange={setKeyword} onCancel={handleCancelSearch} />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={styles.contentWrapper}>
        {renderContent()}
      </div>
    </>
  );
}
