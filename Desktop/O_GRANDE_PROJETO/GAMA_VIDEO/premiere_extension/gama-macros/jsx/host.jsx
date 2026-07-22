/**
 * GAMA Macros — host.jsx
 * ExtendScript (ES3) para Adobe Premiere Pro 2023+
 * Macros de ajuste em massa de clipes na timeline.
 *
 * Convenção de retorno: string começando com "OK:" ou "ERR:"
 * (sem depender de JSON, que não é garantido no ExtendScript)
 */

function gamaPing() {
  return 'pong';
}

function gamaVersion() {
  return '1.25.0';
}

var GAMA_TPS = 254016000000; // ticks por segundo (constante do Premiere)

function _gamaActiveSeq() {
  try {
    if (app && app.project && app.project.activeSequence) {
      return app.project.activeSequence;
    }
  } catch (e) {}
  return null;
}

// Coleções do Premiere variam entre numTracks/numItems conforme o tipo
function _gamaCount(coll) {
  if (!coll) return 0;
  if (typeof coll.numItems === 'number') return coll.numItems;
  if (typeof coll.numTracks === 'number') return coll.numTracks;
  return 0;
}

function _gamaIsSelected(clip) {
  try {
    return clip.isSelected() === true;
  } catch (e) {}
  return false;
}

// Tamanho do quadro da sequência
function _gamaSeqFrame(seq) {
  var w = 0;
  var h = 0;
  try {
    var st = seq.getSettings();
    if (st) {
      w = Number(st.videoFrameWidth) || 0;
      h = Number(st.videoFrameHeight) || 0;
    }
  } catch (e1) {}
  if (!w || !h) {
    try {
      w = Number(seq.frameSizeHorizontal) || 0;
      h = Number(seq.frameSizeVertical) || 0;
    } catch (e2) {}
  }
  if (!w || !h) return null;
  return { w: w, h: h };
}

// Extrai "1920 x 1080" dos metadados do item de projeto
function _gamaMediaDims(projItem) {
  if (!projItem) return null;
  var xmp = '';
  try {
    xmp = String(projItem.getProjectMetadata());
  } catch (e1) {
    return null;
  }
  if (!xmp) return null;

  // 1ª tentativa: coluna VideoInfo ("1920 x 1080 (1.0)")
  var m = xmp.match(/Column\.Intrinsic\.VideoInfo[^>]*>\s*([0-9]{2,5})\s*x\s*([0-9]{2,5})/);
  // 2ª tentativa: qualquer padrão "NNNN x NNNN"
  if (!m) m = xmp.match(/([0-9]{3,5})\s*x\s*([0-9]{3,5})/);
  if (!m) return null;

  var w = parseInt(m[1], 10);
  var h = parseInt(m[2], 10);
  if (!w || !h) return null;
  return { w: w, h: h };
}

// Seta o parâmetro Escala do componente Motion do clipe
function _gamaSetMotionScale(clip, scaleValue) {
  try {
    var comps = clip.components;
    if (!comps) return false;
    var nComps = _gamaCount(comps);
    for (var i = 0; i < nComps; i++) {
      var comp = comps[i];
      if (!comp) continue;
      var mn = '';
      try {
        mn = String(comp.matchName);
      } catch (e1) {}
      if (mn !== 'AE.ADBE Motion') continue;

      var props = comp.properties;
      var nProps = _gamaCount(props);
      var target = null;
      for (var p = 0; p < nProps; p++) {
        var dn = '';
        try {
          dn = String(props[p].displayName);
        } catch (e2) {}
        if (dn === 'Scale' || dn === 'Escala') {
          target = props[p];
          break;
        }
      }
      // Scale costuma ser a propriedade de índice 1 do Motion
      if (!target && nProps > 1) target = props[1];
      if (!target) return false;

      target.setValue(scaleValue, true);
      return true;
    }
  } catch (e3) {}
  return false;
}

/* ============================================================
 * NÚCLEO — Ajustar ao quadro via DOM oficial (Motion/Escala)
 * Calcula a % pela resolução da mídia. Cache por projectItem
 * (centenas de cortes do mesmo arquivo = 1 parse só).
 * mode: 'selected' | 'all'
 * ============================================================ */
function _gamaFitCore(mode) {
  var seq = _gamaActiveSeq();
  if (!seq) return 'ERR:Nenhuma sequência ativa.';

  var frame = _gamaSeqFrame(seq);
  if (!frame) return 'ERR:Não consegui ler o tamanho do quadro da sequência.';

  var dimsCache = {};
  var ok = 0;
  var skip = 0;
  var targeted = 0;
  var nTracks = _gamaCount(seq.videoTracks);

  for (var t = 0; t < nTracks; t++) {
    var track = seq.videoTracks[t];
    if (!track) continue;
    var nClips = _gamaCount(track.clips);
    for (var c = 0; c < nClips; c++) {
      var clip = track.clips[c];
      if (!clip) continue;
      if (mode === 'selected' && !_gamaIsSelected(clip)) continue;
      targeted++;

      var dims = null;
      var key = null;
      try {
        key = String(clip.projectItem.nodeId);
      } catch (e1) {}
      if (key && dimsCache.hasOwnProperty(key)) {
        dims = dimsCache[key];
      } else {
        dims = _gamaMediaDims(clip.projectItem);
        if (key) dimsCache[key] = dims;
      }

      if (!dims) {
        skip++;
        continue;
      }
      var pct = Math.min(frame.w / dims.w, frame.h / dims.h) * 100;
      pct = Math.round(pct * 100) / 100;
      if (_gamaSetMotionScale(clip, pct)) {
        ok++;
      } else {
        skip++;
      }
    }
  }

  if (targeted === 0) {
    if (mode === 'selected') return 'ERR:Nenhum clipe de vídeo selecionado.';
    return 'ERR:Nenhum clipe de vídeo na sequência.';
  }
  var msg = 'OK:' + ok + ' clipe(s) ajustado(s) ao tamanho do quadro';
  if (skip > 0) msg += ' | ' + skip + ' pulado(s) (sem resolução/Motion)';
  return msg;
}

/* ============================================================
 * MACRO A — "Escala para o tamanho do quadro"
 * 1º tenta o QE DOM (comando nativo do menu de contexto).
 * Se indisponível nesta versão, cai para o núcleo Motion/DOM.
 * mode: 'selected' | 'all'
 * ============================================================ */
function _gamaQeProbe(qeSeq, nTracks) {
  for (var t = 0; t < nTracks; t++) {
    var qeTrack = null;
    try {
      qeTrack = qeSeq.getVideoTrackAt(t);
    } catch (e1) {}
    if (!qeTrack) continue;
    var n = 0;
    try {
      n = qeTrack.numItems;
    } catch (e2) {}
    if (typeof n !== 'number') n = 0;
    for (var i = 0; i < n; i++) {
      var it = null;
      try {
        it = qeTrack.getItemAt(i);
      } catch (e3) {}
      if (!it) continue;
      var ty = '';
      try {
        ty = String(it.type);
      } catch (e4) {}
      if (ty === 'Empty') continue;
      // primeiro item real: o método existe?
      return typeof it.setScaleToFrameSize === 'function';
    }
  }
  return false;
}

function gamaScaleToFrameSize(mode) {
  var seq = _gamaActiveSeq();
  if (!seq) return 'ERR:Nenhuma sequência ativa. Abra uma sequência na timeline.';

  var qeSeq = null;
  try {
    app.enableQE();
    qeSeq = qe.project.getActiveSequence();
  } catch (e1) {}

  var nTracks = _gamaCount(seq.videoTracks);
  var useQE = qeSeq ? _gamaQeProbe(qeSeq, nTracks) : false;

  // QE indisponível nesta versão → método alternativo direto
  if (!useQE) {
    var alt = _gamaFitCore(mode);
    if (alt.indexOf('OK:') === 0) return alt + ' [método: Motion]';
    return alt;
  }

  var ok = 0;
  var fail = 0;
  var matched = 0;
  var firstErr = '';

  for (var t = 0; t < nTracks; t++) {
    var domTrack = seq.videoTracks[t];
    var qeTrack = null;
    try {
      qeTrack = qeSeq.getVideoTrackAt(t);
    } catch (e3) {}
    if (!domTrack || !qeTrack) continue;

    // Modo 'selected': marca os índices dos clipes selecionados
    // (ordem dos clipes reais casa com itens não-vazios do QE)
    var wanted = null;
    if (mode === 'selected') {
      wanted = {};
      var any = false;
      var nClips = _gamaCount(domTrack.clips);
      for (var c = 0; c < nClips; c++) {
        if (_gamaIsSelected(domTrack.clips[c])) {
          wanted[c] = true;
          any = true;
        }
      }
      if (!any) continue;
    }

    var nItems = 0;
    try {
      nItems = qeTrack.numItems;
    } catch (e4) {}
    if (typeof nItems !== 'number') nItems = 0;

    var realIdx = 0;
    for (var i = 0; i < nItems; i++) {
      var item = null;
      try {
        item = qeTrack.getItemAt(i);
      } catch (e5) {}
      if (!item) continue;

      var itemType = '';
      try {
        itemType = String(item.type);
      } catch (e6) {}
      if (itemType === 'Empty') continue;

      var apply = true;
      if (wanted) apply = wanted[realIdx] === true;
      realIdx++;

      if (!apply) continue;
      matched++;
      try {
        item.setScaleToFrameSize();
        ok++;
      } catch (e7) {
        fail++;
        if (!firstErr) firstErr = e7.toString().substring(0, 120);
      }
    }
  }

  if (mode === 'selected' && matched === 0) {
    return 'ERR:Nenhum clipe de vídeo selecionado. Selecione clipes na timeline (ou use o botão TODOS).';
  }
  if (matched === 0) {
    return 'ERR:Nenhum clipe de vídeo encontrado na sequência.';
  }

  // QE existiu mas falhou em tudo → resgate automático pelo método Motion
  if (ok === 0 && fail > 0) {
    var rescue = _gamaFitCore(mode);
    if (rescue.indexOf('OK:') === 0) {
      return rescue + ' [método: Motion — QE falhou: ' + firstErr + ']';
    }
    return 'ERR:QE falhou (' + firstErr + ') e o método Motion também: ' + rescue.replace('ERR:', '');
  }

  var msg = 'OK:' + ok + ' clipe(s): escala aplicada ao tamanho do quadro';
  if (fail > 0) msg += ' | ' + fail + ' falharam (' + firstErr + ')';
  return msg;
}

