'use strict';

var csInterface = new CSInterface();

// ---------- elementos ----------
var logEl = document.getElementById('log');
var seqInfoEl = document.getElementById('seqInfo');
var btnRefresh = document.getElementById('btnRefresh');
var btnDiag = document.getElementById('btnDiag');
var btnScaleSelected = document.getElementById('btnScaleSelected');
var btnScaleAll = document.getElementById('btnScaleAll');
var btnApplyScale = document.getElementById('btnApplyScale');
var scaleValueInput = document.getElementById('scaleValue');
var btnSilAnalyze = document.getElementById('btnSilAnalyze');
var btnAnalyzeAll = document.getElementById('btnAnalyzeAll');
var btnSilCut = document.getElementById('btnSilCut');
var btnSilCutAll = document.getElementById('btnSilCutAll');
var silBackupChk = document.getElementById('silBackup');
var silDbInput = document.getElementById('silDb');
var silDurInput = document.getElementById('silDur');
var silPadInput = document.getElementById('silPad');
var silPreviewEl = document.getElementById('silPreview');
var silPreviewBar = document.getElementById('silPreviewBar');
var silPreviewStats = document.getElementById('silPreviewStats');
var progressRow = document.getElementById('progressRow');
var progressFill = document.getElementById('progressFill');
var progressText = document.getElementById('progressText');
var btnCancel = document.getElementById('btnCancel');

// btnSilCut fica FORA desta lista: seu disabled é controlado à parte (libera na Etapa 2)
var allButtons = [btnRefresh, btnDiag, btnScaleSelected, btnScaleAll, btnApplyScale, btnSilAnalyze, btnAnalyzeAll];

// ---------- log (tela + arquivo gama-log.txt pro Claude ler) ----------
function log(message, type) {
  var entry = document.createElement('div');
  entry.className = 'log-entry' + (type ? ' ' + type : '');
  var now = new Date();
  var time = now.toLocaleTimeString('pt-BR', { hour12: false });
  entry.textContent = '[' + time + '] ' + message;
  logEl.appendChild(entry);
  logEl.scrollTop = logEl.scrollHeight;
  try {
    if (nodeRequire) {
      nodeRequire('fs').appendFileSync(
        csInterface.getExtensionPath() + '/gama-log.txt',
        '[' + time + '] ' + message + '\r\n'
      );
    }
  } catch (eL) {}
}

// ---------- ponte ExtendScript ----------
function evalScriptP(script) {
  return new Promise(function (resolve) {
    csInterface.evalScript(script, function (result) {
      resolve(result);
    });
  });
}

var jsxLoadedThisSession = false;

async function ensureJsxLoaded() {
  // Sempre recarrega o host.jsx 1x por abertura do painel —
  // garante que atualizações do arquivo valham sem reiniciar o Premiere
  if (!jsxLoadedThisSession) {
    var extPath = csInterface.getExtensionPath();
    if (extPath) {
      var jsxPath = (extPath + '/jsx/host.jsx').replace(/\\/g, '/');
      await evalScriptP('$.evalFile("' + jsxPath + '")');
    }
    jsxLoadedThisSession = true;
  }

  var t = await evalScriptP('typeof gamaPing');
  if (t !== 'function') {
    log('Falha ao carregar host.jsx no Premiere.', 'error');
    return false;
  }
  return true;
}

// ---------- execução de macros ----------
var busy = false;

function setBusy(state) {
  busy = state;
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].disabled = state;
  }
}

// ---------- lote cancelável com progresso ----------
var cancelRequested = false;
var CHUNK_SIZE = 50; // clipes por bloco — cancelamento responde entre blocos

function showProgress(state) {
  if (state) {
    progressRow.classList.remove('hidden');
    btnCancel.disabled = false;
    btnCancel.textContent = '✖ Cancelar';
    updateProgress(0, 0);
  } else {
    progressRow.classList.add('hidden');
  }
}

function updateProgress(done, total, textOverride) {
  var pctNum = total > 0 ? Math.round((done / total) * 100) : 0;
  progressFill.style.width = pctNum + '%';
  progressText.textContent = textOverride || (done + '/' + total);
}

async function runBatch(label, mode, kind, value) {
  if (busy) return;
  setBusy(true);
  cancelRequested = false;
  showProgress(true);
  log('⏳ ' + label + '…');
  try {
    var loaded = await ensureJsxLoaded();
    if (!loaded) return;

    var start = String(await evalScriptP(
      'gamaBatchStart("' + mode + '","' + kind + '",' + (value || 0) + ')'
    ) || '');
    if (start.indexOf('OK:') !== 0) {
      log('❌ ' + start.replace('ERR:', ''), 'error');
      return;
    }
    var total = parseInt(start.substring(3), 10) || 0;
    updateProgress(0, total);

    var done = 0;
    var ok = 0;
    var skip = 0;
    while (done < total && !cancelRequested) {
      var res = String(await evalScriptP('gamaBatchStep(' + CHUNK_SIZE + ')') || '');
      if (res.indexOf('OK:') !== 0) {
        log('❌ ' + res.replace('ERR:', ''), 'error');
        break;
      }
      var parts = res.substring(3).split('|');
      done = parseInt(parts[0], 10) || done;
      ok = parseInt(parts[2], 10) || 0;
      skip = parseInt(parts[3], 10) || 0;
      updateProgress(done, total);
      // devolve o controle à UI entre blocos (clique de cancelar entra aqui)
      await new Promise(function (r) { setTimeout(r, 0); });
    }
    await evalScriptP('gamaBatchEnd()');

    if (cancelRequested) {
      log('🛑 Cancelado em ' + done + '/' + total + ' (' + ok + ' ajustados, ' + skip + ' pulados). Os já feitos permanecem — Ctrl+Z desfaz.', 'error');
    } else {
      var msg = '✅ ' + ok + ' clipe(s) ajustado(s)';
      if (skip > 0) msg += ' | ' + skip + ' pulado(s) (sem resolução/Motion)';
      log(msg, 'success');
    }
  } catch (e) {
    log('❌ ' + (e && e.message ? e.message : String(e)), 'error');
  } finally {
    showProgress(false);
    setBusy(false);
    refreshInfo();
  }
}

// ---------- remover silêncios: detecção via FFmpeg (Node) ----------
var nodeRequire = null;
try {
  if (typeof require === 'function') {
    nodeRequire = require;
  } else if (window.cep_node && window.cep_node.require) {
    nodeRequire = window.cep_node.require;
  }
} catch (eNode) {}

var FFMPEG_PATHS = ['C:/ffmpeg/bin/ffmpeg.exe', 'ffmpeg'];
var EDGE_GUARD = 0.15; // seg — nunca cortar lasca na borda do clipe
var silenceCache = {}; // "path|db|dur" -> intervalos [[s0,s1],...]
var cutPlan = null;    // plano de cortes: {t, a, b, k} — k: 's' silêncio | 'a' IA

// substitui no plano só os cortes do tipo `kind`, preservando o resto
function mergePlan(kind, newEntries) {
  var kept = [];
  if (cutPlan) {
    for (var i = 0; i < cutPlan.length; i++) {
      if (cutPlan[i].k !== kind) kept.push(cutPlan[i]);
    }
  }
  cutPlan = kept.concat(newEntries);
  cutPlan.sort(function (x, y) { return y.a - x.a; });
  if (!cutPlan.length) cutPlan = null;
}

// Funde intervalos sobrepostos/encostados do plano (por track).
// CRÍTICO: cortar intervalos sobrepostos fim→início corrompe posições —
// depois do 1º corte, as coordenadas do 2º apontam pra conteúdo errado.
function coalescePlan() {
  if (!cutPlan || cutPlan.length < 2) return 0;
  var byTrack = {};
  for (var i = 0; i < cutPlan.length; i++) {
    var t = cutPlan[i].t;
    if (!byTrack[t]) byTrack[t] = [];
    byTrack[t].push(cutPlan[i]);
  }
  var merged = [];
  var before = cutPlan.length;
  for (var k in byTrack) {
    if (!byTrack.hasOwnProperty(k)) continue;
    var list = byTrack[k];
    list.sort(function (x, y) { return x.a - y.a; });
    var cur = { t: list[0].t, a: list[0].a, b: list[0].b, k: list[0].k };
    for (var j = 1; j < list.length; j++) {
      if (list[j].a <= cur.b + 0.08) {
        if (list[j].b > cur.b) cur.b = list[j].b;
        if (list[j].k !== cur.k) cur.k = 's'; // misto conta como silêncio no rótulo
      } else {
        merged.push(cur);
        cur = { t: list[j].t, a: list[j].a, b: list[j].b, k: list[j].k };
      }
    }
    merged.push(cur);
  }
  merged.sort(function (x, y) { return y.a - x.a; });
  cutPlan = merged;
  return before - merged.length;
}

function updatePlanLabels() {
  var has = cutPlan && cutPlan.length > 0;
  btnSilCut.disabled = !has;
  btnSilCutAll.disabled = !has;
  if (!has) {
    btnSilCut.querySelector('.sub').textContent = 'libera depois da análise — confira o resultado antes do 3️⃣';
    btnSilCutAll.querySelector('.sub').textContent = 'libera depois da análise';
    return;
  }
  var s = 0;
  var a = 0;
  var r = 0;
  var total = 0;
  for (var i = 0; i < cutPlan.length; i++) {
    if (cutPlan[i].k === 'a') a++;
    else if (cutPlan[i].k === 'r') r++;
    else s++;
    total += (cutPlan[i].b - cutPlan[i].a);
  }
  var desc = [];
  if (s) desc.push(s + ' silêncio(s)');
  if (r) desc.push(r + ' fala(s) repetida(s)');
  if (a) desc.push(a + ' vício(s) de fala');
  btnSilCut.querySelector('.sub').textContent = cutPlan.length + ' no plano — clique corta SÓ o último (teste)';
  btnSilCutAll.querySelector('.sub').textContent = 'EXCLUI ' + desc.join(' + ') + ' = vídeo ' + fmtDur(total) + ' mais curto';
}

