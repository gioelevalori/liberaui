import {
  booleanAttribute,
  Component,
  forwardRef,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueControl } from '../form-value-control';
import { LIBERA_UI_TEXT } from '../../text';
@Component({
  selector: 'lib-input-text',
  standalone: true,
  templateUrl: './input-text.component.html',
  styleUrls: ['../form-control.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputTextComponent), multi: true },
  ],
})
export class InputTextComponent extends FormValueControl<string> {
  protected readonly text = inject(LIBERA_UI_TEXT);
  @Input() label = '';
  @Input() placeholder = this.text.enterValue;
  @Input({ transform: booleanAttribute }) required = false;
  @Input() type = 'text';
}
