# GeoRace - Contexte Concurrentiel, Audit Technique & Conformité

> **Epitech Innovation Track** | Version VPS self-hosted

---

## Partie 1 - Contexte Concurrentiel

### Intuition

Les applications de running actuelles transforment la course en « tracking » plutôt qu'en expérience compétitive vivante. Les coureurs enregistrent des statistiques, comparent des segments et reçoivent des likes... mais ne vivent pas de confrontation réelle. Pourtant, la motivation humaine repose sur la compétition directe, le défi immédiat et la progression mesurable face à un adversaire réel.

GeoRace apporte cette dimension manquante : une compétition géolocalisée immersive, avec **Ghost Races asynchrones** comme cœur du système, et un module duel live secondaire. Tout le traitement (stockage, scoring, compression, replay) est centralisé sur un VPS self-hosted économique, permettant un MVP fonctionnel à faible coût pour tester l'expérience compétitive.

---

### Objectivité - Critères d'analyse

#### Axe Business

1. Modèle économique (Freemium, abonnement, sponsoring)
2. Engagement & Rétention (interaction active vs passive)
3. Effet réseau local (densité utilisateur nécessaire)
4. Proposition de valeur différenciante
5. Facilité d'adoption / friction onboarding

#### Axe Technique

1. Latence temps réel → duel live secondaire sur VPS unique
2. Précision GPS & équité
3. Protection des données personnelles
4. Scalabilité infrastructure → limité au VPS pour MVP, évolutif
5. Complexité algorithmique (matchmaking & équidistance)

---

### Tableau Comparatif

| Critère | GeoRace | Strava | Nike Run Club | Runkeeper |
|---------|---------|--------|---------------|-----------|
| Duel temps réel | ✅ Oui (secondaire VPS) | ❌ Non | ❌ Non | ❌ Non |
| Matchmaking ELO | ✅ Oui | ❌ Non | ❌ Non | ❌ Non |
| Tracking GPS | ✅ Oui | ✅ Oui | ✅ Oui | ✅ Oui |
| Interaction live | ✅ Oui (VPS WebSocket) | ❌ Non | ❌ Non | ❌ Non |
| Mode asynchrone compétitif | ✅ Oui (Ghost) | ⚠️ Segments | ⚠️ Défis | ❌ Non |
| Infrastructure live faible latence | VPS requis | Non requis | Non requis | Non requis |
| Différenciation principale | Duel équitable + Ghost central | Réseau social | Coaching | Tracking |

> **Conclusion :** GeoRace crée une nouvelle catégorie - compétition géolocalisée temps réel et asynchrone, économiquement viable sur un VPS étudiant.

---

## Partie 2 - Audit Technique & Légal

### 1. État de l'Art Technique

#### Bibliothèques & Frameworks

| Technologie | Usage |
|-------------|-------|
| React Native / Flutter | Mobile cross-platform |
| Node.js + WebSocket | Communication temps réel |
| PostgreSQL + PostGIS | Calcul géospatial avancé, hébergé sur VPS |
| Mapbox SDK / Google Maps SDK | Navigation |
| Firebase Cloud Messaging | Notifications push |

> Pas de développement de moteur GPS ni protocole réseau maison.

#### Hébergement & APIs

| Service | Usage |
|---------|-------|
| OAuth (Google / Apple) | Login rapide |
| Auth email/password + bcrypt | Authentification classique |
| Stripe | Paiement Premium (futur) |
| VPS unique | API + Ghost Engine + DB + WebSocket |
| Backblaze B2 (optionnel) | Sauvegarde externe runs/replays |

> **Stratégie :** acheter les briques standard, développer uniquement la logique différenciante (matchmaking, Ghost, scoring).

#### Benchmark Technique

Les concurrents ne gèrent pas :
- Synchronisation départ < 500 ms
- Calcul équidistant multi-participants
- Matchmaking dynamique basé sur position + ELO

GeoRace introduit une complexité technique centrée sur le **Ghost Engine VPS**, avec duel live secondaire.

---

### 2. Audit Sécurité & Légal (France)

#### RGPD (GDPR)

**Données collectées :**

| Donnée | Statut |
|--------|--------|
| Email | Obligatoire |
| Pseudonyme | Obligatoire |
| Position GPS | Uniquement pendant duel |
| Score ELO | Obligatoire |
| Historique des duels | Obligatoire |
| Sexe | Optionnel |
| Âge / date de naissance | Optionnel |
| Taille / poids → BMI calculé | Optionnel |

**Minimisation :**
- Sexe & BMI : optionnels pour catégories compétitives
- GPS : visible uniquement en duel actif
- Droit à l'effacement garanti

#### Données sensibles

- BMI et données physiques → non médicalisées, uniquement pour stats sportives
- Aucun diagnostic, pas de stockage prolongé
- Si évolution vers données santé → obligation HDS

> Le certificat médical sportif a été **définitivement retiré du scope** à toutes les phases du projet.

#### Authentification

| Méthode | Description |
|---------|-------------|
| OAuth (Google / Apple) | Adoption rapide, sécurité renforcée |
| Compte classique | Email/password + bcrypt, double auth possible |

> **Recommandation MVP :** OAuth + email classique (double fallback)

---

#### Risques OWASP Top 10

| Risque | Mitigation |
|--------|-----------|
| Injection SQL | ORM + requêtes paramétrées |
| Broken authentication | JWT sécurisé + rotation |
| Exposition données sensibles | TLS |
| Mauvaise configuration serveur | DevSecOps |
| API abuse | Rate limiting |

---

### 3. Accessibilité (A11y)

- Standard **WCAG 2.1 niveau AA**, RGAA FR
- Compatible screen readers
- Contraste élevé, texte adaptable
- Feedback audio pendant duel
- Boutons larges pour handicap moteur
- Mode commande vocale (futur)

---

### 4. Audit Compétences Équipe

| Compétence | Nécessaire |
|-----------|-----------|
| Développement mobile | Oui |
| Backend temps réel | Oui |
| Géospatial (PostGIS) | Oui |
| Sécurité & RGPD | Oui |
| UX/UI | Oui |
| DevOps VPS | Oui |
| Marketing sportif | Oui |

#### Gap Analysis

| Forces | Faiblesses |
|--------|-----------|
| Dev, vision produit, algorithme | Juridique RGPD, sécurité avancée, accessibilité, relations institutionnelles |

#### Plan d'action

- Consultation juridique RGPD
- Audit sécurité VPS avant scale
- Formation WCAG
- Partenariat club running local
- Scope MVP limité à la France
- VPS unique pour réduire le coût (~5-15 €/mois)

---

*Document réalisé dans le cadre du projet GeoRace - Epitech Innovation Track*