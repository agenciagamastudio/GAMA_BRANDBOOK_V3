import { bootstrapSchedules } from './queue/handlers';
import { closeAll } from './queue/bullmq';
import pino from 'pino';

const log = pino({ level: process.env.LOG_LEVEL ?? 'info' });

async function main() {
  log.info({ msg: 'gama-grupo-vip starting', pid: process.pid });
  await bootstrapSchedules();
  log.info({ msg: 'queues up + cron armed' });
}

main().catch((err) => {
  log.error({ err, msg: 'fatal startup' });
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  log.info({ msg: 'SIGTERM received' });
  await closeAll();
  process.exit(0);
});
process.on('SIGINT', async () => {
  log.info({ msg: 'SIGINT received' });
  await closeAll();
  process.exit(0);
});
