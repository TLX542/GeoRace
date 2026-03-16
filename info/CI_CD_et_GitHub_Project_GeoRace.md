# Mise en place CI/CD + GitHub Project — GeoRace
**Date :** 2026-03-16  
**Repo :** TLX542/GeoRace  
**Stack actuelle repo (mobile) :** React Native + Expo (JS)  
**Vision cible (phase 2) :** backend NestJS + Postgres/PostGIS + Redis + WebSocket

---

## 1) Objectif CI/CD (pragmatique pour EIP)
Mettre en place un pipeline qui :
- sécurise la qualité (lint/tests) à chaque PR,
- produit des builds de preview (Expo) sur `main` / tags,
- prépare l’arrivée du backend (plus tard) sans refaire tout le DevOps.

---

## 2) CI/CD recommandé (Expo / React Native)

### 2.1 Niveaux de pipeline (simple → robuste)
**Niveau 1 (immédiat, faible coût)**
- CI sur Pull Requests :
  - install deps
  - lint (à ajouter)
  - tests (à ajouter)
- CI sur `main` :
  - build “preview” via **Expo EAS** (recommandé)
  - publication d’un artefact / lien de build dans la PR ou release notes

**Niveau 2 (quand backend arrive)**
- build mobile + build backend (Docker)
- déploiement staging backend auto
- smoke tests (API + websockets)
- promotion manuelle vers prod

### 2.2 Choix outillage
- **GitHub Actions** : orchestration CI
- **Expo EAS** : builds iOS/Android sans gérer toi-même Xcode/Gradle en CI
- **Secrets GitHub** : `EXPO_TOKEN`, plus tard secrets backend
- (Optionnel) **Sentry** : crash reporting
- (Optionnel) **CodeQL** : analyse sécu

---

## 3) Fichiers GitHub Actions (exemples à créer)

> Tu peux copier-coller ces workflows dans `.github/workflows/`.

### 3.1 Workflow CI (PR) : install + lint + tests
- Déclenchement : `pull_request`
- But : “garde-fou” qualité

Checklist à ajouter dans le repo :
- ajouter ESLint + Prettier
- ajouter un runner de tests (Jest) si souhaité

### 3.2 Workflow CD (main) : build preview EAS
- Déclenchement : `push` sur `main`
- Étapes :
  - `npm ci`
  - `eas build --platform all --profile preview --non-interactive`
  - publier l’URL du build dans le job summary

### 3.3 Workflow Release (tag) : build prod + release notes
- Déclenchement : tag `v*.*.*`
- Build EAS `production`
- Générer changelog (optionnel)

---

## 4) GitHub Project (planification Solution Track + beta)

### 4.1 Pourquoi GitHub Projects
Tu dois démontrer :
- roadmap claire,
- suivi itératif,
- lien feedback → backlog → actions (“dit & fait”).

### 4.2 Structure recommandée (1 Project)
**Vues (views)**
1. **Roadmap (timeline)** : affichage par itérations (semaines)
2. **Sprint courant (board)** : To do / In progress / In review / Done
3. **Beta scope** : filtre `label:beta-scope`
4. **Community & UX** : filtre `label:community` + `label:ux`
5. **Risks** : filtre `label:risk`

**Champs (custom fields)**
- `Type` : Feature / Bug / Research / Community / UX / DevOps
- `Phase` : PoC / Beta / MVP / V2
- `Priority` : P0/P1/P2
- `Effort` : S/M/L
- `Owner` : (membre)
- `Due date`
- `Evidence link` : lien vers doc/capture/tableau feedback

### 4.3 Labels (standard)
- `beta-scope`
- `ux`
- `community`
- `feedback`
- `devops`
- `risk`
- `good first issue` (si contributions externes)
- `blocked`

### 4.4 Templates d’issues (indispensable)
Créer des templates :
- **Feature** (avec user story + critères d’acceptation + métrique de succès)
- **Bug** (repro steps + device + OS + gravité)
- **User feedback** (verbatim + thème + décision)

---

## 5) Timeline intégrée (12 semaines — exemple opérationnel)

### Semaines 1–2
- Project setup + labels + templates
- Définir `beta-scope` (issues F-BETA-001..009)
- Mettre en place CI PR (actions)
- Ouvrir canaux communauté + formulaire beta

### Semaines 3–4
- UX prototype + 5 user tests
- Itération UX #1 (issues “ux”)
- Début recrutement 20 beta testeurs

### Semaines 5–8
- Implémentation + stabilisation features beta
- Exécution BTP (remplir “Résultat atteint”)
- Build preview automatisé sur `main`

### Semaines 9–12
- Itération UX #2 fondée sur feedback
- Synthèse “dit & fait”
- Préparation défense : captures + dashboard + preuves

---

## 6) Check-list “Ready for jury”
- [ ] BTP rempli (résultats + métriques + preuves)
- [ ] 20 beta testeurs identifiés, ≥10 actifs, feedback consolidé
- [ ] 5 tests UX, 2 itérations significatives documentées
- [ ] GitHub Project propre (beta scope, labels, due dates, preuves)
- [ ] CI PR en place + builds preview sur main

-- Fin.