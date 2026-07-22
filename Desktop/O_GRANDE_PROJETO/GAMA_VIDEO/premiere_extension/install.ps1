# GAMA Macros — Instalador (Windows)
# Copia a extensão para a pasta CEP do usuário e habilita extensões não-assinadas.
# Uso: botão direito → "Executar com PowerShell" (ou: powershell -ExecutionPolicy Bypass -File install.ps1)

$ErrorActionPreference = 'Stop'

$src = Join-Path $PSScriptRoot 'gama-macros'
$dst = Join-Path $env:APPDATA 'Adobe\CEP\extensions\com.gama.macros'

Write-Host ''
Write-Host '=== GAMA Macros — Instalador ===' -ForegroundColor Cyan

if (-not (Test-Path (Join-Path $src 'CSXS\manifest.xml'))) {
    Write-Host "ERRO: fonte não encontrada em $src" -ForegroundColor Red
    exit 1
}

# 1) Copia a extensão (preserva logs/relatórios existentes no destino)
New-Item -ItemType Directory -Force $dst | Out-Null
Copy-Item "$src\*" $dst -Recurse -Force
Write-Host "✔ Extensão copiada para: $dst" -ForegroundColor Green

# 2) PlayerDebugMode como STRING (DWord NÃO funciona — CEP ignora silenciosamente!)
foreach ($v in 11, 12) {
    $key = "HKCU:\Software\Adobe\CSXS.$v"
    if (-not (Test-Path $key)) { New-Item -Path $key -Force | Out-Null }
    try { Remove-ItemProperty -Path $key -Name PlayerDebugMode -Force -ErrorAction Stop } catch {}
    New-ItemProperty -Path $key -Name PlayerDebugMode -PropertyType String -Value '1' -Force | Out-Null
    Write-Host "✔ PlayerDebugMode=1 (String) em CSXS.$v" -ForegroundColor Green
}

# 3) FFmpeg (necessário pro Remover Silêncios / Modo Roteiro)
$ff = Get-Command ffmpeg -ErrorAction SilentlyContinue
if ($ff) {
    Write-Host "✔ FFmpeg encontrado: $($ff.Source)" -ForegroundColor Green
} elseif (Test-Path 'C:\ffmpeg\bin\ffmpeg.exe') {
    Write-Host '✔ FFmpeg encontrado em C:\ffmpeg\bin' -ForegroundColor Green
} else {
    Write-Host '⚠ FFmpeg não encontrado — instale em C:\ffmpeg\bin (necessário pra análise de áudio)' -ForegroundColor Yellow
}

Write-Host ''
Write-Host 'PRONTO! Agora:' -ForegroundColor Cyan
Write-Host '  1. Feche o Premiere Pro COMPLETAMENTE e reabra'
Write-Host '  2. Window → Extensions → GAMA Macros'
Write-Host ''
