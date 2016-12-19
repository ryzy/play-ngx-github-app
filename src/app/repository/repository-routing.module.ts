import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepositoryResolve } from './services/repository.resolve';
import { RepositoryPageComponent } from './containers/repository-page.component';

const repositoryRoutes: Routes = [
  {
    path: ':owner/:repoName',
    component: RepositoryPageComponent,
    resolve: {
      repository: RepositoryResolve
    },
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(repositoryRoutes),
  ],
  providers: [
    RepositoryResolve,
  ],
  exports: [RouterModule],
})
export class RepositoryRoutingModule { }
