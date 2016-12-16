# GitHub Depot: simple Angular 2 app for browsing repositories
[![CircleCI](https://circleci.com/gh/ryzy/play-ng2-github.svg?style=svg)](https://circleci.com/gh/ryzy/play-ng2-github)

Visit **https://ng2-github.firebaseapp.com/** to try it online.
Deployed automatically from the `master` branch.

# Play with it

* Clone the repository
* run `yarn install` (or `npm install`)
* run `yarn run start`
* go to http://localhost:4100


# Tech stack

* Angular 2, angular-cli
* ngrx/store, ngrx/effect for app Redux-style state management
* Testing: karma + jasmine, protractor for e2e
* CircleCI for running tests and automatic deployments to Firebase Hosting.


# Architecture

### State management


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


# Authors

Author: Marcin ryzy Ryzycki (<marcin@m12.io>)
