import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MycompComponent } from './mycomp/mycomp.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    MycompComponent
  ],
    imports: [
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyAijNWS9ej9_olV9fH7ZI1ByReI6CbhoK4',
      }),
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
