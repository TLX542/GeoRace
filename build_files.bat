@echo off
REM Windows batch file wrapper for build_files.ps1
REM Calls PowerShell script to generate GeoRace documentation files

echo.
echo GeoRace Build Script for Windows
echo ================================
echo.

REM Check if PowerShell is available
where pwsh >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using PowerShell Core...
    pwsh -ExecutionPolicy Bypass -File "%~dp0build_files.ps1"
) else (
    where powershell >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo Using Windows PowerShell...
        powershell -ExecutionPolicy Bypass -File "%~dp0build_files.ps1"
    ) else (
        echo ERROR: PowerShell not found!
        echo Please install PowerShell to use this script.
        exit /b 1
    )
)

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Build failed with error code %ERRORLEVEL%
    exit /b %ERRORLEVEL%
)

echo.
echo Build completed successfully!
echo.
pause
