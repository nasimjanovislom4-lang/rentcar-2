# AutoRent Pro - 1-Click Startup Script for PowerShell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  🚗 AutoRent Pro - Avtomobil Ijarasi va CRM Boshqaruv Tizimi" -ForegroundColor Yellow
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[XATOLIK] Ushbu kompyuterda Node.js topilmadi!" -ForegroundColor Red
    Write-Host "Iltimos, avval Node.js ni o'rnating: https://nodejs.org" -ForegroundColor White
    Read-Host "Davom etish uchun Enter bosing..."
    exit 1
}

$nodeVersion = node -v
Write-Host "[1/3] Node.js aniqlandi: $nodeVersion" -ForegroundColor Green

# 2. Check dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "[2/3] Paketlar o'rnatilmoqda (npm install)..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[XATOLIK] Paketlarni o'rnatishda xatolik yuz berdi!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[2/3] Barcha paketlar (node_modules) mavjud." -ForegroundColor Green
}

# 3. Check SQLite database
if (-not (Test-Path "prisma\dev.db")) {
    Write-Host "[3/3] Ma'lumotlar bazasi initsializatsiya qilinmoqda va dastlabki ma'lumotlar joylanmoqda..." -ForegroundColor Yellow
    npx prisma db push
    npx tsx prisma/seed.ts
} else {
    Write-Host "[3/3] SQLite ma'lumotlar bazasi (dev.db) tayyor." -ForegroundColor Green
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  🚀 Tizim muvaffaqiyatli ishga tushmoqda!" -ForegroundColor Green
Write-Host "  🌐 Asosiy sayt:  http://localhost:3000" -ForegroundColor White
Write-Host "  📊 Admin panel:  http://localhost:3000/admin/dashboard" -ForegroundColor White
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Brauzer avtomatik ochiladi... Serverni to'xtatish uchun: Ctrl+C" -ForegroundColor Gray
Write-Host ""

# Open browser in background after 3 seconds
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 3
    Start-Process "http://localhost:3000"
} | Out-Null

# Run Next.js server
npm run dev
