# PRD / Cahier des charges — GeoRace (template)

But : document formel portable jury / client.

## 1. Résumé exécutif
- Produit : GeoRace — application mobile de running compétitive temps réel
- Objectif business : acquisition X, rétention Y, conversion Z
- MVP scope (extraits) : inscription + calibration GPS + duel temps réel + classement ELO

## 2. Contrainte & KPI
- Budget cible: €
- Time-to-market: X semaines
- KPIs: DAU, retention 7d, conversion to paid, average duel time

## 3. Exigences fonctionnelles (extraits)
- REQ-001: Inscription & profile + consentement RGPD
- REQ-002: Matchmaking local
- REQ-003: Duel real-time telemetry & result calculation

(voir `info/tracability_matrix.csv` pour full mapping)

## 4. Exigences non-fonctionnelles
- NFR-001: Latency SLOs (see specs_techniques.md)
- NFR-002: Security & data retention policy

## 5. Critères d'acceptation & définition de Done (DoD)
- Chaque REQ must have acceptance criteria (GIVEN/WHEN/THEN)
- Unit+integration tests green, manual smoke on staging, security scan passed.
- Accessibility checks (WCAG AA) passed for all primary flows.

## 6. Dépendances & risques
- Dependent on Maps provider (Mapbox), Push (FCM/APNs), PostGIS.
- See `info/Impacts_Risks_&_Mitigation.md`.

## 7. Roadmap & lots de livraison
- Lot 1 (MVP): auth, matchmaking, duel core, telemetry ingestion, basic UI
- Lot 2: social, leaderboards, anti‑cheat analytics
- Lot 3: monetization, scale optimizations

## 8. Annexes
- Links: `info/Client_Needs_&_Functional_Scope.md`, `info/Technical_&_Functional_Specifications.md`, `info/GeoRace_Costing_&_Technical_Sizing.md`

-- Fin.