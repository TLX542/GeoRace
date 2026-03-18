# Recueil des besoins - GeoRace

But : documenter la collecte terrain et fournir preuves (compte‑rendus, verbatims, exports).

## Objectifs
- Documenter la méthode de recueil (qui, quoi, comment, quand)
- Rassembler les preuves brutes
- Produire une synthèse priorisée et traçable vers les user stories / specs

## Emplacement conseillé
- Stocker preuves brutes dans `info/research/raw/` (CSV, audio, exports forms)
- Stocker synthèse et insights dans `info/recueil_besoins.md` (ce fichier)

---

## 1. Méthodologie (template)
- Périmètre : villes pilotes (ex : Lyon, Paris), cibles (runners réguliers, compétiteurs, débutants).
- Méthodes : interviews semi-structurées (N=8–15), questionnaire en ligne (N>50), observation terrain (N sessions), tests utilisateurs (N sessions).
- Échantillon : âge, sexe, niveau, fréquence running, utilisation apps.
- Durée : dates & durée des entretiens / tests.
- Outils : Google Forms / Typeform (exports CSV), Zoom/recordings (liens), observation notes.

---

## 2. Guide d'entretien (questions clés)
- Présentation rapide + consentement d'utilisation des données (RGPD).
- Parcours running : fréquence, applications utilisées, frustrations.
- Scénarios : duel en temps réel, ghost mode, fairness (triche), social.
- Accessibilité : besoins spécifiques (malvoyance, mobilité réduite).
- Priorités : ce que l'utilisateur veut sauver à tout prix / ce qu'il abandonnerait.

---

## 3. Formulaire d'export / CSV (exemple de colonnes)
- respondent_id, date, method, age_range, experience_level, city, q1_usage_apps, q2_frustrations, q3_interest_duel, q4_accessibility_requirements, verbatim

Place CSVs dans `info/research/raw/respondents.csv`.

---

## 4. Compte‑rendu d'entretien (template)
- respondent_id:
- date:
- résumé 3 lignes:
- verbatim clefs:
- insights:
- impact sur specs (=> user_story_xx / requirement_id)

---

## 5. Synthèse & Mapping
- Synthèse en 1 page (top 5 insights)
- Mapping vers user stories / MoSCoW
  - Ex : Insight: "Les duels doivent être courts (5–10 min)" → User story US-012, Acceptance: duel <= 10min, SLO participation > X.
- Annexes : verbatims anonymisés, CSVs, captures.

---

## 6. Preuves attendues pour validation (checklist)
- [ ] CSV export questionnaire dans `info/research/raw/`
- [ ] 5+ comptes-rendus d'interviews (fichiers .md ou .pdf) dans `info/research/raw/interviews/`
- [ ] Verbatims anonymisés dans `info/research/raw/verbatims.csv`
- [ ] Synthèse (top insights) et mapping vers user stories (section "Mapping" ci‑dessous)
- [ ] Signature/consentement RGPD ou note de conformité (si données personnelles)

---

## 7. Exemple d'entrée (verbatim + insight)
- respondent_id: R-001  
- verbatim: "J'aime l'idée d'un duel mais je veux pouvoir annuler sans perdre mon ELO si c'est la faute du GPS."  
- insight: besoin d'une règle d'abandon/annulation (=> affects A2.2 rules: duel cancel policy)

-- Fin.