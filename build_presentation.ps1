# PowerShell script to build GeoRace presentation
# This script generates all presentation files in the current directory (no ZIP bundle)
# Requires: pandoc (install via: choco install pandoc, or download from pandoc.org)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GeoRace Presentation Builder (PowerShell)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get script directory and navigate to it
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

$Author = "TLX542"

Write-Host "Generating presentation files in: $PWD" -ForegroundColor Yellow
Write-Host ""

# Check if bash is available (Git Bash, WSL, etc.)
$bashAvailable = Get-Command bash -ErrorAction SilentlyContinue

if ($bashAvailable) {
    Write-Host "Found bash - executing build_zip.sh..." -ForegroundColor Green
    Write-Host ""
    
    # Make sure the shell script is executable (if on WSL/Git Bash)
    if (Test-Path "build_zip.sh") {
        try {
            bash build_zip.sh
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host ""
                Write-Host "========================================" -ForegroundColor Green
                Write-Host "Build completed successfully!" -ForegroundColor Green
                Write-Host "All files generated in: $PWD" -ForegroundColor Green
                Write-Host "========================================" -ForegroundColor Green
                Write-Host ""
                Write-Host "Generated files:" -ForegroundColor Cyan
                Get-ChildItem -Filter "*.pptx" | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor White }
                Get-ChildItem -Filter "*.docx" | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor White }
                exit 0
            } else {
                Write-Host "ERROR: build_zip.sh failed with exit code $LASTEXITCODE" -ForegroundColor Red
                exit 1
            }
        } catch {
            Write-Host "ERROR: Failed to execute build_zip.sh" -ForegroundColor Red
            Write-Host $_.Exception.Message -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "ERROR: build_zip.sh not found in current directory" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "ERROR: bash not found" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "This PowerShell script requires bash to execute the main build script." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "OPTION 1 - Install Git for Windows (includes Git Bash):" -ForegroundColor Cyan
    Write-Host "  Download from: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "  After installation, run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "OPTION 2 - Use WSL (Windows Subsystem for Linux):" -ForegroundColor Cyan
    Write-Host "  1. Enable WSL: wsl --install" -ForegroundColor White
    Write-Host "  2. Restart your computer" -ForegroundColor White
    Write-Host "  3. Run: wsl bash build_zip.sh" -ForegroundColor White
    Write-Host ""
    Write-Host "OPTION 3 - Install Chocolatey and then bash:" -ForegroundColor Cyan
    Write-Host "  1. Install Chocolatey: https://chocolatey.org/install" -ForegroundColor White
    Write-Host "  2. Run: choco install git" -ForegroundColor White
    Write-Host "  3. Run this script again" -ForegroundColor White
    Write-Host ""
    
    # Pause to allow user to read
    Write-Host "Press any key to continue..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}
