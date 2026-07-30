-- === 001_init.sql ===
-- Schema inicial: nichos, ofertas, auditoria, opt-outs.
-- Aplicar manualmente com: psql -U gama -d gama_vip -f src/db/migrations/001_init.sql
-- Idempotente: pode rodar 2x sem erro (IF NOT EXISTS nos objetos chave).

-- =====================================================
-- EXTENSÕES
-- =====================================================
-- uuid-ossp: gen_random_uuid() nativo (pg 13+) — fallback pra compatibilidade
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- pgcrypto: digest() para url_hash (sha256)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- pg_trgm: filtro fuzzy + dedup trigram (Story 2.2, 2.3)
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =====================================================
-- NICHOS
-- =====================================================
CREATE TABLE IF NOT EXISTS nichos (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  palavras_chave TEXT[] NOT NULL,
  regex_adicional TEXT,
  score_pesos JSONB,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- OFERTAS
-- =====================================================
CREATE TABLE IF NOT EXISTS ofertas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nicho_id TEXT NOT NULL REFERENCES nichos(id),
  origem TEXT NOT NULL,
  titulo TEXT NOT NULL,
  preco_centavos INTEGER NOT NULL,
  comissao_pct REAL NOT NULL,
  url_original TEXT NOT NULL,
  url_hash TEXT NOT NULL,
  url_canonical TEXT NOT NULL,
  imagem_url TEXT,
  seller_reputacao REAL,
  desconto_pct REAL,
  estoque_disponivel BOOLEAN NOT NULL DEFAULT TRUE,
  score REAL,
  schema_version TEXT NOT NULL DEFAULT '1.0.0',
  raw_api JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  dispatched_at TIMESTAMPTZ,
  affiliate_id TEXT
);

CREATE INDEX IF NOT EXISTS idx_ofertas_url_hash ON ofertas(url_hash);
CREATE INDEX IF NOT EXISTS idx_ofertas_nicho ON ofertas(nicho_id);
CREATE INDEX IF NOT EXISTS idx_ofertas_titulo_trgm ON ofertas USING GIN (titulo gin_trgm_ops);

-- =====================================================
-- OFERTAS_REJECTED (auditoria de filtros)
-- =====================================================
CREATE TABLE IF NOT EXISTS ofertas_rejected (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nicho_id TEXT,
  titulo TEXT NOT NULL,
  url_original TEXT,
  reason TEXT NOT NULL,
  raw_api JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- DISPATCH_LOG
-- =====================================================
CREATE TABLE IF NOT EXISTS dispatch_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  oferta_id UUID NOT NULL REFERENCES ofertas(id),
  correlation_id TEXT NOT NULL,
  target_whatsapp BOOLEAN NOT NULL DEFAULT TRUE,
  target_telegram BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL,
  error_msg TEXT,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dispatch_correlation ON dispatch_log(correlation_id);
CREATE INDEX IF NOT EXISTS idx_dispatch_sent_at ON dispatch_log(sent_at);

-- =====================================================
-- OPT_OUTS (Story 2.5 — STOP button)
-- =====================================================
CREATE TABLE IF NOT EXISTS opt_outs (
  user_jid TEXT PRIMARY KEY,
  nicho_id TEXT,
  opted_out_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
