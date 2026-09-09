import { useState, useEffect, useCallback, useRef } from 'react';
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
import { API_BASE_URL } from '../config';

export default function SearchResults() {
  const [activeTab, setActiveTab] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [organizations, setOrganizations] = useState<CharityOrganization[]>([]);
  const [projects, setProjects] = useState<DonationProject[]>([]);
  const [products, setProducts] = useState<CharityProduct[]>([]);
  const [pageMap, setPageMap] = useState<{ [key: number]: number }>({
    0: 1,
    1: 1,
    2: 1,
  });
  const [hasMoreMap, setHasMoreMap] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
  });
  const [loadingMap, setLoadingMap] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
  });
  const [hasFetchedMap, setHasFetchedMap] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
  });
  const navigate = useNavigate();
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async (tabIndex: number, currentKeyword: string, page: number, isLoadMore = false) => {
    if (!currentKeyword.trim() || loadingMap[tabIndex]) return;
    setLoadingMap((prev) => ({ ...prev, [tabIndex]: true }));
    try {
      let endpoint = '';
      if (tabIndex === 0) endpoint = 'charity-organizations';
      else if (tabIndex === 1) endpoint = 'donation-projects';
      else if (tabIndex === 2) endpoint = 'charity-products';

      const url = `${API_BASE_URL}/${endpoint}?keyword=${encodeURIComponent(currentKeyword)}&page=${page}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.length < 10) {
        setHasMoreMap((prev) => ({ ...prev, [tabIndex]: false }));
      } else {
        setHasMoreMap((prev) => ({ ...prev, [tabIndex]: true }));
      }

      if (tabIndex === 0) setOrganizations((prev) => isLoadMore ? [...prev, ...data] : data);
      else if (tabIndex === 1) setProjects((prev) => isLoadMore ? [...prev, ...data] : data);
      else if (tabIndex === 2) setProducts((prev) => isLoadMore ? [...prev, ...data] : data);

      setHasFetchedMap((prev) => ({ ...prev, [tabIndex]: true }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingMap((prev) => ({ ...prev, [tabIndex]: false }));
    }
  }, []);

  useEffect(() => {
    if (!keyword.trim()) {
      setOrganizations([]);
      setProjects([]);
      setProducts([]);
      setPageMap({ 0: 1, 1: 1, 2: 1 });
      setHasMoreMap({ 0: true, 1: true, 2: true });
      setHasFetchedMap({ 0: false, 1: false, 2: false });
      return;
    }

    const timer = setTimeout(() => {
      // When keyword or tab changes, reset everything for that tab and fetch page 1
      setPageMap((prev) => ({ ...prev, [activeTab]: 1 }));
      setHasFetchedMap((prev) => ({ ...prev, [activeTab]: false }));
      fetchData(activeTab, keyword, 1, false);
    }, 300); // Debounce 300ms

    return () => clearTimeout(timer);
  }, [activeTab, keyword, fetchData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMoreMap[activeTab] && !loadingMap[activeTab]) {
          const nextPage = pageMap[activeTab] + 1;
          setPageMap((prev) => ({ ...prev, [activeTab]: nextPage }));
          fetchData(activeTab, keyword, nextPage, true);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [activeTab, keyword, hasMoreMap[activeTab], loadingMap[activeTab], pageMap[activeTab], fetchData]);

  const handleCancelSearch = () => {
    navigate('/donation-targets');
  };

  const renderContent = () => {
    if (loadingMap[activeTab] && pageMap[activeTab] === 1) {
      return (
        <div className={styles.loading}>
          <span className={styles.loader}></span>
        </div>
      );
    }

    if (!hasFetchedMap[activeTab]) {
      return null;
    }

    if (activeTab === 0) {
      return (
        <>
          {organizations.length > 0 ? (
            <>
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
              <div ref={observerTarget} style={{ height: '20px' }}></div>
              {loadingMap[activeTab] && (
                <div className="flex justify-center py-4">
                  <span className={styles.loader}></span>
                </div>
              )}
              <Footer />
            </>
          ) : (
            <EmptyState />
          )}
        </>
      );
    }

    if (activeTab === 1) {
      return (
        <>
          {projects.length > 0 ? (
            <>
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
              <div ref={observerTarget} style={{ height: '20px' }}></div>
              {loadingMap[activeTab] && (
                <div className="flex justify-center py-4">
                  <span className={styles.loader}></span>
                </div>
              )}
              <Footer />
            </>
          ) : (
            <EmptyState />
          )}
        </>
      );
    }

    if (activeTab === 2) {
      return (
        <>
          {products.length > 0 ? (
            <>
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
              <div ref={observerTarget} style={{ height: '20px' }}></div>
              {loadingMap[activeTab] && (
                <div className="flex justify-center py-4">
                  <span className={styles.loader}></span>
                </div>
              )}
              <Footer />
            </>
          ) : (
            <EmptyState />
          )}
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
