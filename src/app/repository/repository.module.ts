import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RepositoryService } from './services/repository.service';
import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoryPageComponent } from './containers/repository-page.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { RepositoryReadmeComponent } from './components/repository-readme/repository-readme.component';
import { RepositoryCommitComponent } from './components/repository-commit/repository-commit.component';
import { RepositoryIssueComponent } from './components/repository-issue/repository-issue.component';
import { RepositoryPullComponent } from './components/repository-pull/repository-pull.component';

@NgModule({
  imports: [
    SharedModule,
    RepositoryRoutingModule,
  ],
  providers: [
    RepositoryService,
  ],
  declarations: [
    RepositoryPageComponent,
    RepositoryComponent,
    RepositoryReadmeComponent,
    RepositoryCommitComponent,
    RepositoryIssueComponent,
    RepositoryPullComponent,
  ]
})
export class RepositoryModule { }
