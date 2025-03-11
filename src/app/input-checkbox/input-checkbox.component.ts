import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-checkbox',
  standalone: true,
  imports: [],
  template: '<input [type]="type" [disabled]="disabled" class="custom-input" />',
  styleUrl: './input-checkbox.component.css'
})
export class InputCheckboxComponent {
  @Input() type: string = 'checkbox';
  @Input() disabled: boolean = false;
}
