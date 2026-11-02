import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueControl } from '../form-value-control';

export interface RadioOption {
  value: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
}
let nextRadioGroupId = 0;

/** Native radios in a fieldset, so arrow keys and Tab follow platform behavior. */
@Component({
  selector: 'lib-radio-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.css',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioGroupComponent), multi: true },
  ],
})
export class RadioGroupComponent extends FormValueControl<string | number> {
  @Input() label = '';
  @Input() options: RadioOption[] = [];
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
  readonly name = 'lib-radio-group-' + nextRadioGroupId++;
}
