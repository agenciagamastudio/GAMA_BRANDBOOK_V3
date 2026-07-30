import { sql } from 'drizzle-orm';
import { boolean, index, integer, jsonb, pgTable, real, text, timestamp, uuid } from 'drizzle-orm/pg-core';

/**
 * OferetaVersion schema (Story 2.1 — OfertaCanonical)
 * Bumped when columns are added/removed (semver).
 */
export const OFERTA_VERSION = '1.0.0' as const;

/**
 * Nichos: configurado via YAML no startup (Story 1.7 faz UPSERT).
 * PK = kebab-case slug do modelo (ex: shineray-150-explorer-2013).
 */
export const nichos = pgTable('nichos', {
  id: text('id').primaryKey(),
  titulo: text('titulo').notNull(),
  palavrasChave: text('palavras_chave').array().notNull(),
  regexAdicional: text('regex_adicional'),
  scorePesos: jsonb('score_pesos'),
  ativo: boolean('ativo').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Ofertas: entidade principal (Entidade canônica pós-normalização da Story 2.1).
 * - url_hash = sha256 hex 64-char do URL canonicalizado (dedup)
 * - preco_centavos: INTEGER para evitar float drift (2990 = R$ 29,90)
 * - raw_api: resposta completa da fonte (auditoria + reprocessamento sem refetch)
 * - schema_version: acompanhar evolução do shape (migrations futuras vão ler isso)
 */
export const ofertas = pgTable(
  'ofertas',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    nichoId: text('nicho_id')
      .notNull()
      .references(() => nichos.id),
    origem: text('origem').notNull(), // 'shopee' | 'mercadolivre' | 'magalu' | 'americanas' | 'amazon'
    titulo: text('titulo').notNull(),
    precoCentavos: integer('preco_centavos').notNull(),
    comissaoPct: real('comissao_pct').notNull(),
    urlOriginal: text('url_original').notNull(),
    urlHash: text('url_hash').notNull(),
    urlCanonical: text('url_canonical').notNull(),
    imagemUrl: text('imagem_url'),
    sellerReputacao: real('seller_reputacao'), // 0..1
    descontoPct: real('desconto_pct'),
    estoqueDisponivel: boolean('estoque_disponivel').default(true),
    score: real('score'), // 0..1 (Story 2.4 calcula)
    schemaVersion: text('schema_version').notNull().default('1.0.0'),
    rawApi: jsonb('raw_api'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    dispatchedAt: timestamp('dispatched_at', { withTimezone: true }),
    affiliateId: text('affiliate_id'), // ?aff_id=X pra comissão rastreada
  },
  (t) => ({
    urlHashIdx: index('idx_ofertas_url_hash').on(t.urlHash),
    nichoIdx: index('idx_ofertas_nicho').on(t.nichoId),
    // pg_trgm GIN para filtro fuzzy (Story 2.2):
    tituloTrgmIdx: sql`CREATE INDEX idx_ofertas_titulo_trgm ON ofertas USING GIN (titulo gin_trgm_ops)`,
  })
);

/**
 * Ofertas rejeitadas: auditoria de filtragem (por que algo NÃO entrou).
 * Essencial pra tunar filtros (Story 2.2) e medir precision.
 */
export const ofertasRejected = pgTable('ofertas_rejected', {
  id: uuid('id').primaryKey().defaultRandom(),
  nichoId: text('nicho_id'),
  titulo: text('titulo').notNull(),
  urlOriginal: text('url_original'),
  reason: text('reason').notNull(), // 'filter_keyword' | 'filter_trgm' | 'dedup_canonical' | 'dedup_fuzzy' | 'invalid_schema'
  rawApi: jsonb('raw_api'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Dispatch log: auditoria de envios (1 linha por tentativa de envio).
 * - correlation_id: agrupa jobs do mesmo ingest cycle (debug + replay)
 * - target_whatsapp / target_telegram: flags (Story 1.7 ativa Telegram opcional)
 */
export const dispatchLog = pgTable(
  'dispatch_log',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    ofertaId: uuid('oferta_id')
      .notNull()
      .references(() => ofertas.id),
    correlationId: text('correlation_id').notNull(),
    targetWhatsapp: boolean('target_whatsapp').default(true).notNull(),
    targetTelegram: boolean('target_telegram').default(false).notNull(),
    status: text('status').notNull(), // 'sent' | 'failed' | 'retry'
    errorMsg: text('error_msg'),
    sentAt: timestamp('sent_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    correlationIdx: index('idx_dispatch_correlation').on(t.correlationId),
    sentAtIdx: index('idx_dispatch_sent_at').on(t.sentAt),
  })
);

/**
 * Opt-outs: persistência do STOP button (Story 2.5).
 * PK = user_jid (WhatsApp JID ou Telegram user_id).
 * nicho_id opcional: null = todos os nichos.
 */
export const optOuts = pgTable('opt_outs', {
  userJid: text('user_jid').primaryKey(),
  nichoId: text('nicho_id'),
  optedOutAt: timestamp('opted_out_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Nicho = typeof nichos.$inferSelect;
export type NewNicho = typeof nichos.$inferInsert;
export type Oferta = typeof ofertas.$inferSelect;
export type NewOferta = typeof ofertas.$inferInsert;
export type OfertaRejected = typeof ofertasRejected.$inferSelect;
export type DispatchLog = typeof dispatchLog.$inferSelect;
export type OptOut = typeof optOuts.$inferSelect;
