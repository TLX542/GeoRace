# Plan d’évolution & de migration (MVP → Scale)

Objectif : architecture et étapes opérationnelles pour passer du MVP à une mise à l’échelle en production.

## Étapes
1. MVP (type monolithe) : un seul cluster, workers scalables horizontalement, portée géographique limitée (2–3 villes).
2. V2 (séparation de services) : séparer le matchmaker, le moteur de course, l’ingestion de télémétrie ; instances PostGIS dédiées ; réplicas en lecture.
3. Scale (sharding & multi-région) : sharding géospatial par région/ville ; passerelles WebSocket en périphérie par région ; autoscaling (HPA) et métriques personnalisées.

## Déclencheurs (exemples)
- Si sessions concurrentes actives > 500 pendant 3 jours → déclencher le passage en infra V2 pour la région concernée.
- Si l’ingestion de télémétrie > 5 000/s de façon soutenue → provisionner des workers d’ingestion supplémentaires & sharding.

## Étapes & checklist (MVP→V2)
- [ ] Ajouter l’observabilité : tableaux de bord latence, débit de télémétrie
- [ ] Implémenter la découverte de services + une passerelle API
- [ ] Migrer la base vers un cluster avec réplicas en lecture
- [ ] Renforcer les politiques de sécurité, la gestion des secrets
- [ ] Exécuter des tests de charge avec des clients synthétiques (k6 ou custom)

## Dette technique & plan
- Dette : un seul schéma DB pour toutes les régions - plan : partitionner par ville, puis shard.
- Remédiation : refactor de la couche d’accès aux données (3 sprints), ajout de scripts de migration.

-- Fin.