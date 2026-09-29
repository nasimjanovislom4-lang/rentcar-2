@echo off
chcp 65001 >nul
title AutoRent Pro - Rent-a-Car Ecosystem
color 0B

echo ================================================================
echo   🚗 AutoRent Pro - Avtomobil Ijarasi va CRM Boshqaruv Tizimi
echo ================================================================
echo.

:: 1. Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    color 0C
    echo [XATOLIK] Ushbu kompyuterda Node.js topilmadi!
    echo Iltimos, avval Node.js ni o'rnating: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo [1/3] Node.js tekshirildi: 
node -v
echo.

:: 2. Check dependencies (node_modules)
if not exist "node_modules\" (
    echo [2/3] Paketlar o'rnatilmoqda (npm install)... Bu bir oz vaqt olishi mumkin.
    call npm install
    if %ERRORLEVEL% neq 0 (
        color 0C
        echo [XATOLIK] Paketlarni o'rnatishda xatolik yuz berdi!
        pause
        exit /b 1
    )
) else (
    echo [2/3] Kerakli paketlar allaqachon mavjud.
)
echo.

:: 3. Check SQLite database (prisma/dev.db)
if not exist "prisma\dev.db" (
    echo [3/3] Ma'lumotlar bazasi yaratilmoqda va dastlabki avtomobillar joylanmoqda...
    call npx prisma db push
    call npx tsx prisma/seed.ts
) else (
    echo [3/3] SQLite ma'lumotlar bazasi tayyor.
)
echo.

echo ================================================================
echo   🚀 Tizim muvaffaqiyatli ishga tushmoqda!
echo   🌐 Sayt manzili: http://localhost:3000
echo   📊 Admin panel:  http://localhost:3000/admin/dashboard
echo ================================================================
echo.
echo Brauzer avtomatik ochiladi... Serverni to'xtatish uchun: Ctrl+C
echo.

:: Brauzerni 3 soniyadan keyin avtomatik ochish
start "" powershell -Command "Start-Sleep -Seconds 3; Start-Process 'http://localhost:3000'"

:: Serverni ishga tushirish
call npm run dev
pause
