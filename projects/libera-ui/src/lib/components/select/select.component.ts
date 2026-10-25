import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueControl } from '../form-value-control';
export interface SelectOption {
  value: string | number;
  label: string;
}
@Component({
  selector: 'lib-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['../form-control.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true },
  ],
})
export class SelectComponent extends FormValueControl<string | number> {
  @Input() label = '';
  @Input() placeholder = 'Choose an option';
  @Input({ transform: booleanAttribute }) required = false;
  @Input() options: SelectOption[] = [];
  @Input() set selectedValue(value: string | number | undefined) {
    this.value = value ?? null;
  }
  get selectedValue(): string | number | undefined {
    return this.value ?? undefined;
  }
  @Output() selectionChange = new EventEmitter<string | number>();
  get selectedIndex(): string {
    const i = this.options.findIndex((o) => o.value === this.value);
    return i < 0 ? '' : String(i);
  }
  onChange(event: Event) {
    if (this.disabled) return;
    const raw = (event.target as HTMLSelectElement).value;
    if (raw === '') return;
    const option = this.options[Number(raw)];
    if (option) {
      this.commit(option.value);
      this.selectionChange.emit(option.value);
    }
  }
}
