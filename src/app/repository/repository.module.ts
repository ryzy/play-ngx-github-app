import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoryPageComponent } from './containers/repository-page.component';

@NgModule({
  imports: [
    SharedModule,
    RepositoryRoutingModule,
  ],
  declarations: [
    RepositoryPageComponent,
  ]
})
export class RepositoryModule { }
