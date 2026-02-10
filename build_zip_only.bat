@echo off
setlocal

set OUTDIR=geo_race_export
set ZIPNAME=GeoRace_documents_bundle.zip

if not exist "%OUTDIR%" (
    echo Error: Output directory '%OUTDIR%' does not exist.
    echo Please run build_zip.bat first to generate the content.
    exit /b 1
)

echo Creating ZIP bundle from existing output...
if exist "%ZIPNAME%" del "%ZIPNAME%"
powershell -Command "Compress-Archive -Path '%OUTDIR%' -DestinationPath '%ZIPNAME%' -Force"
if %ERRORLEVEL% EQU 0 (
    echo ✓ ZIP created: %ZIPNAME%
) else (
    echo ⚠ Failed to create ZIP file
    exit /b 1
)

echo Done!
