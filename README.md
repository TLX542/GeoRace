# GeoRace - Documentation du projet

## À propos

**GeoRace** est une application mobile de course à pied compétitive en temps réel qui transforme vos sorties running en duels spontanés contre d'autres coureurs à proximité.

## 📋 Structure du repository

Ce repository contient :
- **Documentation technique** : fichiers `.md` et `.docx` décrivant l'architecture, les personas, la sécurité, etc.
- **Présentation projet** : slides pour présenter GeoRace au jury
- **Scripts de build** : pour générer automatiquement les documents et la présentation

## 🔨 Génération de la présentation

### Prérequis

- **pandoc** : outil de conversion de documents
  - Linux/Mac : `sudo apt install pandoc` ou `brew install pandoc`
  - Windows : télécharger depuis [pandoc.org](https://pandoc.org/installing.html) ou `choco install pandoc`

### Linux / Mac OS

```bash
# Rendre le script exécutable (si nécessaire)
chmod +x build_zip.sh

# Exécuter le builder
./build_zip.sh
```

Le script va générer tous les fichiers (`.md`, `.docx`, `.pptx`) **directement dans le répertoire courant**.

### Windows

**Option 1 - PowerShell (recommandé)** :
```powershell
# Exécuter depuis PowerShell
powershell -ExecutionPolicy Bypass -File build_presentation.ps1
```

**Option 2 - Batch file** :
```cmd
# Exécuter depuis l'invite de commande
build_presentation.bat
```

**Option 3 - Git Bash / WSL** :
```bash
# Si vous avez Git Bash ou WSL installé
bash build_zip.sh
```

> **Note** : Les scripts Windows (.bat et .ps1) utilisent en interne le script shell principal (`build_zip.sh`). Ils vérifient d'abord si `bash` est disponible (via Git Bash ou WSL).

### Fichiers générés

Après l'exécution du script, vous trouverez dans le répertoire courant :

- **GeoRace_presentation.pptx** : Présentation PowerPoint principale
- **GeoRace.docx**, **GeoRace_Architecture.docx**, etc. : Documents Word
- **assets/** : Répertoire contenant les images et SVG
- **GeoRace_ppt.md**, **GeoRace.md**, etc. : Fichiers markdown intermédiaires

> **Important** : Les fichiers sont générés **dans le même répertoire** que les scripts (pas dans un dossier séparé, pas dans un ZIP). Cela facilite la révision par le jury.

> **Note** : Le script `build_zip.sh` a été modifié pour ne plus créer de fichier ZIP. Il génère maintenant tous les fichiers directement dans le répertoire courant.

## 📊 Modifications apportées à la présentation

Suite aux retours du jury, les slides suivantes ont été améliorées :

### Slide 7 - "Pourquoi les utilisateurs nous rejoindront"
- ✅ Arguments concrets pour convaincre les utilisateurs actifs sur d'autres apps
- ✅ Mise en avant du duel instantané et de l'adrénaline
- ✅ Progression visible via ELO
- ✅ Fair play garanti (point équidistant)
- ✅ Privacy-first (vie privée respectée)
- ✅ Micro-compétitions locales
- ✅ Gain de statut social grâce aux badges

### Slide 8 - "Fonctionnalités différenciantes"
- ✅ **Duel en temps réel avec finish équidistant** : algorithme propriétaire
- ✅ **Matchmaking ELO intelligent** : oppositions équilibrées
- ✅ **Respect de la vie privée** : position GPS partagée uniquement pendant duels
- ✅ **Système anti-triche robuste** : détection automatique + bannissement
- ✅ **Sécurité et protection** : blocage, zone de confort, alertes cardiaques
- ✅ **Social & engagement** : profils, chat, badges, ligues locales

### Slide 10 - "Stratégie d'acquisition"
- ✅ 7 tactiques concrètes pour attirer les utilisateurs de Strava/Nike Run Club :
  1. Campagnes de migration par Duel Challenges locaux
  2. Invitations poussées par notifications/in-app
  3. Campagne d'influence (group runs avec influenceurs)
  4. Partenariats locaux (clubs, magasins running)
  5. Fonctionnalités d'onboarding social (import Strava, transfert résultats)
  6. Offres de parrainage et récompenses
  7. Visibilité sur stores et ASO (App Store Optimization)
- ✅ Objectif 6 mois : 10 000 utilisateurs actifs, 60% provenant de Strava/Nike Run Club

## 🎯 Pourquoi ces changements ?

Le jury a demandé :
1. **Plus de précision sur les fonctionnalités différentiantes** → Slide 8 détaille nos 6 piliers uniques
2. **Stratégie d'acquisition concrète** → Slide 10 liste 7 tactiques actionnables
3. **Mise en avant du mode duel** → Slide 7 explique pourquoi le duel change tout pour l'utilisateur

## 📝 Checklist pour les revieweurs

- [ ] Vérifier que `build_zip.sh` génère les fichiers dans le répertoire courant (pas de ZIP)
- [ ] Vérifier que les scripts Windows (.bat et .ps1) fonctionnent correctement
- [ ] Ouvrir `GeoRace_presentation.pptx` et valider les slides 7, 8 et 10
- [ ] Confirmer que les arguments de différenciation sont clairs et convaincants
- [ ] Confirmer que la stratégie d'acquisition est concrète et actionnable
- [ ] Vérifier que le script ne crée plus de fichier ZIP "GeoRace_documents_bundle.zip"

## 🚀 Prochaines étapes

1. Finaliser le MVP (développement en cours)
2. Tester avec 50 beta-testeurs (running clubs Paris)
3. Lancement public dans 3 mois

## 📧 Contact

Pour toute question : TLX542

---

**GeoRace - Run. Race. Win.**
