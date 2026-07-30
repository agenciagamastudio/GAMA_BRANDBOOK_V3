import { createWorker } from './bullmq';
import { dispatchQueue, ingestQueue } from './bullmq';
import { scheduleDispatch, scheduleMetricsDaily } from './scheduler';

// Placeholder ingest handler (Story 1.4-1.5 implementa de fato)
createWorker('ingest', async (job) => {
  console.log(`[ingest] nichId=${job.data.nichoId} adapter=${job.data.adapter} correlation=${job.data.correlationId}`);
  // Story 1.4-1.5 plugam ShopeeAdapter.ingest() / MercadoLivreAdapter.ingest()
});

// Placeholder dispatch handler (Story 2.5-2.8 implementa)
createWorker('dispatch', async (job) => {
  console.log(`[dispatch] ofertaId=${job.data.ofertaId} correlation=${job.data.correlationId}`);
  // Story 2.5-2.8: monta card WhatsApp + Evolution.API call
});

// Bootstrap: armar cron jobs
export async function bootstrapSchedules() {
  await scheduleDispatch(dispatchQueue);
  await scheduleMetricsDaily(dispatchQueue);  // reusa fila (Story 3.4 cria dedicada depois)
  console.log('[scheduler] cron jobs armed');
}
