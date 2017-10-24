import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MAT_PLACEHOLDER_GLOBAL_OPTIONS } from '@angular/material';
import { ApolloModule } from 'apollo-angular';

import { environment } from '../../environments/environment';
import { appRootInitialState, appRootReducers, metaReducers } from './state/index';
import { GitHubAPIService } from '../shared/services/github-api.service';
import { ErrorService } from '../shared/services/error.service';
import { RepositoryEffects } from './state/repository.effects';
import { RepositorySearchEffects } from './state/repository-search.effects';
import { AppRouterStateSerializer } from './services/router-state-serializer';
import { graphQLClientWrapper } from './graphql/apollo-client';

/**
 * CoreModule, must be imported only by root module.
 * @see https://angular.io/styleguide#!#04-11
 */
@NgModule({
  // This is the CoreModule added to the root AppModule.
  // Therefore we import here everything needed by AppModule, incl. BrowserModule.
  imports  : [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    // @ngrx store
    StoreModule.forRoot(appRootReducers, { metaReducers, initialState: appRootInitialState }),
    EffectsModule.forRoot([
      RepositoryEffects,
      RepositorySearchEffects,
    ]),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 50 }),
    StoreRouterConnectingModule,

    ApolloModule.forRoot(graphQLClientWrapper),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: AppRouterStateSerializer },
    // Material Design configuration
    { provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'always' } },

    // App providers
    ErrorService,
    GitHubAPIService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    // Prevent re-importing the CoreModule from anywhere except root AppModule
    // @see https://angular.io/styleguide#!#04-12
    /* istanbul ignore next */ /* Impossible to test */
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
