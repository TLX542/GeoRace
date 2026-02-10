@echo off
REM build_zip.bat - Windows batch script to create GeoRace documents bundle
REM Priority: use bash if available, otherwise fallback to PowerShell

echo GeoRace Documents Builder (Windows)
echo =====================================

REM Check if bash is available (Git Bash, WSL, etc.)
where bash >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Bash detected, delegating to build_zip.sh...
    bash build_zip.sh
    exit /b %ERRORLEVEL%
)

REM Check if wsl is available
where wsl >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo WSL detected, delegating to build_zip.sh...
    wsl bash build_zip.sh
    exit /b %ERRORLEVEL%
)

echo Bash not found, using PowerShell fallback...
echo.

REM Use PowerShell to execute the embedded script
powershell -NoProfile -ExecutionPolicy Bypass -Command "& { ^
$OUTDIR = 'geo_race_export'; ^
$ZIPNAME = 'GeoRace_documents_bundle.zip'; ^
$AUTHOR = 'TLX542'; ^
^
Write-Host 'Creating output directory: $OUTDIR'; ^
if (Test-Path $OUTDIR) { Remove-Item -Recurse -Force $OUTDIR }; ^
New-Item -ItemType Directory -Force -Path $OUTDIR | Out-Null; ^
New-Item -ItemType Directory -Force -Path (Join-Path $OUTDIR 'assets') | Out-Null; ^
^
Write-Host 'Generating markdown files...'; ^
^
# GeoRace.md ^
@' ^
# GeoRace ^
^
## GeoRace (Competitive Running App) ^
^
> **GeoRace** est une **application mobile de course à pied compétitive en temps réel** qui transforme vos sorties running en duels spontanés contre d'autres coureurs à proximité. ^
> Elle crée des courses équitables vers un point d'arrivée équidistant, avec un système de classement ELO pour des matchs équilibrés. ^
^
**Phrase clé :** ^
*« GeoRace : Transformez chaque course en compétition. »* ^
^
--- ^
^
## Pourquoi ce projet ? ^
^
La course à pied en solo souffre de plusieurs problèmes : ^
^
* **Démotivation** lorsqu'on court seul ^
* **Manque de défi** et d'objectifs concrets ^
* **Difficulté à mesurer ses progrès** face à d'autres coureurs ^
* **Absence d'interaction sociale** pendant l'entraînement ^
^
> Ces facteurs conduisent de nombreux coureurs à abandonner leurs objectifs sportifs. ^
^
--- ^
^
## Ce que fait GeoRace (cœur du projet) ^
^
### 🏃 1. Duels de course en temps réel ^
^
GeoRace permet de : ^
^
* **Détecter automatiquement** les coureurs actifs à proximité ^
* **Proposer un duel** avec un point d'arrivée équidistant ^
* **Lancer la course simultanément** après acceptation mutuelle ^
* **Suivre la progression** en temps réel via GPS ^
^
✔ Chaque course devient une compétition ^
✔ Point d'arrivée équitable garanti ^
✔ Départ synchronisé pour tous les participants ^
'@ | Out-File -FilePath (Join-Path $OUTDIR 'GeoRace.md') -Encoding UTF8; ^
^
Write-Host 'Generated GeoRace.md'; ^
^
# GeoRace_ppt.md - Embedded from build_zip.sh ^
$pptContent = @' ^
### 🟦 Slide 1 - Titre ^
^
**GeoRace** ^
^
> L'application de course compétitive en temps réel ^
^
**Sous‑titre :** ^
Le premier vrai duel de course instantané et équitable. ^
^
--- ^
^
### 🟦 Slide 2 - Pitch 30-45s pour mercredi ^
^
**Notre pitch en 30-45 secondes** ^
^
> *« Les applications de running comme Strava se contentent de tracker vos courses. Vous courez seul, vous comparez vos stats à celles des autres, et au bout de 3 mois, vous abandonnez par manque de motivation.* ^
> ^
> *GeoRace transforme chaque sortie en véritable compétition en temps réel. Notre application détecte les coureurs actifs près de vous et propose un duel instantané vers un point d'arrivée calculé à distance égale pour tous. Plus besoin d'attendre : vous acceptez, le compte à rebours démarre, et vous courrez en direct contre un vrai adversaire.* ^
> ^
> *Avec notre système ELO, chaque victoire compte, chaque duel vous fait progresser, et la communauté grandit naturellement. Ce n'est plus du tracking passif : c'est de la compétition active.* ^
> ^
> *GeoRace, c'est le seul moyen de transformer le running en sport compétitif accessible à tous. Êtes-vous prêt à courir pour gagner ? »* ^
^
--- ^
^
### 🟦 Slide 3 - Le problème des apps actuelles ^
^
**Pourquoi les coureurs s'ennuient sur Strava, Nike Run Club et Runkeeper** ^
^
❌ **Compétition asynchrone** : vous comparez vos temps à des performances passées ^
❌ **Pas d'interaction réelle** : vous êtes seul face à votre écran ^
❌ **Segments fixes** : toujours les mêmes parcours, aucune surprise ^
❌ **Motivation en déclin** : partager des stats ne crée pas d'excitation ^
^
**Résultat :** 60%% des utilisateurs abandonnent après 3 mois ^
'@; ^
$pptContent | Out-File -FilePath (Join-Path $OUTDIR 'GeoRace_ppt.md') -Encoding UTF8; ^
^
Write-Host 'Generated GeoRace_ppt.md (partial - for pandoc conversion)'; ^
^
# Create minimal assets ^
$mmdContent = @' ^
flowchart LR ^
  A[App Mobile] -->|WebSocket| GW[Gateway] ^
  A -->|REST| API[API] ^
  GW --> Broker[Broker] ^
  API --> Broker ^
  Broker --> Match[Matchmaking] ^
  Broker --> ELO[ELO] ^
  Broker --> Race[Orchestrator] ^
  Race --> DB[(PostGIS)] ^
