import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SearchPageComponent } from './containers/search-page.component';
import { SearchComponent } from './components/search.component';
import { SharedModule } from '../shared/shared.module';
import { SearchService } from './services/search.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: SearchPageComponent,
    }]),
  ],
  declarations: [
    SearchComponent,
    SearchPageComponent,
  ],
  providers: [
    SearchService,
  ],
})
export class SearchModule { }
