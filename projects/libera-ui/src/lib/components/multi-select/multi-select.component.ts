import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  ElementRef,
  forwardRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueControl } from '../form-value-control';
import { LIBERA_UI_TEXT } from '../../text';

export interface MultiSelectOption {
  value: string | number;
  label: string;
}
let nextMultiSelectId = 0;

/**
 * Button that opens a filterable, multi-selectable listbox. Focus stays in the filter field and
 * the active option is exposed with aria-activedescendant.
 */
@Component({
  selector: 'lib-multi-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent extends FormValueControl<(string | number)[]> {
  protected readonly text = inject(LIBERA_UI_TEXT);
  @Input() label = '';
  @Input() placeholder = this.text.chooseOptions;
  @Input() filterLabel = this.text.filterOptions;
  @Input() emptyText = this.text.noResults;
  @Input() clearLabel = this.text.clearSelection;
  /** Builds the summary once more than two options are selected. */
  @Input() selectedText = this.text.selectedCount;
  @Input() options: MultiSelectOption[] = [];
  @Input({ transform: booleanAttribute }) filterable = true;
  @ViewChild('trigger') trigger!: ElementRef<HTMLButtonElement>;
  @ViewChild('panel') panel!: ElementRef<HTMLDivElement>;
  @ViewChild('filterInput') filterInput?: ElementRef<HTMLInputElement>;
  @ViewChild('list') list!: ElementRef<HTMLUListElement>;
  readonly uid = 'lib-multi-select-' + nextMultiSelectId++;
  open = false;
  query = '';
  active = 0;

  get selected() {
    return this.value ?? [];
  }
  get filtered() {
    const needle = this.query.trim().toLowerCase();
    return needle
      ? this.options.filter((o) => o.label.toLowerCase().includes(needle))
      : this.options;
  }
  get summary() {
    const labels = this.options.filter((o) => this.isSelected(o)).map((o) => o.label);
    if (!labels.length) return this.placeholder;
    return labels.length > 2 ? this.selectedText(labels.length) : labels.join(', ');
  }
  optionId(index: number) {
    return `${this.uid}-option-${index}`;
  }
  isSelected(option: MultiSelectOption) {
    return this.selected.includes(option.value);
  }

  toggle(option: MultiSelectOption) {
    if (this.disabled) return;
    this.commit(
      this.isSelected(option)
        ? this.selected.filter((v) => v !== option.value)
        : // Keep the order of the options list, not the order of clicks.
          this.options.filter((o) => this.isSelected(o) || o === option).map((o) => o.value),
    );
  }
  clear() {
    this.commit([]);
    (this.filterInput ?? { nativeElement: this.list.nativeElement }).nativeElement.focus();
  }
  onFilter(event: Event) {
    this.query = (event.target as HTMLInputElement).value;
    this.active = 0;
  }
  onKeydown(event: KeyboardEvent) {
    const count = this.filtered.length;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (count) this.active = (this.active + (event.key === 'ArrowDown' ? 1 : -1) + count) % count;
      this.scrollActive();
    } else if ((event.key === 'Enter' || (event.key === ' ' && !this.filterable)) && count) {
      event.preventDefault();
      this.toggle(this.filtered[this.active]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }
  onTriggerKeydown(event: KeyboardEvent) {
    if (event.key !== 'ArrowDown' || this.open) return;
    event.preventDefault();
    this.panel.nativeElement.showPopover();
  }
  onToggle(event: Event) {
    this.open = (event as Event & { newState: string }).newState === 'open';
    if (this.open) {
      this.query = '';
      this.active = Math.max(
        0,
        this.options.findIndex((o) => this.isSelected(o)),
      );
      this.position();
      (this.filterInput?.nativeElement ?? this.list.nativeElement).focus();
    } else this.touched();
    this.changeDetector.markForCheck();
  }
  close() {
    const el = this.panel.nativeElement;
    if (el.matches(':popover-open')) el.hidePopover();
    this.trigger.nativeElement.focus();
  }

  private scrollActive() {
    this.list.nativeElement
      .querySelector(`#${this.optionId(this.active)}`)
      ?.scrollIntoView?.({ block: 'nearest' });
  }
  private position() {
    const el = this.panel.nativeElement;
    const view = el.ownerDocument.defaultView!;
    const anchor = this.trigger.nativeElement.getBoundingClientRect();
    el.style.minWidth = anchor.width + 'px';
    const box = el.getBoundingClientRect();
    const below = anchor.bottom + 6;
    const top = below + box.height > view.innerHeight - 8 ? anchor.top - box.height - 6 : below;
    el.style.left = Math.max(8, Math.min(anchor.left, view.innerWidth - box.width - 8)) + 'px';
    el.style.top = Math.max(8, top) + 'px';
  }
}
