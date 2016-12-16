import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepositoryPageComponent } from './containers/repository-page.component';

const repositoryRoutes: Routes = [
  {
    path: '',
    component: RepositoryPageComponent,
  },
  {
    path: ':owner/:repoName',
    component: RepositoryPageComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(repositoryRoutes),
  ],
  exports: [RouterModule],
  providers: []
})
export class RepositoryRoutingModule { }
