# PRD / Cahier des charges — GeoRace (template)

Objectif : document formel portable (jury / client).

## 1. Résumé exécutif
- Produit : GeoRace — application mobile de running compétitive en temps réel
- Objectif business : acquisition X, rétention Y, conversion Z
- Scope MVP (extraits) : inscription + calibration GPS + duel temps réel + classement ELO

## 2. Contraintes & KPI
- Budget cible : €
- Time-to-market : X semaines
- KPIs : DAU, rétention 7j, conversion payante, durée moyenne de duel

## 3. Exigences fonctionnelles (extraits)
- REQ-001 : Inscription & profil + consentement RGPD
- REQ-002 : Matchmaking local
- REQ-003 : Télémétrie duel temps réel & calcul de résultat

(voir `info/tracability_matrix.csv` pour la cartographie complète)

## 4. Exigences non-fonctionnelles
- NFR-001 : SLOs de latence (voir specs_techniques.md)
- NFR-002 : Sécurité & politique de rétention des données

## 5. Critères d’acceptation & définition de Done (DoD)
- Chaque REQ doit avoir des critères d’acceptation (GIVEN/WHEN/THEN)
- Tests unitaires + intégration au vert, smoke test manuel sur staging, scan sécurité OK.
- Contrôles accessibilité (WCAG AA) validés pour tous les parcours principaux.

## 6. Dépendances & risques
- Dépend de : fournisseur de cartes (Mapbox), Push (FCM/APNs), PostGIS.
- Voir `info/Impacts_Risks_&_Mitigation.md`.

## 7. Roadmap & lots de livraison
- Lot 1 (MVP) : auth, matchmaking, core duel, ingestion télémétrie, UI basique
- Lot 2 : social, leaderboards, analytics anti‑triche
- Lot 3 : monétisation, optimisations scale

## 8. Annexes
- Liens : `info/Client_Needs_&_Functional_Scope.md`, `info/Technical_&_Functional_Specifications.md`, `info/GeoRace_Costing_&_Technical_Sizing.md`

-- Fin.