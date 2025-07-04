import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'lib-input-search',
  standalone: true,
  imports: [],
  template: '<input [type]="type" [placeholder]="placeholder" [disabled]="disabled" class="custom-input" />',
  styleUrls: ['./input-search.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InputSearchComponent {
  @Input() placeholder: string = 'Inserisci testo...';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
}
