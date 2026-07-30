import type { Queue } from 'bullmq';

export async function scheduleDispatch(
  queue: Queue,
  cronExpression = process.env.DISPATCH_CRON ?? '30 8 * * *'  // 08:30 BRT padrão
): Promise<void> {
  // Remove repeatable antigo (idempotente)
  const existing = await queue.getRepeatableJobs();
  for (const job of existing) {
    await queue.removeRepeatableByKey(job.key);
  }

  await queue.add(
    'dispatch-daily',
    { trigger: 'cron' },
    {
      repeat: { pattern: cronExpression, tz: 'America/Sao_Paulo' },
      jobId: 'dispatch-daily-repeatable',
      removeOnComplete: 50,    // guardar últimos 50 pra debug
      removeOnFail: 100,
    }
  );
}

export async function scheduleMetricsDaily(queue: Queue): Promise<void> {
  await queue.add(
    'metrics-precision-daily',
    { trigger: 'cron' },
    {
      repeat: { pattern: '55 23 * * *', tz: 'America/Sao_Paulo' },  // 23:55 BRT
      jobId: 'metrics-daily-repeatable',
      removeOnComplete: 30,
      removeOnFail: 100,
    }
  );
}
