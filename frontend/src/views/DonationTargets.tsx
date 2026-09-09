'use client';

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CharityOrganizationComp from '../components/CharityOrganization';
import DonationProjectComp from '../components/DonationProject';
import CharityProductComp from '../components/CharityProduct';
import FilterSearch from '../components/FilterSearch';
import Tabs from '../components/Tabs';
import Footer from '../components/Footer';
import EmptyState from '../components/EmptyState';
import styles from '../app/page.module.scss';
import type { CharityOrganization, DonationProject, CharityProduct, DonationCategory } from '../types';
import { API_BASE_URL } from '../config';

export default function DonationTargets() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<DonationCategory>({ id: 0, name: '全部' });
  const [categories, setCategories] = useState<DonationCategory[]>([]);
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
  const navigate = useNavigate();
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchData = async (tabIndex: number, page: number, categoryId: number, isLoadMore = false) => {
    if (loadingMap[tabIndex]) return;
    setLoadingMap((prev) => ({ ...prev, [tabIndex]: true }));
    try {
      setHasMoreMap((prev) => ({ ...prev, [tabIndex]: true }));
      setPageMap((prev) => ({ ...prev, [activeTab]: page }));

      let endpoint = '';
      if (tabIndex === 0) endpoint = 'charity-organizations';
      else if (tabIndex === 1) endpoint = 'donation-projects';
      else if (tabIndex === 2) endpoint = 'charity-products';

      const res = await fetch(`${API_BASE_URL}/${endpoint}?page=${page}&category_id=${categoryId}`);
      const data = await res.json();

      if (data.length < 10) {
        setHasMoreMap((prev) => ({ ...prev, [tabIndex]: false }));
      } else {
        setHasMoreMap((prev) => ({ ...prev, [tabIndex]: true }));
      }

      if (tabIndex === 0) setOrganizations((prev) => isLoadMore ? [...prev, ...data] : data);
      else if (tabIndex === 1) setProjects((prev) => isLoadMore ? [...prev, ...data] : data);
      else if (tabIndex === 2) setProducts((prev) => isLoadMore ? [...prev, ...data] : data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingMap((prev) => ({ ...prev, [tabIndex]: false }));
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/donation-categories`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Reset state for the active tab when category changes
    if (activeTab === 0) setOrganizations([]);
    else if (activeTab === 1) setProjects([]);
    else if (activeTab === 2) setProducts([]);

    setPageMap((prev) => ({ ...prev, [activeTab]: 1 }));
    setHasMoreMap((prev) => ({ ...prev, [activeTab]: true }));

    fetchData(activeTab, 1, selectedCategory.id);
  }, [activeTab, selectedCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMoreMap[activeTab] && !loadingMap[activeTab]) {
          const nextPage = pageMap[activeTab] + 1;
          setPageMap((prev) => ({ ...prev, [activeTab]: nextPage }));
          fetchData(activeTab, nextPage, selectedCategory.id, true);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [activeTab, hasMoreMap[activeTab], loadingMap[activeTab], pageMap[activeTab], selectedCategory.id]);

  const handleSearchClick = () => {
    navigate('/search-results');
  };

  const renderContent = () => {
    // Only show full-page loading if it's the first page
    if (loadingMap[activeTab] && pageMap[activeTab] === 1) {
      return (
        <div className={styles.loading}>
          <span className={styles.loader}></span>
        </div>
      );
    }

    if (activeTab === 0) {
      return (
        <>
          <FilterSearch
            filterLabel={selectedCategory.name}
            onFilterChange={setSelectedCategory}
            onSearchClick={handleSearchClick}
            categories={categories}
          />
          {organizations.length > 0 ? (
            <>
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
              <div ref={observerTarget} style={{ height: '20px' }}></div>
              {loadingMap[activeTab] && (
                <div className="flex justify-center py-4">
                  <span className={styles.loader}></span>
                </div>
              )}
            </>
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
          <FilterSearch
            filterLabel={selectedCategory.name}
            onFilterChange={setSelectedCategory}
            onSearchClick={handleSearchClick}
            categories={categories}
          />
          {projects.length > 0 ? (
            <>
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
              <div ref={observerTarget} style={{ height: '20px' }}></div>
              {loadingMap[activeTab] && (
                <div className="flex justify-center py-4">
                  <span className={styles.loader}></span>
                </div>
              )}
            </>
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
          <FilterSearch
            filterLabel={selectedCategory.name}
            onFilterChange={setSelectedCategory}
            onSearchClick={handleSearchClick}
            categories={categories}
          />
          {products.length > 0 ? (
            <>
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
              <div ref={observerTarget} style={{ height: '20px' }}></div>
              {loadingMap[activeTab] && (
                <div className="flex justify-center py-4">
                  <span className={styles.loader}></span>
                </div>
              )}
            </>
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
