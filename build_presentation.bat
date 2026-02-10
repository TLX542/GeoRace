@echo off
REM Windows batch script to build GeoRace presentation
REM This script generates all presentation files in the current directory (no ZIP bundle)
REM Requires: Python with pandoc installed, or pandoc.exe in PATH

setlocal EnableDelayedExpansion

echo ========================================
echo GeoRace Presentation Builder (Windows)
echo ========================================
echo.

REM Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

set "AUTHOR=TLX542"

echo Generating presentation files in: %CD%
echo.

REM Create assets directory
echo Creating assets subdirectory...
if not exist "assets" mkdir "assets"

REM Check if pandoc is available
where pandoc >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: pandoc not found in PATH
    echo Please install pandoc from https://pandoc.org/installing.html
    echo Or ensure pandoc.exe is in your PATH
    echo.
    echo Alternatively, you can use the shell script via WSL or Git Bash
    pause
    exit /b 1
)

echo Generating markdown files...

REM Note: For simplicity, we'll call the shell script if available
REM Or you can run this from WSL/Git Bash which includes bash

REM Check if we're in a WSL/Git Bash compatible environment
where bash >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Found bash - executing build_presentation.sh...
    bash build_presentation.sh
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ========================================
        echo Build completed successfully!
        echo All files generated in: %CD%
        echo ========================================
        exit /b 0
    ) else (
        echo ERROR: build_presentation.sh failed
        exit /b 1
    )
) else (
    echo.
    echo ========================================
    echo ERROR: bash not found
    echo ========================================
    echo.
    echo This batch file requires bash to execute the main build script.
    echo.
    echo OPTION 1 - Install Git for Windows (includes Git Bash):
    echo   Download from: https://git-scm.com/download/win
    echo   After installation, run this batch file again
    echo.
    echo OPTION 2 - Use WSL (Windows Subsystem for Linux):
    echo   1. Enable WSL: wsl --install
    echo   2. Run: wsl bash build_presentation.sh
    echo.
    echo OPTION 3 - Use PowerShell script instead:
    echo   Run: powershell -ExecutionPolicy Bypass -File build_presentation.ps1
    echo.
    pause
    exit /b 1
)
