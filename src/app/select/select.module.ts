import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SelectComponent } from './select.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SelectComponent,
  ],
  imports: [
    BrowserModule, CommonModule
  ],
  providers: [],
  bootstrap: []
})
export class SelectModule { }
