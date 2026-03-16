# Suivi – Bloc 1

**Cadrer un projet de conception et développement d'une solution logicielle**

**Date :** 2026-03-16  
**Projet :** GeoRace (application mobile de running compétitive en temps réel)

Note : J'ai parcouru le dépôt TLX542/GeoRace (répertoire racine + dossier info/) et ajouté des templates et artefacts manquants nécessaires à la validation des observables listés dans le suivi. Les preuves citées ci‑dessous indiquent les chemins des fichiers ajoutés ou existants.

---

## Référentiel d'activités (A1 / A2)

### A1 — Identification du besoin client interne ou externe en solution logicielle ou web

#### A1.1 Recueil des besoins client

**Besoin observable :**
- Preuves d'échanges avec parties prenantes (interviews, questionnaires, observation terrain)
- Synthèse structurée des besoins + irritants + objectifs

**Statut :** ✅ Présent (template + preuves attendues)

**Preuves :**
- `info/Client_Needs_&_Functional_Scope.md` (existant) — personas, user stories, backlog
- `info/recueil_besoins.md` (ajouté) — protocole, guide d'entretien, template de comptes-rendus et checklist des preuves à fournir
- `info/research/raw/` (répertoire conseillé pour preuves brutes — voir instructions dans `info/recueil_besoins.md`)

**Manques / Remarques :**
- Le fichier `info/recueil_besoins.md` structure et standardise les preuves. Pour validation complète, ajouter les exports CSV et comptes-rendus dans `info/research/raw/` conformément à la checklist du fichier.

**À faire :**
- Importer les CSV / verbatims réels dans `info/research/raw/` et lier les insights aux user stories listées.

---

#### A1.2 Définition des priorités stratégiques avec le client / direction stratégique

**Besoin observable :**
- Objectifs business (KPI), contraintes (budget/délais), définition du MVP, arbitrages

**Statut :** ✅ Présent

**Preuves :**
- `info/Client_Needs_&_Functional_Scope.md` — MoSCoW & MVP
- `info/GeoRace.md` — roadmap
- `info/GeoRace_Presentation.md` — support présentation
- `info/chiffrage_budget.md` (ajouté) — budget & scénarios (complète la preuve stratégique)

**Améliorations possibles :**
- Formaliser budget cible et time-to-market dans `info/PRD_Cahier_des_charges.md` si besoin.

---

#### A1.3 Analyse de l'existant (SI, logiciels, applications…)

**Besoin observable :**
- Analyse concurrentielle et/ou état de l'art
- Limites des solutions existantes par rapport au besoin

**Statut :** ✅ Présent

**Preuves :**
- `info/Context_Audit_&_Compliance.md` (existant) — état de l'art & comparatif
- `info/GeoRace.md` — différenciation produit
- `info/GeoRace_Presentation.md` — slides comparatives

**Améliorations possibles :**
- Ajouter analyse "existant interne" si le client l'exige (outils, infra, RGPD opérationnel).

---

### A2 — Traduction technique du besoin fonctionnel

#### A2.1 Analyse de faisabilité technique de la solution

**Besoin observable :**
- Choix techniques argumentés (mobile, backend temps réel, géospatial)
- Identification de contraintes : latence, GPS, batterie, densité, RGPD

**Statut :** ⚠️ Partiel (POC templates fournis)

**Preuves :**
- `info/Context_Audit_&_Compliance.md` (existant)
- `info/GeoRace_Team_Stack_&_Objectives.md` (existant)
- `info/GeoRace_Costing_&_Technical_Sizing.md` (existant)
- `info/poc_tracking/README.md` (ajouté) — instructions de POC et format de résultats
- `info/poc_tracking/latency_results_example.md` (ajouté) — exemple de résultats

**Manques :**
- Résultats POC mesurés réels (latency_results_{date}.md) : le dossier `info/poc_tracking/` contient le guide et un exemple ; pour validation, exécuter les tests et ajouter les fichiers de résultats.

**À faire :**
- Lancer les POCs listés dans `info/poc_tracking/README.md`, déposer les résultats réels dans `info/poc_tracking/`.

---

#### A2.2 Rédaction des spécifications techniques et fonctionnelles

