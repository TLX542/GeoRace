# Speech: MVP → Scale (2–3 minutes)

But : script to explain migration plan simply.

"Hook" (10s)
- GeoRace succeeds when local runners can consistently compete fairly in real-time.

Problem & constraints (30s)
- MVP handles a small number of cities with one cluster; the main constraints are telemetry latency, GPS accuracy and dependency on map provider.

What we deliver in MVP (30s)
- A working duel flow, basic anti‑cheat heuristics, PostGIS-backed geospatial queries, and dashboards to measure latency and adoption.

How we scale (60s)
- Stage 1: Split services — separate matchmaker & ingestion so we can scale ingestion independently.
- Stage 2: Introduce region gateways and shard geospatial data by city to keep latency low for local users.
- Stage 3: Harden production with autoscaling, monitoring, and operational runbooks; only then expand to new cities.

Risks & mitigations (20s)
- Risk: map provider costs → mitigation: caching and fallback providers.
- Risk: spike in ingestion → mitigation: backpressure, queuing layers.

Call to action (10s)
- For the next step, run the two POCs (latency & equidistance) and review costs — this will give the definitive trigger thresholds for migration.

-- End.