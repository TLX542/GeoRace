# Guide d'utilisation - Script de génération de présentation GeoRace

## Vue d'ensemble

Le script `build_zip.sh` génère automatiquement tous les fichiers de documentation et de présentation pour le projet GeoRace, incluant les fichiers markdown, docx et pptx.

## Modifications récentes (PR révision)

**Changement principal :** Le script écrit maintenant les fichiers directement dans le répertoire courant au lieu de créer un bundle ZIP dans un sous-dossier `geo_race_export/`.

**Raison :** Faciliter l'édition et la génération rapide de la présentation pour les révisions avant la réunion de mercredi.

## Utilisation

### Génération dans le répertoire courant (par défaut)

```bash
./build_zip.sh
```

Cette commande génère tous les fichiers (`.md`, `.docx`, `.pptx`, `assets/`) directement dans le répertoire où vous exécutez le script.

### Génération dans un répertoire spécifique

```bash
./build_zip.sh chemin/vers/sortie
```

Si vous souhaitez générer les fichiers dans un répertoire spécifique, passez le chemin en argument.

## Fichiers générés

Après exécution, les fichiers suivants sont créés :

### Fichiers de présentation
- `GeoRace_ppt.md` - Présentation principale (format markdown)
- `GeoRace_presentation.pptx` - Présentation PowerPoint (nécessite pandoc)

### Fichiers de documentation
- `GeoRace.md` - Documentation principale
- `GeoRace_Architecture.md` - Architecture technique
- `GeoRace_Benchmark_Matrix.md` - Matrice comparative
- `GeoRace_Contexte_Securite.md` - Contexte sécurité
- `GeoRace_Couts_Table.md` - Table des coûts
- `GeoRace_EcoScore.md` - Score écologique
- `GeoRace_Etude_Comparative.md` - Étude comparative
- `GeoRace_PBS.md` - Product Breakdown Structure
- `GeoRace_Personas.md` - Personas utilisateurs
- `GeoRace_Risques_Mitigation.md` - Risques et mitigation
- `GeoRace_Stack_Justification.md` - Justification stack technique
- `GeoRace_Wireframes.md` - Wireframes

### Répertoire assets
- `assets/` - Contient les ressources graphiques (logos, diagrammes, etc.)

### Versions DOCX
Pour chaque fichier `.md`, une version `.docx` est également générée (nécessite pandoc).

## Prérequis

### Obligatoire
- Bash shell
- Permissions d'exécution sur le script

### Optionnel (pour génération complète)
- `pandoc` - Pour conversion vers .docx et .pptx
- `mmdc` (mermaid-cli) - Pour rendu des diagrammes mermaid en PNG

**Note :** Le script fonctionne même sans ces outils, mais certaines conversions seront ignorées.

## Slides modifiées dans cette PR

Les slides suivantes ont été améliorées pour répondre aux commentaires du jury :

1. **Slide 5** - "Le point équidistant : notre innovation technique"
   - Ajout d'un exemple d'usage concret
   - Mise en avant des bénéfices utilisateur
   - Notes présentateur soulignant l'importance appréciée par le jury

2. **Slide 9** - "Nos différenciateurs" (anciennement "Ce que Strava ne peut PAS copier")
   - Liste exhaustive des fonctionnalités distinctives
   - Duels équidistants en temps réel
   - Matchmaking ELO intelligent
   - Anti-triche GPS avancé
   - Confidentialité position limitée
   - Progression visible & badges
   - Communauté locale active
   - Notes présentateur avec arguments clés

3. **Slide 10** - "Pitch : Pourquoi les utilisateurs viendront chez GeoRace" (anciennement "Stratégie d'acquisition")
   - Stratégie GTM (Go-To-Market) détaillée
   - 9 tactiques d'acquisition concrètes
   - Ciblage des utilisateurs déjà sur Strava/Nike Run Club
   - Notes présentateur avec messages clés pour le pitch

## Test rapide

Pour vérifier que le script fonctionne :

```bash
# Créer un répertoire de test
mkdir -p /tmp/test_georace
cd /tmp/test_georace

# Exécuter le script
/chemin/vers/build_zip.sh

# Vérifier les fichiers générés
ls -la
ls -la assets/

# Vérifier le contenu de la présentation
grep "Slide 9 - Nos différenciateurs" GeoRace_ppt.md
grep "Slide 10 - Pitch" GeoRace_ppt.md
```

## Support

En cas de problème, vérifiez :
1. Les permissions du script : `chmod +x build_zip.sh`
2. La présence de bash : `which bash`
3. Les messages d'erreur dans la sortie du script