/* ============================================================
 * MACRO B — "Definir para o tamanho do quadro" (selecionados)
 * ============================================================ */
function gamaSetToFrameSize() {
  return _gamaFitCore('selected');
}

/* ============================================================
 * MACRO C — Escala personalizada (%) nos clipes selecionados
 * ============================================================ */
function gamaApplyScalePercent(value) {
  var pct = Number(value);
  if (!pct || pct <= 0 || pct > 10000) return 'ERR:Valor de escala inválido (use 1 a 10000).';

  var seq = _gamaActiveSeq();
  if (!seq) return 'ERR:Nenhuma sequência ativa.';

  var ok = 0;
  var skip = 0;
  var selCount = 0;
  var nTracks = _gamaCount(seq.videoTracks);

  for (var t = 0; t < nTracks; t++) {
    var track = seq.videoTracks[t];
    if (!track) continue;
    var nClips = _gamaCount(track.clips);
    for (var c = 0; c < nClips; c++) {
      var clip = track.clips[c];
      if (!clip || !_gamaIsSelected(clip)) continue;
      selCount++;
      if (_gamaSetMotionScale(clip, pct)) {
        ok++;
      } else {
        skip++;
      }
    }
  }

  if (selCount === 0) return 'ERR:Nenhum clipe de vídeo selecionado.';
  var msg = 'OK:' + ok + ' clipe(s) com escala ' + pct + '%';
  if (skip > 0) msg += ' | ' + skip + ' pulados';
  return msg;
}

/* ============================================================
 * LOTE CANCELÁVEL — processa em blocos, painel controla o fluxo
 * O estado vive em $.global entre chamadas evalScript.
 * kind: 'fit' (ajustar ao quadro) | 'scale' (% fixa em `value`)
 * mode: 'selected' | 'all'
 * ============================================================ */
function gamaBatchStart(mode, kind, value) {
  var seq = _gamaActiveSeq();
  if (!seq) return 'ERR:Nenhuma sequência ativa.';

  var frame = _gamaSeqFrame(seq);
  if (kind === 'fit' && !frame) return 'ERR:Não consegui ler o tamanho do quadro da sequência.';

  var pct = Number(value) || 0;
  if (kind === 'scale' && (pct <= 0 || pct > 10000)) return 'ERR:Valor de escala inválido (use 1 a 10000).';

  var list = [];
  var nTracks = _gamaCount(seq.videoTracks);
  for (var t = 0; t < nTracks; t++) {
    var track = seq.videoTracks[t];
    if (!track) continue;
    var nClips = _gamaCount(track.clips);
    for (var c = 0; c < nClips; c++) {
      var clip = track.clips[c];
      if (!clip) continue;
      if (mode === 'selected' && !_gamaIsSelected(clip)) continue;
      list.push([t, c]);
    }
  }

  if (list.length === 0) {
    if (mode === 'selected') return 'ERR:Nenhum clipe de vídeo selecionado.';
    return 'ERR:Nenhum clipe de vídeo na sequência.';
  }

  $.global.__gamaBatch = {
    kind: kind,
    value: pct,
    list: list,
    pos: 0,
    ok: 0,
    skip: 0,
    frame: frame,
    cache: {}
  };
  return 'OK:' + list.length;
}

function gamaBatchStep(count) {
  var b = $.global.__gamaBatch;
  if (!b) return 'ERR:Nenhum lote ativo.';
  var seq = _gamaActiveSeq();
  if (!seq) return 'ERR:A sequência não está mais ativa.';

  var n = Number(count) || 25;
  var end = Math.min(b.pos + n, b.list.length);

  for (; b.pos < end; b.pos++) {
    var t = b.list[b.pos][0];
    var c = b.list[b.pos][1];
    var clip = null;
    try {
      clip = seq.videoTracks[t].clips[c];
    } catch (e1) {}
    if (!clip) {
      b.skip++;
      continue;
    }

    var pct = b.value;
    if (b.kind === 'fit') {
      var dims = null;
      var key = null;
      try {
        key = String(clip.projectItem.nodeId);
      } catch (e2) {}
      if (key && b.cache.hasOwnProperty(key)) {
        dims = b.cache[key];
      } else {
        dims = _gamaMediaDims(clip.projectItem);
        if (key) b.cache[key] = dims;
      }
      if (!dims) {
        b.skip++;
        continue;
      }
      pct = Math.round(Math.min(b.frame.w / dims.w, b.frame.h / dims.h) * 10000) / 100;
    }

    if (_gamaSetMotionScale(clip, pct)) {
      b.ok++;
    } else {
      b.skip++;
    }
  }

  return 'OK:' + b.pos + '|' + b.list.length + '|' + b.ok + '|' + b.skip;
}

function gamaBatchEnd() {
  var b = $.global.__gamaBatch;
  $.global.__gamaBatch = null;
  if (!b) return 'OK:0|0|0|0';
  return 'OK:' + b.pos + '|' + b.list.length + '|' + b.ok + '|' + b.skip;
}

/* ============================================================
 * REMOVER SILÊNCIOS — coleta de clipes para análise externa
 * Retorna 1 linha por clipe de vídeo alvo:
 *   CLIP|track|clipIdx|startSecs|endSecs|inPointSecs|outPointSecs|speedRaw|mediaPath
 * (mediaPath por último — caminhos Windows não contêm \n)
 * ============================================================ */
function gamaSilenceCollect(mode) {
  var seq = _gamaActiveSeq();
  if (!seq) return 'ERR:Nenhuma sequência ativa.';

  var tpf = '0';
  try {
    tpf = String(seq.timebase);
  } catch (e0) {}

  var lines = [];
  lines.push('SEQ|' + seq.name + '|' + tpf);

  var nTracks = _gamaCount(seq.videoTracks);
  for (var t = 0; t < nTracks; t++) {
    var track = seq.videoTracks[t];
    if (!track) continue;
    var nClips = _gamaCount(track.clips);
    for (var c = 0; c < nClips; c++) {
      var clip = track.clips[c];
      if (!clip) continue;
      if (mode === 'selected' && !_gamaIsSelected(clip)) continue;

      var path = '';
      try {
        path = String(clip.projectItem.getMediaPath());
      } catch (e1) {}

      var sp = 1;
      try {
        sp = Number(clip.getSpeed());
        if (isNaN(sp)) sp = 1;
      } catch (e2) {
        sp = 1;
      }

      var st = 0;
      var en = 0;
      var ip = 0;
      var op = 0;
      try {
        st = clip.start.seconds;
        en = clip.end.seconds;
        ip = clip.inPoint.seconds;
        op = clip.outPoint.seconds;
      } catch (e3) {}

      lines.push('CLIP|' + t + '|' + c + '|' + st + '|' + en + '|' + ip + '|' + op + '|' + sp + '|' + path);
    }
  }

  if (lines.length <= 1) {
    if (mode === 'selected') return 'ERR:Nenhum clipe de vídeo selecionado.';
    return 'ERR:Nenhum clipe de vídeo na sequência.';
  }
  return 'OK:' + lines.join('\n');
}

/* ============================================================
 * CORTE — helpers de razor/ripple (QE) + experimento medido
 * ============================================================ */
function _gamaSecsToTicksStr(secs) {
  return String(Math.round(secs * GAMA_TPS));
}

