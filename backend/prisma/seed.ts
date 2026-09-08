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
  await prisma.charityProduct.deleteMany();
  await prisma.donationProject.deleteMany();
  await prisma.charityOrganization.deleteMany();

  // Seed Charity Organizations
  for (const org of MOCK_CHARITY_ORGANIZATIONS) {
    await prisma.charityOrganization.create({
      data: org,
    });
  }

  // Seed Donation Projects
  for (const project of MOCK_DONATION_PROJECTS) {
    await prisma.donationProject.create({
      data: {
        ...project,
        tags: project.tags, // Prisma handles array for Json field
      },
    });
  }

  // Seed Charity Products
  for (const product of MOCK_CHARITY_PRODUCTS) {
    await prisma.charityProduct.create({
      data: product,
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
