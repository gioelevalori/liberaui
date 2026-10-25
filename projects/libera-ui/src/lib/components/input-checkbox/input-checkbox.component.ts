import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'lib-input-checkbox',
  standalone: true,
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCheckboxComponent),
      multi: true,
    },
  ],
})
export class InputCheckboxComponent implements ControlValueAccessor {
  @Input() disabled = false;
  @Input() color = '';
  @Input() checked = true;
  @Input() label = 'Checkbox';
  @Output() checkedChange = new EventEmitter<boolean>();
  private modelChange: (value: boolean) => void = () => {};
  touched = () => {};
  writeValue(value: boolean | null) {
    this.checked = !!value;
  }
  registerOnChange(fn: (value: boolean) => void) {
    this.modelChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.touched = fn;
  }
  setDisabledState(value: boolean) {
    this.disabled = value;
  }
  change(event: Event) {
    if (this.disabled) return;
    this.checked = (event.target as HTMLInputElement).checked;
    this.modelChange(this.checked);
    this.checkedChange.emit(this.checked);
  }
}