function _gamaSecsToTimecodeStr(seq, secs, sep) {
  var tpf = 0;
  try {
    tpf = Number(seq.timebase);
  } catch (e) {}
  if (!tpf) tpf = GAMA_TPS / 25;
  var fps = GAMA_TPS / tpf;
  var fpsInt = Math.round(fps);
  var totalFrames = Math.round(secs * fps);
  var ff = totalFrames % fpsInt;
  var totalSecs = Math.floor(totalFrames / fpsInt);
  var ss = totalSecs % 60;
  var mm = Math.floor(totalSecs / 60) % 60;
  var hh = Math.floor(totalSecs / 3600);
  function p2(n) {
    return (n < 10 ? '0' : '') + n;
  }
  return p2(hh) + sep + p2(mm) + sep + p2(ss) + sep + p2(ff);
}

// Itens QE reais (não-Empty) na ordem da track — casa com DOM track.clips
function _gamaQeItemsOrdinais(qeTrack) {
  var res = [];
  var n = 0;
  try {
    n = qeTrack.numItems;
  } catch (e) {}
  if (typeof n !== 'number') n = 0;
  for (var i = 0; i < n; i++) {
    var it = null;
    try {
      it = qeTrack.getItemAt(i);
    } catch (e2) {}
    if (!it) continue;
    var ty = '';
    try {
      ty = String(it.type);
    } catch (e3) {}
    if (ty === 'Empty') continue;
    res.push(it);
  }
  return res;
}

// Duração de 1 frame da sequência, em segundos
function _gamaFrameDur(seq) {
  var tpf = 0;
  try {
    tpf = Number(seq.timebase);
  } catch (e) {}
  if (!tpf) tpf = GAMA_TPS / 25;
  return tpf / GAMA_TPS;
}

// Todas as bordas (start/end) dos clipes de uma track DOM, ordenadas
function _gamaBoundaries(track) {
  var res = [];
  var n = _gamaCount(track ? track.clips : null);
  for (var i = 0; i < n; i++) {
    try {
      res.push(track.clips[i].start.seconds);
      res.push(track.clips[i].end.seconds);
    } catch (e) {}
  }
  res.sort(function (x, y) { return x - y; });
  return res;
}

function _gamaNearest(arr, target) {
  var best = null;
  for (var i = 0; i < arr.length; i++) {
    if (best === null || Math.abs(arr[i] - target) < Math.abs(best - target)) best = arr[i];
  }
  return best;
}

/**
 * Razor MEDIDO: corta perto de `secs` e retorna a posição REAL da borda.
 * - Se já existe borda a ≤1.5 frame do alvo, usa ela (não corta de novo).
 * - Testa formatos de tempo (o que funcionar fica travado em $.global).
 * - Não confia no alvo: mede onde o corte caiu de verdade (imune ao
 *   drift NTSC de 0.1% no timecode que detectamos no diag-cut).
 */
function _gamaQeRazorMeasured(seq, qeTrack, domTrack, secs, report) {
  var fd = _gamaFrameDur(seq);
  var tol = fd * 1.5;

  var before = _gamaBoundaries(domTrack);
  var near = _gamaNearest(before, secs);
  if (near !== null && Math.abs(near - secs) <= tol) {
    if (report) report.push('razor @' + secs.toFixed(3) + ': borda ja existia em ' + near.toFixed(3));
    return near;
  }

  var variants = [
    ['tc:', _gamaSecsToTimecodeStr(seq, secs, ':')],
    ['ticks', _gamaSecsToTicksStr(secs)],
    ['tc;', _gamaSecsToTimecodeStr(seq, secs, ';')]
  ];
  // formato que já funcionou vai primeiro
  var locked = $.global.__gamaRazorFmt;
  if (locked) {
    for (var L = 1; L < variants.length; L++) {
      if (variants[L][0] === locked) {
        var tmp = variants[0];
        variants[0] = variants[L];
        variants[L] = tmp;
        break;
      }
    }
  }

  for (var v = 0; v < variants.length; v++) {
    try {
      qeTrack.razor(variants[v][1]);
    } catch (e) {
      if (report) report.push('razor @' + secs.toFixed(3) + ' via ' + variants[v][0] + ': ERRO ' + e.toString());
      continue;
    }
    var after = _gamaBoundaries(domTrack);
    if (after.length > before.length) {
      // acha a borda NOVA (não existia antes)
      var novo = null;
      for (var i = 0; i < after.length; i++) {
        var existed = false;
        for (var j = 0; j < before.length; j++) {
          if (Math.abs(after[i] - before[j]) < 0.0005) {
            existed = true;
            break;
          }
        }
        if (!existed && (novo === null || Math.abs(after[i] - secs) < Math.abs(novo - secs))) {
          novo = after[i];
        }
      }
      if (novo !== null) {
        $.global.__gamaRazorFmt = variants[v][0];
        if (report) report.push('razor @' + secs.toFixed(3) + ' via ' + variants[v][0] + ': caiu em ' + novo.toFixed(3) + ' (desvio ' + ((novo - secs) * 1000).toFixed(0) + 'ms)');
        return novo;
      }
    }
    if (report) report.push('razor @' + secs.toFixed(3) + ' via ' + variants[v][0] + ': sem efeito');
  }
  return null;
}

function _gamaDomTrackDump(track) {
  if (!track) return '<sem track>';
  var n = _gamaCount(track.clips);
  var parts = [];
  for (var i = 0; i < n && i < 12; i++) {
    var cl = track.clips[i];
    var s = -1;
    var e = -1;
    var nm = '?';
    try {
      s = cl.start.seconds;
      e = cl.end.seconds;
      nm = String(cl.name);
    } catch (e1) {}
    parts.push('[' + i + ']' + nm.substring(0, 10) + ' ' + s.toFixed(2) + '→' + e.toFixed(2));
  }
  if (n > 12) parts.push('… +' + (n - 12));
  return n + ' clipe(s): ' + parts.join(' | ');
}

/**
 * Executa 1 corte real [a,b] na track de vídeo vt, medindo tudo.
 * Descobre a semântica do rippleDelete (global vs por-track) e
 * trata o áudio adaptativamente. Grava relatório em outPath.
 */
function gamaCutExperiment(vt, a, b, outPath) {
  var out = [];
  var seq = _gamaActiveSeq();
  if (!seq) return 'ERR:Nenhuma sequência ativa.';
  out.push('=== EXPERIMENTO DE CORTE v' + gamaVersion() + ' ===');
  out.push('seq: ' + seq.name + ' | corte: V' + (vt + 1) + ' [' + a.toFixed(3) + 's → ' + b.toFixed(3) + 's]');

  try {
    app.enableQE();
  } catch (e0) {
    return 'ERR:enableQE falhou.';
  }
  var qeSeq = null;
  try {
    qeSeq = qe.project.getActiveSequence();
  } catch (e1) {}
  if (!qeSeq) return 'ERR:QE sem sequência ativa.';

  var nA = _gamaCount(seq.audioTracks);

  function dumpState(label) {
    out.push('--- ' + label + ' ---');
    out.push('V' + (vt + 1) + ': ' + _gamaDomTrackDump(seq.videoTracks[vt]));
    for (var x = 0; x < nA && x < 4; x++) {
      out.push('A' + (x + 1) + ': ' + _gamaDomTrackDump(seq.audioTracks[x]));
    }
  }
  dumpState('ANTES');

  var qeVTrack = null;
  try {
    qeVTrack = qeSeq.getVideoTrackAt(vt);
  } catch (e2) {}
  if (!qeVTrack) return 'ERR:QE video track não encontrada.';

  // 1) razor MEDIDO no vídeo: b primeiro, depois a (bx/ax = posições reais)
  var domVTrack = seq.videoTracks[vt];
  var bx = _gamaQeRazorMeasured(seq, qeVTrack, domVTrack, b, out);
  var ax = _gamaQeRazorMeasured(seq, qeVTrack, domVTrack, a, out);
  if (ax === null || bx === null || !(bx - ax > 0.05)) {
    _gamaWrite(outPath, out.join('\n'));
    return 'ERR:Razor no vídeo falhou — me avise que eu leio o diag-cut.txt.';
  }
  out.push('cortes reais no video: [' + ax.toFixed(3) + ' → ' + bx.toFixed(3) + ']');

  // 2) razor nas tracks de áudio cruzando [ax,bx] — nos MESMOS pontos medidos
  for (var x = 0; x < nA; x++) {
    var aTrack = seq.audioTracks[x];
    if (!aTrack) continue;
    var spans = false;
    var nC = _gamaCount(aTrack.clips);
    for (var c = 0; c < nC; c++) {
      var s = -1;
      var e = -1;
      try {
        s = aTrack.clips[c].start.seconds;
        e = aTrack.clips[c].end.seconds;
      } catch (e3) {}
      if (s < ax + 0.001 && e > bx - 0.001) {
        spans = true;
        break;
      }
    }
    if (!spans) continue;
    var qeATrack = null;
    try {
      qeATrack = qeSeq.getAudioTrackAt(x);
    } catch (e4) {}
    if (!qeATrack) {
      out.push('A' + (x + 1) + ': QE track indisponível — áudio NÃO cortado!');
      continue;
    }
    _gamaQeRazorMeasured(seq, qeATrack, aTrack, bx, out);
    _gamaQeRazorMeasured(seq, qeATrack, aTrack, ax, out);
  }

  dumpState('APOS RAZORS');

  // 3) núcleo: remove meios (vídeo+áudio), fecha buracos com moves verificados
  var errC = _gamaCutCore(seq, qeSeq, vt, ax, bx, out);
  dumpState('FINAL');
  out.push('remStrat=' + ($.global.__gamaRemStrat || '-') + ' moveFmt=' + ($.global.__gamaMoveFmt || '-'));
  if (errC) {
    out.push('FALHOU: ' + errC);
    _gamaWrite(outPath, out.join('\n'));
    return 'ERR:' + errC;
  }
  _gamaWrite(outPath, out.join('\n'));
  return 'OK:Corte EXCLUÍDO e buraco fechado (vídeo + áudio ✔). Dá play e confere o sync!';
}

