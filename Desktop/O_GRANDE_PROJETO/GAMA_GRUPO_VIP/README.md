# GAMA_GRUPO_VIP

Agregador nichado de peças de moto (Shineray 150 Explorer 2013, expansível pra XRE 150 / CG 160 / Factor 150). Ingere ofertas de marketplaces BR (Shopee, Mercado Livre, Magalu, Americanas), filtra por compatibilidade, e dispara 1x/dia 08:30 BRT no grupo WhatsApp pessoal via Evolution API.

**Custo estimado:** R$ 0–10/mês (Docker Compose local).

## Stack

- Node.js 20 + TypeScript strict
- BullMQ + Dragonfly (Redis drop-in) para filas e cron
- Postgres 16 + Drizzle ORM + pg_trgm (filtro trigram)
- Evolution API (Baileys) para WhatsApp
- Telegram Bot API oficial (bônus semana 3)
- pino para logs estruturados

## Setup

```bash
git clone …
cd GAMA_GRUPO_VIP
cp .env.example .env  # preencher variáveis
docker compose up -d
```

## Comandos principais

- `npm run dev` — dev local com hot-reload (ts-node-dev)
- `npm run build` — build TypeScript para `dist/`
- `npm start` — roda versão compilada
- `npm run ingest -- <nichoId>` — ingere ofertas (Story 1.8)
- `npm run dispatch -- <nichoId>` — dispara 1 card (Story 1.8)
- `npm run evolution:create` — cria instância WhatsApp (Story 1.6)

## Estrutura

```
GAMA_GRUPO_VIP/
├── src/           # código TS (adicionado nas stories seguintes)
├── docs/          # épicos + stories + checklist
├── .env.example   # template variáveis
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## Status

Semana 1 (EPIC-1) em andamento. Veja `docs/`. Validação 100% GO nas 22 stories.

## Licença

Uso pessoal, @prontoatendimentogama.
