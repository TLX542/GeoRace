# Spécifications fonctionnelles — GeoRace

Objectif : découper en fonctionnalités testables, règles métier et critères d’acceptation.

## Structure du document
- Contexte & périmètre (MVP)
- Parcours utilisateurs (Onboarding, Duel, Ghost, Ranking, Social)
- Règles métier détaillées
- Critères d’acceptation (GIVEN/WHEN/THEN)
- Accessibilité : critères a11y par écran
- Liens vers tests & traçabilité (requirement_id → test_case_id)

---

## 1. Périmètre MVP
- Villes pilotes : Lyon, Paris
- Fonctionnalités MVP : inscription, matchmaking local, duel en temps réel, classement ELO simplifié, notifications.

---

## 2. Parcours utilisateur (extraits)

### Onboarding
- Objectif : créer un compte, consentement RGPD, calibration GPS (mini test 30s).
- Acceptance :
  - GIVEN user opens app, WHEN completes onboarding, THEN account created and calibration OK.
  - A11y : tous les écrans lisibles par lecteur d’écran ; cibles tactiles larges > 44px.

### Duel (core)
- Règles métier abrégées :
  - Match = 2 coureurs (MVP) ; durée configurable (défaut 10 min).
  - Critères matchmaking : distance géographique (<2 km), ELO +/- 200.
  - Abandon : si GPS perdu > 20s -> demande d’annulation possible ; procédure de contestation vers le support.
- Critères d��acceptation (exemples) :
  - GIVEN two matched users start duel, WHEN both accept, THEN duel session begins and location updates sent at <= 1s frequency (configurable).
  - GIVEN one user loses GPS for >20s and returns within 1 minute, WHEN dispute filed, THEN admin tool shows raw telemetry.

---

## 3. Règles métier détaillées (extraits)
- Matchmaking : privilégier la densité locale ; élargir le rayon jusqu’à 10 km après 30s.
- Calcul ELO : ELO initial = 1000 ; mise à jour par duel avec K=32 ; match nul autorisé si différence < 3s.
- Anti-triche : détecter les sauts GPS improbables (vitesse > 12 m/s), incohérences accéléromètre/gyro, téléportation abrupte.

---

## 4. Critères d’acceptation génériques
- Traçabilité : chaque exigence a un requirement_id (REQ-XXX) et des critères d’acceptation avec test_case_id.
- Performance (NFR) : SLO initial : latence médiane de mise à jour position < 500 ms ; 95e percentile < 1s.

---

## 5. Accessibilité (par écran)
- Onboarding : alternatives textuelles pour images, contrôles focusables clavier, labels voiceover.
- Écran carte : mode contraste élevé, gros boutons de contrôle, fallback textuel pour contenu carte (résumé de l’itinéraire).
- Exemple acceptance : ratio de contraste >= 4,5:1 pour le texte normal.

---

## 6. Liens rapides
- Spécification liée : `info/Technical_&_Functional_Specifications.md` (tech plus profonde)
- CSV traçabilité : `info/tracability_matrix.csv`

-- Fin.