var currentFFmpeg = null;   // processo em execução (pra matar no cancelar)

// Roda ffmpeg em streaming: só áudio (-vn), progresso ao vivo, cancelável
// opts.ss/opts.len: analisa só a janela [ss, ss+len] do arquivo (seek rápido)
function runFFmpegLive(mediaPath, db, dur, onProgress, opts) {
  return new Promise(function (resolve, reject) {
    if (!nodeRequire) {
      reject(new Error('Node desativado — feche o Premiere COMPLETAMENTE e reabra.'));
      return;
    }
    var cp;
    try {
      cp = nodeRequire('child_process');
    } catch (e) {
      reject(new Error('child_process indisponível: ' + e.message));
      return;
    }

    function tryAt(idx) {
      if (idx >= FFMPEG_PATHS.length) {
        reject(new Error('ffmpeg não encontrado (esperado em C:\\ffmpeg\\bin)'));
        return;
      }
      var args = ['-hide_banner', '-nostdin', '-nostats', '-vn', '-sn', '-dn'];
      if (opts && opts.ss > 0) args.push('-ss', String(opts.ss));
      args.push('-i', mediaPath);
      if (opts && opts.len > 0) args.push('-t', String(opts.len));
      args.push('-af', 'silencedetect=noise=' + db + 'dB:d=' + dur, '-progress', 'pipe:1', '-f', 'null', '-');

      var child;
      try {
        child = cp.spawn(FFMPEG_PATHS[idx], args, { windowsHide: true });
      } catch (eS) {
        tryAt(idx + 1);
        return;
      }

      currentFFmpeg = child;
      var stderrBuf = '';
      var duration = (opts && opts.len > 0) ? opts.len : 0;

      child.stdout.on('data', function (chunk) {
        // -progress pipe:1 emite out_time_us= (microssegundos) periodicamente
        var s = String(chunk);
        var mm = s.match(/out_time_us=(\d+)/g) || s.match(/out_time_ms=(\d+)/g);
        if (mm && mm.length && duration > 0 && onProgress) {
          var us = parseInt(mm[mm.length - 1].split('=')[1], 10);
          onProgress(Math.min(1, (us / 1000000) / duration));
        }
      });
      child.stderr.on('data', function (chunk) {
        stderrBuf += String(chunk);
        if (!duration) {
          var dm = stderrBuf.match(/Duration:\s*(\d+):(\d+):(\d+\.?\d*)/);
          if (dm) duration = parseInt(dm[1], 10) * 3600 + parseInt(dm[2], 10) * 60 + parseFloat(dm[3]);
        }
      });
      child.on('error', function (err) {
        currentFFmpeg = null;
        if (err && err.code === 'ENOENT') {
          tryAt(idx + 1);
          return;
        }
        reject(err);
      });
      child.on('close', function () {
        currentFFmpeg = null;
        if (cancelRequested) {
          reject(new Error('cancelado'));
          return;
        }
        if (!stderrBuf) {
          reject(new Error('ffmpeg não retornou saída'));
          return;
        }
        resolve({ text: stderrBuf, duration: duration });
      });
    }
    tryAt(0);
  });
}

// Analisa a janela [w0,w1] do arquivo; retorna intervalos em tempo do ARQUIVO
async function detectSilences(mediaPath, w0, w1, db, dur, onProgress) {
  var key = mediaPath + '|' + w0.toFixed(2) + '|' + w1.toFixed(2) + '|' + db + '|' + dur;
  if (silenceCache.hasOwnProperty(key)) return silenceCache[key];

  var out = await runFFmpegLive(mediaPath, db, dur, onProgress, { ss: w0, len: w1 - w0 });
  var text = out.text;

  var intervals = [];
  var pendingStarts = [];
  var re = /silence_(start|end):\s*([\-\d.]+)/g;
  var m;
  while ((m = re.exec(text)) !== null) {
    if (m[1] === 'start') {
      pendingStarts.push(parseFloat(m[2]));
    } else if (pendingStarts.length) {
      intervals.push([pendingStarts.shift() + w0, parseFloat(m[2]) + w0]);
    }
  }
  // janela termina em silêncio → fecha no fim dela
  if (pendingStarts.length && out.duration > 0) {
    intervals.push([pendingStarts.shift() + w0, out.duration + w0]);
  }

  silenceCache[key] = intervals;
  return intervals;
}

// ---------- waveform (forma da onda pro preview) ----------
var waveformCache = {}; // "path|inP|outP|buckets" -> [pico 0..1, ...]
var WAVEFORM_TOTAL_BUCKETS = 480; // orçamento total de barrinhas na largura do preview inteiro
var WAVEFORM_SR = 3000; // taxa baixa de propósito: só a FORMA importa, não fidelidade de áudio

// Quantos buckets (barrinhas) este clipe recebe, proporcional à fatia dele no total —
// clipe maior tem mais barrinhas, clipe curto tem menos, soma sempre ~WAVEFORM_TOTAL_BUCKETS.
function bucketsForClipCount(clipDur, totalDur) {
  if (totalDur <= 0) return 4;
  var n = Math.round(WAVEFORM_TOTAL_BUCKETS * (clipDur / totalDur));
  return Math.max(4, Math.min(WAVEFORM_TOTAL_BUCKETS, n));
}

// Decodifica PCM cru (mono, taxa baixa) do trecho [inP,outP] do arquivo e reduz a `buckets`
// picos normalizados 0..1 — é a "forma da onda" que o usuário vê. Cacheado: só roda 1x por
// clipe/seleção; mudar Limiar/Mín/Margem depois disso é grátis (só recolore, não re-decodifica).
function extractWaveformPeaks(mediaPath, inP, outP, buckets) {
  return new Promise(function (resolve) {
    if (!nodeRequire) { resolve(null); return; }
    var key = mediaPath + '|' + inP.toFixed(2) + '|' + outP.toFixed(2) + '|' + buckets;
    if (waveformCache.hasOwnProperty(key)) { resolve(waveformCache[key]); return; }

    var cp;
    try { cp = nodeRequire('child_process'); } catch (eReq) { resolve(null); return; }

    function tryAt(idx) {
      if (idx >= FFMPEG_PATHS.length) { resolve(null); return; }
      var args = [
        '-hide_banner', '-nostdin', '-loglevel', 'error',
        '-ss', String(Math.max(0, inP)), '-i', mediaPath, '-t', String(Math.max(0.05, outP - inP)),
        '-vn', '-sn', '-dn', '-ac', '1', '-ar', String(WAVEFORM_SR),
        '-f', 's16le', '-acodec', 'pcm_s16le', 'pipe:1'
      ];
      var child;
      try {
        child = cp.spawn(FFMPEG_PATHS[idx], args, { windowsHide: true });
      } catch (eSpawn) {
        tryAt(idx + 1);
        return;
      }
      var chunks = [];
      child.stdout.on('data', function (c) { chunks.push(c); });
      child.on('error', function (err) {
        if (err && err.code === 'ENOENT') { tryAt(idx + 1); return; }
        try { console.error('[GAMA waveform] spawn falhou:', mediaPath, err); } catch (eC) {}
        resolve(null);
      });
      child.on('close', function () {
        try {
          var Buffer = nodeRequire('buffer').Buffer; // não existe Buffer global neste contexto CEP
          var buf = Buffer.concat(chunks);
          var nSamples = Math.floor(buf.length / 2);
          if (nSamples < 2) { resolve(null); return; }
          var chunkLen = Math.max(1, Math.floor(nSamples / buckets));
          var peaks = [];
          var maxPeak = 1;
          for (var b = 0; b < buckets; b++) {
            var start = b * chunkLen;
            var end = (b === buckets - 1) ? nSamples : Math.min(nSamples, start + chunkLen);
            var peak = 0;
            for (var s = start; s < end; s++) {
              var v = Math.abs(buf.readInt16LE(s * 2));
              if (v > peak) peak = v;
            }
            peaks.push(peak);
            if (peak > maxPeak) maxPeak = peak;
          }
          for (var n2 = 0; n2 < peaks.length; n2++) peaks[n2] = peaks[n2] / maxPeak;
          waveformCache[key] = peaks;
          resolve(peaks);
        } catch (eBuf) {
          try { console.error('[GAMA waveform] decode falhou:', mediaPath, eBuf); } catch (eC2) {}
          resolve(null);
        }
      });
    }
    tryAt(0);
  });
}

// Junta os trechos usados [inP,outP] de cada arquivo em janelas de análise
function buildWindows(clips) {
  var byFile = {};
  for (var i = 0; i < clips.length; i++) {
    var cl = clips[i];
    if (!byFile[cl.path]) byFile[cl.path] = [];
    byFile[cl.path].push([Math.max(0, cl.inP - 1), cl.outP + 1]);
  }
  var jobs = [];
  for (var p in byFile) {
    if (!byFile.hasOwnProperty(p)) continue;
    var rs = byFile[p].sort(function (x, y) { return x[0] - y[0]; });
    var merged = [rs[0].slice()];
    for (var r = 1; r < rs.length; r++) {
      var last = merged[merged.length - 1];
      if (rs[r][0] <= last[1] + 2) {
        if (rs[r][1] > last[1]) last[1] = rs[r][1];
      } else {
        merged.push(rs[r].slice());
      }
    }
    for (var w = 0; w < merged.length; w++) {
      jobs.push({ path: p, w0: merged[w][0], w1: merged[w][1] });
    }
  }
  return jobs;
}

function fmtDur(totalSecs) {
  var mm = Math.floor(totalSecs / 60);
  var ss = Math.round(totalSecs % 60);
  return mm + 'm' + (ss < 10 ? '0' : '') + ss + 's';
}

