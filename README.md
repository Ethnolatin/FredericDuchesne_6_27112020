# Projet P6 parcours Dev Web OpenClassrooms #

## "Construisez une API sécurisée pour une application d'avis gastronomiques" ##

### Prérequis ###

Le projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

Pour faire fonctionner le projet, vous devez : 
 - installer node-sass à part,
 - demander à duchesne.fred@gmail.com les fichiers contenant les infos de login à la base MongoDB.

### Procédure ###

1. Cloner le projet.
2. Ajouter le dossier `privateData/` (fourni séparément) dans le dossier `backend/`.
3. Exécuter `npm install` depuis le terminal du dossier `frontend/`.
4. Exécuter `npm start`depuis le terminal du dossier `frontend/`.
5. Exécuter `node server` depuis le terminal du dossier `backend/`.
6. Se rendre sur `http://localhost:4200/`.

### Notes ###

Lors de la création d'un utilisateur ("Inscripton"), le mot de passe doit comporter :
- au moins 8 caractères,
- au moins 1 lettre majuscule,
- au moins 1 lettre minuscule,
- au moins 1 chiffre.