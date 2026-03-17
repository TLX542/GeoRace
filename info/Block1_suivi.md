# Suivi – Bloc 1

**Cadrer un projet de conception et développement d'une solution logicielle**

**Date :** 2026-03-16  
**Projet :** GeoRace (application mobile de running compétitive en temps réel)

## Référentiel de compétences (C1 → C5)

### C1 — Recenser les besoins du client et des utilisateurs

#### Critère : Le candidat présente une analyse des besoins clients ainsi que les échanges ayant permis son élaboration et couvrant l’intégralité du scope fonctionnel [C1]

**Statut :** ✅ Présent (templates & mapping)

**Preuves :**
- `info/Client_Needs_&_Functional_Scope.md` — L17-L263 — personas + user stories + backlog + MoSCoW/MVP
- `info/recueil_besoins.md` — L1-L73 (tout le fichier) — méthode + guide + formats + checklist preuves
- `info/tracability_matrix.csv` — L1-L5 (tout le fichier) — mapping des exigences vers specs/tests/lots

**Manques :**
- Ajout des preuves terrain réelles (CSV / verbatims) dans `info/research/raw/`.

---

#### Critère : Les besoins identifiés tiennent compte des normes en vigueur concernant les usages des personnes en situation de handicap [C1] 

**Statut :** ✅ Présent (templates)

**Preuves :**
- `info/Context_Audit_&_Compliance.md` — L145-L153 — section accessibilité (WCAG/RGAA) + exigences
- `info/docs_a11y.md` — L1-L26 (tout le fichier) — checklist documentaire et tests a11y
- `info/specs_fonctionnelles.md` — L10-L11 + L23-L28 + L53-L57 — sections a11y (parcours + critères)

**À faire :**
- Exécuter les tests a11y manuels et automatisés, déposer preuves dans `info/research/a11y_tests/`.

---

### C2 — Réaliser un audit technique, fonctionnel et de sécurité

#### Critère : Le dossier du candidat contient un compte-rendu d’audit technique, fonctionnel et de sécurité de l’environnement d’éxécution du projet mettant en lumière les contraintes et opportunités du contexte opérationnel [C2] 

**Statut :** ✅ Présent (documents et templates)

