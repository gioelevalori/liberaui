import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-checkbox',
  standalone: true,
  imports: [],
  template: '<label class="container"><input type="checkbox" [disabled]="disabled" checked="checked"><span class="checkmark"></span></label>',
  styleUrl: './input-checkbox.component.css'
})
export class InputCheckboxComponent {
  @Input() disabled: boolean = false;
}
