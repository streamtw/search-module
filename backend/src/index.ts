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
  const { keyword } = request.query as { keyword?: string };
  // await sleep(500);

  if (!keyword) {
    return prisma.charityOrganization.findMany();
  }

  return prisma.charityOrganization.findMany({
    where: {
      OR: [
        { title: { contains: keyword } },
        { description: { contains: keyword } },
      ],
    },
  });
});

fastify.get('/api/donation-projects', async (request, reply) => {
  const { keyword } = request.query as { keyword?: string };
  await sleep(500);

  if (!keyword) {
    return prisma.donationProject.findMany();
  }

  return prisma.donationProject.findMany({
    where: {
      OR: [
        { title: { contains: keyword } },
        { organization: { contains: keyword } },
        // Filtering by JSON tags might be complex depending on MySQL version and Prisma support
        // For simplicity, we'll just check title and organization or use a raw query if needed
      ],
    },
  });
});

fastify.get('/api/charity-products', async (request, reply) => {
  const { keyword } = request.query as { keyword?: string };
  await sleep(500);

  if (!keyword) {
    return prisma.charityProduct.findMany();
  }

  return prisma.charityProduct.findMany({
    where: {
      OR: [
        { title: { contains: keyword } },
        { organization: { contains: keyword } },
      ],
    },
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
