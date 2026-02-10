@echo off
REM make_zip.bat - Creates ZIP archive from geo_race_export folder
REM This script only creates the ZIP, assumes geo_race_export already exists

echo GeoRace ZIP Creator
echo ===================
echo.

set OUTDIR=geo_race_export
set ZIPNAME=GeoRace_documents_bundle.zip

REM Check if geo_race_export directory exists
if not exist "%OUTDIR%" (
    echo Error: Directory '%OUTDIR%' does not exist!
    echo Please run build_zip.bat or build_zip.sh first to generate the export folder.
    exit /b 1
)

echo Found directory: %OUTDIR%
echo Creating ZIP archive: %ZIPNAME%
echo.

REM Use PowerShell to create the ZIP
powershell -NoProfile -ExecutionPolicy Bypass -Command "& { ^
    $OUTDIR = '%OUTDIR%'; ^
    $ZIPNAME = '%ZIPNAME%'; ^
    ^
    if (Test-Path $ZIPNAME) { ^
        Write-Host \"Removing existing ZIP: $ZIPNAME\"; ^
        Remove-Item -Force $ZIPNAME; ^
    }; ^
    ^
    Write-Host \"Compressing $OUTDIR to $ZIPNAME...\"; ^
    Compress-Archive -Force -LiteralPath $OUTDIR -DestinationPath $ZIPNAME; ^
    ^
    if (Test-Path $ZIPNAME) { ^
        $zipSize = (Get-Item $ZIPNAME).Length / 1KB; ^
        Write-Host ''; ^
        Write-Host ('✅ ZIP created successfully: {0} ({1:N2} KB)' -f $ZIPNAME, $zipSize); ^
        exit 0; ^
    } else { ^
        Write-Host ''; ^
        Write-Host '❌ Error: Failed to create ZIP archive'; ^
        exit 1; ^
    }; ^
}"

if %ERRORLEVEL% neq 0 (
    echo.
    echo ZIP creation failed!
    exit /b 1
)

echo.
echo ZIP creation completed successfully!
exit /b 0
