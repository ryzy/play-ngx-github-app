# GitHub Depot: simple Angular 2 app for browsing repositories
[![CircleCI](https://circleci.com/gh/ryzy/play-ng2-github.svg?style=svg)](https://circleci.com/gh/ryzy/play-ng2-github)

Visit **https://ng2-github.firebaseapp.com/** to try it online.
Deployed automatically from the `master` branch. The `dev` branch
is also deployed and available [here]https://dev-ng2-github-d52c4.firebaseio.com/).


# Play with it

* Clone the repository
* run `yarn install` (or `npm install`)
* run `yarn run start`
* visit http://localhost:4100


# Tech stack

* [Angular](https://angular.io/) with [angular-cli](https://github.com/angular/angular-cli)
* [@ngrx/store](https://github.com/ngrx/store), [@ngrx/effects](https://github.com/ngrx/effects)
  for the Redux-style *app state management*
* Testing: karma + jasmine, protractor for e2e
* [CircleCI](https://circleci.com/gh/ryzy/play-ng2-github) for running
  tests and automatic deployments to [Firebase Hosting](https://firebase.google.com/).


# Architecture

### State management

RxJS and [@ngrx/store](https://github.com/ngrx/store) is used for
centralised app state management (Redux-like style).
See [src/app/shared/store](https://github.com/ryzy/play-ng2-github/tree/master/src/app/shared/store)
directory for details.

### Containers and components
This app uses the pattern of smart/dumb components (also called containers
and components) and it is reflected in the directory structure.
In the `containers` directories you'll find *smart components*,
concerned with how things works, with some logic inside and external
dependencies. Respectively, in the `components` directories you'll find
*dumb components*, without any external dependencies, concerned more
about how things looks, communicating with external world
using @Input/@Output properties.

### Lazy loading
Each major part of application (e.g. search, repository details)
is a separate so-called _feature module_ and it's loaded lazily.
Lazy loading starts from the home page featuring `SearchModule`
(why? you could end up first on some subpage using deep-linking, thus
the SearchModule would be not needed).

### CI/CD
Each commit runs tests on [CircleCI](https://circleci.com/gh/ryzy/play-ng2-github),
automatically. If everything is green, the app is then deployed to
[Firebase Hosting](https://firebase.google.com/) and available on
*[ng2-github.firebaseapp.com](https://ng2-github.firebaseapp.com/)*.


# Author

Author: Marcin ryzy Ryzycki (<marcin@m12.io>)

---

I build this app to polish my Angular skills and play/experiment with
other things/libraries around it. I aim for the best practises,
following [Angular styleguide](https://angular.io/docs/ts/latest/guide/style-guide.html),
scalable architecture and being it production-ready (AoT, lazy loading,
nice error handling etc). Any suggestion for improvements - give me a shout!
