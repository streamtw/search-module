import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient, Prisma } from '@prisma/client';
import type { CharityOrganization, DonationProject, CharityProduct } from './types.js';

const fastify = Fastify({
  logger: true,
});

const prisma = new PrismaClient();

// Register CORS
fastify.register(cors, {
  origin: '*',
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// APIs
fastify.get('/api/donation-categories', async (request, reply) => {
  return prisma.donationCategory.findMany();
});

fastify.get('/api/charity-organizations', async (request, reply) => {
  const { keyword, page = '1', category_id } = request.query as { keyword?: string; page?: string; category_id?: string };
  const limit = 10;
  const skip = (parseInt(page) - 1) * limit;
  // await sleep(2000); // used to display loading UI

  const where: Prisma.CharityOrganizationWhereInput = {};
  const conditions: Prisma.CharityOrganizationWhereInput[] = [];

  if (keyword) {
    conditions.push({
      OR: [
        { title: { contains: keyword } },
        { description: { contains: keyword } },
      ],
    });
  }

  if (category_id && category_id !== '0') {
    conditions.push({
      donation_category_id: parseInt(category_id),
    });
  }

  if (conditions.length > 0) {
    where.AND = conditions;
  }

  return prisma.charityOrganization.findMany({
    where,
    skip,
    take: limit,
  });
});

fastify.get('/api/donation-projects', async (request, reply) => {
  const { keyword, page = '1', category_id } = request.query as { keyword?: string; page?: string; category_id?: string };
  const limit = 10;
  const skip = (parseInt(page) - 1) * limit;
  // await sleep(500); // used to display loading UI

  const where: Prisma.DonationProjectWhereInput = {};
  const conditions: Prisma.DonationProjectWhereInput[] = [];

  if (keyword) {
    conditions.push({
      OR: [
        { title: { contains: keyword } },
        { organization: { contains: keyword } },
      ],
    });
  }

  if (category_id && category_id !== '0') {
    conditions.push({
      donation_category_id: parseInt(category_id),
    });
  }

  if (conditions.length > 0) {
    where.AND = conditions;
  }

  return prisma.donationProject.findMany({
    where,
    skip,
    take: limit,
  });
});

fastify.get('/api/charity-products', async (request, reply) => {
  const { keyword, page = '1', category_id } = request.query as { keyword?: string; page?: string; category_id?: string };
  const limit = 10;
  const skip = (parseInt(page) - 1) * limit;
  // await sleep(500); // used to display loading UI

  const where: Prisma.CharityProductWhereInput = {};
  const conditions: Prisma.CharityProductWhereInput[] = [];

  if (keyword) {
    conditions.push({
      OR: [
        { title: { contains: keyword } },
        { organization: { contains: keyword } },
      ],
    });
  }

  if (category_id && category_id !== '0') {
    conditions.push({
      donation_category_id: parseInt(category_id),
    });
  }

  if (conditions.length > 0) {
    where.AND = conditions;
  }

  return prisma.charityProduct.findMany({
    where,
    skip,
    take: limit,
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Server is running on http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
