# POC : Tracking & tests de latence

Objectif : guide pour exécuter le PoC sur la latence de télémétrie, la fréquence de mise à jour et l’impact batterie.

## Tests à exécuter
1. Test de latence télémétrie (WebSocket) : mesurer le temps bout en bout entre l’envoi télémétrie device et l’ack serveur.
2. Test de fréquence de mise à jour : tester 1/s, 0,5/s, 2/s ; mesurer ingestion et CPU/batterie.
3. Impact batterie : session trackée 30 minutes sur un appareil représentatif et mesurer le delta batterie.

## Environnement de test
- Devices : Android 10+, iOS 14+
- Réseau : 4G cellulaire, Wi‑Fi (conditions courantes)
- Serveur : endpoint WebSocket staging (fournir l’URL)

## Format de mesure (stocker les résultats)
- Fichier : `info/poc_tracking/latency_results_{date}.md`
- Champs : test_id, device, network_type, update_rate, measured_median_latency_ms, p95_latency_ms, battery_start, battery_end, notes

## Commandes exemple (pseudo)
- Lancer un émetteur client avec timestamp ; le serveur renvoie un ack avec timestamp serveur ; mesurer le delta.
- Utiliser adb / iOS instruments pour la batterie.

## Seuils attendus
- Cible latence médiane < 500 ms
- p95 < 1 s
- Batterie : drain additionnel < 5% sur 30 min (baseline)

-- Fin.