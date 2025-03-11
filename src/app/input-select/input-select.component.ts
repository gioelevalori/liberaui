import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [],
  template: '<input [type]="select" [placeholder]="placeholder" [disabled]="disabled" class="custom-input" />',
  styleUrl: './input-Select.component.css'
})
export class InputSelectComponent {
  @Input() placeholder: string = 'Inserisci testo...';
  @Input() disabled: boolean = false;
}
