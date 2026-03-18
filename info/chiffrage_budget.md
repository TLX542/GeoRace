# Chiffrage & Budget - GeoRace

But : table de chiffrage par lot + scénarios Lean / Standard / Robuste.

## Hypothèses (à ajuster)
- TJM dev moyen = €450
- Équipe MVP: 2 devs mobile (60j), 2 devs backend (60j), 1 dev infra (20j), QA 20j, PO/PM 15j
- Infrastructure mensuelle estimée (MVP): Cloud €400/month, DB €200/month, Mapbox €300/month, Push €50/month

---

## Scénarios (exemples)

### 1) Lean MVP
- Dev JH: 350 JH
- Coût dev: 350 * €450 = €157,500
- Infra setup + 3 months run: €3,000
- Total approximatif: €160,500

### 2) Standard
- Dev JH: 550 JH
- Coût dev: 550 * €450 = €247,500
- Infra + 6 months run: €8,000
- Total approximatif: €255,500

### 3) Robuste (scale-ready)
- Dev JH: 900 JH
- Coût dev: 900 * €450 = €405,000
- Infra + 12 months: €30,000
- Total: €435,000

---

## Template chiffrage par lot (à remplir)
- Lot: Mobile iOS/Android - JH: , roles: , deliverables:
- Lot: Backend real-time - JH: , deliverables:
- Lot: Geospatial (PostGIS) - JH:
- Lot: Security/RGPD - JH:
- Lot: QA & tests - JH:
- Run (recurring) per month: Cloud infra: €, DB: €, Maps: €, Notifications: €, Monitoring: €

---

## Livrables attendus pour validation du chiffrage
- [ ] Table JH par rôle par lot (sheet)
- [ ] Hypothèses TJM et buffer (10–20%)
- [ ] 3 scénarios chiffrés (Lean/Standard/Robust) avec délai estimé
- [ ] Présentation slide (1 page) résumant le budget pour direction

-- Fin.