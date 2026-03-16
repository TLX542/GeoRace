# Spécifications techniques — GeoRace

But : architecture, data model, API & events temps réel, NFR, sécurité, RGPD, déploiement et observabilité.

## 1. Architecture cible (résumé)
- Mobile: React Native (iOS/Android)
- Backend: Node.js / Typescript services
  - Auth service (JWT / OAuth)
  - Matchmaking service (real-time, WebSocket)
  - Race engine (real-time events, ELO)
  - Geospatial db: PostGIS
  - Notifications: FCM / APNs
  - Map tiles: Mapbox (ou alternative)
- Infrastructure: Kubernetes (GKE/EKS) + autoscaling
- Observability: Prometheus (metrics), Grafana (dashboards), ELK or Loki (logs), Sentry (errors)

> Insert architecture diagram SVG in `info/diagrams/architecture.svg`

---

## 2. Data model (entities — summary)
- User: id, username, email (hashed), elo, consent_flags, created_at
- RaceSession: id, participants[], start_time, end_time, race_type, status
- TelemetryPoint: id, raceSession_id, user_id, lat, lon, timestamp, accuracy, speed, device_state_hash
- Match: id, participants[], created_at, criteria
- Dispute: id, raceSession_id, reporter_id, reason, status

(Provide full ERD in `info/diagrams/erd.svg`)

---

## 3. API / Events (examples)

REST:
- POST /api/v1/auth/signup
- POST /api/v1/match/seek -> returns match_id
- GET /api/v1/user/{id}/elo

WebSocket events (real-time):
- client -> server: `join_race` {match_id}
- client -> server: `telemetry` {lat, lon, timestamp, accuracy}
- server -> client: `race_update` {positions, leader, time_left}

Use message versioning and idempotency keys.

---

## 4. Non-functional requirements (SLOs)
- Location update latency (end-to-end) median < 500ms, 95th < 1s
- Telemetry ingestion throughput: 5000 updates/s initially (scale plan in evolution_migration.md)
- Availability: 99.5% for MVP
- Accuracy: delivered GPS accuracy <= 10m for 80% of points in urban conditions

---

## 5. Security & RGPD
- PII minimization: store minimal personal data, pseudonymize where possible.
- Consent recording for location data: store consent timestamps.
- Data retention: raw telemetry kept 30 days by default; aggregated results permanent.
- OWASP mitigations: rate limiting, parameterized DB queries, WAF for public endpoints.
- DPIA recommended if personal data linked to health metrics (BMI etc.)

---

## 6. Observability & Testing
- Metrics to expose: telemetry_ingest_latency_ms, websocket_connections, telemetry_points_per_minute, anomaly_detection_events
- Test plan:
  - Unit tests (>=80% coverage)
  - Integration tests for WebSocket race flows (mock clients)
  - End-to-end POC tests (see info/poc_tracking/)

---

## 7. Deployment & runbook
- CI: build + e2e test (emulator) + security scan -> deploy to staging -> smoke -> promote
- Runbook: incident process, escalation matrix (link `info/operations/incident_playbook.md`)

-- Fin.