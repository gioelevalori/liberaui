import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-input-text',
  standalone: true,
  imports: [],
  template: '<input [type]="type" [placeholder]="placeholder" [disabled]="disabled" class="custom-input" />',
  styleUrls: ['./input-text.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InputTextComponent {
  @Input() placeholder: string = 'Inserisci testo...';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
}
