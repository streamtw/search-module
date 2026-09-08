import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
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
fastify.get('/api/charity-organizations', async (request, reply) => {
  const { keyword, page = '1' } = request.query as { keyword?: string; page?: string };
  const limit = 10;
  const skip = (parseInt(page) - 1) * limit;

  const where = keyword ? {
    OR: [
      { title: { contains: keyword } },
      { description: { contains: keyword } },
    ],
  } : {};

  return prisma.charityOrganization.findMany({
    where,
    skip,
    take: limit,
  });
});

fastify.get('/api/donation-projects', async (request, reply) => {
  const { keyword, page = '1' } = request.query as { keyword?: string; page?: string };
  const limit = 10;
  const skip = (parseInt(page) - 1) * limit;
  await sleep(500);

  const where = keyword ? {
    OR: [
      { title: { contains: keyword } },
      { organization: { contains: keyword } },
    ],
  } : {};

  return prisma.donationProject.findMany({
    where,
    skip,
    take: limit,
  });
});

fastify.get('/api/charity-products', async (request, reply) => {
  const { keyword, page = '1' } = request.query as { keyword?: string; page?: string };
  const limit = 10;
  const skip = (parseInt(page) - 1) * limit;
  await sleep(500);

  const where = keyword ? {
    OR: [
      { title: { contains: keyword } },
      { organization: { contains: keyword } },
    ],
  } : {};

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
