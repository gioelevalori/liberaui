import { booleanAttribute, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueControl } from '../form-value-control';
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
  @Input() label = '';
  @Input() placeholder = 'Enter a value';
  @Input({ transform: booleanAttribute }) required = false;
  @Input() type = 'text';
}
