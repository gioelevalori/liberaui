import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationsComponent } from './animations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [CommonModule, AnimationsComponent, BrowserAnimationsModule],
  exports: [AnimationsComponent],
})
export class AnimationsModule {}
