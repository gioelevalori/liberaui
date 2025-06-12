import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button [ngClass]="buttonClass"
  class="custom-button" [style.background-color]="color"
  [disabled]="disabled">
  <ng-content></ng-content>
  </button>`,
  styleUrls: ['./button.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() color: string = 'gray';
  @Input() buttonClass: string = '';
  @Input() disabled: boolean = false;
}