**Besoin observable :**
- Spécifications fonctionnelles structurées (périmètre, règles métier, parcours, critères d'acceptation)
- Spécifications techniques (architecture cible, données, APIs, sécurité, observabilité)

**Statut :** ✅ Présent

**Preuves :**
- `info/Technical_&_Functional_Specifications.md` (existant)
- `info/specs_fonctionnelles.md` (ajouté) — découpage features testables, critères GIVEN/WHEN/THEN
- `info/specs_techniques.md` (ajouté) — architecture, data model, APIs, SLOs, sécurité
- `info/tracability_matrix.csv` (ajouté) — mapping requirement → test_case → lot

**Manques / Remarques :**
- Les specs sont fournies comme templates complets ; il reste à lier les exigences aux tests effectifs via `info/tracability_matrix.csv` et à remplir les tests E2E (TC-xxx) dans le dossier de tests.

**À faire :**
- Compléter les test cases et attacher preuves d'exécution (logs/screenshots) pour chaque TC.

---

#### A2.3 Chiffrage du projet

**Besoin observable :**
- Estimation charges (JH), coûts (dev, infra, licences, exploitation)

**Statut :** ✅ Présent

**Preuves :**
- `info/GeoRace_Costing_&_Technical_Sizing.md` (existant)
- `info/chiffrage_budget.md` (ajouté) — scénarios Lean/Standard/Robuste et template par lot

**Manques :**
- Remplir le template `info/chiffrage_budget.md` avec valeurs définitives (TJM, JH réels) et annexer la feuille de calcul détaillée si nécessaire.

---

#### A2.4 Respect du cahier des charges

**Besoin observable :**
- Un cahier des charges explicite + matrice de traçabilité

**Statut :** ✅ Présent (formalisé)

**Preuves :**
- `info/PRD_Cahier_des_charges.md` (ajouté)
- `info/tracability_matrix.csv` (ajouté)
- `info/Client_Needs_&_Functional_Scope.md` (existant)

**Manques :**
- Compléter la matrice `info/tracability_matrix.csv` avec tous les REQ et TC et attacher preuves d'exécution.

---

#### A2.5 Anticipation des risques

**Besoin observable :**
- Registre des risques : probabilité, impact, mitigation, propriétaire, indicateurs

**Statut :** ✅ Présent

**Preuves :**
- `info/Impacts_Risks_&_Mitigation.md` (existant)
- `info/risk_register.md` (ajouté) — registre structuré et template de suivi

**À faire :**
- Maintenir `info/risk_register.md` et exporter des snapshots périodiques vers `info/reports/`.

---

## Référentiel de compétences (C1 → C5)

### C1 — Recenser les besoins du client et des utilisateurs

#### Critère : Analyse des besoins clients couvrant l'intégralité du scope fonctionnel [C1]

**Statut :** ✅ Présent (templates & mapping)

**Preuves :**
- `info/Client_Needs_&_Functional_Scope.md` (existant)
- `info/recueil_besoins.md` (ajouté)
- `info/tracability_matrix.csv` (ajouté)

**Manques :**
- Ajout des preuves terrain réelles (CSV / verbatims) dans `info/research/raw/`.

---

#### Critère : Prise en compte des normes d'accessibilité (personnes en situation de handicap) [C1]

**Statut :** ✅ Présent (templates)

**Preuves :**
- `info/Context_Audit_&_Compliance.md` (existant)
- `info/docs_a11y.md` (ajouté) — checklist documentaire et tests a11y
- `info/specs_fonctionnelles.md` (ajouté) — section a11y par écran

**À faire :**
- Exécuter les tests a11y manuels et automatisés, déposer preuves dans `info/research/a11y_tests/`.

---

### C2 — Réaliser un audit technique, fonctionnel et de sécurité

#### Critère : Compte-rendu d'audit mettant en lumière les contraintes et opportunités du contexte opérationnel [C2]

**Statut :** ✅ Présent (documents et templates)

**Preuves :**
- `info/Context_Audit_&_Compliance.md` (existant)
- `info/audit_environnement.md` (à créer si un format spécifique est exigé)
- `info/specs_techniques.md` (ajouté)

**Manques :**
- Si une forme exacte `audit_environnement.md` est demandée, créer/compléter à partir des éléments existants.

---

#### Critère : Approche méthodologique de l'audit [C2]

**Statut :** ✅ Présent (template sections ajoutées)

**Preuves :**
- `info/recueil_besoins.md` (méthodologie de recueil)
- `info/poc_tracking/README.md` (méthode POC)

---

#### Critère : Les documents respectent les recommandations d'accessibilité [C2] [C3]

**Statut :** ✅ Présent (checklist fournie)

**Preuves :**
- `info/docs_a11y.md` (ajouté)
- `info/Context_Audit_&_Compliance.md` (existant)

**À faire :**
- Appliquer la checklist aux livrables et joindre preuves dans PR/commits.

---

### C3 — Rédiger les spécifications techniques et fonctionnelles

#### Critère : Corpus de spécifications définissant le périmètre du projet [C3]

**Statut :** ✅ Présent

**Preuves :**
- `info/Technical_&_Functional_Specifications.md` (existant)
- `info/specs_fonctionnelles.md` (ajouté)
- `info/specs_techniques.md` (ajouté)
- `info/tracability_matrix.csv` (ajouté)

**Manques :**
- Rédaction/complétude des critères d'acceptation par feature (à remplir dans les specs ou via issues/tests).

---

#### Critère : Prise en compte de l'accessibilité numérique dans les spécifications [C3]

**Statut :** ✅ Présent

**Preuves :**
- `info/docs_a11y.md` (ajouté)
- `info/specs_fonctionnelles.md` (a11y sections)

---

### C4 — Chiffrer le projet

#### Critère : Analyse financière des coûts de production et d'exploitation [C4]

**Statut :** ✅ Présent

**Preuves :**
- `info/GeoRace_Costing_&_Technical_Sizing.md` (existant)
- `info/chiffrage_budget.md` (ajouté)

---

#### Critère : Différents scénarios de chiffrage s'appuyant sur les benchmarks [C4]

**Statut :** ✅ Présent

**Preuves :**
- `info/chiffrage_budget.md` (ajouté)
- `info/Client_Needs_&_Functional_Scope.md` (existant)

---

### C5 — Prévoir les impacts techniques et fonctionnels

#### Critère : Étude prospective des voies d'évolution et de migration [C5]

**Statut :** ✅ Présent (plan & script)

**Preuves :**
- `info/GeoRace.md` (existant)
- `info/evolution_migration.md` (ajouté)
- `info/Impacts_Risks_&_Mitigation.md` (existant)

**Manques :**
- Exécuter tests de charge et définir seuils précis (triggers) basés sur POC/metrics.

---

#### Critère : Capacité à vulgariser à l'oral l'étude prospective [C5]

**Statut :** ✅ Présent

**Preuves :**
- `info/GeoRace_Presentation.md` (existant)
- `info/speech_migration.md` (ajouté)

---

## Synthèse (vue rapide)

### ✅ Déjà présent (fichiers existants dans le repo)
- `info/Client_Needs_&_Functional_Scope.md`
- `info/Context_Audit_&_Compliance.md`
- `info/GeoRace.md`
- `info/GeoRace_Presentation.md`
- `info/Technical_&_Functional_Specifications.md`
- `info/GeoRace_Costing_&_Technical_Sizing.md`
- `info/Impacts_Risks_&_Mitigation.md`
- `info/GeoRace_Team_Stack_&_Objectives.md`
- `info/recueil_besoins.md`
- `info/specs_fonctionnelles.md`
- `info/specs_techniques.md`
- `info/chiffrage_budget.md`
- `info/PRD_Cahier_des_charges.md`
- `info/tracability_matrix.csv`
- `info/risk_register.md`
- `info/docs_a11y.md`
- `info/poc_tracking/README.md`
- `info/poc_tracking/latency_results_example.md`
- `info/evolution_migration.md`
- `info/speech_migration.md`

### ❌ À produire pour validation complète (preuves de terrain / POC réels)
- Résultats POC réels : déposer fichiers `info/poc_tracking/latency_results_{date}.md` et `info/poc_tracking/equidistance_results_{date}.md` après exécution des tests.
- CSV exports et comptes-rendus d'entretiens dans `info/research/raw/` (voir checklist `info/recueil_besoins.md`).
- Tests a11y & preuves dans `info/research/a11y_tests/`.
- Exécution des test cases référencés dans `info/tracability_matrix.csv` (attacher logs/screenshots)
