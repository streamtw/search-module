import Fastify from 'fastify';
import cors from '@fastify/cors';
import {
  MOCK_CHARITY_ORGANIZATIONS,
  MOCK_DONATION_PROJECTS,
  MOCK_CHARITY_PRODUCTS,
} from './data.js';
import type { CharityOrganization, DonationProject, CharityProduct } from './types.js';

const fastify = Fastify({
  logger: true,
});

// Register CORS
fastify.register(cors, {
  origin: '*',
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// APIs
fastify.get('/api/charity-organizations', async (request, reply) => {
  const { keyword } = request.query as { keyword?: string };
  await sleep(500);

  if (!keyword) return MOCK_CHARITY_ORGANIZATIONS;

  return MOCK_CHARITY_ORGANIZATIONS.filter((org: CharityOrganization) =>
    org.title.includes(keyword) || org.description.includes(keyword)
  );
});

fastify.get('/api/donation-projects', async (request, reply) => {
  const { keyword } = request.query as { keyword?: string };
  await sleep(500);

  if (!keyword) return MOCK_DONATION_PROJECTS;

  return MOCK_DONATION_PROJECTS.filter((project: DonationProject) =>
    project.title.includes(keyword) || project.organization.includes(keyword) || project.tags.some((tag: string) => tag.includes(keyword))
  );
});

fastify.get('/api/charity-products', async (request, reply) => {
  const { keyword } = request.query as { keyword?: string };
  await sleep(500);

  if (!keyword) return MOCK_CHARITY_PRODUCTS;

  return MOCK_CHARITY_PRODUCTS.filter((product: CharityProduct) =>
    product.title.includes(keyword) || product.organization.includes(keyword)
  );
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
