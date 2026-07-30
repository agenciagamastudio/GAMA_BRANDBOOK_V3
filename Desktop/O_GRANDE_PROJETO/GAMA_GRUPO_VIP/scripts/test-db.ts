/**
 * Story 1.2 — Smoke test do Postgres + Drizzle.
 * Rodar com: npx ts-node scripts/test-db.ts
 * Pré-requisito: docker compose up -d postgres (Postgres healthy).
 *
 * O que faz:
 * 1. Conecta no DB (via src/db/client.ts)
 * 2. Insere 1 nicho teste: 'shineray-150-explorer-2013'
 * 3. Insere 1 oferta teste vinculada
 * 4. SELECT pra confirmar leitura
 * 5. Cleanup: DROP das linhas teste (mantém schema para Story 1.7)
 *
 * Exit 0 = OK. Exit 1 = falha (connection/insert/select).
 */

import { eq } from 'drizzle-orm';
import { db, schema } from '../src/db/client';

const NICHO_TESTE = 'shineray-150-explorer-2013';

async function main() {
  console.log('[test-db] Conectando no Postgres...');
  console.log(`  host=${process.env.POSTGRES_HOST ?? 'localhost'} db=${process.env.POSTGRES_DB ?? 'gama_vip'}`);

  // 1. Insert nicho
  console.log('[test-db] Inserindo nicho teste...');
  await db.insert(schema.nichos).values({
    id: NICHO_TESTE,
    titulo: 'Shineray XY 150 Explorer 2013',
    palavrasChave: ['shineray', 'explorer', '150'],
    ativo: true,
  });
  console.log('  ✓ nicho inserido');

  // 2. Insert oferta
  console.log('[test-db] Inserindo oferta teste...');
  const [ofertaInserida] = await db
    .insert(schema.ofertas)
    .values({
      nichoId: NICHO_TESTE,
      origem: 'shopee',
      titulo: 'Pastilha de freio dianteira Shineray 150 Explorer 2013',
      precoCentavos: 4990,
      comissaoPct: 0.08,
      urlOriginal: 'https://shopee.com.br/teste-123?utm_source=foo',
      urlHash: 'a'.repeat(64), // fake 64-char hash
      urlCanonical: 'https://shopee.com.br/teste-123',
      sellerReputacao: 0.95,
    })
    .returning();
  console.log(`  ✓ oferta inserida id=${ofertaInserida.id}`);

  // 3. SELECT
  console.log('[test-db] Validando SELECT...');
  const nichosLidos = await db.select().from(schema.nichos).where(eq(schema.nichos.id, NICHO_TESTE));
  if (nichosLidos.length !== 1) {
    throw new Error(`Esperado 1 nicho, lido ${nichosLidos.length}`);
  }
  const ofertasLidas = await db.select().from(schema.ofertas).where(eq(schema.ofertas.nichoId, NICHO_TESTE));
  if (ofertasLidas.length !== 1) {
    throw new Error(`Esperado 1 oferta, lido ${ofertasLidas.length}`);
  }
  console.log(`  ✓ nichos=${nichosLidos.length} ofertas=${ofertasLidas.length}`);

  // 4. Cleanup
  console.log('[test-db] Cleanup (DROP linhas teste)...');
  await db.delete(schema.ofertas).where(eq(schema.ofertas.nichoId, NICHO_TESTE));
  await db.delete(schema.nichos).where(eq(schema.nichos.id, NICHO_TESTE));
  console.log('  ✓ cleanup OK');

  console.log('[test-db] ✅ TODOS OS TESTES PASSARAM');
  process.exit(0);
}

main().catch((err) => {
  console.error('[test-db] ❌ FALHA:', err);
  process.exit(1);
});