**Preuves :**
- `info/Context_Audit_&_Compliance.md` — L7-L185 (tout le fichier) — audit contexte (concurrence) + audit technique + sécurité/RGPD + accessibilité
- `info/Impacts_Risks_&_Mitigation.md` — **Partie 2 : Impact Environnemental (GreenIT)** — L283-L343 (couvre l'audit environnemental / GreenIT)
- `info/specs_techniques.md` — L48-L61 — contraintes NFR + sécurité/RGPD (complément)

**Manques :**
- Si une forme exacte `audit_environnement.md` est demandée, créer/compléter à partir des éléments existants.

---

#### Critère : Le candidat est en mesure d’expliquer l’approche méthodologique mise en oeuvre pour réaliser l’audit : moyens d’investigation, collecte de retours utilisateurs, … [C2]

**Statut :** ✅ Présent (template sections ajoutées)

**Preuves :**
- `info/recueil_besoins.md` — L16-L31 — méthodologie de recueil (méthodes, échantillon, outils)
- `info/poc_tracking/README.md` — L5-L28 — méthode POC (tests, environnement, format de mesure, seuils)

---

#### Critère : Les documents présents dans le dossier du candidats respectent les recommandations techniques permettant l’accessilité aux personnes en situation de handicap [C2] [C3] 

**Statut :** ✅ Présent (checklist fournie)

**Preuves :**
- `info/docs_a11y.md` — L5-L24 — checklist docs + checklist produit + plan de tests & preuves
- `info/Context_Audit_&_Compliance.md` — L145-L153 — exigences a11y à appliquer aux livrables

**À faire :**
- Appliquer la checklist aux livrables et joindre preuves dans PR/commits.

---

### C3 — Rédiger les spécifications techniques et fonctionnelles

#### Critère : Le dossier du candidat présente un corpus de documentations des spécifications techniques et fonctionnelles définissant le périmètre du projet considérant les contraintes identifiées durant l’audit [C3] 

**Statut :** ✅ Présent

**Preuves :**
- `info/Technical_&_Functional_Specifications.md` — L7-L333 — scope + architecture + API + parcours + écrans clés
- `info/specs_fonctionnelles.md` — L1-L64 (tout le fichier) — specs fonctionnelles testables
- `info/specs_techniques.md` — L1-L78 (tout le fichier) — specs techniques + NFR
- `info/tracability_matrix.csv` — L1-L5 (tout le fichier) — mapping REQ → specs/tests

**Manques :**
- Rédaction/complétude des critères d'acceptation par feature (à remplir dans les specs ou via issues/tests).

---

#### Critère : Les spécifications techniques et fonctionnelles présentées par le candidats prennent en considération les problématiques d’accessibilité numérique des personnes en situation de handicap [C3] 

**Statut :** ✅ Présent

**Preuves :**
- `info/docs_a11y.md` — L5-L20 — checklist + exigences (touch targets, contrast, etc.)
- `info/specs_fonctionnelles.md` — L10-L11 + L23-L28 + L53-L57 — sections a11y intégrées aux specs

---

### C4 — Chiffrer le projet

#### Critère : Le dossier du candidat comporte une analyse financière des coûts de production et d’exploitation de la solution proposée en cherchant à optimiser les coûts et ressources au regard du budget transmis par le client [C4] 

**Statut :** ✅ Présent

**Preuves :**
- `info/GeoRace_Costing_&_Technical_Sizing.md` — L18-L190 (au moins) — CAPEX/OPEX + coûts infra (PoC/MVP)
- `info/chiffrage_budget.md` — L5-L40 — hypothèses + infra + template run recurring

---

#### Critère : Le chiffrage du projet présente différents scénarii en s’appuyant sur les benchmarks réalisés [C4] 

**Statut :** ✅ Présent

**Preuves :**
- `info/chiffrage_budget.md` — L12-L30 — scénarios Lean/Standard/Robuste
- `info/Client_Needs_&_Functional_Scope.md` — L155-L206 + L232-L254 — MoSCoW + MVP (jalons temporels) servant de base de scénario
- `info/GeoRace_Costing_&_Technical_Sizing.md` — L80-L147 — benchmarks VPS / carto / backup (base des hypothèses)

---

### C5 — Prévoir les impacts techniques et fonctionnels

#### Critère : Le dossier du candidat comporte une étude prospective des voies d’évolution et de migration en s’appuyant sur l’audit technique réalisé [C5] 

**Statut :** ✅ Présent (plan & script)

**Preuves :**
- `info/GeoRace.md` — L231-L270 — phase scale (an 2) + contraintes + risques (vue produit)
- `info/evolution_migration.md` — L1-L25 (tout le fichier) — plan d’évolution/migration + triggers + checklist
- `info/Impacts_Risks_&_Mitigation.md` — L118-L199 (au moins) — risques MVP/Scale + mitigations (orienté évolution)

**Manques :**
- Exécuter tests de charge et définir seuils précis (triggers) basés sur POC/metrics.

---

#### Critère : Le candidat est capable de vulgariser à l’oral de manière synthétique son étude prospective des voies d’évolution et de migration [C5] 

**Statut :** ✅ Présent

**Preuves :**
- `info/GeoRace_Presentation.md` — L132-L204 — slides “Roadmap / Architecture / Viabilité” (support oral)
- `info/speech_migration.md` — L1-L26 (tout le fichier) — script oral (2–3 minutes)

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
- CSV exports et comptes-rendus d'entretiens dans `info/research/raw/` (voir checklist `info/recueil_besoins.md` L59-L65).
- Tests a11y & preuves dans `info/research/a11y_tests/` (voir `info/docs_a11y.md` L21-L24).
- Exécution des test cases référencés dans `info/tracability_matrix.csv` (attacher logs/screenshots)
