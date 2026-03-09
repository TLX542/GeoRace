---
marp: true
theme: default
paginate: true
backgroundColor: #0a0a1a
color: #ffffff
style: |
  section {
    font-family: 'Segoe UI', Arial, sans-serif;
    background-color: #0a0a1a;
    color: #ffffff;
    padding: 40px 60px;
  }
  h1 { color: #4fc3f7; font-size: 2.2em; margin-bottom: 10px; }
  h2 { color: #4fc3f7; font-size: 1.6em; border-bottom: 2px solid #4fc3f7; padding-bottom: 8px; }
  h3 { color: #81d4fa; font-size: 1.2em; }
  strong { color: #ffd54f; }
  table { width: 100%; border-collapse: collapse; font-size: 0.85em; }
  th { background-color: #1a237e; color: #4fc3f7; padding: 8px 12px; }
  td { padding: 7px 12px; border-bottom: 1px solid #1e2a4a; }
  tr:nth-child(even) { background-color: #0d1b2a; }
  ul { line-height: 1.8; }
---

<!-- SLIDE 1 : TITRE - 20s -->
# 🏁 GeoRace
## *Transformez chaque course en compétition.*

> **Le premier système de Ghost Race asynchrone avec matchmaking ELO.**

&nbsp;

| | |
|---|---|
| 👻 **Cœur du produit** | Ghost Race asynchrone |
| 📱 **Plateforme** | iOS & Android (React Native) |
| 🎯 **Différenciateur** | Courir contre un fantôme réel, seul, n'importe quand |

*Epitech Innovation Track*

---

<!-- SLIDE 2 : LE PROBLÈME - 40s -->
## 😤 Le Problème

&nbsp;

> **60% des utilisateurs d'apps running abandonnent après 3 mois.**

&nbsp;

| ❌ Ce que font les apps actuelles | 😔 Ce que ça provoque |
|---|---|
| Tracker des km, comparer des chiffres | Aucune émotion, aucune adrénaline |
| Segments fixes (Strava) | Toujours les mêmes parcours |
| Défis asynchrones sans présence | On compare des stats, pas des adversaires |
| Réseau social passif | Motivation qui s'effondre en semaines |

&nbsp;

**Ce que les coureurs veulent vraiment :**
✅ L'adrénaline d'un vrai duel &nbsp;&nbsp; ✅ Un objectif concret à chaque sortie &nbsp;&nbsp; ✅ Progresser face à d'autres humains

---

<!-- SLIDE 3 : LA SOLUTION - 60s -->
## 👻 La Solution : Ghost Race

### *Un adversaire à chaque sortie - sans qu'il soit là.*

&nbsp;

```
  VOUS COUREZ        ON MATCHE            VOUS AFFRONTEZ      VOUS PROGRESSEZ
  ─────────────      ─────────────        ──────────────      ───────────────
  📱 GPS             🧠 Algorithme        👻 Son replay        📈 ELO mis à
  enregistre     →   trouve le ghost  →   sur votre carte →   jour instantané
  votre run          parfait (ELO)        en temps réel
```

&nbsp;

**Ce qui rend GeoRace unique :**
- 🕐 **Asynchrone** : pas besoin d'adversaire disponible au même moment
- 🎯 **Matchmaking ELO** : vous affrontez toujours votre niveau exact
- 📍 **N'importe quel parcours** : pas de segments fixes prédéfinis
- 🛡️ **Anti-triche** : chaque ghost est validé avant injection dans le pool

> **Strava vous dit combien vous avez couru. GeoRace vous dit si vous avez GAGNÉ.**

---

<!-- SLIDE 4 : SCÉNARIO UTILISATEUR - 60s -->
## 👤 Marie, 32 ans - Avant / Après

&nbsp;

| | **Sur Strava (avant)** | **Sur GeoRace (maintenant)** |
|---|---|---|
| **Lancement** | Lance l'app, court seule | Ghost de Lucas (ELO 1 395) chargé automatiquement |
| **Pendant** | Regarde sa distance/allure | Voit le ghost 50m devant elle sur la carte |
| **Arrivée** | « 8min23 sur ce segment » | **Elle gagne de 12 secondes** |
| **Après** | 12 likes | **+28 ELO · Badge « 5 victoires »** |
| **Motivation** | ★★☆☆☆ | **★★★★★** |

&nbsp;

> **Ce qui change : l'excitation d'une vraie compétition vs la comparaison froide de chiffres.**

---

<!-- SLIDE 5 : DIFFÉRENCIATION - 45s -->
## ⚔️ GeoRace vs Concurrents

&nbsp;

| Fonctionnalité | **GeoRace** | Strava | Nike Run Club | Runkeeper |
|---|:---:|:---:|:---:|:---:|
| 👻 Ghost Race asynchrone | ✅ **CORE** | ❌ | ❌ | ❌ |
| 🎯 Matchmaking ELO | ✅ | ❌ | ❌ | ❌ |
| ⚡ Sans adversaire simultané | ✅ Toujours | ❌ | ❌ | ❌ |
| 📍 N'importe quel parcours | ✅ | ❌ segments fixes | ❌ | ❌ |
| 📍 Tracking GPS | ✅ | ✅ | ✅ | ✅ |

&nbsp;

> 🏆 **GeoRace occupe un angle mort du marché.**
> Les grands acteurs sont trop ancrés dans le tracking social pour pivoter.

---

<!-- SLIDE 6 : PoC & ROADMAP - 45s -->
## 🗓️ Roadmap - Du PoC au Scale

&nbsp;

```
  ◀── 2 SEMAINES ──▶  ◀────── Mois 1-6 ──────▶  ◀── Mois 7-12 ──▶  ◀── An 2 ──▶

  🧪 PoC              🚀 MVP Phase 2            🎮 V2               🌍 Scale
  ─────────────────   ──────────────────────    ─────────────────   ──────────
  ✅ GPS tracking     ✅ Backend NestJS          ✅ Duel live         ✅ Premium
  ✅ Ghost replay     ✅ Auth + profils           ✅ Badges            ✅ Tournois
     (local)          ✅ Ghost Matching ELO      ✅ Ligues locales    ✅ Marques
  ✅ Ghost dummy      ✅ Anti-triche simple
  ✅ Race vs ghost    ✅ Leaderboard
  ─────────────────   ──────────────────────    ─────────────────   ──────────
  🎯 Valider          🎯 500 users · 2 villes    🎯 5 000 users      🎯 50 000
     l'engagement
  💰 0 €/mois         💰 ~10-18 €/mois           💰 ~45 €/mois       💰 ~230 €/mois
```

---

<!-- SLIDE 7 : ARCHITECTURE TECHNIQUE - 45s -->
## 🏗️ Architecture - PoC → MVP

&nbsp;

**PoC (2 semaines) - 100% local, 0 backend**
```
  📱 React Native + Expo
  ├── expo-location        → GPS tracking temps réel
  ├── AsyncStorage         → Sauvegarde locale du run
  ├── react-native-maps    → Affichage carte + polyline ghost
  └── Ghost dummy JSON     → Run hardcodé dans l'app
```

**MVP Phase 2 - VPS Hetzner (~6 €/mois)**
```
  📱 Mobile          🖥️ VPS (Hetzner DE)              ☁️ Externe
  ────────────       ────────────────────────          ──────────
  React Native   →   Nginx · NestJS · Redis        →   Mapbox
  GPS + Replay       Ghost Worker · PostgreSQL          FCM · OAuth
  WebSocket          PostGIS · BullMQ                   Backblaze B2
```

> **L'architecture PoC valide le concept avant d'investir dans l'infra.**

---

<!-- SLIDE 8 : MODÈLE ÉCONOMIQUE - 45s -->
## 💰 Modèle Économique & Viabilité

&nbsp;

| 🟢 Gratuit | 🟡 Premium - 4,99 €/mois |
|---|---|
| 3 ghost races/jour | Ghost races **illimitées** |
| Classement ELO | Statistiques avancées |
| Événements communautaires | Ghost vs ses propres records · 0 publicité |

&nbsp;

| Phase | Infra/mois | Revenus potentiels* | Marge brute |
|---|---|---|---|
| PoC | **0 €** | 0 € | - |
| MVP (1 000 users) | ~45 € | ~400 € | **~89%** |
| Scale (10 000 users) | ~230 € | ~4 000 € | **~94%** |

*8% conversion Premium à 4,99 €/mois*

> **CAPEX total : ~130-550 € · LTV estimée : 60 €/user/an · LTV/CAC > 3**

---

<!-- SLIDE 9 : RISQUES & MÉTRIQUES - 30s -->
## ⚠️ Risques Clés & Métriques de Succès

&nbsp;

**Risques PoC prioritaires**

| Risque | Mitigation |
|---|---|
| GPS imprécis | Tests 3 appareils min · Filtre précision > 30m |
| Ghost dummy mal calibré | 3 niveaux disponibles · Allure 5:30/km par défaut |
| Mécanique pas engageante | C'est **l'hypothèse à tester** · Questionnaire post-course |
| Dépassement 2 semaines | 2 sprints clairs · Règle de coupe définie |

&nbsp;

**Métriques de succès post-MVP**

| Indicateur | Cible |
|---|---|
| Rétention J7 | > 40% |
| Ghost races/semaine/user | 5 – 8 |
| Conversion Premium | 8 – 12% |
| Coefficient K | > 1,2 |

---

<!-- SLIDE 10 : CONCLUSION - 30s -->
## 🏆 Conclusion

&nbsp;

> *« GeoRace ne remplace pas Strava. GeoRace transforme la course en sport compétitif accessible. »*

&nbsp;

| ✅ Argument | Preuve |
|---|---|
| **Concept unique** | Aucun concurrent sur la Ghost Race avec ELO dynamique |
| **Pas de contrainte densité** | Le PoC fonctionne dès le 1er utilisateur, seul |
| **Validation rapide** | PoC livrable en 2 semaines, feedback immédiat |
| **Modèle viable** | Marge brute > 90% dès 1 000 abonnés Premium |
| **Marché prouvé** | 100M+ users apps running cherchent exactement ça |

&nbsp;

```
  PoC (2 sem.) → MVP (6 mois) → 500 users → 5 000 users → 50 000 users
```

# 🏁 *GeoRace - Run. Ghost. Win.*