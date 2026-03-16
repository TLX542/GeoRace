# Spécifications fonctionnelles — GeoRace

But : découper en features testables, règles métier et critères d'acceptation.

## Structure du document
- Contexte & périmètre (MVP)
- Parcours utilisateurs (Onboarding, Duel, Ghost, Ranking, Social)
- Règles métier détaillées
- Critères d'acceptation (GIVEN/WHEN/THEN)
- Accessibilité : critères a11y par écran
- Liens vers tests & traçabilité (requirement_id → test_case_id)

---

## 1. Périmètre MVP
- Villes pilotes : Lyon, Paris
- Features MVP : inscription, match‑making local, duel temps réel, classement ELO simplifié, notifications.

---

## 2. Parcours utilisateur (extraits)

### Onboarding
- Objectif : créer compte, consentement RGPD, calibration GPS (mini test 30s).
- Acceptance:
  - GIVEN user opens app, WHEN completes onboarding, THEN account created and calibration OK.
  - A11y: all screens readable by screen reader; large touch targets > 44px.

### Duel (core)
- Règles métier abrégées:
  - Match = 2 runners (MVP) ; match duration configurable (default 10 min).
  - Matchmaking criteria: distance géographique (<2 km), ELO +/- 200.
  - Abandon: si GPS lost > 20s -> possible cancel request; dispute flow to support.
- Critères d'acceptation (exemples):
  - GIVEN two matched users start duel, WHEN both accept, THEN duel session begins and location updates sent at <= 1s frequency (configurable).
  - GIVEN one user loses GPS for >20s and returns within 1 minute, WHEN dispute filed, THEN admin tool shows raw telemetry.

---

## 3. Règles métier détaillées (extraits)
- Matchmaking: prefer local density; fallback to wider radius up to 10 km after 30s.
- ELO calculation: initial ELO = 1000; update per duel using K=32; draw allowed if completion times difference < 3s.
- Anti-triche: detect improbable GPS jumps (speed > 12 m/s), inconsistent accelerometer/gyro data, abrupt teleportation.

---

## 4. Critères d'acceptation génériques
- Traceability: every requirement has requirement_id (REQ-XXX) and acceptance criteria with test_case_id.
- Performance (NFR): initial SLO: median location update latency < 500 ms; 95th percentile < 1s.

---

## 5. Accessibilité (par écran)
- Onboarding: text alternatives for images, controls keyboard-focusable, voiceover labels.
- Map screen: high contrast mode, large control buttons, textual fallback for map content (route summary).
- Acceptance sample: contrast ratio >= 4.5:1 for normal text.

---

## 6. Liens rapides
- Related spec: `info/Technical_&_Functional_Specifications.md` (deeper tech)
- Traceability CSV: `info/tracability_matrix.csv`

-- Fin.