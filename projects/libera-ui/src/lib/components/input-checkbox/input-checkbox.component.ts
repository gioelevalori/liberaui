import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-input-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `<label class="container" [ngStyle]="{'--checkbox-color': color}">
  <input type="checkbox" [disabled]="disabled" checked="checked">
  <span class="checkmark"></span></label>`,
  styleUrls: ['./input-checkbox.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InputCheckboxComponent {
  @Input() disabled: boolean = false;
  @Input() color: string = '';
}
