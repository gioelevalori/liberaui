import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ButtonSiteComponent } from './site/button-site/buttonSite.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonSiteComponent
  ],
  imports: [
    BrowserModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