// Lê os clipes selecionados via host.jsx e devolve {clips, skippedSpeed, skippedPath}.
// Usada tanto pela análise manual (1️⃣) quanto pelo preview ao vivo — mesma leitura, sem duplicar parsing.
async function collectSelectedClips(verbose) {
  var res = String(await evalScriptP("gamaSilenceCollect('selected')") || '');
  if (res.indexOf('OK:') !== 0) {
    if (verbose) log('❌ ' + res.replace('ERR:', ''), 'error');
    return null;
  }

  var lines = res.substring(3).split('\n');
  var clips = [];
  var skippedSpeed = 0;
  var skippedPath = 0;
  for (var i = 1; i < lines.length; i++) {
    var p = lines[i].split('|');
    if (p[0] !== 'CLIP' || p.length < 9) continue;
    var spRaw = parseFloat(p[7]);
    // getSpeed pode vir como multiplicador (1.0) ou percentual (100)
    var speedPct = spRaw > 10 ? spRaw : spRaw * 100;
    var clip = {
      t: parseInt(p[1], 10),
      c: parseInt(p[2], 10),
      start: parseFloat(p[3]),
      end: parseFloat(p[4]),
      inP: parseFloat(p[5]),
      outP: parseFloat(p[6]),
      path: p.slice(8).join('|')
    };
    if (!clip.path || clip.path === 'undefined' || clip.path === 'null') { skippedPath++; continue; }
    if (Math.abs(speedPct - 100) > 0.5) { skippedSpeed++; continue; }
    clips.push(clip);
  }
  return { clips: clips, skippedSpeed: skippedSpeed, skippedPath: skippedPath };
}

// ---------- preview ao vivo (barra fica/corta) ----------
// Monta o mesmo recorte que o motor de corte real vai usar (mesmas fórmulas de
// pad/EDGE_GUARD da linha 494 abaixo), só que sem tocar em cutPlan/botões —
// é somente leitura, pra não surpreender o usuário enquanto ele digita.
function renderSilPreview(clips, silByFile, pad) {
  var segs = [];
  var clipMeta = []; // {clip, cuts:[[s0,s1],...]} — pra colorir a waveform depois, por clipe
  var totalDur = 0;
  var totalCut = 0;
  var nCuts = 0;

  for (var i = 0; i < clips.length; i++) {
    var cl = clips[i];
    var clipDur = cl.outP - cl.inP;
    if (clipDur <= 0) continue;

    var cuts = [];
    var ivs = (silByFile[cl.path] || []).slice().sort(function (x, y) { return x[0] - y[0]; });
    var cursor = cl.inP;
    for (var v = 0; v < ivs.length; v++) {
      var s0 = Math.max(ivs[v][0] + pad, cl.inP + EDGE_GUARD);
      var s1 = Math.min(ivs[v][1] - pad, cl.outP - EDGE_GUARD);
      if (s1 - s0 < 0.2 || s0 < cursor) continue;
      if (s0 > cursor) segs.push({ type: 'keep', dur: s0 - cursor });
      segs.push({ type: 'cut', dur: s1 - s0 });
      cuts.push([s0, s1]);
      totalCut += (s1 - s0);
      nCuts++;
      cursor = s1;
    }
    if (cl.outP - cursor > 0) segs.push({ type: 'keep', dur: cl.outP - cursor });
    totalDur += clipDur;
    clipMeta.push({ clip: cl, cuts: cuts });
  }

  if (!totalDur) {
    showSilPreviewMsg('Sem áudio pra analisar nos clipes selecionados.');
    return;
  }

  // funde segmentos vizinhos do mesmo tipo (ex.: 2 clipes seguidos que ficam inteiros)
  var merged = [];
  for (var m = 0; m < segs.length; m++) {
    var last = merged[merged.length - 1];
    if (last && last.type === segs[m].type) last.dur += segs[m].dur;
    else merged.push({ type: segs[m].type, dur: segs[m].dur });
  }

  silPreviewEl.classList.remove('hidden');
  drawFlatBar(silPreviewBar, merged, totalDur); // instantâneo — só cor, sem forma ainda
  updateSilWaveform(clipMeta, totalDur); // assíncrono — decodifica o áudio e desenha a onda real por cima

  var pctCut = totalDur > 0 ? Math.round((totalCut / totalDur) * 100) : 0;
  silPreviewStats.textContent = clips.length + ' clipe(s) · ' + nCuts + ' silêncio(s) detectado(s) — fica ' +
    fmtDur(totalDur - totalCut) + ' · corta ' + fmtDur(totalCut) + ' (' + pctCut + '%)';
}

// Ajusta o canvas pra resolução real da tela (DPR) e limpa.
function prepCanvas(canvas, cssHeight) {
  var cssW = canvas.clientWidth || canvas.parentNode.clientWidth || 380;
  var dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.round(cssW * dpr));
  canvas.height = Math.max(1, Math.round(cssHeight * dpr));
  var ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssHeight);
  return { ctx: ctx, cssW: cssW, cssH: cssHeight };
}

// Desenho imediato (sem forma de onda ainda) — blocos sólidos, só pra dar feedback na hora.
function drawFlatBar(canvas, merged, totalDur) {
  var g = prepCanvas(canvas, 40);
  var x = 0;
  for (var i = 0; i < merged.length; i++) {
    var w = (merged[i].dur / totalDur) * g.cssW;
    g.ctx.fillStyle = merged[i].type === 'cut' ? '#a02020' : '#2f8f4a';
    g.ctx.fillRect(x, 0, Math.ceil(w) + 0.5, g.cssH);
    x += w;
  }
}

// Waveform real, centralizada (barrinhas pra cima/baixo a partir do meio) — verde fica, vermelho corta.
function drawWaveform(canvas, buckets) {
  var g = prepCanvas(canvas, 40);
  var n = buckets.length;
  if (!n) return;
  var barW = g.cssW / n;
  var mid = g.cssH / 2;
  for (var i = 0; i < n; i++) {
    var b = buckets[i];
    var h = Math.max(2, b.peak * g.cssH);
    var x = i * barW;
    g.ctx.fillStyle = b.cut ? '#a02020' : '#2f8f4a';
    g.ctx.fillRect(x, mid - h / 2, Math.max(1, barW - 0.5), h);
  }
}

var waveformToken = 0; // invalida passadas antigas quando o usuário muda os campos de novo no meio do caminho

async function updateSilWaveform(clipMeta, totalDur) {
  var myToken = ++waveformToken;
  if (!nodeRequire || !totalDur || !clipMeta.length) return;

  var allBuckets = [];
  for (var i = 0; i < clipMeta.length; i++) {
    if (myToken !== waveformToken) return; // ficou obsoleto — outra passada já começou
    var cl = clipMeta[i].clip;
    var cuts = clipMeta[i].cuts;
    var clipDur = cl.outP - cl.inP;
    if (clipDur <= 0) continue;

    var n = bucketsForClipCount(clipDur, totalDur);
    var peaks = null;
    try {
      peaks = await extractWaveformPeaks(cl.path, cl.inP, cl.outP, n);
    } catch (eEx) {
      try { console.error('[GAMA waveform] extração falhou:', cl.path, eEx); } catch (eC) {}
    }
    if (myToken !== waveformToken) return;
    if (!peaks) {
      peaks = [];
      for (var z = 0; z < n; z++) peaks.push(0.35); // sem decodificação: barra neutra baixa, não trava o preview
    }

    var bucketDur = clipDur / n;
    for (var b = 0; b < n; b++) {
      var tMid = cl.inP + (b + 0.5) * bucketDur;
      var isCut = false;
      for (var c = 0; c < cuts.length; c++) {
        if (tMid >= cuts[c][0] && tMid <= cuts[c][1]) { isCut = true; break; }
      }
      allBuckets.push({ peak: peaks[b] || 0, cut: isCut });
    }
  }

  if (myToken !== waveformToken) return;
  drawWaveform(silPreviewBar, allBuckets);
}

function showSilPreviewMsg(msg) {
  waveformToken++; // cancela qualquer decodificação de waveform ainda em andamento
  prepCanvas(silPreviewBar, 40); // só limpa
  silPreviewStats.textContent = msg;
  silPreviewEl.classList.remove('hidden');
}

function hideSilPreview() {
  waveformToken++;
  silPreviewEl.classList.add('hidden');
}

// Passada leve: só detecta e desenha a barra, não mexe em cutPlan/botões 2️⃣3️⃣.
// Reaproveita o cache de detectSilences — só reprocessa FFmpeg quando Limiar/Mín mudam;
// mexer só na Margem é instantâneo (recorte client-side, sem tocar no áudio de novo).
async function previewSilences() {
  if (!nodeRequire) { hideSilPreview(); return; }
  var db = parseFloat(silDbInput.value);
  var dur = parseFloat(silDurInput.value);
  var pad = parseFloat(silPadInput.value);
  if (isNaN(db) || db >= 0 || isNaN(dur) || dur < 0.1) {
    showSilPreviewMsg('Ajuste Limiar (negativo) e Mín. (≥ 0.1s) pra ver o preview.');
    return;
  }
  if (isNaN(pad) || pad < 0) pad = 0;

  try {
    var loaded = await ensureJsxLoaded();
    if (!loaded) { showSilPreviewMsg('⚠️ host.jsx não carregou — veja o log acima.'); return; }

    var collected = await collectSelectedClips(false);
    if (!collected || !collected.clips.length) {
      showSilPreviewMsg('Selecione clipes com áudio na timeline pra ver o preview.');
      return;
    }

    var jobs = buildWindows(collected.clips);
    var silByFile = {};
    var jobErrors = 0;
    for (var j = 0; j < jobs.length; j++) {
      var job = jobs[j];
      try {
        var ivs = await detectSilences(job.path, job.w0, job.w1, db, dur, null);
        silByFile[job.path] = (silByFile[job.path] || []).concat(ivs);
      } catch (eJob) {
        // falha pontual num arquivo não deve derrubar o preview inteiro — mas fica visível no console
        jobErrors++;
        try { console.error('[GAMA preview] falha em', job.path, eJob); } catch (eC) {}
      }
    }
    if (jobErrors && jobErrors === jobs.length) {
      showSilPreviewMsg('⚠️ Preview falhou em todos os arquivos — veja o console (F12 no painel) ou tente 1️⃣ Analisar.');
      return;
    }
    renderSilPreview(collected.clips, silByFile, pad);
  } catch (eTop) {
    try { console.error('[GAMA preview] erro geral:', eTop); } catch (eC2) {}
    showSilPreviewMsg('⚠️ Preview falhou: ' + (eTop && eTop.message ? eTop.message : String(eTop)));
  }
}

