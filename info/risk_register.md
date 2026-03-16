# Registre des risques — GeoRace

Columns: id, risque, probabilité (L/M/H), impact (L/M/H), mitigation, propriétaire, statut, indicateur

- R-001, GPS imprécision / jumps, M, H, Mitigation: GPS smoothing, multi-sensor validation, owner: Race Eng, status: Open, indicator: %points with accuracy>20m
- R-002, Triche (teleport / spoofing), M, H, Mitigation: heuristics (speed threshold), server-side checks, flagging & manual review, owner: Security, status: Open, indicator: flagged_sessions_per_week
- R-003, Dépendance Mapbox (quota/cost), M, M, Mitigation: fallback provider, budgeting & caching, owner: Infra, status: Open, indicator: monthly_map_cost
- R-004, RGPD / DPIA required for location, L, H, Mitigation: legal consult, retention policy, owner: Legal, status: Open, indicator: DPIA_done (Y/N)

## Usage
- Update status after mitigations
- Add owner and target date
- Export monthly to `reports/risk_register_snapshot_YYYY-MM-DD.csv`

-- Fin.