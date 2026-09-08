import process from 'process';
import { PrismaClient } from '@prisma/client';
import {
  MOCK_CHARITY_ORGANIZATIONS,
  MOCK_DONATION_PROJECTS,
  MOCK_CHARITY_PRODUCTS,
} from '../src/data.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clear existing data
  await prisma.donationCategory.deleteMany();
  await prisma.charityProduct.deleteMany();
  await prisma.donationProject.deleteMany();
  await prisma.charityOrganization.deleteMany();

  // Seed Donation Categories
  const categoryNames = [
    '兒少照護',
    '老人服務',
    '身心障礙',
    '動物保護',
    '環境保護',
    '婦女關懷',
    '弱勢扶貧',
    '醫療救助',
    '社區發展',
  ];

  const categoryMap: Record<string, number> = {};

  for (const name of categoryNames) {
    const category = await prisma.donationCategory.create({
      data: { name },
    });
    categoryMap[name] = category.id;
  }

  // Helper to get category ID by index (for organizations)
  const getCategoryIdByIndex = (index: number) => {
    const name = categoryNames[index % categoryNames.length];
    return name ? categoryMap[name] : null;
  };

  // Seed Charity Organizations
  for (let i = 0; i < MOCK_CHARITY_ORGANIZATIONS.length; i++) {
    const org = MOCK_CHARITY_ORGANIZATIONS[i]!;
    await prisma.charityOrganization.create({
      data: {
        ...org,
        donation_category_id: getCategoryIdByIndex(i) || null,
      },
    });
  }

  // Seed Donation Projects
  // Projects mapping:
  // 1: 兒少照護
  // 2: 老人服務
  // 3: 環境保護 (index 4 in categoryNames)
  const projectCategoryMapping: Record<number, string> = {
    1: '兒少照護',
    2: '老人服務',
    3: '環境保護',
  };

  for (const project of MOCK_DONATION_PROJECTS) {
    const categoryName = projectCategoryMapping[project.id];
    await prisma.donationProject.create({
      data: {
        ...project,
        tags: project.tags,
        donation_category_id: categoryName ? categoryMap[categoryName] || null : null,
      },
    });
  }

  // Seed Charity Products
  // All products map to '身心障礙'
  for (const product of MOCK_CHARITY_PRODUCTS) {
    await prisma.charityProduct.create({
      data: {
        ...product,
        donation_category_id: categoryMap['身心障礙'] || null,
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