var previewDebounceTimer = null;
var previewBusy = false;
var previewQueued = false;

function schedulePreview() {
  if (previewDebounceTimer) clearTimeout(previewDebounceTimer);
  previewDebounceTimer = setTimeout(runPreviewCoalesced, 700);
}

// Nunca deixa 2 passadas de preview rodarem juntas (evita 2 ffmpeg disputando
// a mesma variável currentFFmpeg do fluxo manual) — se chegou pedido novo
// enquanto uma passada ainda rodava, roda mais UMA vez assim que ela terminar.
function runPreviewCoalesced() {
  if (busy) return; // análise/corte manual em andamento — não interferir
  if (previewBusy) { previewQueued = true; return; }
  previewBusy = true;
  previewSilences().catch(function (e) {
    try { console.error('[GAMA preview] runPreviewCoalesced:', e); } catch (eC) {}
  }).finally(function () {
    previewBusy = false;
    if (previewQueued) { previewQueued = false; runPreviewCoalesced(); }
  });
}

async function analyzeSilences() {
  if (busy) return;
  if (!nodeRequire) {
    log('❌ Node desativado no painel. Feche o Premiere COMPLETAMENTE e reabra (o manifest novo precisa disso).', 'error');
    return;
  }
  var db = parseFloat(silDbInput.value);
  var dur = parseFloat(silDurInput.value);
  var pad = parseFloat(silPadInput.value);
  if (isNaN(db) || db >= 0) { log('❌ Limiar deve ser negativo (ex.: -40).', 'error'); return; }
  if (isNaN(dur) || dur < 0.1) { log('❌ Duração mínima: pelo menos 0.1s.', 'error'); return; }
  if (isNaN(pad) || pad < 0) pad = 0;

  setBusy(true);
  cancelRequested = false;
  showProgress(true);
  log('⏳ Analisando silêncios (limiar ' + db + 'dB, mín ' + dur + 's, margem ' + pad + 's)…');
  try {
    var loaded = await ensureJsxLoaded();
    if (!loaded) return;

    var collected = await collectSelectedClips(true);
    if (!collected) return;
    var clips = collected.clips;
    var skippedSpeed = collected.skippedSpeed;
    var skippedPath = collected.skippedPath;
    if (!clips.length) {
      log('❌ Nenhum clipe analisável entre os selecionados (precisa ter arquivo de mídia e velocidade 100%).', 'error');
      return;
    }

    var jobs = buildWindows(clips);
    var totalWin = 0;
    for (var j0 = 0; j0 < jobs.length; j0++) totalWin += (jobs[j0].w1 - jobs[j0].w0);
    log('🎧 ' + clips.length + ' clipe(s) → ' + jobs.length + ' trecho(s) de áudio (' + fmtDur(totalWin) + ' no total — só o que está na timeline)…');
    updateProgress(0, jobs.length);

    var silByFile = {};
    for (var f = 0; f < jobs.length; f++) {
      if (cancelRequested) { log('🛑 Análise cancelada.', 'error'); return; }
      var job = jobs[f];
      var fname = job.path.split(/[\\\/]/).pop();
      var fLabel = 'trecho ' + (f + 1) + '/' + jobs.length;
      log('🎧 "' + fname + '" [' + fmtDur(job.w0) + ' → ' + fmtDur(job.w1) + ']…');
      updateProgress(f, jobs.length, fLabel + ' · 0%');
      try {
        var ivsWin = await detectSilences(job.path, job.w0, job.w1, db, dur, (function (fIdx, lbl) {
          return function (frac) {
            updateProgress(fIdx + frac, jobs.length, lbl + ' · ' + Math.round(frac * 100) + '%');
          };
        })(f, fLabel));
        if (!silByFile[job.path]) silByFile[job.path] = [];
        silByFile[job.path] = silByFile[job.path].concat(ivsWin);
      } catch (eF) {
        if (eF && eF.message === 'cancelado') { log('🛑 Análise cancelada.', 'error'); return; }
        log('⚠️ Falha em "' + fname + '": ' + eF.message, 'error');
        if (!silByFile[job.path]) silByFile[job.path] = [];
      }
      updateProgress(f + 1, jobs.length, fLabel + ' · 100%');
      await new Promise(function (r) { setTimeout(r, 0); });
    }

    // monta o plano de cortes em tempo de timeline
    var plan = [];
    var totalCut = 0;
    var affected = {};
    for (var ci = 0; ci < clips.length; ci++) {
      var cl = clips[ci];
      var ivs = silByFile[cl.path] || [];
      for (var vi = 0; vi < ivs.length; vi++) {
        var s0 = Math.max(ivs[vi][0] + pad, cl.inP + EDGE_GUARD);
        var s1 = Math.min(ivs[vi][1] - pad, cl.outP - EDGE_GUARD);
        if (s1 - s0 < 0.2) continue; // sobra pequena demais pra valer o corte
        var a = cl.start + (s0 - cl.inP);
        var b = cl.start + (s1 - cl.inP);
        plan.push({ t: cl.t, a: a, b: b, k: 's' });
        totalCut += (b - a);
        affected[cl.t + ':' + cl.c] = true;
      }
    }
    mergePlan('s', plan); // atualiza os silêncios no plano, preserva cortes da IA
    renderSilPreview(clips, silByFile, pad); // mesmos dados já calculados, sem custo extra

    if (!plan.length) {
      log('✅ Nenhum silêncio encontrado com esses parâmetros. Tente limiar maior (ex.: -35) ou duração menor.', 'success');
      updatePlanLabels();
      return;
    }
    var nAffected = 0;
    for (var k2 in affected) { if (affected.hasOwnProperty(k2)) nAffected++; }
    log('✅ Análise: ' + plan.length + ' silêncio(s) = ' + fmtDur(totalCut) + ' em ' + nAffected + ' clipe(s).', 'success');
    if (skippedSpeed) log('⚠️ ' + skippedSpeed + ' clipe(s) pulados: velocidade alterada.');
    if (skippedPath) log('⚠️ ' + skippedPath + ' clipe(s) pulados: sem arquivo de mídia (grafismos/nested).');
    updatePlanLabels();
    log('👉 3️⃣ EXCLUI os silêncios e emenda o resto (com backup automático). 2️⃣ testa só 1 antes.');
  } catch (e) {
    log('❌ ' + (e && e.message ? e.message : String(e)), 'error');
  } finally {
    showProgress(false);
    setBusy(false);
  }
}

async function runMacro(label, script) {
  if (busy) return;
  setBusy(true);
  log('⏳ ' + label + '…');
  try {
    var loaded = await ensureJsxLoaded();
    if (!loaded) return;

    var res = await evalScriptP(script);
    res = String(res || '');

    if (res.indexOf('OK:') === 0) {
      log('✅ ' + res.substring(3), 'success');
    } else if (res.indexOf('ERR:') === 0) {
      log('❌ ' + res.substring(4), 'error');
    } else if (res === 'EvalScript error.') {
      log('❌ Erro no ExtendScript (EvalScript error). Veja o README para debug.', 'error');
    } else {
      log(res || '(sem resposta)', '');
    }
  } catch (e) {
    log('❌ ' + (e && e.message ? e.message : String(e)), 'error');
  } finally {
    setBusy(false);
    refreshInfo();
  }
}

// ---------- info da sequência ----------
async function refreshInfo() {
  var loaded = await ensureJsxLoaded();
  if (!loaded) {
    seqInfoEl.textContent = 'host.jsx não carregado';
    return;
  }
  var res = String(await evalScriptP('gamaSequenceInfo()') || '');
  if (res.indexOf('OK:') === 0) {
    seqInfoEl.textContent = '🎞 ' + res.substring(3);
  } else if (res.indexOf('ERR:') === 0) {
    seqInfoEl.textContent = '⚠️ ' + res.substring(4);
  } else {
    seqInfoEl.textContent = res || '—';
  }
}

// ---------- eventos ----------
btnRefresh.addEventListener('click', function () {
  if (!busy) refreshInfo();
});

btnDiag.addEventListener('click', async function () {
  if (busy) return;
  setBusy(true);
  log('🔍 Gerando diagnóstico (selecione 1 clipe antes)…');
  try {
    var loaded = await ensureJsxLoaded();
    if (!loaded) return;
    var extPath = csInterface.getExtensionPath().replace(/\\/g, '/');
    var res = String(await evalScriptP('gamaDiag("' + extPath + '/diag.txt")') || '');
    if (res.indexOf('OK:') === 0) {
      log('✅ ' + res.substring(3), 'success');
    } else {
      log('❌ ' + res.replace('ERR:', ''), 'error');
    }
  } finally {
    setBusy(false);
  }
});

btnCancel.addEventListener('click', function () {
  cancelRequested = true;
  btnCancel.disabled = true;
  btnCancel.textContent = 'Cancelando…';
  // mata o ffmpeg em execução imediatamente (análise de silêncios)
  if (currentFFmpeg) {
    try {
      currentFFmpeg.kill('SIGKILL');
    } catch (e) {}
  }
});

btnScaleSelected.addEventListener('click', function () {
  runBatch('Ajustar ao quadro (clipes selecionados)', 'selected', 'fit');
});

// Botão "TODOS" pede confirmação com segundo clique (evita acidente)
var confirmTimer = null;
var scaleAllOriginalHtml = btnScaleAll.innerHTML;

function resetAllButton() {
  btnScaleAll.classList.remove('confirming');
  btnScaleAll.innerHTML = scaleAllOriginalHtml;
  if (confirmTimer) {
    clearTimeout(confirmTimer);
    confirmTimer = null;
  }
}

