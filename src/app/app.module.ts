import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
