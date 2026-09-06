import Fastify from 'fastify';
import cors from '@fastify/cors';
import {
  MOCK_CHARITY_ORGANIZATIONS,
  MOCK_DONATION_PROJECTS,
  MOCK_CHARITY_PRODUCTS,
} from './data';

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
  await sleep(500);
  return MOCK_CHARITY_ORGANIZATIONS;
});

fastify.get('/api/donation-projects', async (request, reply) => {
  await sleep(500);
  return MOCK_DONATION_PROJECTS;
});

fastify.get('/api/charity-products', async (request, reply) => {
  await sleep(500);
  return MOCK_CHARITY_PRODUCTS;
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
