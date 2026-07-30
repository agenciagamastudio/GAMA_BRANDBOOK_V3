# RUNBOOK — Operações do dia-a-dia

## Restart containers
```bash
docker compose restart bot
docker compose restart postgres
docker compose restart dragonfly
```
O bot precisa estar UP + cron armamado — ver log `[scheduler] cron jobs armed`.

## Pausar/retomar cron
```typescript
// src/queue/scheduler.ts tem helper `removeAllRepeatables(queue)`
// Manual via CLI:
docker compose exec bot node -e "import('./dist/queue/scheduler.js').then(m => m.pauseCron())"
```

## Inspect BullMQ queue pending
```bash
docker compose exec bot node -e "
  import('bullmq').then(({ Queue }) => {
    const q = new Queue('dispatch', { connection: { host: 'dragonfly', port: 6379 }});
    q.getJobs(['active', 'waiting', 'delayed']).then(jobs => {
      console.log(JSON.stringify(jobs.map(j => ({ id: j.id, name: j.name, delay: j.opts.delay })), null, 2));
    });
  });
"
```

## Verificar status WhatsApp (após Story 1.6)
```bash
curl http://localhost:8080/instance/connectionState/gama-vip
```

## Re-attachar WhatsApp se cair
Ver Story 1.6 AC-3 — rodar `npm run evolution:create -- --name gama-vip` + escanear QR.
