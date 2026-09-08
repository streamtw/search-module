'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { API_BASE_URL } from '../config';
import type { DonationCategory as CategoryType } from '../types';
import styles from './DonationCategory.module.scss';

interface DonationCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (category: CategoryType) => void;
  selectedCategoryName: string;
}

export default function DonationCategory({
  isOpen,
  onClose,
  onSelect,
  selectedCategoryName,
}: DonationCategoryProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [mounted, setMounted] = useState(false);

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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
        onClick={onClose}
      />
      <div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h3 className={styles.title}>選擇類別</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.categoryList}>
          <button
            className={`${styles.categoryItem} ${
              selectedCategoryName === '全部' ? styles.active : ''
            }`}
            onClick={() => {
              onSelect({ id: 0, name: '全部' });
              onClose();
            }}
          >
            全部
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryItem} ${
                selectedCategoryName === category.name ? styles.active : ''
              }`}
              onClick={() => {
                onSelect(category);
                onClose();
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
