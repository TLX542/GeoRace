@echo off
setlocal enabledelayedexpansion

set OUTDIR=geo_race_export
set ZIPNAME=GeoRace_documents_bundle.zip
set AUTHOR=TLX542

echo Creating output dir: %OUTDIR%
if exist "%OUTDIR%" rd /s /q "%OUTDIR%"
mkdir "%OUTDIR%\assets"

echo Generating markdown and assets...

REM --- GeoRace.md (with new investor pitch sections) ---
(
echo # GeoRace
echo.
echo ## GeoRace ^(Competitive Running App^)
echo.
echo ^> **GeoRace** est une **application mobile de course a pied competitive en temps reel** qui transforme vos sorties running en duels spontanes contre d'autres coureurs a proximite.
echo ^> Elle cree des courses equitables vers un point d'arrivee equidistant, avec un systeme de classement ELO pour des matchs equilibres.
echo.
echo **Phrase cle :**
echo *^« GeoRace : Transformez chaque course en competition. ^»*
echo.
echo ---
echo.
echo ## Pourquoi ce projet ?
echo.
echo La course a pied en solo souffre de plusieurs problemes :
echo.
echo * **Demotivation** lorsqu'on court seul
echo * **Manque de defi** et d'objectifs concrets
echo * **Difficulte a mesurer ses progres** face a d'autres coureurs
echo * **Absence d'interaction sociale** pendant l'entrainement
echo.
echo ^> Ces facteurs conduisent de nombreux coureurs a abandonner leurs objectifs sportifs.
echo.
echo ---
echo.
echo ## Ce que fait GeoRace ^(coeur du projet^)
echo.
echo ### 🏃 1. Duels de course en temps reel
echo.
echo GeoRace permet de :
echo.
echo * **Detecter automatiquement** les coureurs actifs a proximite
echo * **Proposer un duel** avec un point d'arrivee equidistant
echo * **Lancer la course simultanement** apres acceptation mutuelle
echo * **Suivre la progression** en temps reel via GPS
echo.
echo ✔ Chaque course devient une competition
echo ✔ Point d'arrivee equitable garanti
echo ✔ Depart synchronise pour tous les participants
echo.
echo ---
echo.
echo ### 📍 2. Systeme de point d'arrivee equitable
echo.
echo **Fonctionnement :**
echo.
echo 1. **Detection** : L'app repere les coureurs dans un rayon defini ^(500m-2km^)
echo 2. **Calcul du point d'arrivee** : Algorithme trouve un point equidistant pour tous les participants
echo 3. **Proposition** : Les coureurs recoivent une notification de defi
echo 4. **Acceptation** : Si tous acceptent, compte a rebours de 10 secondes
echo 5. **Course** : Navigation GPS vers le point d'arrivee
echo.
echo ^> Le systeme garantit que chaque coureur parcourt la meme distance, rendant la competition equitable
echo.
echo ---
echo.
echo ### 🎯 3. Systeme de classement ELO
echo.
echo **Principe :**
echo.
echo * Chaque coureur a un **score ELO** ^(comme aux echecs^)
echo * Victoire contre adversaire plus fort = **+points importants**
echo * Victoire contre adversaire plus faible = **+points faibles**
echo * Defaite = **perte de points proportionnelle**
echo.
echo **Avantages :**
echo.
echo * **Matchmaking equilibre** : duels contre coureurs de niveau similaire
echo * **Progression visible** : montee dans les classements
echo * **Motivation** : envie d'ameliorer son ELO
echo.
echo ---
echo.
echo ## Ce que nous faisons mieux que les concurrents
echo.
echo - **Duel mode en temps reel** : proposition automatique d'un duel avec point d'arrivee equidistant pour garantir l'equite — experience distinctive difficile a reproduire.
echo - **Matchmaking ELO** : oppositions entre coureurs de niveau comparable pour des matchs motivants et progressifs.
echo - **Securite ^& vie privee** : partage de position limite aux duels actifs; anonymisation possible; dispositifs anti‑triche integres.
echo - **Conversion sociale native** : integration de badges, challenges locaux, classements de quartier et partages pour attirer des communautes existantes.
echo.
echo ---
echo.
echo ## Plan d'acquisition ^& conversion ^(comment nous ferons venir des utilisateurs deja sur d'autres apps^)
echo.
echo - **Partenariats locaux** : clubs de running, boutiques, evenements locaux — organiser des tournois GeoRace exclusifs.
echo - **Incentives de conversion** : defis d'accueil, credits ou badges pour premiers duels gagnes, parrainage in-app ^(rewards pour inviter des coureurs^).
echo - **Experience produit superieure** : mise en avant du duel equitable et de l'ELO dans la communication produit pour expliquer pourquoi l'experience est meilleure que les apps de course standard.
echo - **Campagnes micro-ciblees** : publicites et posts sponsorises autour d'evenements locaux et groupes Facebook / Strava clubs.
echo - **Migration frictionless** : importer profils/segments ^(opt-in^) ou proposer challenge d'entrainement pour demontrer la valeur en 1 duel.
) > "%OUTDIR%\GeoRace.md"

echo GeoRace.md created with investor pitch sections.

REM --- Check for pandoc and generate PPTX ---
where pandoc >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Generating investor pitch PPTX from GeoRace.md...
    pandoc -M title="GeoRace - Pitch Investisseur" -M author="%AUTHOR%" -f markdown -t pptx -o "%OUTDIR%\GeoRace_presentation.pptx" "%OUTDIR%\GeoRace.md"
    if %ERRORLEVEL% EQU 0 (
        echo ✓ GeoRace_presentation.pptx created successfully
    ) else (
        echo ⚠ Failed to generate PPTX
    )
) else (
    echo ⚠ pandoc not found - skipping PPTX generation
    echo    Install pandoc to generate PowerPoint presentations: https://pandoc.org/installing.html
)

REM --- Create ZIP using PowerShell ---
echo Creating ZIP bundle...
if exist "%ZIPNAME%" del "%ZIPNAME%"
powershell -Command "Compress-Archive -Path '%OUTDIR%' -DestinationPath '%ZIPNAME%' -Force"
if %ERRORLEVEL% EQU 0 (
    echo ✓ ZIP created: %ZIPNAME%
) else (
    echo ⚠ Failed to create ZIP file
)

echo Done!
