import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { GitHubAPIService } from './services/github-api.service';
import { NavComponent } from './components/nav/nav.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
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
