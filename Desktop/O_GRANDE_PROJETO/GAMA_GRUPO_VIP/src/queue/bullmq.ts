import { Queue, Worker, type Processor } from 'bullmq';
import IORedis from 'ioredis';

const redisConnection = new IORedis({
  host: process.env.REDIS_HOST ?? 'localhost',
  port: Number(process.env.REDIS_PORT ?? 6379),
  maxRetriesPerRequest: null,  // BullMQ recomenda null
  enableReadyCheck: false,
});

export { redisConnection };

// Filas tipadas
export const dispatchQueue = new Queue<{ ofertaId: string; nichoId: string; correlationId: string }>(
  'dispatch',
  { connection: redisConnection }
);

export const ingestQueue = new Queue<{ nichoId: string; adapter: string; correlationId: string }>(
  'ingest',
  { connection: redisConnection }
);

// Helper: factory de Worker com retry exponencial + jitter (Story 2.6 detalha)
export function createWorker<T>(
  name: string,
  processor: Processor<T>,
  concurrency = 2
): Worker<T> {
  return new Worker<T>(name, processor, {
    connection: redisConnection,
    concurrency,
    settings: {
      backoffStrategy: (attemptsMade: number) => {
        // Story 2.6: 1s/2s/4s + jitter ±10/20/40%
        const base = 1000 * Math.pow(2, attemptsMade - 1);
        const jitter = base * 0.1 * (Math.random() * 2 - 1) * attemptsMade;
        return base + jitter;
      },
    },
  });
}

// Graceful shutdown
export async function closeAll() {
  await Promise.all([
    dispatchQueue.close(),
    ingestQueue.close(),
    redisConnection.quit(),
  ]);
}
