import { booleanAttribute, Directive, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

/** Shared forms behavior. Programmatic writes never emit user-change events. */
@Directive()
export abstract class FormValueControl<T> implements ControlValueAccessor {
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() value: T | null = null;
  @Output() valueChange = new EventEmitter<T | null>();
  protected modelChange: (value: T | null) => void = () => {};
  touched: () => void = () => {};
  writeValue(value: T | null) {
    this.value = value ?? null;
  }
  registerOnChange(fn: (value: T | null) => void) {
    this.modelChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.touched = fn;
  }
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
  commit(value: T | null) {
    if (this.disabled) return;
    this.value = value;
    this.modelChange(value);
    this.valueChange.emit(value);
  }
}
