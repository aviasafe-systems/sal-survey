@echo off
title SurveySMS - Python Server
color 0A

echo ============================================================
echo   🛡️  SurveySMS - Safety Management Survey Platform
echo   🐍 Starting with Python HTTP Server
echo ============================================================
echo.

:: Check if Python is installed
python --version >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Python is not installed!
    echo.
    echo Please install Python from: https://python.org/
    echo.
    pause
    exit /b 1
)

echo.
echo 🚀 Starting Python HTTP Server...
echo.
echo    📱 Local:    http://localhost:8000
echo    📱 Network:  http://%COMPUTERNAME%.local:8000
echo.
echo    ⏹️  Press Ctrl+C to stop the server
echo    🌐 Press Ctrl+Click on the URL to open in browser
echo.
echo ============================================================
echo.

:: Open browser automatically
start http://localhost:8000

:: Start Python server
python -m http.server 8000

pause