/* ============================================================
 * EXCLUSÃO MEDIDA — rippleDelete do QE é no-op silencioso no
 * PPro 23.6.8. Tenta várias estratégias e SÓ aceita se a track
 * realmente encolheu (prova, não fé).
 * ============================================================ */
function _gamaTrackLastEnd(track) {
  var n = _gamaCount(track ? track.clips : null);
  if (n < 1) return 0;
  try {
    return track.clips[n - 1].end.seconds;
  } catch (e) {}
  return 0;
}

function _gamaFindClipAt(track, s, e) {
  var n = _gamaCount(track ? track.clips : null);
  for (var i = 0; i < n; i++) {
    var cs = -1;
    var ce = -1;
    try {
      cs = track.clips[i].start.seconds;
      ce = track.clips[i].end.seconds;
    } catch (ex) {}
    if (Math.abs(cs - s) < 0.005 && Math.abs(ce - e) < 0.005) return i;
  }
  return -1;
}

// Remove o pedaço [s,e] da track (SEM exigir fechamento). null = sumiu.
// domO/qeO: handles já resolvidos (evita re-buscar a track a cada chamada)
function _gamaRemovePiece(seq, qeSeq, kind, ti, s, e, report, domO, qeO) {
  var domTrack = domO || null;
  var qeTrack = qeO || null;
  if (!domTrack) {
    try {
      domTrack = (kind === 'v') ? seq.videoTracks[ti] : seq.audioTracks[ti];
    } catch (e0) {}
  }
  if (!qeTrack) {
    try {
      qeTrack = (kind === 'v') ? qeSeq.getVideoTrackAt(ti) : qeSeq.getAudioTrackAt(ti);
    } catch (e1) {}
  }
  if (!domTrack) return 'track indisponivel';

  // dom00 primeiro: remove SEM ripple (buraco fica) — custo fixo por remoção.
  // Ripple por remoção = Premiere desloca todos os clipes seguintes = O(n²) no lote.
  var strategies = ['dom00', 'dom10', 'dom11', 'qe10', 'qe11', 'qesel'];
  var locked = $.global.__gamaRemStrat;
  if (locked) {
    for (var L = 0; L < strategies.length; L++) {
      if (strategies[L] === locked) {
        strategies.splice(L, 1);
        strategies.unshift(locked);
        break;
      }
    }
  }

  for (var si = 0; si < strategies.length; si++) {
    var st = strategies[si];
    var ord = _gamaFindClipAtFast(domTrack, s, e);
    if (ord < 0) return null; // já sumiu (ex.: remoção linkada) — objetivo atingido
    var called = false;
    try {
      if (st === 'dom00') {
        try {
          domTrack.clips[ord].remove(0, 0);
        } catch (eZ) {
          domTrack.clips[ord].remove(false, false);
        }
        called = true;
      } else if (st === 'dom10') {
        domTrack.clips[ord].remove(1, 0);
        called = true;
      } else if (st === 'dom11') {
        domTrack.clips[ord].remove(true, true);
        called = true;
      } else {
        if (!qeTrack) continue;
        var items = _gamaQeItemsOrdinais(qeTrack);
        if (ord >= items.length) continue;
        if (st === 'qe10') {
          items[ord].remove(1, 0);
          called = true;
        } else if (st === 'qe11') {
          items[ord].remove(true, false);
          called = true;
        } else {
          try {
            domTrack.clips[ord].setSelected(true, true);
          } catch (eS) {}
          items[ord].rippleDelete();
          called = true;
        }
      }
    } catch (eC) {
      if (report) report.push('remove ' + st + ': ERRO ' + eC.toString());
      continue;
    }
    if (!called) continue;
    if (_gamaFindClipAtFast(domTrack, s, e) < 0) {
      $.global.__gamaRemStrat = st;
      if (report) report.push('remove ' + st + ': pedaço removido ✔');
      return null;
    }
    if (report) report.push('remove ' + st + ': sem efeito');
  }
  return 'nenhum metodo removeu o pedaço';
}

// Move um clipe por delta segundos, com verificação. true = posição confere.
function _gamaMoveBy(clip, delta) {
  var oldS = -1;
  try {
    oldS = clip.start.seconds;
  } catch (e0) {
    return false;
  }
  var target = oldS + delta;
  var fmts = ['rel-num', 'rel-time', 'abs-time'];
  var locked = $.global.__gamaMoveFmt;
  if (locked) {
    for (var L = 0; L < fmts.length; L++) {
      if (fmts[L] === locked) {
        fmts.splice(L, 1);
        fmts.unshift(locked);
        break;
      }
    }
  }
  for (var i = 0; i < fmts.length; i++) {
    try {
      if (fmts[i] === 'rel-num') {
        clip.move(delta);
      } else {
        var t = new Time();
        t.seconds = (fmts[i] === 'rel-time') ? delta : target;
        clip.move(t);
      }
    } catch (eM) {
      continue;
    }
    var cur = -1;
    try {
      cur = clip.start.seconds;
    } catch (e1) {}
    if (Math.abs(cur - target) < 0.02) {
      $.global.__gamaMoveFmt = fmts[i];
      return true;
    }
    if (Math.abs(cur - oldS) > 0.001) {
      // mexeu pro lugar errado — tenta corrigir com o mesmo formato relativo
      try {
        clip.move(target - cur);
        cur = clip.start.seconds;
        if (Math.abs(cur - target) < 0.02) {
          $.global.__gamaMoveFmt = 'rel-num';
          return true;
        }
      } catch (eF) {}
      return false; // posição imprevisível — aborta pra não bagunçar
    }
  }
  return false;
}

// Fecha o buraco em gapStart puxando todos os clipes seguintes len p/ trás
function _gamaCloseGap(domTrack, gapStart, len, report) {
  var moved = 0;
  while (true) {
    // sempre pega o PRÓXIMO clipe depois do buraco (posições mudam a cada move)
    var n = _gamaCount(domTrack.clips);
    var best = null;
    var bestS = -1;
    for (var i = 0; i < n; i++) {
      var cs = -1;
      try {
        cs = domTrack.clips[i].start.seconds;
      } catch (e0) {}
      if (cs >= gapStart + len - 0.005 && (best === null || cs < bestS)) {
        best = domTrack.clips[i];
        bestS = cs;
      }
    }
    if (best === null) break; // nada mais pra puxar
    if (!_gamaMoveBy(best, -len)) {
      return 'falha ao mover clipe em ' + bestS.toFixed(2) + 's (apos ' + moved + ' moves)';
    }
    moved++;
    gapStart = bestS - len; // próximo buraco começa onde este clipe terminou de encaixar
    gapStart = gapStart + (best.end.seconds - best.start.seconds) - 0.0001;
    if (moved > 20000) return 'loop de moves excedeu limite';
  }
  if (report) report.push('gap fechado com ' + moved + ' move(s)');
  return null;
}

// Núcleo do corte: remove os meios de TODAS as tracks, depois fecha os buracos
function _gamaCutCore(seq, qeSeq, vt, ax, bx, report) {
  var len = bx - ax;
  var nA = _gamaCount(seq.audioTracks);

  // 1) remove o meio do vídeo
  var errV = _gamaRemovePiece(seq, qeSeq, 'v', vt, ax, bx, report);
  if (errV) return 'video: ' + errV;

  // 2) remove os meios de áudio ANTES de fechar qualquer buraco
  //    (evita colisão se moves de vídeo arrastarem áudio linkado)
  var audioTracksHit = [];
  for (var x = 0; x < nA; x++) {
    var aT = seq.audioTracks[x];
    if (!aT) continue;
    if (_gamaFindClipAt(aT, ax, bx) >= 0) {
      var errA = _gamaRemovePiece(seq, qeSeq, 'a', x, ax, bx, report);
      if (errA) return 'A' + (x + 1) + ': ' + errA;
      audioTracksHit.push(x);
    }
  }

  // 3) fecha o buraco no vídeo
  var errG = _gamaCloseGap(seq.videoTracks[vt], ax, len, report);
  if (errG) return 'video gap: ' + errG;

  // 4) fecha nas tracks de áudio (se moves linkados já fecharam, o loop acha 0)
  for (var y = 0; y < audioTracksHit.length; y++) {
    var errGA = _gamaCloseGap(seq.audioTracks[audioTracksHit[y]], ax, len, report);
    if (errGA) return 'A' + (audioTracksHit[y] + 1) + ' gap: ' + errGA;
  }
  return null;
}

