import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { InputTextComponent } from './input-text/input-text.component';
import { ButtonModule } from './button/button.module';
import { InputTextModule } from './input-text/input-text.module';

@NgModule({
  declarations: [
    AppComponent,
    InputTextComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }