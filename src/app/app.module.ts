import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ChartsModule} from "ng2-charts";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { GoogleMapsModule } from '@angular/google-maps';
import {InterceptorService} from "./interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
