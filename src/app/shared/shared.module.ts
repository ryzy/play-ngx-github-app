import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStoreModule } from '@ngrx/router-store';
import { ClarityModule } from 'clarity-angular';

import { rootReducer, storeRootInitialState } from './store/index';
import { ErrorService } from './services/error.service';
import { GitHubAPIService } from './services/github-api.service';
import { RepositorySearchEffects } from './store/effects/repository-search.effects';
import { TrimPipe } from './pipes/trim.pipe';
import { NavComponent } from './components/nav/nav.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';
import { RepositoryEffects } from './store/effects/repository.effects';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    ClarityModule.forRoot(),
  ],
  providers: [
    ErrorService,
    GitHubAPIService,
  ],
  declarations: [
    TrimPipe,
    NavComponent,
    ErrorPageComponent,
    ErrorAlertComponent,
  ],
  exports: [
    CommonModule,
    ClarityModule,

    TrimPipe,
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
   * @returns {ModuleWithProviders[]}
   */
  public static provideStoreEffectsModule(): ModuleWithProviders[] {
    return [
      EffectsModule.run(RepositoryEffects),
      EffectsModule.run(RepositorySearchEffects),
    ];
  }

  public static configureIcons(): void {
    ClarityIcons.add({
      depot: `
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
      `
    });
  }

  constructor() {
    SharedModule.configureIcons();
  }
}
