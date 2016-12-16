import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPageComponent } from './containers/search-page.component';

const searchRoutes: Routes = [
  {
    path: '',
    component: SearchPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(searchRoutes),
  ],
  exports: [RouterModule],
  providers: []
})
export class SearchRoutingModule { }
