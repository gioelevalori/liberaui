import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  forwardRef,
  inject,
  Input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueControl } from '../form-value-control';
import { LIBERA_UI_TEXT } from '../../text';

export interface ComboboxOption {
  value: string | number;
  label: string;
}
let nextComboboxId = 0;

/** Editable combobox with list autocomplete, following the WAI-ARIA combobox pattern. */
@Component({
  selector: 'lib-combobox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './combobox.component.html',
  styleUrls: ['../form-control.css', './combobox.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ComboboxComponent), multi: true },
  ],
})
export class ComboboxComponent extends FormValueControl<string | number> implements OnChanges {
  protected readonly text = inject(LIBERA_UI_TEXT);
  @Input() label = '';
  @Input() placeholder = this.text.search;
  @Input() emptyText = this.text.noResults;
  @Input({ transform: booleanAttribute }) required = false;
  @Input() options: ComboboxOption[] = [];
  readonly uid = 'lib-combobox-' + nextComboboxId++;
  query = '';
  open = false;
  active = -1;
  filtered: ComboboxOption[] = [];

  ngOnChanges() {
    this.query = this.selectedLabel();
  }
  override writeValue(value: string | number | null) {
    super.writeValue(value);
    this.query = this.selectedLabel();
  }
  optionId(index: number) {
    return `${this.uid}-option-${index}`;
  }

  onInput(event: Event) {
    this.query = (event.target as HTMLInputElement).value;
    this.show(this.query);
  }
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this.open) {
        // A selected label is not a search term, so reopening shows every option.
        this.show(this.query === this.selectedLabel() ? '' : this.query);
        if (event.altKey) return;
        if (event.key === 'ArrowUp') this.active = this.filtered.length - 1;
        return;
      }
      const count = this.filtered.length;
      if (count) this.active = (this.active + (event.key === 'ArrowDown' ? 1 : -1) + count) % count;
    } else if (event.key === 'Enter' && this.open && this.active >= 0) {
      event.preventDefault();
      this.choose(this.filtered[this.active]);
    } else if (event.key === 'Escape' && this.open) {
      event.preventDefault();
      this.open = false;
    }
  }
  onBlur() {
    this.open = false;
    this.query = this.selectedLabel();
    this.touched();
  }
  choose(option: ComboboxOption) {
    this.commit(option.value);
    this.query = option.label;
    this.open = false;
  }

  private show(term: string) {
    if (this.disabled) return;
    const needle = term.trim().toLowerCase();
    this.filtered = this.options.filter((o) => o.label.toLowerCase().includes(needle));
    const selected = this.filtered.findIndex((o) => o.value === this.value);
    this.active = needle ? (this.filtered.length ? 0 : -1) : Math.max(0, selected);
    if (!this.filtered.length && !needle) this.active = -1;
    this.open = true;
  }
  private selectedLabel() {
    return this.options.find((o) => o.value === this.value)?.label ?? '';
  }
}
