@echo off
setlocal enabledelayedexpansion
title DEV. SAHIL - NETWORKING STUDIO

:: 1. Force working directory to the folder containing this batch script
cd /d "%~dp0"

echo ============================================================
echo   DEV. SAHIL / NETWORKING STUDIO
echo   The Complete Cybersecurity Networking Foundation
echo ============================================================
echo.

:: 2. Check if Node.js is available (Recommended on this machine)
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Node.js detected! Starting local web server...
    node server.js
    goto :end
)

:: 3. Test if real Python is working (not the broken WindowsApp stub)
python -c "import sys; sys.exit(0)" >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Python detected! Starting local web server on port 8000...
    start "" cmd /c "timeout /t 1 >nul && start http://localhost:8000"
    python -m http.server 8000
    goto :end
)

:: 4. Test if Python Launcher 'py' is working
py -c "import sys; sys.exit(0)" >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Python (py launcher) detected! Starting local web server on port 8000...
    start "" cmd /c "timeout /t 1 >nul && start http://localhost:8000"
    py -m http.server 8000
    goto :end
)

:: 5. Fallback: Launch index.html directly in user's default browser (100% offline ready)
echo [INFO] No background server runtime found.
echo Opening Dev. Sahil Networking Studio directly in your browser...
echo.
start "" "%~dp0index.html"

:end
if %errorlevel% neq 0 (
    echo.
    echo Opening directly in default browser as fallback...
    start "" "%~dp0index.html"
)
pause
