# Speech : MVP → Scale (2–3 minutes)

Objectif : script pour expliquer le plan de migration simplement.

« Hook » (10s)
- GeoRace réussit quand les runners locaux peuvent rivaliser de façon équitable et cohérente en temps réel.

Problème & contraintes (30s)
- Le MVP gère un petit nombre de villes avec un seul cluster ; les principales contraintes sont la latence de télémétrie, la précision GPS et la dépendance au fournisseur de carte.

Ce qu’on livre en MVP (30s)
- Un parcours duel fonctionnel, des heuristiques anti‑triche basiques, des requêtes géospatiales sur PostGIS, et des dashboards pour mesurer latence et adoption.

Comment on scale (60s)
- Étape 1 : séparer les services — isoler matchmaker & ingestion pour scaler l’ingestion indépendamment.
- Étape 2 : introduire des passerelles régionales et shard les données géospatiales par ville pour garder une faible latence locale.
- Étape 3 : renforcer la prod avec autoscaling, monitoring, et runbooks ; ensuite seulement étendre à de nouvelles villes.

Risques & mitigations (20s)
- Risque : coûts fournisseur de carte → mitigation : cache et fournisseurs de repli.
- Risque : pic d’ingestion → mitigation : backpressure, couches de queue.

Call to action (10s)
- Prochaine étape : exécuter les deux POCs (latence & équidistance) et revoir les coûts — cela donnera les seuils de déclenchement définitifs pour la migration.

-- Fin.