btnScaleAll.addEventListener('click', function () {
  if (busy) return;
  if (!btnScaleAll.classList.contains('confirming')) {
    btnScaleAll.classList.add('confirming');
    btnScaleAll.innerHTML = '⚠️ Aplicar em TODOS os clipes?<span class="sub">clique de novo para confirmar</span>';
    confirmTimer = setTimeout(resetAllButton, 4000);
    return;
  }
  resetAllButton();
  runBatch('Ajustar ao quadro (TODOS os clipes)', 'all', 'fit');
});

btnApplyScale.addEventListener('click', function () {
  var v = parseFloat(scaleValueInput.value);
  if (isNaN(v) || v <= 0 || v > 10000) {
    log('❌ Valor de escala inválido (use 1 a 10000).', 'error');
    return;
  }
  runBatch('Escala ' + v + '% (selecionados)', 'selected', 'scale', v);
});

btnSilAnalyze.addEventListener('click', function () {
  analyzeSilences();
});

silDbInput.addEventListener('input', schedulePreview);
silDurInput.addEventListener('input', schedulePreview);
silPadInput.addEventListener('input', schedulePreview);

// ⚡ análise combinada: silêncios + falas repetidas, um clique
btnAnalyzeAll.addEventListener('click', async function () {
  if (busy) return;
  log('⚡ Análise completa: 1/2 silêncios…');
  await analyzeSilences();
  if (cancelRequested) return;
  log('⚡ Análise completa: 2/2 falas repetidas…');
  await roteiroAnalyze();
  if (cancelRequested) return;
  if (cutPlan && cutPlan.length) {
    log('⚡ Pronto! Plano combinado com ' + cutPlan.length + ' corte(s) — confere os marcadores e manda o 3️⃣.', 'success');
  }
});

// ---------- vícios de fala (IA via Groq) ----------
var btnAiAnalyze = document.getElementById('btnAiAnalyze');
var btnAiReport = document.getElementById('btnAiReport');
var btnAiClearMarks = document.getElementById('btnAiClearMarks');
var lastAiReportPath = null;
var aiKeyRow = document.getElementById('aiKeyRow');
var aiKeyInput = document.getElementById('aiKey');
var btnAiKeySave = document.getElementById('btnAiKeySave');
var aiFillersChk = document.getElementById('aiFillers');
var aiRepeatsChk = document.getElementById('aiRepeats');
var aiRestartsChk = document.getElementById('aiRestarts');
allButtons.push(btnAiAnalyze);
allButtons.push(btnAiClearMarks);

var GROQ_ENV_PATHS = [
  'C:/Users/Usuario/Desktop/O_GRANDE_PROJETO/GAMA_AUDIOTRANSCRIBER/.env',
  'C:/Users/Usuario/Desktop/O_GRANDE_PROJETO/GAMA_VOZ/.env'
];

function getGroqKey() {
  var k = null;
  try {
    k = window.localStorage.getItem('gamaGroqKey');
  } catch (e) {}
  if (k && k.indexOf('gsk_') === 0) return k;
  if (!nodeRequire) return null;
  try {
    var fs = nodeRequire('fs');
    for (var i = 0; i < GROQ_ENV_PATHS.length; i++) {
      try {
        var txt = fs.readFileSync(GROQ_ENV_PATHS[i], 'utf8');
        var m = txt.match(/^\s*GROQ_API_KEY\s*=\s*(gsk_[A-Za-z0-9_\-]{20,})\s*$/m);
        if (m && m[1].toLowerCase().indexOf('demo') === -1) {
          try { window.localStorage.setItem('gamaGroqKey', m[1]); } catch (e2) {}
          return m[1];
        }
      } catch (eR) {}
    }
  } catch (eF) {}
  return null;
}

btnAiKeySave.addEventListener('click', function () {
  var v = (aiKeyInput.value || '').trim();
  if (v.indexOf('gsk_') !== 0) {
    log('❌ Chave inválida — começa com gsk_ (pegue grátis em console.groq.com/keys).', 'error');
    return;
  }
  try { window.localStorage.setItem('gamaGroqKey', v); } catch (e) {}
  aiKeyRow.classList.add('hidden');
  log('🔑 Chave Groq salva ✔', 'success');
});

// Groq aceita ~25MB por chamada → transcreve em pedaços de 10min (FLAC 16k mono ≈ 1MB/min)
var GROQ_CHUNK_SECS = 600;

async function transcribeWindowChunked(key, path, w0, w1, tmpDir, tag, onStage) {
  var fs = nodeRequire('fs');
  var allWords = [];
  var textParts = [];
  var total = Math.max(1, Math.ceil((w1 - w0) / GROQ_CHUNK_SECS));
  for (var i = 0; i < total; i++) {
    if (cancelRequested) throw new Error('cancelado');
    var s0 = w0 + i * GROQ_CHUNK_SECS;
    var s1 = Math.min(w1, s0 + GROQ_CHUNK_SECS);
    if (onStage) onStage(i + 1, total);
    var flac = tmpDir + '\\' + tag + '_' + i + '.flac';
    await extractAudioWindow(path, s0, s1 - s0, flac);
    var tr = await groqTranscribe(key, flac);
    try { fs.unlinkSync(flac); } catch (eU) {}
    // devolve tempos relativos a w0 (como os chamadores esperam)
    for (var w = 0; w < tr.words.length; w++) {
      tr.words[w].start += (s0 - w0);
      tr.words[w].end += (s0 - w0);
    }
    allWords = allWords.concat(tr.words);
    textParts.push(tr.text);
  }
  return { words: allWords, text: textParts.join(' ') };
}

// extrai a janela de áudio como FLAC 16k mono (pequeno e aceito pela Groq)
function extractAudioWindow(mediaPath, w0, len, outFile) {
  return new Promise(function (resolve, reject) {
    var cp = nodeRequire('child_process');
    var child = cp.spawn(FFMPEG_PATHS[0], [
      '-hide_banner', '-nostdin', '-y',
      '-ss', String(w0), '-i', mediaPath, '-t', String(len),
      '-vn', '-sn', '-dn', '-ac', '1', '-ar', '16000', '-c:a', 'flac',
      outFile
    ], { windowsHide: true });
    currentFFmpeg = child;
    child.on('error', function (e) { currentFFmpeg = null; reject(e); });
    child.on('close', function (code) {
      currentFFmpeg = null;
      if (cancelRequested) { reject(new Error('cancelado')); return; }
      if (code !== 0) { reject(new Error('ffmpeg saiu com código ' + code)); return; }
      resolve(outFile);
    });
  });
}

// POST HTTPS via Node (sem CORS — fetch do CEP pode ser bloqueado)
function nodeHttpsPost(path, headers, bodyBuf) {
  return new Promise(function (resolve, reject) {
    var https = nodeRequire('https');
    var req = https.request(
      { hostname: 'api.groq.com', path: path, method: 'POST', headers: headers, timeout: 120000 },
      function (res) {
        var chunks = [];
        res.on('data', function (c) { chunks.push(c); });
        res.on('end', function () {
          var Buffer = nodeRequire('buffer').Buffer;
          resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8') });
        });
      }
    );
    req.on('timeout', function () { req.destroy(new Error('timeout de 120s')); });
    req.on('error', reject);
    req.write(bodyBuf);
    req.end();
  });
}

// Whisper via Groq com timestamp por palavra (multipart manual via Node)
async function groqTranscribe(key, filePath) {
  var fs = nodeRequire('fs');
  var Buffer = nodeRequire('buffer').Buffer;
  var fileBuf = fs.readFileSync(filePath);

  var boundary = '----gamaB' + Math.floor(Math.random() * 1e9);
  var fields = [
    ['model', 'whisper-large-v3'],
    ['language', 'pt'],
    ['response_format', 'verbose_json'],
    ['timestamp_granularities[]', 'word'],
    ['prompt', 'Transcrição literal com hesitações: éé, ãã, hum, ahn, tipo, né.']
  ];
  var parts = [];
  for (var i = 0; i < fields.length; i++) {
    parts.push(Buffer.from(
      '--' + boundary + '\r\nContent-Disposition: form-data; name="' + fields[i][0] + '"\r\n\r\n' + fields[i][1] + '\r\n'
    ));
  }
  parts.push(Buffer.from(
    '--' + boundary + '\r\nContent-Disposition: form-data; name="file"; filename="audio.flac"\r\nContent-Type: audio/flac\r\n\r\n'
  ));
  parts.push(fileBuf);
  parts.push(Buffer.from('\r\n--' + boundary + '--\r\n'));
  var body = Buffer.concat(parts);

  var resp = await nodeHttpsPost('/openai/v1/audio/transcriptions', {
    Authorization: 'Bearer ' + key,
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': body.length
  }, body);

  if (resp.status !== 200) {
    throw new Error('Groq Whisper HTTP ' + resp.status + ': ' + resp.body.substring(0, 200));
  }
  var data = JSON.parse(resp.body);
  return { words: data.words || [], text: String(data.text || '') };
}

function fmtTime(secs) {
  if (secs < 0) secs = 0;
  var m = Math.floor(secs / 60);
  var s = secs - m * 60;
  var sStr = s.toFixed(1);
  if (s < 10) sStr = '0' + sStr;
  return m + ':' + sStr;
}

