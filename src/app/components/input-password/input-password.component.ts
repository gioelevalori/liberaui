import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [],
  template: '<input [type]="type" [placeholder]="placeholder" [disabled]="disabled" class="custom-input" />',
  styleUrl: './input-password.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class InputPasswordComponent {
  @Input() placeholder: string = 'Inserisci testo...';
  @Input() type: string = 'password';
  @Input() disabled: boolean = false;
}
