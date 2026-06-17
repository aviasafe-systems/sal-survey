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
    color 0C
    echo ❌ Python is not installed!
    echo.
    echo Please install Python from: https://python.org/
    echo.
    pause
    exit /b 1
)

:: Display Python version
echo ✅ Python version:
python --version
echo.

:: Check if running in the correct directory
if not exist "index.html" (
    color 0E
    echo ⚠️  Warning: index.html not found in current directory!
    echo.
    echo Make sure you are running this script from the SurveySMS folder.
    echo Current directory: %CD%
    echo.
    choice /C YN /M "Continue anyway"
    if errorlevel 2 exit /b 1
)

:: Check for available ports and kill processes if needed
echo 🔍 Checking for available port 8000...
netstat -ano | findstr :8000 >nul
if %errorlevel% equ 0 (
    echo ⚠️  Port 8000 is already in use!
    echo.
    choice /C YN /M "Kill the process using port 8000"
    if errorlevel 2 (
        echo.
        echo ❌ Cannot start server. Port 8000 is in use.
        echo.
        pause
        exit /b 1
    ) else (
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000') do (
            taskkill /F /PID %%a >nul 2>nul
        )
        echo ✅ Port 8000 has been freed.
        echo.
    )
)

echo.
echo 🚀 Starting Python HTTP Server...
echo.
echo    📱 Local:    http://localhost:8000
echo    📱 Network:  http://%COMPUTERNAME%.local:8000
echo.
echo    💡 Tips:
echo       - Press Ctrl+C to stop the server
echo       - Press Ctrl+Click on the URL to open in browser
echo       - Use different port: python -m http.server 8080
echo.
echo ============================================================
echo.

:: Open browser automatically after 2 seconds
timeout /t 2 /nobreak >nul
start http://localhost:8000

:: Start Python server with increased buffer for better logging
python -m http.server 8000

:: This line only runs when the server is stopped
echo.
echo ============================================================
echo   ⏹️  Server stopped.
echo   Thank you for using SurveySMS!
echo ============================================================
echo.
pause