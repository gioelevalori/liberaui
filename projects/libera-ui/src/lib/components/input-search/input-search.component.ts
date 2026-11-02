import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { LIBERA_UI_TEXT } from '../../text';

@Component({
  selector: 'lib-input-search',
  standalone: true,
  imports: [],
  templateUrl: './input-search.component.html',
  styleUrls: ['../form-control.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InputSearchComponent {
  protected readonly text = inject(LIBERA_UI_TEXT);
  @Input() label = '';
  @Input() placeholder: string = this.text.search;
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
}
