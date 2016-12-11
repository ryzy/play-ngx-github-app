import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { NavComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
    NavComponent,
  ],
  providers: [ ],
  exports: [
    NavComponent,
  ]
})
export class SharedModule { }
