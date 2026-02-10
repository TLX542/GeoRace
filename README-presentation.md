# GeoRace - Documentation de génération de présentation

Ce document explique comment générer la présentation PowerPoint (PPTX) de GeoRace.

## 📋 Prérequis

Pour générer la présentation, vous devez avoir **pandoc** installé sur votre système :

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install pandoc
```

### macOS
```bash
brew install pandoc
```

### Windows
Téléchargez et installez pandoc depuis : https://pandoc.org/installing.html

## 🚀 Utilisation

### Sous Linux / macOS

Exécutez le script shell depuis la racine du projet :

```bash
# Générer la présentation en français (par défaut)
./scripts/generate_presentation.sh --lang fr

# Générer la présentation en anglais
./scripts/generate_presentation.sh --lang en
```

### Sous Windows

Exécutez le script batch depuis la racine du projet :

```cmd
REM Générer la présentation en français (par défaut)
scripts\generate_presentation.bat fr

REM Générer la présentation en anglais
scripts\generate_presentation.bat en
```

## 📁 Fichiers générés

Les scripts génèrent les fichiers suivants à la racine du projet :

- `GeoRace_ppt.md` - Le fichier markdown source de la présentation
- `GeoRace_presentation.pptx` - La présentation PowerPoint finale

## 📊 Contenu de la présentation

La présentation mise à jour inclut les slides suivantes :

### Slides clés ajoutées/modifiées :

1. **Slide 3 - Nos différenciateurs** 
   - Duel en temps réel vers un point d'arrivée équidistant
   - Matchmaking ELO
   - GPS en direct & suivi synchronisé
   - Confidentialité et sécurité
   - Anti-triche intégré
   - Fonctions sociales

2. **Slide 4 - Pourquoi les utilisateurs nous rejoindront**
   - Expérience de duel unique et équitable
   - Progression visible (ELO)
   - Événements locaux & tournois
   - Transfert facile des amis

3. **Slide 5 - Stratégie d'acquisition**
   - Ciblage local
   - Partenariats
   - Intégrations & porte d'entrée
   - Programmes d'incitation
   - Campagnes social media
   - Fonctionnalités différenciantes en onboarding

4. **Slide 9 - Démo rapide (points clés pour la présentation)**
   - Script de présentation avec points à appuyer
   - Message clé sur le duel équitable en temps réel

### Structure complète :

- **Slide 1** : Titre
- **Slide 2** : Problème
- **Slide 3** : Nos différenciateurs ⭐
- **Slide 4** : Pourquoi les utilisateurs nous rejoindront ⭐
- **Slide 5** : Stratégie d'acquisition ⭐
- **Slide 6** : Concept innovant : Le mode duel
- **Slide 7** : Fonctionnement d'un duel
- **Slide 8** : Un duel GeoRace
- **Slide 9** : Démo rapide (points clés) ⭐
- **Slide 10** : Aspect social
- **Slide 11** : Système de classement ELO
- **Slide 12** : Bénéfices de GeoRace
- **Slide 13** : Fonctionnalités clés
- **Slide 14** : Cible
- **Slide 15** : Différenciation vs concurrents
- **Slide 16** : Modèle économique
- **Slide 17** : Roadmap
- **Slide 18** : Défis & Solutions
- **Slide 19** : Vision
- **Slide 20** : Phrase finale

⭐ = Slides nouvelles ou significativement mises à jour

## 🎯 Points clés à souligner pendant la présentation

Lors de la présentation au jury, insistez particulièrement sur :

1. **Le mode duel** comme différenciateur principal
2. **L'équité totale** via le point d'arrivée équidistant
3. **Le matchmaking ELO** qui garantit des matchs équilibrés
4. **La sécurité et confidentialité** (position visible uniquement pendant les duels actifs)
5. **La stratégie d'acquisition concrète** pour attirer les utilisateurs des concurrents

## 🔧 Dépannage

### Erreur "pandoc: command not found"

Si vous obtenez cette erreur, pandoc n'est pas installé. Référez-vous à la section [Prérequis](#-prérequis) ci-dessus.

### Erreur lors de la génération du PPTX

Si le fichier PPTX n'est pas généré :
1. Vérifiez que pandoc est correctement installé : `pandoc --version`
2. Vérifiez les permissions d'écriture dans le répertoire courant
3. Assurez-vous qu'il n'y a pas de fichier `GeoRace_presentation.pptx` ouvert/verrouillé

### Caractères spéciaux mal affichés

Si les caractères spéciaux (émojis, flèches) ne s'affichent pas correctement :
- Assurez-vous que votre terminal supporte UTF-8
- Sous Windows, utilisez PowerShell ou Windows Terminal au lieu de cmd.exe classique

## 📝 Personnalisation

Pour modifier le contenu de la présentation, éditez les scripts :
- **Linux/macOS** : `scripts/generate_presentation.sh`
- **Windows** : `scripts/generate_presentation.bat`

Les fichiers markdown sont générés dynamiquement par ces scripts.

## 📞 Support

Pour toute question ou problème, contactez l'équipe GeoRace.
