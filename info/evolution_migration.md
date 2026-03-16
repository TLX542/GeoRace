# Evolution & Migration plan (MVP → Scale)

But : architecture & operational steps to move from MVP to production scale.

## Stages
1. MVP (Monolith-ish): single cluster, horizontally scalable workers, limited geo-scale (2–3 cities).
2. V2 (Service separation): split matchmaker, race engine, telemetry ingestion; dedicated PostGIS instances; read replicas.
3. Scale (Sharding & multi-region): geospatial sharding by region/city; edge WebSocket gateways per region; autoscaling groups with HPA and custom metrics.

## Triggers (example)
- If active concurrent sessions > 500 for 3 days → trigger step to V2 infra for the affected region.
- If telemetry ingestion > 5000/s sustained → provision additional ingestion workers & sharding.

## Steps & checklist (MVP→V2)
- [ ] Add observability: latency, telemetry throughput dashboards
- [ ] Implement service discovery + API gateway
- [ ] Migrate DB to cluster with read replicas
- [ ] Harden security policies, secrets management
- [ ] Run scale tests with synthetic clients (k6 or custom)

## Tech debt & plan
- Debt: single DB schema for all regions — plan: partition by city, then shard.
- Debt remediation: refactor data access layer (3 sprints), add migration scripts.

-- Fin.