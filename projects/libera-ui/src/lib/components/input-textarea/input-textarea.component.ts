import { booleanAttribute, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueControl } from '../form-value-control';
@Component({
  selector: 'lib-input-textarea',
  standalone: true,
  templateUrl: './input-textarea.component.html',
  styleUrls: ['../form-control.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextareaComponent),
      multi: true,
    },
  ],
})
export class InputTextareaComponent extends FormValueControl<string> {
  @Input() label = '';
  @Input() placeholder = 'Your message';
  @Input({ transform: booleanAttribute }) required = false;
}
