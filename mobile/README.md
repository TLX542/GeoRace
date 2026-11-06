# GeoRace Mobile — React Native CLI

Application TypeScript indépendante, sans Expo. Le backend existant reste dans ../src/backend et n’est pas modifié. L’ancien prototype Expo à la racine est conservé ; lancez les commandes mobiles depuis ce dossier.

## Démarrer

Prérequis : Node >=22.11, JDK 17 et Android Studio avec SDK/NDK correspondant à android/build.gradle. Un Mac avec Xcode et CocoaPods est nécessaire pour iOS.

~~~sh
cd mobile
npm ci
npm start
# Autre terminal, même dossier :
npm run android
~~~

Sur macOS pour iOS :

~~~sh
cd mobile
bundle install
cd ios
bundle exec pod install
cd ..
npm run ios
~~~

Pour une installation complète sur un autre PC, suivre [TESTER.md](TESTER.md). Les dépendances mobiles sont distinctes de celles du backend. Après l’installation des outils, rouvrir VS Code pour récupérer les nouvelles variables d’environnement.

## Backend local

Suivre la configuration backend déjà documentée dans le README racine (PostgreSQL, DATABASE_URL, JWT_SECRET). Ne placez jamais JWT_SECRET dans le frontend. Depuis la racine, une fois ses dépendances installées et son environnement configuré : npm run db:up, puis npm run backend:start. Le frontend ne démarre pas le backend et ne change ni schéma ni serveur.

Depuis l’écran de connexion, « Connexion au backend » permet de renseigner l’origine et de tester GET /health.

| Appareil | Origine par défaut / à renseigner |
| --- | --- |
| Émulateur Android Studio | http://10.0.2.2:3000 |
| Simulateur iOS | http://localhost:3000 |
| Téléphone physique | http://IP_LOCALE_DU_PC:3000, même réseau Wi-Fi |
| Android USB avec adb reverse tcp:3000 tcp:3000 | http://localhost:3000 |

Autoriser le port 3000 dans le pare-feu local si nécessaire. HTTP Android est autorisé uniquement par la variante debug du template. iOS autorise le réseau local ; pour un appareil iOS et une IP HTTP soumise à ATS, privilégier un nom local .local ou un tunnel HTTPS de développement. La production nécessite HTTPS. Déconnectez-vous avant de changer de backend ; les brouillons sont isolés par origine et par utilisateur.

## Fonctions connectées

- POST /auth/register et /auth/login : compte réel, token JWT stocké via Keychain/Keystore.
- GET /me : restauration et vérification de session ; 401 renvoie à la connexion.
- POST /runs : envoi du startedAt, durationMs, distanceM et des points {lat,lng,t,segment}.
- GET /runs et /runs/:id : historique et détail du parcours.
- DELETE /runs/:id : suppression après confirmation.
- GPS natif, permissions Android/iOS, pause/reprise, distance Haversine, tracé relatif SVG sans service cartographique ni clé API.
- Brouillon local sauvegardé toutes les 5 secondes et à la pause, jusqu’à 10 000 positions. Arrêt automatique du suivi en arrière-plan ; reprise manuelle. Ce n’est pas un service GPS en arrière-plan.

Le backend ne fournit pas de matching, de classement ou de duels : aucune donnée de compétition fictive n’est présentée. Il n’offre pas de clé d’idempotence : si un envoi expire après réception côté serveur, vérifier l’historique avant de le renouveler. Le brouillon reste disponible en cas d’erreur. Les tracés locaux utilisent AsyncStorage ; seul le token est dans le stockage sécurisé.

## Architecture

~~~text
src/app/                    navigation et composition
src/features/auth/          connexion et session
src/features/runs/          API courses, historique, détail, GPS
src/features/settings/      profil et adresse backend
src/shared/api/             client HTTP, timeout, erreurs, bearer
src/shared/                 types du contrat backend et composants UI
android/ et ios/            projets natifs versionnés
~~~

## Vérification

~~~sh
npm run typecheck
npm run lint
npm test -- --runInBand
~~~

Pour la recette sur appareil : tester /health, créer un compte de test, lancer une sortie en extérieur, pause/reprise, enregistrer, ouvrir le détail puis supprimer une course de test. Couper le réseau avant l’envoi pour vérifier la conservation du brouillon. Fermer puis rouvrir l’app pour vérifier la restauration. Tester le refus du GPS et une expiration de session. Les essais réels nécessitent le backend démarré et un appareil/simulateur.

Le template utilise une signature debug Android pour les builds locaux. Avant une distribution, configurer identifiants définitifs, signature release et URL HTTPS. Le frontend se développe depuis le dossier mobile ; le prototype historique et le backend restent séparés.

Références : [initialisation CLI officielle](https://reactnative.dev/docs/0.84/getting-started-without-a-framework), [template communautaire](https://github.com/react-native-community/template).
