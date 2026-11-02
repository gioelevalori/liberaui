import {
  booleanAttribute,
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

/** Shared forms behavior. Programmatic writes never emit user-change events. */
@Directive()
export abstract class FormValueControl<T> implements ControlValueAccessor {
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() value: T | null = null;
  @Output() valueChange = new EventEmitter<T | null>();
  protected modelChange: (value: T | null) => void = () => {};
  /** Forms API writes arrive outside template events, so views must be marked for zoneless apps. */
  protected readonly changeDetector = inject(ChangeDetectorRef);
  touched: () => void = () => {};
  writeValue(value: T | null) {
    this.value = value ?? null;
    this.changeDetector.markForCheck();
  }
  registerOnChange(fn: (value: T | null) => void) {
    this.modelChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.touched = fn;
  }
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
    this.changeDetector.markForCheck();
  }
  commit(value: T | null) {
    if (this.disabled) return;
    this.value = value;
    this.modelChange(value);
    this.valueChange.emit(value);
  }
}
