import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import * as config from './config';
import { GitHubAPIService } from './services/github-api.service';
import { NavComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
    NavComponent,
  ],
  providers: [
    GitHubAPIService,
  ],
  exports: [
    NavComponent,
  ]
})
export class SharedModule { }
