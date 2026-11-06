# Tester GeoRace sur un autre ordinateur

Le frontend React Native CLI sans Expo est dans **mobile/**. La racine contient encore le prototype Expo et le backend existant. Ne pas lancer le frontend depuis la racine.

## 1. Installer les outils

Pour Android sous Windows :

- Git et VS Code.
- Node.js **22 LTS**, version 22.11 minimum (npm inclus).
- Java **JDK 17** et variable JAVA_HOME pointant vers son dossier.
- Android Studio, avec Android SDK, Platform-Tools et Android Emulator.
- Dans le SDK Manager : **Android SDK Platform 36**, **Build-Tools 36.0.0**, **NDK 27.1.12297006**, **CMake 3.22.1**. Gradle peut demander des composants supplémentaires lors de la première compilation.
- ANDROID_HOME pointant vers le SDK ; ajouter ses dossiers platform-tools et emulator au PATH. Emplacement standard Windows : %LOCALAPPDATA%\Android\Sdk.
- Docker Desktop avec Docker Compose si le backend et PostgreSQL sont lancés sur ce PC. Docker est inutile pour seulement afficher le formulaire de connexion, ou si le backend fonctionne déjà ailleurs.

Fermer puis rouvrir VS Code après les installations. Vérifier node --version, java -version et adb version dans un nouveau terminal.

Dans Android Studio, Device Manager → Create Device → choisir un Pixel et télécharger une image Android **API 33 ou supérieure**. Démarrer le téléphone avec le bouton ▶. La virtualisation doit être activée sur le PC. Une image API 33 convient même si l’application est compilée avec le SDK 36.

Références officielles : [environnement React Native](https://reactnative.dev/docs/0.84/set-up-your-environment), [création d’un téléphone virtuel](https://developer.android.com/studio/run/managing-avds).

## 2. Récupérer la bonne branche

Dans un terminal :

~~~powershell
git clone --branch mobile --single-branch https://github.com/TLX542/GeoRace.git
cd GeoRace
git branch --show-current
~~~

Le résultat doit être mobile. Si le dépôt existe déjà, sauvegarder ses changements, puis git fetch origin, git switch mobile et git pull --ff-only origin mobile.

## 3. Démarrer le backend existant (si nécessaire)

Depuis la racine GeoRace :

~~~powershell
npm ci --legacy-peer-deps
Copy-Item src\backend\.env.example .env
~~~

Ne pas écraser un .env déjà configuré. Le fichier .env est ignoré par Git. L’option legacy-peer-deps concerne les dépendances du prototype historique à la racine ; elle n’est pas nécessaire dans mobile/.

Ouvrir .env et remplacer JWT_SECRET par une valeur locale aléatoire d’au moins 32 caractères. Garder DATABASE_URL correspondant à PostgreSQL et le port 3000 de l’exemple. Ne jamais copier JWT_SECRET dans l’application mobile.

Ouvrir Docker Desktop, attendre qu’il soit prêt, puis :

~~~powershell
npm run db:up
npm run backend:start
~~~

Le schéma fourni est appliqué automatiquement lors de la création du volume PostgreSQL. Si le backend possède déjà sa base configurée, utiliser sa procédure habituelle. Ne pas supprimer un volume existant pour réinitialiser une base contenant des données.

Ouvrir http://localhost:3000/health dans un navigateur : la réponse attendue contient status: ok. Laisser ce terminal ouvert.

## 4. Démarrer l’application Android

Dans un deuxième terminal, depuis la racine du dépôt :

~~~powershell
cd mobile
npm ci
npm start
~~~

Laisser ce terminal ouvert. Dans un troisième terminal, depuis le même dossier mobile :

~~~powershell
npm run android -- --active-arch-only
~~~

L’émulateur doit être déjà démarré. La première compilation télécharge de nombreuses dépendances et peut prendre plusieurs minutes. GeoRace s’ouvre ensuite dans le téléphone virtuel. Les changements de textes, de styles et de composants apparaissent après sauvegarde dans VS Code grâce au rechargement automatique.

Si Android ne trouve pas le SDK, créer mobile/android/local.properties avec sdk.dir=C:/Users/VOTRE_NOM/AppData/Local/Android/Sdk, adapté au chemin affiché dans Android Studio. Ce fichier est local et ignoré par Git.

## 5. Connecter le frontend au bon backend

Sur l’écran de connexion, descendre à Connexion au backend, renseigner l’adresse, puis appuyer sur Enregistrer et tester.

| Situation | Adresse API |
| --- | --- |
| Émulateur Android, backend sur le même PC | http://10.0.2.2:3000 |
| Téléphone physique, backend sur le PC | http://IP_LOCALE_DU_PC:3000, même réseau Wi-Fi |
| Simulateur iOS, backend sur le même Mac | http://localhost:3000 |
| Backend sur un autre ordinateur | http://IP_DE_CET_ORDINATEUR:3000 |

Le message attendu est Backend connecté · /health OK. Si nécessaire, autoriser les connexions au backend sur le port 3000 du réseau local. 10.0.2.2 désigne le PC qui héberge l’émulateur, pas celui d’un autre développeur.

Créer un compte de test dans l’application. Les comptes créés sur le PC d’un autre développeur n’existent pas automatiquement sur une nouvelle base locale.

## 6. Parcours de test

1. Créer un compte, se connecter et ouvrir les onglets Courir, Activité et Profil.
2. Démarrer une course et autoriser la localisation précise.
3. Sur émulateur : menu … → Location, envoyer des positions ou jouer un parcours. Un téléphone réel est préférable pour vérifier la précision du GPS.
4. Mettre en pause, reprendre, puis terminer et enregistrer.
5. Vérifier la course dans Activité, ouvrir son détail et son tracé.
6. Fermer et rouvrir l’application pour vérifier la restauration de session.
7. Pour tester la coupure réseau, arrêter le backend avant l’envoi : le brouillon doit rester disponible. Redémarrer le backend et réessayer. Si un envoi a expiré, vérifier l’historique avant de renouveler pour éviter un doublon.
8. Vérifier le refus de la localisation et la suppression d’une course de test.

Le suivi GPS se met en pause lorsque l’application passe en arrière-plan ; il faut le reprendre au retour. Matching, ELO et duels ne sont pas encore exposés par le backend.

Contrôles du code depuis mobile/ :

~~~powershell
npm run typecheck
npm run lint
npm test -- --runInBand
~~~

## iOS

Un Mac avec Xcode, un simulateur iOS, Ruby/Bundler et CocoaPods est nécessaire. Depuis mobile/, installer les dépendances npm, puis :

~~~sh
bundle install
cd ios
bundle exec pod install
cd ..
npm start
# Dans un autre terminal, depuis mobile :
npm run ios
~~~

Le projet iOS est préparé mais sa compilation native n’a pas encore été vérifiée sur Mac. Expo Go n’est pas utilisé.
