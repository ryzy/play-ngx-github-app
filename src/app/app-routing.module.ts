import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ErrorPageComponent } from './shared/components/error-page/error-page.component';

const appRoutes: Routes = [
  {
    path:         '',
    loadChildren: './search/search.module#SearchModule',
  },
  {
    path:         'repo',
    loadChildren: './repository/repository.module#RepositoryModule',
  },
  {
    path:         '**',
    component:    ErrorPageComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }/**/),
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
