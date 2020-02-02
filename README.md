<div align="center">
  <img src="./src/favicon.ico" width="200" alt="Track It Logo" />
  <h2>IoT Solution: Aggregates Management (Wi-Hu)</h2>

![GitHub release](https://img.shields.io/github/release/mecaworks/track-it.svg?color=%23f441be)
[![Build Status](https://travis-ci.org/mecaworks/track-it.svg?branch=master)](https://travis-ci.org/mecaworks/track-it)
![David](https://img.shields.io/david/mecaworks/track-it.svg)
![GitHub](https://img.shields.io/github/license/mecaworks/track-it.svg?color=%232196F3)

</div>

---

### Abstract:
Wi-Hu est une solution IoT pour les camions à bennes et semi remorques dédiés à l'approvisionnement des agrégats.

Sans intervention humaine et en temps réel, à chaque déchargement du matériau, un bon de livraison se crée automatiquement indiquant la quantité déchargée, la position GPS du déchargement, l'heure du déchargement et la qualité du déchargement (déchargement partiel ou Complet).

Un tableau de bord intelligents et dynamique présente des graphiques de productivité, une cartes géographique des déchargement, des statistiques et des indicateurs de performances organisationnels et décisionnels.

### Description :
The performance of a dump truck is calculated based on the number of tonnes established per kilometer.

In industry 4.0 standards, our team has invented, designed and developed an intelligent IoT Solution which calculates:
- The number of trip of each dump truck installed
- The weight carried in tonnes for each trip (Invention)
- GPS position of the unloading location
- Fleet statistics and comparison
- Dashboard ( performance indicators)

The project is made up of two parts:
1 - Hardware: A microcontroller which receives information from several sensors and processes the signals. And it sends the data to the cloud database for processing
2 - Software: data analyze and calculation of statistics.

### Technology used:
- Modelization : StarUML - Pen and Paper
- Back-end: NodeJS - Google Firestore - Cloud functions
- Front-end: Typescript - Angular - Firebase SDK - Material Design
- Project managment: GitHub projects, milestones and releases
- Deployment: Travis CI - Cloud Functions - Firebase Hosting

---

## Development server (angular cli)

- First clone the repo: `git clone git@github.com:mecaworks/track-it.git`
- Install dependencies for the web app (assuming `node`, `npm` and `ng` are already installed): `cd track-it && npm install`
- Install dependencies for the backend project: `cd functions && npm install`
- Run `cd ..` to navigate back to the parent folder.
- Run `ng serve` for a dev server.
- Navigate to `http://localhost:4200/`.
  > The app will automatically reload if you change any of the source files.

## Development server (firebase cli)

- Serve the angular web app (content of `dist/track-it`) locally: `npm run serve`
  > This is used to emulate the firebase hosting plan, use `ng serve` for development instead.
- Serve the cloud functions locally: `npm --prefix functions run serve`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/track-it` directory.

> Use the `--prod` flag for a production build.

## Deployment

- Install firebase tools: `npm install -g firebase-tools`
- Authenticate the cli and access Firebase projects: `firebase login`
- Deploy the angular web app to Firebase: `npm run deploy`
- Deploy the backend to cloud functions: `npm --prefix functions run deploy`
- Or deploy everything using firebase cli: `firebase deploy`

  > This will deploy the angular web app and the back end functions.

  > The deployment phase will lint and build the projects first.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To get started with firebase go to the [firebase console](https://console.firebase.google.com/) and create your first project.

To get more information about firebase cli use `firebase --help` or visit [the official docs](https://firebase.google.com/docs/cli/).

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.
