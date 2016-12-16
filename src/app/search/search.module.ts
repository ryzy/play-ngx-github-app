import { NgModule } from '@angular/core';

import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SearchService } from './services/search.service';
import { RepositoryCardComponent } from './components/repository-card/repository-card.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { SearchComponent } from './components/search/search.component';
import { SearchPageComponent } from './containers/search-page.component';


@NgModule({
  imports: [
    SearchRoutingModule,
    SharedModule,
  ],
  declarations: [
    RepositoryCardComponent,
    RepositoryListComponent,
    SearchComponent,
    SearchPageComponent,
  ],
  providers: [
    SearchService,
  ],
})
export class SearchModule { }
