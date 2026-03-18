# Documentation & checklist Accessibilité (A11Y) — GeoRace

Objectif : règles pour rédiger des spécifications accessibles et effectuer des contrôles produit.

## Checklist documentation (spécifications, PRD, présentation)
- [ ] Utiliser des titres sémantiques (H1, H2, H3)
- [ ] Fournir un texte alternatif pour les images / schémas (dans le dépôt, via l’alt en Markdown)
- [ ] Les tableaux ont des légendes et des en-têtes
- [ ] Les liens ont un texte descriptif (pas de « cliquez ici »)
- [ ] Tous les exemples de couleur incluent des valeurs de ratio de contraste
- [ ] Les PDF exportés doivent inclure un titre de document et du texte sélectionnable/recherchable

## Checklist produit (par écran)
- [ ] Libellés pour lecteurs d’écran (VoiceOver/TalkBack)
- [ ] Ordre de focus logique & indicateur de focus visible
- [ ] Cibles tactiles >= 44x44dp
- [ ] Contraste >= 4,5:1 (texte normal)
- [ ] Texte dynamique / mise à l’échelle des polices pris en charge
- [ ] Navigation clavier pour les cartes (interactions de repli)

## Plan de test & preuves
- Tests manuels avec VoiceOver / TalkBack (à enregistrer dans `info/research/a11y_tests/`)
- Vérifications automatisées : axe (pour les parties web), outils de contraste des couleurs
- Preuves attendues : captures avec libellés lus par VoiceOver, journaux des cas de test (TC-A11Y-001..)

-- Fin.