function normWord(w) {
  return String(w || '').toLowerCase().replace(/[.,!?…;:"'()\[\]]+/g, '').replace(/\s+/g, '');
}

// NUNCA marcar "e" (conjunção) nem "é" (verbo ser) sozinhos — só formas
// alongadas/inconfundíveis de muleta: "ééé", "eh", "ãã", "hum", "ahn"…
var FILLER_RE = /^(e{2,}h*|eh+|é{2,}h*|éh+|ã+h?n?|hum+|uh+m*|ah+n?|mm+h*|hã+)$/;

// passa determinística: muletas + palavras duplicadas
function detectDisfluencies(words, wantFillers, wantRepeats) {
  var ranges = [];
  for (var i = 0; i < words.length; i++) {
    var nw = normWord(words[i].word);
    if (wantFillers && FILLER_RE.test(nw) && (words[i].end - words[i].start) < 2.5) {
      ranges.push([words[i].start, words[i].end, 'muleta "' + nw + '"']);
      continue;
    }
    if (wantRepeats && i + 1 < words.length && nw.length > 1 && nw === normWord(words[i + 1].word)) {
      ranges.push([words[i].start, words[i + 1].start, 'repetição "' + nw + '"']);
    }
  }
  return ranges;
}

// LLM marca frases retomadas / falsos começos
async function groqLLMRestarts(key, words) {
  var lines = [];
  for (var i = 0; i < words.length; i++) {
    lines.push(i + ':' + normWord(words[i].word));
  }
  var body = {
    model: 'llama-3.3-70b-versatile',
    temperature: 0,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: 'Você edita vídeos de fala em português. Recebe palavras numeradas de uma transcrição. Identifique APENAS falsos começos e frases abandonadas/retomadas (a pessoa recomeça a frase de outro jeito). Seja conservador: na dúvida, NÃO corte. Responda JSON: {"cuts":[{"from":N,"to":N,"why":"..."}]} — from/to inclusivos, máx 15 palavras por corte.'
      },
      { role: 'user', content: lines.join(' ') }
    ]
  };
  var Buffer = nodeRequire('buffer').Buffer;
  var payload = Buffer.from(JSON.stringify(body), 'utf8');
  var resp = await nodeHttpsPost('/openai/v1/chat/completions', {
    Authorization: 'Bearer ' + key,
    'Content-Type': 'application/json',
    'Content-Length': payload.length
  }, payload);
  if (resp.status !== 200) {
    throw new Error('Groq LLM HTTP ' + resp.status + ': ' + resp.body.substring(0, 200));
  }
  var data = JSON.parse(resp.body);
  var ranges = [];
  try {
    var parsed = JSON.parse(data.choices[0].message.content);
    var cuts = parsed.cuts || [];
    for (var i = 0; i < cuts.length; i++) {
      var f = cuts[i].from;
      var to = cuts[i].to;
      if (typeof f !== 'number' || typeof to !== 'number') continue;
      if (f < 0 || to >= words.length || to < f || to - f > 15) continue;
      var dur = words[to].end - words[f].start;
      if (dur <= 0 || dur > 8) continue;
      ranges.push([words[f].start, words[to].end, 'retomada: ' + (cuts[i].why || '')]);
    }
  } catch (eP) {}
  return ranges;
}

function mergeRanges(ranges, gap) {
  if (!ranges.length) return [];
  ranges.sort(function (x, y) { return x[0] - y[0]; });
  var out = [ranges[0].slice()];
  for (var i = 1; i < ranges.length; i++) {
    var last = out[out.length - 1];
    if (ranges[i][0] <= last[1] + gap) {
      if (ranges[i][1] > last[1]) last[1] = ranges[i][1];
    } else {
      out.push(ranges[i].slice());
    }
  }
  return out;
}

async function aiAnalyze() {
  if (busy) return;
  if (!nodeRequire) {
    log('❌ Node desativado — feche o Premiere completamente e reabra.', 'error');
    return;
  }
  var key = getGroqKey();
  if (!key) {
    aiKeyRow.classList.remove('hidden');
    log('🔑 Preciso da chave Groq (grátis): console.groq.com/keys → cola no campo e Salvar.', 'error');
    return;
  }
  var wantFillers = aiFillersChk.checked;
  var wantRepeats = aiRepeatsChk.checked;
  var wantRestarts = aiRestartsChk.checked;
  if (!wantFillers && !wantRepeats && !wantRestarts) {
    log('❌ Marque pelo menos um tipo de vício pra procurar.', 'error');
    return;
  }

  setBusy(true);
  cancelRequested = false;
  showProgress(true);
  log('🧠 Análise de fala com IA (Groq)… chave ✔');
  try {
    var loaded = await ensureJsxLoaded();
    if (!loaded) return;

    var res = String(await evalScriptP("gamaSilenceCollect('selected')") || '');
    if (res.indexOf('OK:') !== 0) {
      log('❌ ' + res.replace('ERR:', ''), 'error');
      return;
    }
    var lines = res.substring(3).split('\n');
    var clips = [];
    for (var i = 1; i < lines.length; i++) {
      var p = lines[i].split('|');
      if (p[0] !== 'CLIP' || p.length < 9) continue;
      var spRaw = parseFloat(p[7]);
      var speedPct = spRaw > 10 ? spRaw : spRaw * 100;
      var clip = {
        t: parseInt(p[1], 10),
        c: parseInt(p[2], 10),
        start: parseFloat(p[3]),
        end: parseFloat(p[4]),
        inP: parseFloat(p[5]),
        outP: parseFloat(p[6]),
        path: p.slice(8).join('|')
      };
      if (!clip.path || clip.path === 'undefined' || clip.path === 'null') continue;
      if (Math.abs(speedPct - 100) > 0.5) continue;
      clips.push(clip);
    }
    if (!clips.length) {
      log('❌ Nenhum clipe analisável selecionado.', 'error');
      return;
    }

    var jobs = buildWindows(clips);
    var os = nodeRequire('os');
    var fs = nodeRequire('fs');
    var tmpDir = os.tmpdir() + '\\gama_macros';
    try { fs.mkdirSync(tmpDir); } catch (eM) {}

    var byPath = {};
    var totalWords = 0;
    var reportParts = []; // transcrições p/ o relatório
    reportParts.push('=== RELATÓRIO GAMA MACROS — VÍCIOS DE FALA (IA) ===');
    reportParts.push('Data: ' + new Date().toLocaleString('pt-BR'));
    reportParts.push('Filtros: ' + [wantFillers ? 'muletas' : '', wantRepeats ? 'repetições' : '', wantRestarts ? 'retomadas' : ''].join(' ').replace(/\s+/g, ' '));
    reportParts.push('');
    reportParts.push('========== O QUE A IA OUVIU (transcrição) ==========');

    for (var f = 0; f < jobs.length; f++) {
      if (cancelRequested) { log('🛑 Cancelado.', 'error'); return; }
      var job = jobs[f];
      var lbl = 'trecho ' + (f + 1) + '/' + jobs.length;
      var fname = job.path.split(/[\\\/]/).pop();

      if (cancelRequested) { log('🛑 Cancelado.', 'error'); return; }
      var tr = await transcribeWindowChunked(key, job.path, job.w0, job.w1, tmpDir, 'win_' + f, function (ci, ct) {
        updateProgress(f + 0.3 + 0.5 * (ci / ct), jobs.length, lbl + ' · transcrevendo ' + ci + '/' + ct);
      });
      var words = tr.words;
      totalWords += words.length;
      // tempos do Whisper são relativos à janela → soma w0
      for (var w = 0; w < words.length; w++) {
        words[w].start += job.w0;
        words[w].end += job.w0;
      }
      log('📝 "' + fname + '": ' + words.length + ' palavra(s) transcritas.');
      reportParts.push('--- "' + fname + '" [' + fmtTime(job.w0) + ' → ' + fmtTime(job.w1) + ' do arquivo] ---');
      reportParts.push(tr.text || '(sem texto)');
      reportParts.push('');

      var ranges = detectDisfluencies(words, wantFillers, wantRepeats);
      if (wantRestarts && words.length > 5) {
        updateProgress(f + 0.8, jobs.length, lbl + ' · IA marcando retomadas');
        try {
          ranges = ranges.concat(await groqLLMRestarts(key, words));
        } catch (eL) {
          log('⚠️ IA de retomadas falhou (' + eL.message + ') — segui com muletas/repetições.', 'error');
        }
      }
      if (!byPath[job.path]) byPath[job.path] = [];
      for (var r = 0; r < ranges.length; r++) byPath[job.path].push(ranges[r]);
      updateProgress(f + 1, jobs.length, lbl + ' · ok');
    }

    // origem → timeline (mesma matemática dos silêncios), com folga pequena
    var newCuts = [];
    var GUARD = 0.05;
    for (var ci = 0; ci < clips.length; ci++) {
      var cl = clips[ci];
      var list = mergeRanges((byPath[cl.path] || []).slice(), 0.12);
      for (var vi = 0; vi < list.length; vi++) {
        var s0 = Math.max(list[vi][0] - 0.03, cl.inP + GUARD);
        var s1 = Math.min(list[vi][1] + 0.03, cl.outP - GUARD);
        if (s1 - s0 < 0.12) continue;
        newCuts.push({
          t: cl.t,
          a: cl.start + (s0 - cl.inP),
          b: cl.start + (s1 - cl.inP),
          k: 'a',
          why: list[vi][2] || 'vício'
        });
      }
    }

    if (!newCuts.length) {
      log('✅ Fala limpa! Nenhum vício encontrado (' + totalWords + ' palavras analisadas).', 'success');
      updatePlanLabels();
      return;
    }
    newCuts.sort(function (x, y) { return x.a - y.a; });
    var totalAi = 0;
    for (var n = 0; n < newCuts.length; n++) totalAi += (newCuts[n].b - newCuts[n].a);

    // ---- TRANSPARÊNCIA: log dos achados + marcadores na timeline + relatório ----
    log('✅ IA achou ' + newCuts.length + ' vício(s) = ' + fmtDur(totalAi) + ':', 'success');
    var showMax = 12;
    for (var fI = 0; fI < newCuts.length && fI < showMax; fI++) {
      log('   ✂️ ' + fmtTime(newCuts[fI].a) + '  ' + newCuts[fI].why);
    }
    if (newCuts.length > showMax) {
      log('   … e mais ' + (newCuts.length - showMax) + ' (todos no relatório 📄)');
    }

    reportParts.push('========== O QUE SERÁ CORTADO (' + newCuts.length + ' achados) ==========');
    for (var rI = 0; rI < newCuts.length; rI++) {
      reportParts.push(
        (rI + 1) + '. [' + fmtTime(newCuts[rI].a) + ' → ' + fmtTime(newCuts[rI].b) + ' da timeline]  ' + newCuts[rI].why
      );
    }
    lastAiReportPath = csInterface.getExtensionPath() + '/ai-report.txt';
    try {
      fs.writeFileSync(lastAiReportPath, reportParts.join('\r\n'));
      btnAiReport.disabled = false;
    } catch (eW) {
      log('⚠️ Não consegui gravar o relatório: ' + eW.message, 'error');
    }

    // marcadores verdes na timeline (limpa os antigos antes)
    await evalScriptP('gamaClearGamaMarkers()');
    var markerData = [];
    for (var mI = 0; mI < newCuts.length; mI++) {
      markerData.push(newCuts[mI].a + ',' + newCuts[mI].b + ',' + encodeURIComponent(newCuts[mI].why));
    }
    var mRes = String(await evalScriptP('gamaAddMarkers("' + markerData.join(';;') + '")') || '');
    if (mRes.indexOf('OK:') === 0) {
      log('📍 ' + mRes.substring(3) + ' marcador(es) verde(s) [GAMA] plantados na timeline — navega e confere!', 'success');
    }

    mergePlan('a', newCuts); // atualiza os vícios no plano, preserva silêncios
    updatePlanLabels();
    log('👉 Confere os marcadores (e o 📄 relatório). Fechou? 3️⃣ corta os ' + cutPlan.length + ' do plano.');
  } catch (e) {
    log('❌ ' + (e && e.message ? e.message : String(e)), 'error');
  } finally {
    showProgress(false);
    setBusy(false);
  }
}