/* ============================================================
 * CORTE EM LOTE — mesma lógica validada no experimento
 * ============================================================ */
// Corta [a,b] na track vt e fecha o buraco. Retorna null (ok) ou msg de erro.
function _gamaCutOne(seq, qeSeq, vt, a, b) {
  var domV = null;
  var qeV = null;
  try {
    domV = seq.videoTracks[vt];
    qeV = qeSeq.getVideoTrackAt(vt);
  } catch (e0) {}
  if (!domV || !qeV) return 'track V' + (vt + 1) + ' indisponivel';

  var bx = _gamaQeRazorMeasured(seq, qeV, domV, b, null);
  var ax = _gamaQeRazorMeasured(seq, qeV, domV, a, null);
  if (ax === null || bx === null || !(bx - ax > 0.05)) {
    return 'razor falhou em [' + a.toFixed(2) + '-' + b.toFixed(2) + ']';
  }

  // áudio: fatia nas mesmas posições medidas as tracks que cruzam [ax,bx]
  var nA = _gamaCount(seq.audioTracks);
  for (var x = 0; x < nA; x++) {
    var aTrack = seq.audioTracks[x];
    if (!aTrack) continue;
    var spans = false;
    var nC = _gamaCount(aTrack.clips);
    for (var c = 0; c < nC; c++) {
      var s = -1;
      var e = -1;
      try {
        s = aTrack.clips[c].start.seconds;
        e = aTrack.clips[c].end.seconds;
      } catch (e1) {}
      if (s < ax + 0.001 && e > bx - 0.001) {
        spans = true;
        break;
      }
    }
    if (!spans) continue;
    var qeA = null;
    try {
      qeA = qeSeq.getAudioTrackAt(x);
    } catch (e2) {}
    if (!qeA) continue;
    _gamaQeRazorMeasured(seq, qeA, aTrack, bx, null);
    _gamaQeRazorMeasured(seq, qeA, aTrack, ax, null);
  }

  // remove os meios (vídeo + áudio) e fecha os buracos com moves verificados
  return _gamaCutCore(seq, qeSeq, vt, ax, bx, null);
}

// duração real da sequência = fim do último clipe (vídeo ou áudio)
function _gamaSeqDur(seq) {
  var d = 0;
  function scan(tracks) {
    var nT = _gamaCount(tracks);
    for (var t = 0; t < nT; t++) {
      var tr = tracks[t];
      if (!tr) continue;
      var n = _gamaCount(tr.clips);
      if (n > 0) {
        try {
          var e = tr.clips[n - 1].end.seconds;
          if (e > d) d = e;
        } catch (ex) {}
      }
    }
  }
  try {
    scan(seq.videoTracks);
    scan(seq.audioTracks);
  } catch (e0) {}
  return d;
}

// planStr: "t,a,b;t,a,b;..." | doClone: 'yes' cria cópia de segurança antes
function gamaCutBatchStart(planStr, doClone) {
  var seq = _gamaActiveSeq();
  if (!seq) return 'ERR:Nenhuma sequência ativa.';

  var cloned = 'nao';
  if (doClone === 'yes') {
    // guarda os IDs existentes pra identificar a cópia nova
    var beforeIds = {};
    try {
      var seqs = app.project.sequences;
      for (var i0 = 0; i0 < _gamaCount(seqs); i0++) {
        try {
          beforeIds[String(seqs[i0].sequenceID)] = true;
        } catch (eB) {}
      }
    } catch (eA) {}

    try {
      seq.clone();
      cloned = 'sim';
    } catch (eC) {
      return 'ERR:Falha ao criar cópia de segurança: ' + eC.toString();
    }

    // renomeia a cópia pra ficar óbvio qual é o backup
    try {
      var seqs2 = app.project.sequences;
      for (var j0 = 0; j0 < _gamaCount(seqs2); j0++) {
        var sid = '';
        try {
          sid = String(seqs2[j0].sequenceID);
        } catch (eD) {}
        if (sid && !beforeIds[sid]) {
          try {
            var dt = new Date();
            var hh = (dt.getHours() < 10 ? '0' : '') + dt.getHours();
            var mi = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
            seqs2[j0].name = seq.name + ' [BACKUP GAMA ' + hh + ':' + mi + ']';
          } catch (eE) {}
          break;
        }
      }
    } catch (eF) {}

    // garante que os cortes acontecem na sequência ORIGINAL (a que o usuário vê)
    try {
      app.project.activeSequence = seq;
    } catch (eG) {}
  }

  seq = _gamaActiveSeq();
  if (!seq) return 'ERR:Perdi a sequência ativa após o clone.';

  try {
    app.enableQE();
  } catch (eQ) {
    return 'ERR:enableQE falhou.';
  }

  var list = [];
  var parts = String(planStr).split(';');
  for (var i = 0; i < parts.length; i++) {
    var f = parts[i].split(',');
    if (f.length < 3) continue;
    var t = parseInt(f[0], 10);
    var a = parseFloat(f[1]);
    var b = parseFloat(f[2]);
    if (isNaN(t) || isNaN(a) || isNaN(b)) continue;
    list.push([t, a, b]);
  }
  if (!list.length) return 'ERR:Plano de cortes vazio.';
  // fim → início: cada remoção só desloca o que vem DEPOIS dela
  list.sort(function (x, y) {
    return y[1] - x[1];
  });

  $.global.__gamaCutBatch = { list: list, pos: 0, ok: 0, fail: 0, firstErr: '' };
  return 'OK:' + list.length + '|' + cloned + '|' + _gamaSeqDur(seq).toFixed(2) + '|' + seq.name;
}

function gamaCutBatchStep(count) {
  var B = $.global.__gamaCutBatch;
  if (!B) return 'ERR:Nenhum lote de corte ativo.';
  var seq = _gamaActiveSeq();
  if (!seq) return 'ERR:A sequência não está mais ativa.';
  var qeSeq = null;
  try {
    qeSeq = qe.project.getActiveSequence();
  } catch (e0) {}
  if (!qeSeq) return 'ERR:QE sem sequência ativa.';

  var n = Number(count) || 5;
  var end = Math.min(B.pos + n, B.list.length);
  for (; B.pos < end; B.pos++) {
    var it = B.list[B.pos];
    var err = _gamaCutOne(seq, qeSeq, it[0], it[1], it[2]);
    if (err) {
      B.fail++;
      if (!B.firstErr) B.firstErr = err.replace(/\|/g, '/');
    } else {
      B.ok++;
    }
  }
  return 'OK:' + B.pos + '|' + B.list.length + '|' + B.ok + '|' + B.fail + '|' + B.firstErr;
}

function gamaCutBatchEnd() {
  var B = $.global.__gamaCutBatch;
  $.global.__gamaCutBatch = null;
  var dur = 0;
  var seq = _gamaActiveSeq();
  if (seq) dur = _gamaSeqDur(seq);
  if (!B) return 'OK:0|0|0|0|' + dur.toFixed(2) + '|';
  return 'OK:' + B.pos + '|' + B.list.length + '|' + B.ok + '|' + B.fail + '|' + dur.toFixed(2) + '|' + B.firstErr;
}

/* ============================================================
 * BUSCA BINÁRIA — cada leitura de propriedade é uma chamada
 * lenta ao host; com milhares de clipes, varrer a track toda
 * a cada corte explode ao quadrado (9h pra 790 cortes!).
 * Busca binária: ~11 leituras em vez de ~3200.
 * ============================================================ */
