import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [],
  template: '<input [type]="type" [placeholder]="placeholder" [disabled]="disabled" class="custom-input" />',
  styleUrl: './input-text.component.css'
})
export class InputTextComponent {
  @Input() placeholder: string = 'Inserisci testo...';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
}