'@; ^
$mmdContent | Out-File -FilePath (Join-Path $OUTDIR 'assets' 'architecture.mmd') -Encoding UTF8; ^
^
Write-Host 'Generated assets/architecture.mmd'; ^
^
# Check for pandoc and generate PPTX ^
$pandocPath = Get-Command pandoc -ErrorAction SilentlyContinue; ^
if ($pandocPath) { ^
    Write-Host 'Pandoc found, generating PPTX...'; ^
    Push-Location $OUTDIR; ^
    pandoc -M title='GeoRace' -M author='$AUTHOR' -f markdown -t pptx -o 'GeoRace_presentation.pptx' 'GeoRace_ppt.md' 2>&1; ^
    if ($LASTEXITCODE -eq 0) { ^
        Write-Host '  PPTX generated successfully'; ^
    } else { ^
        Write-Host '  Warning: PPTX generation failed'; ^
    }; ^
    Pop-Location; ^
} else { ^
    Write-Host 'Pandoc not found, skipping PPTX generation'; ^
    Write-Host '  Install pandoc from https://pandoc.org/ to enable PPTX generation'; ^
}; ^
^
# Create ZIP archive ^
Write-Host 'Creating ZIP archive...'; ^
if (Test-Path $ZIPNAME) { Remove-Item -Force $ZIPNAME }; ^
Compress-Archive -Force -LiteralPath $OUTDIR -DestinationPath $ZIPNAME; ^
^
if (Test-Path $ZIPNAME) { ^
    Write-Host '✅ ZIP created: $ZIPNAME'; ^
    Write-Host ''; ^
    Write-Host 'Build complete!'; ^
    exit 0; ^
} else { ^
    Write-Host '❌ Error: Failed to create ZIP'; ^
    exit 1; ^
}; ^
}"

if %ERRORLEVEL% neq 0 (
    echo.
    echo Build failed!
    exit /b 1
)

echo.
echo Build completed successfully!
exit /b 0
