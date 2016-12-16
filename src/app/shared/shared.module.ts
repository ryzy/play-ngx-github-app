import { NgModule, ModuleWithProviders, ClassProvider, ExistingProvider, FactoryProvider, TypeProvider, ValueProvider } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStoreModule } from '@ngrx/router-store';

import { rootReducer, storeRootInitialState } from './store/index';
import { GitHubAPIService } from './services/github-api.service';
import { RepositorySearchEffects } from './store/effects/repository-search.effects';
import { NavComponent } from './components/nav/nav.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    MaterialModule.forRoot(),
  ],
  providers: [
    GitHubAPIService,
  ],
  declarations: [
    NavComponent,
    ErrorPageComponent,
    ErrorAlertComponent,
  ],
  exports: [
    CommonModule,
    MaterialModule,

    NavComponent,
    ErrorPageComponent,
    ErrorAlertComponent,
  ]
})
export class SharedModule {

  /**
   * Helper method to provide NgRx Store module
   *
   * Why? Currently @ngrx/store can be only used in the root app NgModule.
   * This method can be handy when we need the Store in other places,
   * e.g. tests.
   *
   * @returns {ModuleWithProviders[]}
   */
  public static provideStoreModule(): ModuleWithProviders[] {
    return [
      // Provide NgRx store with root reducer
      StoreModule.provideStore(rootReducer, storeRootInitialState),
      RouterStoreModule.connectRouter(),
      StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ];
  }

  /**
   * Helper method to run @ngrx/effects
   *
   * Has to be called from root app module.
   * When called from lazy loaded modules, it's executed twice!
   *
   * @TODO: custom @Effect() annotations are stripped out during AOT compilation
   * @see https://github.com/angular/angular-cli/issues/2799
   * @see https://github.com/ngrx/effects/issues/71
   * Therefore for now we cannot use AoT ;(
   *
   * @returns {ModuleWithProviders[]}
   */
  public static provideStoreEffectsModule(): ModuleWithProviders[] {
    return [
      EffectsModule.run(RepositorySearchEffects),
    ];
  }
}
