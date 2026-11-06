# État de validation — 6 novembre 2026

- TypeScript : vérification réussie.
- ESLint : vérification réussie, sans avertissement.
- Jest : 10 tests réussis (contrat HTTP, formulaires de connexion/inscription, distance et segments GPS).
- Bundles Metro Android et iOS : génération réussie.
- Compilation native Android debug x86_64 : réussie avec Node 22, JDK 17, SDK 36, NDK 27.1.12297006 et Gradle 9.
- Application installée et ouverte dans un émulateur Android 13 / API 33 ; écran de connexion affiché sans erreur de chargement.
- Réseau de l’émulateur : /health du backend et /status du serveur Metro vérifiés avec succès.
- API du backend existant : inscription, connexion, profil, création, liste, détail et suppression d’une course vérifiés sur une base PostgreSQL 16 locale de test. Le compte de démonstration et cette base sont propres au PC de développement, absents du dépôt.
- Une connexion a été soumise depuis le formulaire Android. Le test a été interrompu avant la vérification complète des écrans connectés : parcours GPS, sauvegarde hors ligne et restauration de session restent à vérifier sur appareil.
- Backend : aucun changement de code ni de schéma versionné.
- iOS : projet et bundle JavaScript préparés ; compilation native non vérifiée, nécessite macOS/Xcode/CocoaPods.
- Audit npm après corrections compatibles : 17 alertes (9 faibles, 8 modérées) dans les chaînes CLI/Jest/ESLint ; aucune élevée ou critique. Les corrections restantes proposées automatiquement impliquent des changements incompatibles, non appliqués.

Les dossiers de compilation, dépendances installées, chemins SDK locaux, fichiers .env et identifiants de test sont exclus du versionnement. Le fichier android/app/debug.keystore est uniquement la clé publique de développement du template React Native, jamais une clé de distribution.

Procédure de recette reproductible : [TESTER.md](TESTER.md).
