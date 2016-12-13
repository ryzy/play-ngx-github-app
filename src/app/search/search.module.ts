import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { SearchPageComponent } from './containers/search-page.component';
import { SearchComponent } from './components/search.component';
import { RepositorySearchService } from './services/repository-search.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: SearchPageComponent,
    }]),
    MaterialModule.forRoot(),
    SharedModule,
  ],
  declarations: [
    SearchComponent,
    SearchPageComponent,
  ],
  providers: [
    RepositorySearchService,
  ]
})
export class SearchModule { }
