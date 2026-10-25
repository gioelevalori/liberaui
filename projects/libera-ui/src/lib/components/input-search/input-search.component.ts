import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'lib-input-search',
  standalone: true,
  imports: [],
  templateUrl: './input-search.component.html',
  styleUrls: ['../form-control.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InputSearchComponent {
  @Input() label = '';
  @Input() placeholder: string = 'Inserisci testo...';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
}
