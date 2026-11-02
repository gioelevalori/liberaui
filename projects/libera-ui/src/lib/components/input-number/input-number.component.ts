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
  selector: 'lib-input-number',
  standalone: true,
  templateUrl: './input-number.component.html',
  styleUrls: ['../form-control.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
  ],
})
export class InputNumberComponent extends FormValueControl<number> {
  protected readonly text = inject(LIBERA_UI_TEXT);
  @Input() label = '';
  @Input() placeholder = this.text.enterValue;
  @Input({ transform: booleanAttribute }) required = false;
  @Input() type = 'number';
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() step: number | string = 'any';
  readNumber(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.commit(Number.isNaN(value) ? null : value);
  }
}