// ---------- MODO ROTEIRO: acha falas repetidas (apontador + takes errados) ----------
var SEG_DB = -40;    // limiar pra separar blocos de fala
var SEG_GAP = 0.45;  // silêncio mínimo que separa duas falas

// similaridade por "contenção" de palavras: pega prefixos/takes incompletos
function blockSimilarity(tokensA, tokensB) {
  if (!tokensA.length || !tokensB.length) return 0;
  var bag = {};
  for (var i = 0; i < tokensA.length; i++) {
    bag[tokensA[i]] = (bag[tokensA[i]] || 0) + 1;
  }
  var common = 0;
  for (var j = 0; j < tokensB.length; j++) {
    if (bag[tokensB[j]] > 0) {
      bag[tokensB[j]]--;
      common++;
    }
  }
  return common / Math.min(tokensA.length, tokensB.length);
}

async function roteiroAnalyze() {
  if (busy) return;
  if (!nodeRequire) {
    log('❌ Node desativado — feche o Premiere completamente e reabra.', 'error');
    return;
  }
  var key = getGroqKey();
  if (!key) {
    aiKeyRow.classList.remove('hidden');
    log('🔑 Preciso da chave Groq (grátis): console.groq.com/keys → cola e Salvar.', 'error');
    return;
  }
  var simMin = (parseFloat(document.getElementById('rotSim').value) || 70) / 100;
  var minWords = parseInt(document.getElementById('rotMinWords').value, 10) || 3;

  setBusy(true);
  cancelRequested = false;
  showProgress(true);
  log('🎬 Modo Roteiro: procurando falas repetidas (similaridade ≥ ' + Math.round(simMin * 100) + '%)…');
  try {
    var loaded = await ensureJsxLoaded();
    if (!loaded) return;

    var res = String(await evalScriptP("gamaSilenceCollect('selected')") || '');
    if (res.indexOf('OK:') !== 0) {
      log('❌ ' + res.replace('ERR:', ''), 'error');
      return;
    }
    var lines = res.substring(3).split('\n');
    var clips = [];
    for (var i = 1; i < lines.length; i++) {
      var p = lines[i].split('|');
      if (p[0] !== 'CLIP' || p.length < 9) continue;
      var spRaw = parseFloat(p[7]);
      var speedPct = spRaw > 10 ? spRaw : spRaw * 100;
      var clip = {
        t: parseInt(p[1], 10),
        c: parseInt(p[2], 10),
        start: parseFloat(p[3]),
        end: parseFloat(p[4]),
        inP: parseFloat(p[5]),
        outP: parseFloat(p[6]),
        path: p.slice(8).join('|')
      };
      if (!clip.path || clip.path === 'undefined' || clip.path === 'null') continue;
      if (Math.abs(speedPct - 100) > 0.5) continue;
      clips.push(clip);
    }
    if (!clips.length) {
      log('❌ Nenhum clipe analisável selecionado.', 'error');
      return;
    }

    var jobs = buildWindows(clips);
    var os = nodeRequire('os');
    var fs = nodeRequire('fs');
    var tmpDir = os.tmpdir() + '\\gama_macros';
    try { fs.mkdirSync(tmpDir); } catch (eM) {}

    var report = [];
    report.push('=== GAMA MACROS — MODO ROTEIRO ===');
    report.push('Data: ' + new Date().toLocaleString('pt-BR') + ' | similaridade ≥ ' + Math.round(simMin * 100) + '% | mín. ' + minWords + ' palavras');
    report.push('Regra: falas seguidas com o mesmo texto → só a ÚLTIMA fica.');
    report.push('');

    var byPath = {};   // removals em tempo de ARQUIVO
    var totalBlocks = 0;
    var totalRemove = 0;

    for (var f = 0; f < jobs.length; f++) {
      if (cancelRequested) { log('🛑 Cancelado.', 'error'); return; }
      var job = jobs[f];
      var fname = job.path.split(/[\\\/]/).pop();
      var lbl = 'trecho ' + (f + 1) + '/' + jobs.length;

      // 1) silêncios → blocos de fala
      updateProgress(f + 0.15, jobs.length, lbl + ' · achando as falas');
      var sils = await detectSilences(job.path, job.w0, job.w1, SEG_DB, SEG_GAP, null);
      var blocks = [];
      var cursor = job.w0;
      for (var sI = 0; sI < sils.length; sI++) {
        if (sils[sI][0] - cursor > 0.3) blocks.push({ s: cursor, e: sils[sI][0], tokens: [], words: 0 });
        if (sils[sI][1] > cursor) cursor = sils[sI][1];
      }
      if (job.w1 - cursor > 0.3) blocks.push({ s: cursor, e: job.w1, tokens: [], words: 0 });

      // 2) transcrição da janela (em pedaços de 10min — limite da Groq)
      if (cancelRequested) { log('🛑 Cancelado.', 'error'); return; }
      var tr = await transcribeWindowChunked(key, job.path, job.w0, job.w1, tmpDir, 'rot_' + f, function (ci, ct) {
        updateProgress(f + 0.3 + 0.5 * (ci / ct), jobs.length, lbl + ' · transcrevendo ' + ci + '/' + ct);
      });

      // 3) distribui as palavras nos blocos
      for (var wI = 0; wI < tr.words.length; wI++) {
        var ws = tr.words[wI].start + job.w0;
        var token = normWord(tr.words[wI].word);
        if (!token) continue;
        for (var bI = 0; bI < blocks.length; bI++) {
          if (ws >= blocks[bI].s - 0.15 && ws < blocks[bI].e + 0.15) {
            blocks[bI].tokens.push(token);
            blocks[bI].words++;
            break;
          }
        }
      }
      totalBlocks += blocks.length;

      // 4) corridas de blocos parecidos → remove todos menos o ÚLTIMO
      updateProgress(f + 0.8, jobs.length, lbl + ' · comparando as falas');
      var verdicts = [];
      for (var v = 0; v < blocks.length; v++) verdicts.push('MANTÉM');
      for (var bA = 0; bA < blocks.length - 1; bA++) {
        var bB = bA + 1;
        if (blocks[bA].words < minWords || blocks[bB].words < minWords) continue;
        var sim = blockSimilarity(blocks[bA].tokens, blocks[bB].tokens);
        if (sim >= simMin) {
          verdicts[bA] = 'REMOVE (igual à fala seguinte — ' + Math.round(sim * 100) + '%)';
        }
      }

      // 5) relatório + intervalos de remoção
      report.push('--- "' + fname + '" [' + fmtTime(job.w0) + ' → ' + fmtTime(job.w1) + ' do arquivo] — ' + blocks.length + ' fala(s) ---');
      if (!byPath[job.path]) byPath[job.path] = [];
      for (var bR = 0; bR < blocks.length; bR++) {
        var texto = blocks[bR].tokens.join(' ');
        if (texto.length > 90) texto = texto.substring(0, 90) + '…';
        report.push('#' + (bR + 1) + ' [' + fmtTime(blocks[bR].s) + '→' + fmtTime(blocks[bR].e) + '] ' + verdicts[bR] + '  "' + texto + '"');
        if (verdicts[bR] !== 'MANTÉM') {
          totalRemove++;
          var firstWords = blocks[bR].tokens.slice(0, 4).join(' ');
          byPath[job.path].push([blocks[bR].s - 0.1, blocks[bR].e + 0.1, 'repetida: "' + firstWords + '…"']);
        }
      }
      report.push('');
      updateProgress(f + 1, jobs.length, lbl + ' · ok');
    }

    // origem → timeline (mesma matemática validada)
    var newCuts = [];
    var GUARD = 0.05;
    for (var ci = 0; ci < clips.length; ci++) {
      var cl = clips[ci];
      var listR = mergeRanges((byPath[cl.path] || []).slice(), 0.05);
      for (var vi = 0; vi < listR.length; vi++) {
        var s0 = Math.max(listR[vi][0], cl.inP + GUARD);
        var s1 = Math.min(listR[vi][1], cl.outP - GUARD);
        if (s1 - s0 < 0.3) continue;
        newCuts.push({
          t: cl.t,
          a: cl.start + (s0 - cl.inP),
          b: cl.start + (s1 - cl.inP),
          k: 'r',
          why: listR[vi][2] || 'fala repetida'
        });
      }
    }

    if (!newCuts.length) {
      log('✅ Nenhuma fala repetida encontrada (' + totalBlocks + ' bloco(s) de fala analisados).', 'success');
      updatePlanLabels();
      return;
    }
    newCuts.sort(function (x, y) { return x.a - y.a; });
    var totalR = 0;
    for (var n = 0; n < newCuts.length; n++) totalR += (newCuts[n].b - newCuts[n].a);

    log('✅ ' + newCuts.length + ' fala(s) de apontador/take errado = ' + fmtDur(totalR) + ' (de ' + totalBlocks + ' falas):', 'success');
    var showMax = 10;
    for (var fI = 0; fI < newCuts.length && fI < showMax; fI++) {
      log('   ✂️ ' + fmtTime(newCuts[fI].a) + '  ' + newCuts[fI].why);
    }
    if (newCuts.length > showMax) log('   … e mais ' + (newCuts.length - showMax) + ' (📄 relatório)');

    lastAiReportPath = csInterface.getExtensionPath() + '/roteiro-report.txt';
    try {
      fs.writeFileSync(lastAiReportPath, report.join('\r\n'));
      btnAiReport.disabled = false;
    } catch (eW) {
      log('⚠️ Não gravei o relatório: ' + eW.message, 'error');
    }

    await evalScriptP('gamaClearGamaMarkers()');
    var markerData = [];
    for (var mI = 0; mI < newCuts.length; mI++) {
      markerData.push(newCuts[mI].a + ',' + newCuts[mI].b + ',' + encodeURIComponent(newCuts[mI].why));
    }
    var mRes = String(await evalScriptP('gamaAddMarkers("' + markerData.join(';;') + '")') || '');
    if (mRes.indexOf('OK:') === 0) {
      log('📍 ' + mRes.substring(3) + ' marcador(es) [GAMA] na timeline — confere cada um!', 'success');
    }

    mergePlan('r', newCuts);
    updatePlanLabels();
    log('👉 Confere os marcadores + 📄 relatório. Fechou? 3️⃣ corta os ' + cutPlan.length + ' do plano.');
  } catch (e) {
    log('❌ ' + (e && e.message ? e.message : String(e)), 'error');
  } finally {
    showProgress(false);
    setBusy(false);
  }
}

