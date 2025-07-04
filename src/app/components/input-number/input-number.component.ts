import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-input-number',
  standalone: true,
  imports: [],
  template: '<input [type]="type" [placeholder]="placeholder" [disabled]="disabled" [min]="min" [max]="max" class="custom-input" />',
  styleUrl: './input-number.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class InputNumberComponent {
  @Input() placeholder: string = 'Inserisci testo...';
  @Input() type: string = 'number';
  @Input() min: number = 0;
  @Input() max: number = 0;
  @Input() disabled: boolean = false;
}
