import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxMarqueeModule } from 'ngx-marquee';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMarqueeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
