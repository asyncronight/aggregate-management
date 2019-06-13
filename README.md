<div align="center">
  <img src="./src/favicon.ico" width="200" alt="Track It Logo" />
  <h2>Track It</h2>

![GitHub release](https://img.shields.io/github/release/mecaworks/track-it.svg?color=%23f441be)
[![Build Status](https://travis-ci.org/mecaworks/track-it.svg?branch=master)](https://travis-ci.org/mecaworks/track-it)
![David](https://img.shields.io/david/mecaworks/track-it.svg)
![GitHub](https://img.shields.io/github/license/mecaworks/track-it.svg?color=%232196F3)

</div>

---

A fully-implemented, zero-human-interaction solution to track construction machinery and report production status

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

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To get started with firebase go to the [firebase console](https://console.firebase.google.com/) and create your first project.

To get more information about firebase cli use `firebase --help` or visit [the official docs](https://firebase.google.com/docs/cli/).

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.
