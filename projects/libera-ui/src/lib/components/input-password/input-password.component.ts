import { IconComponent } from '../icon/icon.component';
import { booleanAttribute, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueControl } from '../form-value-control';
@Component({
  selector: 'lib-input-password',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './input-password.component.html',
  styleUrls: ['../form-control.css', './input-password.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true,
    },
  ],
})
export class InputPasswordComponent extends FormValueControl<string> {
  @Input() label = '';
  @Input() placeholder = 'Your password';
  @Input({ transform: booleanAttribute }) required = false;
  @Input() type = 'password';
  visible = false;
}