// Último clipe com start <= t (retorna índice, start, end e total)
function _gamaClipIdxNear(track, t) {
  var n = _gamaCount(track ? track.clips : null);
  if (n < 1) return { i: -1, s: -1, e: -1, n: 0 };
  var lo = 0;
  var hi = n - 1;
  var best = 0;
  while (lo <= hi) {
    var mid = (lo + hi) >> 1;
    var s = -1;
    try {
      s = track.clips[mid].start.seconds;
    } catch (ex) {}
    if (s <= t) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  var bs = -1;
  var be = -1;
  try {
    bs = track.clips[best].start.seconds;
    be = track.clips[best].end.seconds;
  } catch (e2) {}
  return { i: best, s: bs, e: be, n: n };
}

// O clipe que contém ax cobre [ax,bx] inteiro?
function _gamaSpansFast(track, ax, bx) {
  var c = _gamaClipIdxNear(track, ax + 0.001);
  if (c.i < 0) return false;
  return c.s <= ax + 0.001 && c.e >= bx - 0.001;
}

// Acha o clipe exatamente em [s,e] olhando só 3 candidatos
function _gamaFindClipAtFast(track, s, e) {
  var c = _gamaClipIdxNear(track, s + 0.001);
  if (c.i < 0) return -1;
  for (var k = -1; k <= 1; k++) {
    var i = c.i + k;
    if (i < 0 || i >= c.n) continue;
    var cs = -1;
    var ce = -1;
    try {
      cs = track.clips[i].start.seconds;
      ce = track.clips[i].end.seconds;
    } catch (ex) {}
    if (Math.abs(cs - s) < 0.005 && Math.abs(ce - e) < 0.005) return i;
  }
  return -1;
}

// Razor rápido: acha o clipe por busca binária, corta com o formato
// já descoberto e mede SÓ a vizinhança. Cai pro método completo se algo fugir.
function _gamaRazorFast(seq, qeTrack, domTrack, t) {
  var fd = _gamaFrameDur(seq);
  var tol = fd * 1.5;
  var c = _gamaClipIdxNear(domTrack, t);
  if (c.i < 0) return null;

  // borda já existe por perto?
  if (Math.abs(c.s - t) <= tol) return c.s;
  if (Math.abs(c.e - t) <= tol) return c.e;
  if (c.i + 1 < c.n) {
    var ns = -1;
    try {
      ns = domTrack.clips[c.i + 1].start.seconds;
    } catch (e0) {}
    if (ns >= 0 && Math.abs(ns - t) <= tol) return ns;
  }

  // t precisa cair DENTRO de um clipe (senão está num gap — nada a fatiar)
  if (!(t > c.s + tol && t < c.e - tol)) {
    if (c.i + 1 < c.n) {
      var s2 = -1;
      var e2 = -1;
      try {
        s2 = domTrack.clips[c.i + 1].start.seconds;
        e2 = domTrack.clips[c.i + 1].end.seconds;
      } catch (e1) {}
      if (t > s2 + tol && t < e2 - tol) {
        c = { i: c.i + 1, s: s2, e: e2, n: c.n };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  var fmt = $.global.__gamaRazorFmt;
  if (!fmt) return _gamaQeRazorMeasured(seq, qeTrack, domTrack, t, null); // 1ª vez: sonda completa

  var tcStr = (fmt === 'ticks') ? _gamaSecsToTicksStr(t) : _gamaSecsToTimecodeStr(seq, t, fmt === 'tc;' ? ';' : ':');
  try {
    qeTrack.razor(tcStr);
  } catch (eR) {
    return _gamaQeRazorMeasured(seq, qeTrack, domTrack, t, null);
  }

  // mede localmente: o pedaço esquerdo deve terminar perto de t
  var e1 = -1;
  try {
    e1 = domTrack.clips[c.i].end.seconds;
  } catch (e3) {}
  if (e1 >= 0 && e1 < c.e - 0.001 && Math.abs(e1 - t) <= 3 * fd) return e1;
  var s1 = -1;
  try {
    s1 = domTrack.clips[c.i + 1].start.seconds;
  } catch (e4) {}
  if (s1 >= 0 && Math.abs(s1 - t) <= 3 * fd) return s1;

  return _gamaQeRazorMeasured(seq, qeTrack, domTrack, t, null); // raro: mede do jeito completo
}

/* ============================================================
 * MOTOR 3 FASES — fatiar tudo → excluir tudo → unir tudo
 * Fase 1: razors (nada se move — posições sempre válidas)
 * Fase 2: remove os meios (deixa buracos — nada se move)
 * Fase 3: cada clipe move UMA vez pra posição final calculada
 * ============================================================ */
function gamaCut2Start(planStr, doClone) {
  var seq = _gamaActiveSeq();
  if (!seq) return 'ERR:Nenhuma sequência ativa.';

  var cloned = 'nao';
  if (doClone === 'yes') {
    var beforeIds = {};
    try {
      var seqs = app.project.sequences;
      for (var i0 = 0; i0 < _gamaCount(seqs); i0++) {
        try {
          beforeIds[String(seqs[i0].sequenceID)] = true;
        } catch (eB) {}
      }
    } catch (eA) {}
    try {
      seq.clone();
      cloned = 'sim';
    } catch (eC) {
      return 'ERR:Falha ao criar cópia de segurança: ' + eC.toString();
    }
    try {
      var seqs2 = app.project.sequences;
      for (var j0 = 0; j0 < _gamaCount(seqs2); j0++) {
        var sid = '';
        try {
          sid = String(seqs2[j0].sequenceID);
        } catch (eD) {}
        if (sid && !beforeIds[sid]) {
          try {
            var dt = new Date();
            var hh = (dt.getHours() < 10 ? '0' : '') + dt.getHours();
            var mi = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
            seqs2[j0].name = seq.name + ' [BACKUP GAMA ' + hh + ':' + mi + ']';
          } catch (eE) {}
          break;
        }
      }
    } catch (eF) {}
    try {
      app.project.activeSequence = seq;
    } catch (eG) {}
  }

  seq = _gamaActiveSeq();
  if (!seq) return 'ERR:Perdi a sequência ativa.';
  try {
    app.enableQE();
  } catch (eQ) {
    return 'ERR:enableQE falhou.';
  }

  var list = [];
  var parts = String(planStr).split(';');
  for (var i = 0; i < parts.length; i++) {
    var f = parts[i].split(',');
    if (f.length < 3) continue;
    var t = parseInt(f[0], 10);
    var a = parseFloat(f[1]);
    var b = parseFloat(f[2]);
    if (isNaN(t) || isNaN(a) || isNaN(b)) continue;
    list.push({ t: t, a: a, b: b, ax: -1, bx: -1, aud: [], ok: false });
  }
  if (!list.length) return 'ERR:Plano de cortes vazio.';

  // preferimos exclusão SEM ripple (dom00) — o fechamento acontece 1x na fase final
  $.global.__gamaRemStrat = 'dom00';

  $.global.__gamaCut2 = {
    phase: 1,
    iv: list,
    pos: 0,
    jobs: null,
    jobPos: 0,
    fail: 0,
    firstErr: '',
    durBefore: _gamaSeqDur(seq)
  };
  return 'OK:' + list.length + '|' + cloned + '|' + _gamaSeqDur(seq).toFixed(2) + '|' + seq.name;
}

function gamaCut2Step(count) {
  var S = $.global.__gamaCut2;
  if (!S) return 'ERR:Nenhum corte em andamento.';
  var seq = _gamaActiveSeq();
  if (!seq) return 'ERR:A sequência não está mais ativa.';
  var qeSeq = null;
  try {
    qeSeq = qe.project.getActiveSequence();
  } catch (e0) {}
  if (!qeSeq) return 'ERR:QE sem sequência ativa.';

  var n = Number(count) || 10;
  var nA = _gamaCount(seq.audioTracks);

  // ---------- FASE 1: fatiar E excluir por trecho (fim → início) ----------
  // A track nunca infla: cada trecho é fatiado e removido na hora.
  // Ordem desc garante que remoções (com ou sem ripple) não invalidam
  // as posições dos trechos anteriores.
  if (S.phase === 1) {
    var vDom = {};
    var vQe = {};
    var aDom = {};
    var aQe = {};
    var end1 = Math.min(S.pos + n, S.iv.length);
    for (; S.pos < end1; S.pos++) {
      var iv = S.iv[S.pos];
      if (!vDom.hasOwnProperty(iv.t)) {
        var dv = null;
        var qv = null;
        try {
          dv = seq.videoTracks[iv.t];
          qv = qeSeq.getVideoTrackAt(iv.t);
        } catch (e1) {}
        vDom[iv.t] = dv;
        vQe[iv.t] = qv;
      }
      var domV = vDom[iv.t];
      var qeV = vQe[iv.t];
      if (!domV || !qeV) {
        S.fail++;
        if (!S.firstErr) S.firstErr = 'track V' + (iv.t + 1) + ' indisponivel';
        continue;
      }

      // fatia vídeo
      var bx = _gamaRazorFast(seq, qeV, domV, iv.b);
      var ax = _gamaRazorFast(seq, qeV, domV, iv.a);
      if (ax === null || bx === null || !(bx - ax > 0.05)) {
        S.fail++;
        if (!S.firstErr) S.firstErr = 'razor falhou em [' + iv.a.toFixed(2) + '-' + iv.b.toFixed(2) + ']';
        continue;
      }
      iv.ax = ax;
      iv.bx = bx;

      // fatia áudio que cruza o intervalo
      for (var x = 0; x < nA; x++) {
        if (!aDom.hasOwnProperty(x)) {
          var da = null;
          var qa = null;
          try {
            da = seq.audioTracks[x];
            qa = qeSeq.getAudioTrackAt(x);
          } catch (e3) {}
          aDom[x] = da;
          aQe[x] = qa;
        }
        var aT = aDom[x];
        if (!aT || !aQe[x]) continue;
        if (!_gamaSpansFast(aT, ax, bx)) continue;
        _gamaRazorFast(seq, aQe[x], aT, bx);
        _gamaRazorFast(seq, aQe[x], aT, ax);
        iv.aud.push(x);
      }

      // exclui na hora (track volta ao tamanho de antes)
      var errV = _gamaRemovePiece(seq, qeSeq, 'v', iv.t, ax, bx, null, domV, qeV);
      if (errV) {
        iv.ok = false;
        S.fail++;
        if (!S.firstErr) S.firstErr = 'video: ' + errV;
        continue;
      }
      for (var y = 0; y < iv.aud.length; y++) {
        var ai = iv.aud[y];
        if (_gamaFindClipAtFast(aDom[ai], ax, bx) >= 0) {
          _gamaRemovePiece(seq, qeSeq, 'a', ai, ax, bx, null, aDom[ai], aQe[ai]);
        }
      }
      iv.ok = true;
    }
    if (S.pos >= S.iv.length) {
      S.jobs = _gamaPhase3Build(seq);
      S.phase = 3;
      S.jobPos = 0;
      S.pos = 0;
    }
    return 'OK:1|' + S.pos + '|' + S.iv.length + '|' + S.fail;
  }

  // ---------- FASE 2 (legado — o fluxo novo pula direto pra 3) ----------
  if (S.phase === 2) {
    S.jobs = _gamaPhase3Build(seq);
    S.phase = 3;
    S.jobPos = 0;
    S.pos = 0;
    return 'OK:2|' + S.iv.length + '|' + S.iv.length + '|' + S.fail;
  }

  // ---------- FASE 3: unir — cada clipe move 1x pra posição final ----------
  if (S.phase === 3) {
    var movesLeft = n;
    var totalMoves = 0;
    var doneMoves = 0;
    for (var j = 0; j < S.jobs.length; j++) {
      totalMoves += S.jobs[j].targets.length;
      if (j < S.jobPos) doneMoves += S.jobs[j].targets.length;
    }
    doneMoves += S.pos;

    while (movesLeft > 0 && S.jobPos < S.jobs.length) {
      var job = S.jobs[S.jobPos];
      var track = (job.kind === 'v') ? seq.videoTracks[job.idx] : seq.audioTracks[job.idx];
      if (!track) {
        S.jobPos++;
        S.pos = 0;
        continue;
      }
      var endM = Math.min(S.pos + movesLeft, job.targets.length);
      for (; S.pos < endM; S.pos++) {
        var tg = job.targets[S.pos];
        var clip = null;
        try {
          clip = track.clips[tg.ord];
        } catch (e4) {}
        if (!clip) continue;
        var cur = -1;
        try {
          cur = clip.start.seconds;
        } catch (e5) {}
        var delta = tg.target - cur;
        if (Math.abs(delta) < 0.01) continue; // já no lugar (drag de link)
        if (!_gamaMoveBy(clip, delta)) {
          S.fail++;
          if (!S.firstErr) S.firstErr = 'move falhou em ' + cur.toFixed(2) + 's (' + (job.kind === 'v' ? 'V' : 'A') + (job.idx + 1) + ')';
        }
        doneMoves++;
        movesLeft--;
        if (movesLeft <= 0) break;
      }
      if (S.pos >= job.targets.length) {
        S.jobPos++;
        S.pos = 0;
      }
    }
    if (S.jobPos >= S.jobs.length) {
      S.phase = 4;
    }
    return 'OK:3|' + doneMoves + '|' + totalMoves + '|' + S.fail;
  }

  return 'OK:4|0|0|' + S.fail;
}

// Monta os alvos da fase 3 MEDINDO os buracos reais deixados pela fase 2.
// Se a exclusão já fechou os buracos (remove com ripple), acha 0 → fase 3 vira no-op.
// Isso evita o "mover duas vezes" que roubava conteúdo bom.
function _gamaPhase3Build(seq) {
  var S = $.global.__gamaCut2;
  var jobs = [];
  var trackCuts = {}; // 'v0' | 'a1' -> [[ax,bx],...]

  for (var i = 0; i < S.iv.length; i++) {
    var iv = S.iv[i];
    if (!iv.ok) continue;
    var kv = 'v' + iv.t;
    if (!trackCuts[kv]) trackCuts[kv] = [];
    trackCuts[kv].push([iv.ax, iv.bx]);
    for (var y = 0; y < iv.aud.length; y++) {
      var ka = 'a' + iv.aud[y];
      if (!trackCuts[ka]) trackCuts[ka] = [];
      trackCuts[ka].push([iv.ax, iv.bx]);
    }
  }

  for (var key in trackCuts) {
    if (!trackCuts.hasOwnProperty(key)) continue;
    var kind = key.charAt(0);
    var idx = parseInt(key.substring(1), 10);
    var track = (kind === 'v') ? seq.videoTracks[idx] : seq.audioTracks[idx];
    if (!track) continue;

    var cuts = trackCuts[key];
    cuts.sort(function (p, q) { return p[0] - q[0]; });

    // snapshot ÚNICO da track (2 leituras por clipe) — todo o resto é memória
    var nC0 = _gamaCount(track.clips);
    var starts = [];
    var ends = [];
    for (var c0 = 0; c0 < nC0; c0++) {
      var cs = -1;
      var ce = -1;
      try {
        cs = track.clips[c0].start.seconds;
        ce = track.clips[c0].end.seconds;
      } catch (eM) {}
      starts.push(cs);
      ends.push(ce);
    }

    // MEDIÇÃO em memória: o buraco realmente existe? (arrays ordenados → early break)
    var gaps = [];
    var scanFrom = 0;
    for (var k = 0; k < cuts.length; k++) {
      var ax = cuts[k][0];
      var bx = cuts[k][1];
      var inside = false;
      var startsAtB = false;
      while (scanFrom < nC0 && ends[scanFrom] < ax - 0.02) scanFrom++;
      for (var c1 = scanFrom; c1 < nC0; c1++) {
        if (starts[c1] > bx + 0.03) break;
        if (starts[c1] > ax + 0.02 && starts[c1] < bx - 0.02) inside = true;
        else if (ends[c1] > ax + 0.02 && ends[c1] < bx - 0.02) inside = true;
        else if (starts[c1] <= ax + 0.02 && ends[c1] >= bx - 0.02) inside = true;
        if (Math.abs(starts[c1] - bx) <= 0.02) startsAtB = true;
      }
      if (!inside && startsAtB) gaps.push([ax, bx]);
    }
    if (!gaps.length) continue; // buracos já fechados nesta track → nada a unir

    // alvos em memória: shift acumulado com ponteiro (O(n + buracos))
    var targets = [];
    var gPtr = 0;
    var shift = 0;
    for (var c = 0; c < nC0; c++) {
      var st = starts[c];
      if (st < 0) continue;
      while (gPtr < gaps.length && gaps[gPtr][1] <= st + 0.01) {
        shift += (gaps[gPtr][1] - gaps[gPtr][0]);
        gPtr++;
      }
      if (shift > 0.005) {
        targets.push({ ord: c, target: st - shift });
      }
    }
    if (targets.length) {
      // ordem crescente: cada clipe entra no espaço já liberado à esquerda
      jobs.push({ kind: kind, idx: idx, targets: targets });
    }
  }
  return jobs;
}

function gamaCut2End() {
  var S = $.global.__gamaCut2;
  $.global.__gamaCut2 = null;
  var dur = 0;
  var seq = _gamaActiveSeq();
  if (seq) dur = _gamaSeqDur(seq);
  if (!S) return 'OK:0|0|' + dur.toFixed(2) + '|';
  var okCount = 0;
  for (var i = 0; i < S.iv.length; i++) {
    if (S.iv[i].ok) okCount++;
  }
  return 'OK:' + okCount + '|' + S.fail + '|' + dur.toFixed(2) + '|' + S.firstErr;
}

/* ============================================================
 * MARCADORES DA IA — mostra na timeline onde a IA quer cortar
 * ============================================================ */
function gamaClearGamaMarkers() {
  var seq = _gamaActiveSeq();
  if (!seq) return 'ERR:Nenhuma sequência ativa.';
  var removed = 0;
  try {
    var mk = seq.markers;
    var m = mk.getFirstMarker();
    while (m) {
      var next = null;
      try {
        next = mk.getNextMarker(m);
      } catch (e1) {}
      var nm = '';
      try {
        nm = String(m.name);
      } catch (e2) {}
      if (nm.indexOf('[GAMA]') === 0) {
        try {
          mk.deleteMarker(m);
          removed++;
        } catch (e3) {}
      }
      m = next;
    }
  } catch (e0) {
    return 'ERR:' + e0.toString();
  }
  return 'OK:' + removed;
}

// dataStr: "a,b,labelEncodado;;a,b,label..." (label em encodeURIComponent)
function gamaAddMarkers(dataStr) {
  var seq = _gamaActiveSeq();
  if (!seq) return 'ERR:Nenhuma sequência ativa.';
  var items = String(dataStr).split(';;');
  var added = 0;
  for (var i = 0; i < items.length; i++) {
    var p = items[i].split(',');
    if (p.length < 3) continue;
    var a = parseFloat(p[0]);
    var b = parseFloat(p[1]);
    if (isNaN(a)) continue;
    var label = '';
    try {
      label = decodeURIComponent(p.slice(2).join(','));
    } catch (e1) {
      label = p[2];
    }
    try {
      var m = seq.markers.createMarker(a);
      m.name = '[GAMA] ' + label;
      if (!isNaN(b) && b > a) m.end = b;
      try {
        m.setColorByIndex(3); // verde na maioria das versões
      } catch (eC) {}
      added++;
    } catch (e2) {}
  }
  return 'OK:' + added;
}

/* ============================================================
 * Info rápida da sequência (para o painel)
 * ============================================================ */
function gamaSequenceInfo() {
  var seq = _gamaActiveSeq();
  if (!seq) return 'ERR:Nenhuma sequência ativa';

  var nTracks = _gamaCount(seq.videoTracks);
  var clips = 0;
  var selected = 0;
  for (var t = 0; t < nTracks; t++) {
    var track = seq.videoTracks[t];
    if (!track) continue;
    var nClips = _gamaCount(track.clips);
    clips += nClips;
    for (var c = 0; c < nClips; c++) {
      if (_gamaIsSelected(track.clips[c])) selected++;
    }
  }
  return 'OK:' + seq.name + ' — ' + clips + ' clipe(s) de vídeo, ' + selected + ' selecionado(s)';
}

/* ============================================================
 * DIAGNÓSTICO — grava relatório técnico em arquivo
 * ============================================================ */
// Lista métodos de um objeto host via reflection (nome + argumentos)
function _gamaMethodsList(obj) {
  var names = [];
  try {
    var ms = obj.reflect.methods;
    for (var i = 0; i < ms.length; i++) {
      var nm = '';
      try {
        nm = String(ms[i].name);
      } catch (e1) {}
      var argStr = '';
      try {
        var ar = ms[i].arguments;
        if (ar && ar.length) {
          var an = [];
          for (var j = 0; j < ar.length; j++) {
            an.push(String(ar[j].name));
          }
          argStr = '(' + an.join(',') + ')';
        }
      } catch (e2) {}
      names.push(nm + argStr);
    }
    names.sort();
  } catch (e3) {
    return '<reflect erro: ' + e3.toString() + '>';
  }
  return names.join(', ');
}

function _gamaWrite(path, text) {
  try {
    var f = new File(path);
    f.encoding = 'UTF-8';
    if (f.open('w')) {
      f.write(text);
      f.close();
      return true;
    }
  } catch (e) {}
  return false;
}

function gamaDiag(outPath) {
  var out = [];
  out.push('=== GAMA MACROS DIAG v' + gamaVersion() + ' ===');
  try {
    out.push('Premiere: ' + app.version);
  } catch (eA) {}

  var seq = _gamaActiveSeq();
  if (!seq) {
    _gamaWrite(outPath, out.join('\n') + '\nSEM SEQUENCIA ATIVA');
    return 'ERR:Nenhuma sequência ativa';
  }
  out.push('Seq: ' + seq.name);

  var frame = _gamaSeqFrame(seq);
  out.push('Quadro da seq: ' + (frame ? frame.w + 'x' + frame.h : 'NAO LIDO'));

  try {
    app.enableQE();
    out.push('enableQE: ok');
  } catch (eB) {
    out.push('enableQE ERRO: ' + eB.toString());
  }

  var qeSeq = null;
  try {
    qeSeq = qe.project.getActiveSequence();
  } catch (eC) {}
  out.push('qeSeq: ' + (qeSeq ? 'ok' : 'NULL'));

  // localiza o primeiro clipe selecionado
  var selT = -1;
  var selC = -1;
  var selClip = null;
  var nTracks = _gamaCount(seq.videoTracks);
  for (var t = 0; t < nTracks && !selClip; t++) {
    var track = seq.videoTracks[t];
    if (!track) continue;
    var nClips = _gamaCount(track.clips);
    for (var c = 0; c < nClips; c++) {
      if (_gamaIsSelected(track.clips[c])) {
        selT = t;
        selC = c;
        selClip = track.clips[c];
        break;
      }
    }
  }
  if (!selClip) {
    _gamaWrite(outPath, out.join('\n') + '\nNENHUM CLIPE SELECIONADO');
    return 'ERR:Selecione 1 clipe antes do diagnóstico';
  }

  out.push('--- DOM ---');
  out.push('Sel: track V' + (selT + 1) + ' clipIndex=' + selC + ' nome="' + selClip.name + '"');
  try {
    out.push('start: ticks=' + selClip.start.ticks + ' secs=' + selClip.start.seconds);
  } catch (eD) {
    out.push('start ERRO: ' + eD.toString());
  }
  out.push('clips na track: ' + _gamaCount(seq.videoTracks[selT].clips));

  // Inspeção do caminho Motion (fallback)
  var dims = _gamaMediaDims(selClip.projectItem);
  out.push('mediaDims (VideoInfo): ' + (dims ? dims.w + 'x' + dims.h : 'NAO DETECTADO'));
  try {
    var comps = selClip.components;
    var nComps = _gamaCount(comps);
    var mns = [];
    for (var i2 = 0; i2 < nComps; i2++) {
      var mn2 = '?';
      try {
        mn2 = String(comps[i2].matchName);
      } catch (eN) {}
      mns.push(mn2);
    }
    out.push('components (' + nComps + '): ' + mns.join(' | '));
  } catch (eO) {
    out.push('components ERRO: ' + eO.toString());
  }

  out.push('--- QE ---');
  if (qeSeq) {
    var qeTrack = null;
    try {
      qeTrack = qeSeq.getVideoTrackAt(selT);
    } catch (eE) {
      out.push('getVideoTrackAt ERRO: ' + eE.toString());
    }
    if (qeTrack) {
      var nItems = 0;
      try {
        nItems = qeTrack.numItems;
      } catch (eF) {}
      out.push('numItems: ' + nItems);

      var hist = {};
      var nonEmpty = 0;
      var target = null;
      for (var i = 0; i < nItems; i++) {
        var item = null;
        try {
          item = qeTrack.getItemAt(i);
        } catch (eG) {}
        if (!item) {
          hist['<null>'] = (hist['<null>'] || 0) + 1;
          continue;
        }
        var ty = '<erro>';
        try {
          ty = String(item.type);
        } catch (eH) {}
        hist[ty] = (hist[ty] || 0) + 1;
        if (ty === 'Empty') continue;
        if (nonEmpty === selC && !target) target = item;
        nonEmpty++;
      }
      var histStr = '';
      for (var k in hist) {
        if (hist.hasOwnProperty(k)) histStr += k + '=' + hist[k] + ' ';
      }
      out.push('tipos: ' + histStr + '| naoVazios=' + nonEmpty);
      out.push('SONDA QE track metodos: ' + _gamaMethodsList(qeTrack));

      if (target) {
        var tName = '?';
        try {
          tName = String(target.name);
        } catch (eI) {}
        var tType = '?';
        try {
          tType = String(target.type);
        } catch (eJ) {}
        out.push('alvo (idx ' + selC + '): nome="' + tName + '" type=' + tType);
        out.push('typeof setScaleToFrameSize: ' + (typeof target.setScaleToFrameSize));

        try {
          var ms = target.reflect.methods;
          var names = [];
          for (var mI = 0; mI < ms.length; mI++) {
            names.push(String(ms[mI].name));
          }
          names.sort();
          out.push('metodos QE do item: ' + names.join(', '));
        } catch (eL) {
          out.push('reflect ERRO: ' + eL.toString());
        }

        try {
          var r = target.setScaleToFrameSize();
          out.push('CHAMADA setScaleToFrameSize: SUCESSO retorno=' + r);
        } catch (eM) {
          out.push('CHAMADA setScaleToFrameSize ERRO: ' + eM.toString());
        }
      } else {
        out.push('alvo NAO ENCONTRADO para idx ' + selC);
      }
    }
  }

  // Sonda de primitivas de corte (para a macro remover silêncios)
  out.push('--- SONDA DE CORTE ---');
  out.push('DOM trackItem metodos: ' + _gamaMethodsList(selClip));
  try {
    out.push('typeof selClip.remove: ' + (typeof selClip.remove));
  } catch (eP1) {
    out.push('selClip.remove ERRO: ' + eP1.toString());
  }
  try {
    out.push('typeof seq.clone: ' + (typeof seq.clone));
  } catch (eP2) {
    out.push('seq.clone ERRO: ' + eP2.toString());
  }
  try {
    out.push('typeof selClip.getSpeed: ' + (typeof selClip.getSpeed) + (typeof selClip.getSpeed === 'function' ? ' valor=' + selClip.getSpeed() : ''));
  } catch (eP3) {
    out.push('getSpeed ERRO: ' + eP3.toString());
  }
  try {
    out.push('mediaPath: ' + String(selClip.projectItem.getMediaPath()));
  } catch (eP4) {
    out.push('getMediaPath ERRO: ' + eP4.toString());
  }

  // Teste real do caminho Motion no clipe selecionado
  out.push('--- TESTE MOTION ---');
  if (frame && dims) {
    var pct = Math.min(frame.w / dims.w, frame.h / dims.h) * 100;
    pct = Math.round(pct * 100) / 100;
    var okM = _gamaSetMotionScale(selClip, pct);
    out.push('setMotionScale(' + pct + '): ' + (okM ? 'SUCESSO' : 'FALHOU'));
  } else {
    out.push('sem frame/dims — teste pulado');
  }

  var wrote = _gamaWrite(outPath, out.join('\n'));
  return wrote ? 'OK:Diagnóstico salvo em diag.txt' : 'ERR:Não consegui gravar o diag.txt';
}

'GAMA Macros host carregado';
