import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';

import { TrimPipe } from './pipes/trim.pipe';
import { NavComponent } from './components/nav/nav.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
  ],
  providers: [
  ],
  declarations: [
    TrimPipe,
    NavComponent,
    ErrorPageComponent,
    ErrorAlertComponent,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ClarityModule,

    TrimPipe,
    NavComponent,
    ErrorPageComponent,
    ErrorAlertComponent,
  ],
})
export class SharedModule {
  public static configureIcons(): void {
    ClarityIcons.add({
      depot: `
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
      `
    });
  }

  constructor() {
    SharedModule.configureIcons();
  }
}
