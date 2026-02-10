# GeoRace

**GeoRace** est une **application mobile de course à pied compétitive en temps réel** qui transforme vos sorties running en duels spontanés contre d'autres coureurs à proximité.

## 🎯 Concept

GeoRace crée des courses équitables vers un point d'arrivée équidistant, avec un système de classement ELO pour des matchs équilibrés.

**Phrase clé :**
*« GeoRace : Transformez chaque course en compétition. »*

## 📂 Structure du projet

- **Documents** : Fichiers `.md` et `.docx` contenant la documentation du projet
- **Présentation** : Fichier `GeoRace_presentation.pptx` - pitch PowerPoint
- **Assets** : Images et wireframes dans le dossier `assets/`
- **Scripts** : Scripts de génération dans le dossier `scripts/`

## �� Génération de la présentation

Pour générer ou mettre à jour la présentation PowerPoint du pitch GeoRace :

### Linux / macOS
```bash
./scripts/generate_presentation.sh --lang fr
```

### Windows
```cmd
scripts\generate_presentation.bat fr
```

📖 **Documentation complète** : Voir [README-presentation.md](README-presentation.md)

## 📋 Documents disponibles

- `GeoRace.md` - Description complète du projet
- `GeoRace_ppt.md` - Contenu de la présentation
- `GeoRace_Personas.md` - Personas utilisateurs
- `GeoRace_Architecture.md` - Architecture technique
- `GeoRace_Benchmark_Matrix.md` - Comparaison concurrents
- Et plus...

## 🔧 Scripts disponibles

- `scripts/generate_presentation.sh` - Génère la présentation (Linux/Mac)
- `scripts/generate_presentation.bat` - Génère la présentation (Windows)
- `build_zip.sh` - Génère un bundle complet de tous les documents

## 📦 Génération du bundle complet

Pour générer un ZIP avec tous les documents :

```bash
./build_zip.sh
```

Cela créera `GeoRace_documents_bundle.zip` contenant tous les documents en formats Markdown, DOCX et PPTX.

## 🎤 Présentation du pitch

La présentation mise à jour met en avant :

1. **Nos différenciateurs** - Ce qui rend GeoRace unique
2. **Stratégie d'acquisition** - Comment attirer les utilisateurs des concurrents
3. **Le mode duel** - Notre fonctionnalité phare
4. **Points de démonstration** - Script pour la présentation orale

Voir le fichier [README-presentation.md](README-presentation.md) pour plus de détails sur le contenu des slides.

## 💡 Points clés du projet

### Différenciateurs principaux
- ✅ Duel en temps réel vers un point d'arrivée équidistant
- ✅ Matchmaking ELO pour des matchs équilibrés
- ✅ GPS en direct & suivi synchronisé
- ✅ Confidentialité et sécurité (position visible uniquement en duel actif)
- ✅ Anti-triche intégré
- ✅ Fonctions sociales complètes

### Stratégie d'acquisition
- Ciblage local avec micro-événements
- Partenariats avec clubs de course
- Import simplifié depuis Strava/Runkeeper
- Programmes d'incitation et badges exclusifs
- Campagnes social media

## 📞 Contact

Pour toute question sur le projet GeoRace, contactez l'équipe.

---

**GeoRace** - *Chaque course est un duel. Chaque duel est une opportunité.*
