import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { rootReducer } from './store';
import { GitHubAPIService } from './services/github-api.service';
import { NavComponent } from './components/nav/nav.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { EffectsModule } from '@ngrx/effects';
import { RepositoryEffect } from './store/effects/repository.effect';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    MaterialModule.forRoot(),

    // Provide NgRx store with root reducer
    StoreModule.provideStore(rootReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    // Run NgRx effects for actions
    EffectsModule.run(RepositoryEffect),
  ],
  providers: [
    GitHubAPIService,
  ],
  declarations: [
    NavComponent,
    ErrorPageComponent,
  ],
  exports: [
    NavComponent,
    ErrorPageComponent,
  ]
})
export class SharedModule { }
