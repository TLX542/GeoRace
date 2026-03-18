# Spécifications techniques — GeoRace

Objectif : architecture, modèle de données, API & événements temps réel, NFR, sécurité, RGPD, déploiement et observabilité.

## 1. Architecture cible (résumé)
- Mobile : React Native (iOS/Android)
- Backend : services Node.js / TypeScript
  - Service d’auth (JWT / OAuth)
  - Service de matchmaking (temps réel, WebSocket)
  - Moteur de course (événements temps réel, ELO)
  - Base géospatiale : PostGIS
  - Notifications : FCM / APNs
  - Tuiles de carte : Mapbox (ou alternative)
- Infrastructure : Kubernetes (GKE/EKS) + autoscaling
- Observabilité : Prometheus (métriques), Grafana (dashboards), ELK ou Loki (logs), Sentry (erreurs)

> Insérer un schéma d’architecture SVG dans `info/diagrams/architecture.svg`

---

## 2. Modèle de données (entités — résumé)
- User : id, username, email (hashé), elo, consent_flags, created_at
- RaceSession : id, participants[], start_time, end_time, race_type, status
- TelemetryPoint : id, raceSession_id, user_id, lat, lon, timestamp, accuracy, speed, device_state_hash
- Match : id, participants[], created_at, criteria
- Dispute : id, raceSession_id, reporter_id, reason, status

(Fournir l’ERD complet dans `info/diagrams/erd.svg`)

---

## 3. API / Événements (exemples)

REST :
- POST /api/v1/auth/signup
- POST /api/v1/match/seek -> returns match_id
- GET /api/v1/user/{id}/elo

Événements WebSocket (temps réel) :
- client -> server : `join_race` {match_id}
- client -> server : `telemetry` {lat, lon, timestamp, accuracy}
- server -> client : `race_update` {positions, leader, time_left}

Utiliser le versioning de messages et des clés d’idempotence.

---

## 4. Exigences non-fonctionnelles (SLO)
- Latence mise à jour de position (bout en bout) médiane < 500ms, 95e < 1s
- Débit ingestion télémétrie : 5 000 updates/s au départ (plan scale dans evolution_migration.md)
- Disponibilité : 99,5% pour le MVP
- Précision : précision GPS délivrée <= 10m pour 80% des points en conditions urbaines

---

## 5. Sécurité & RGPD
- Minimisation des PII : stocker le minimum de données personnelles, pseudonymiser si possible.
- Traçage du consentement localisation : stocker les timestamps de consentement.
- Rétention des données : télémétrie brute conservée 30 jours par défaut ; résultats agrégés permanents.
- Mitigations OWASP : rate limiting, requêtes paramétrées, WAF sur endpoints publics.
- AIPD recommandée si données personnelles liées à des métriques de santé (IMC, etc.).

---

## 6. Observabilité & tests
- Métriques à exposer : telemetry_ingest_latency_ms, websocket_connections, telemetry_points_per_minute, anomaly_detection_events
- Plan de test :
  - Tests unitaires (>=80% couverture)
  - Tests d’intégration WebSocket (clients mock)
  - Tests end-to-end PoC (voir info/poc_tracking/)

---

## 7. Déploiement & runbook
- CI : build + tests e2e (émulateur) + scan sécurité -> déploiement staging -> smoke -> promotion
- Runbook : process incident, matrice d’escalade (lien `info/operations/incident_playbook.md`)

-- Fin.