btnAiAnalyze.addEventListener('click', function () {
  roteiroAnalyze();
});

btnAiReport.addEventListener('click', function () {
  if (!lastAiReportPath || !nodeRequire) return;
  try {
    nodeRequire('child_process').spawn('notepad.exe', [lastAiReportPath.replace(/\//g, '\\')], { detached: true, windowsHide: false });
  } catch (e) {
    log('❌ Não abri o relatório: ' + e.message + ' (arquivo: ai-report.txt na pasta da extensão)', 'error');
  }
});

btnAiClearMarks.addEventListener('click', async function () {
  if (busy) return;
  var loaded = await ensureJsxLoaded();
  if (!loaded) return;
  var res = String(await evalScriptP('gamaClearGamaMarkers()') || '');
  if (res.indexOf('OK:') === 0) {
    log('🧹 ' + res.substring(3) + ' marcador(es) [GAMA] removido(s) da timeline.', 'success');
  } else {
    log('❌ ' + res.replace('ERR:', ''), 'error');
  }
});

// ---------- motor 3 fases: fatiar → excluir → unir ----------
var PHASE_INFO = {
  1: { label: '✂️🗑️ Fase 1/2 — cortando e excluindo', chunk: 25 },
  2: { label: '🗑️ Finalizando exclusões', chunk: 50 },
  3: { label: '🧲 Fase 2/2 — unindo os vídeos', chunk: 150 }
};

async function runCut3Phases(planArr, doBackup) {
  var planStr = [];
  for (var i = 0; i < planArr.length; i++) {
    planStr.push(planArr[i].t + ',' + planArr[i].a + ',' + planArr[i].b);
  }
  var start = String(await evalScriptP(
    'gamaCut2Start("' + planStr.join(';') + '","' + doBackup + '")'
  ) || '');
  if (start.indexOf('OK:') !== 0) {
    log('❌ ' + start.replace('ERR:', ''), 'error');
    return false;
  }
  var sp = start.substring(3).split('|');
  var durBefore = parseFloat(sp[2]) || 0;
  var seqName = sp.slice(3).join('|') || '?';
  if (sp[1] === 'sim') log('🛟 Backup criado: "' + seqName + ' [BACKUP GAMA hh:mm]" ✔');
  log('▶ Processando "' + seqName + '"…');

  var lastPhase = 0;
  var phaseT0 = Date.now();
  var lastMark = 0;
  while (!cancelRequested) {
    var chunk = PHASE_INFO[lastPhase] ? PHASE_INFO[lastPhase].chunk : 10;
    var res = String(await evalScriptP('gamaCut2Step(' + chunk + ')') || '');
    if (res.indexOf('OK:') !== 0) {
      log('❌ ' + res.replace('ERR:', ''), 'error');
      break;
    }
    var p = res.substring(3).split('|');
    var phase = parseInt(p[0], 10);
    var done = parseInt(p[1], 10) || 0;
    var total = parseInt(p[2], 10) || 0;
    if (phase === 4) break;
    if (phase !== lastPhase) {
      lastPhase = phase;
      phaseT0 = Date.now();
      lastMark = 0;
      // o "ajuste final" só aparece se tiver trabalho de verdade
      if (phase !== 3 || total > 0) log(PHASE_INFO[phase].label + '…');
    }
    // medidor de ritmo: diagnostica degradação em lotes grandes
    if (done - lastMark >= 10) {
      var msPer = (Date.now() - phaseT0) / done;
      log('⏲ ritmo fase ' + phase + ': ' + (msPer / 1000).toFixed(2) + 's/item (' + done + '/' + total + ')');
      lastMark = done;
    }
    updateProgress(done, total, PHASE_INFO[phase].label + ' ' + done + '/' + total);
    await new Promise(function (r) { setTimeout(r, 0); });
  }

  var endRes = String(await evalScriptP('gamaCut2End()') || '');
  var okCount = 0;
  var fail = 0;
  var durAfter = 0;
  var firstErr = '';
  if (endRes.indexOf('OK:') === 0) {
    var ep = endRes.substring(3).split('|');
    okCount = parseInt(ep[0], 10) || 0;
    fail = parseInt(ep[1], 10) || 0;
    durAfter = parseFloat(ep[2]) || 0;
    firstErr = ep.slice(3).join('|');
  }

  if (cancelRequested) {
    log('🛑 Cancelado no meio — a timeline pode ter ficado em estado parcial. Use o backup ou Ctrl+Z.', 'error');
  } else {
    log('✅ ' + okCount + ' trecho(s) excluído(s) e vídeos unidos.', 'success');
    if (fail > 0) log('⚠️ ' + fail + ' problema(s) — 1º: ' + firstErr, 'error');
  }
  if (durBefore > 0 && durAfter > 0) {
    var saved = durBefore - durAfter;
    log('⏱ Duração: ' + fmtDur(durBefore) + ' → ' + fmtDur(durAfter) + (saved > 0.01 ? ' (−' + fmtDur(saved) + ')' : ' (SEM MUDANÇA — me avise!)'), saved > 0.01 ? 'success' : 'error');
  }
  return !cancelRequested;
}

// 2️⃣ — teste: roda as 3 fases em APENAS 1 silêncio (o último da timeline)
btnSilCut.addEventListener('click', async function () {
  if (busy) return;
  if (!cutPlan || !cutPlan.length) {
    log('❌ Rode a análise (1️⃣) primeiro.', 'error');
    return;
  }
  setBusy(true);
  cancelRequested = false;
  showProgress(true);
  try {
    var loaded = await ensureJsxLoaded();
    if (!loaded) return;
    coalescePlan();
    var iv = cutPlan[0];
    log('🧪 TESTE (3 fases) em 1 silêncio: [' + iv.a.toFixed(2) + 's → ' + iv.b.toFixed(2) + 's]…');
    var ok = await runCut3Phases([iv], 'no');
    if (ok) {
      cutPlan.shift();
      if (!cutPlan.length) cutPlan = null;
      log('👉 Dá play na região. Ficou bom? 3️⃣ faz os ' + (cutPlan ? cutPlan.length : 0) + ' restantes.');
    }
  } catch (e) {
    log('❌ ' + (e && e.message ? e.message : String(e)), 'error');
  } finally {
    showProgress(false);
    setBusy(false);
    updatePlanLabels();
    refreshInfo();
  }
});

// 3️⃣ — corta TODOS os silêncios do plano (lote cancelável + backup opcional)
btnSilCutAll.addEventListener('click', async function () {
  if (busy) return;
  if (!cutPlan || !cutPlan.length) {
    log('❌ Rode a análise (1️⃣) primeiro.', 'error');
    return;
  }
  setBusy(true);
  btnSilCut.disabled = true;
  btnSilCutAll.disabled = true;
  cancelRequested = false;
  showProgress(true);

  var fused = coalescePlan();
  if (fused > 0) log('🔗 ' + fused + ' intervalo(s) sobrepostos fundidos (silêncio+IA na mesma região) → ' + cutPlan.length + ' corte(s) finais.');
  updatePlanLabels();

  var doBackup = silBackupChk.checked ? 'yes' : 'no';
  log('✂️ ' + cutPlan.length + ' trecho(s): fatiar → excluir' + (doBackup === 'yes' ? ' (com backup)' : ''));
  try {
    var loaded = await ensureJsxLoaded();
    if (!loaded) return;
    var done = await runCut3Phases(cutPlan, doBackup);
    if (done) cutPlan = null;
  } catch (e) {
    log('❌ ' + (e && e.message ? e.message : String(e)), 'error');
  } finally {
    showProgress(false);
    setBusy(false);
    updatePlanLabels();
    refreshInfo();
  }
});

// ---------- init ----------
(async function init() {
  log('Painel v1.27 carregado (waveform real no preview de silêncio)', 'success');
  log(nodeRequire ? 'Node.js ativo ✔ (FFmpeg disponível)' : '⚠️ Node.js inativo — reinicie o Premiere pra ativar o Remover Silêncios', nodeRequire ? 'success' : 'error');
  var loaded = await ensureJsxLoaded();
  if (loaded) {
    log('Motor de macros pronto ✔', 'success');
    refreshInfo();
  }
})();
