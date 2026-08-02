@echo off
title CommerceOS Launcher
cd /d "%~dp0"

echo ====================================
echo  CommerceOS - Starting All Services
echo ====================================
echo.

echo [1/3] Building shared packages...
call npx turbo run build --filter="@commerceos/*"
echo.

echo [2/3] Built shared packages.
echo.

echo [3/3] Launching all apps in separate windows...
echo.

start "CommerceOS - API (NestJS)" cmd /c "cd /d "%~dp0apps\api" && echo Starting API on port 3000... && npm run dev"
start "CommerceOS - Storefront (Next.js)" cmd /c "cd /d "%~dp0apps\storefront" && echo Starting Storefront on port 3001... && npm run dev"
start "CommerceOS - Admin (Vite)" cmd /c "cd /d "%~dp0apps\admin" && echo Starting Admin panel... && npm run dev"

echo.
echo All services launching in separate windows.
echo.
echo   API:        http://localhost:3000
echo   Storefront: http://localhost:3001
echo   Admin:      http://localhost:5173
echo.
echo Close this window to leave them running.
pause
