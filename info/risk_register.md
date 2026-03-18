# Registre des risques - GeoRace

Colonnes : id, risque, probabilité (F/M/E), impact (F/M/E), mitigation, propriétaire, statut, indicateur

- R-001, Imprécision GPS / sauts, M, E, Mitigation : lissage GPS, validation multi-capteurs, propriétaire : Race Eng, statut : Open, indicateur : %points avec accuracy>20m
- R-002, Triche (téléportation / spoofing), M, E, Mitigation : heuristiques (seuil de vitesse), contrôles côté serveur, marquage & revue manuelle, propriétaire : Security, statut : Open, indicateur : flagged_sessions_per_week
- R-003, Dépendance Mapbox (quota/coût), M, M, Mitigation : fournisseur de repli, budget & cache, propriétaire : Infra, statut : Open, indicateur : monthly_map_cost
- R-004, RGPD / AIPD requise pour la localisation, F, E, Mitigation : consultation juridique, politique de rétention, propriétaire : Legal, statut : Open, indicateur : DPIA_done (Y/N)

## Usage
- Mettre à jour le statut après les mitigations
- Ajouter un responsable et une date cible
- Export mensuel vers `reports/risk_register_snapshot_YYYY-MM-DD.csv`

-- Fin.