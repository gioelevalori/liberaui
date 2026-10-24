import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-switch', standalone: true,
  template: `<button type="button" role="switch" [attr.aria-checked]="checked" [attr.aria-label]="label" [disabled]="disabled" (click)="toggle()" (blur)="onTouched()"><span></span></button>`,
  styles: [`:host { display:inline-flex; vertical-align:middle; } button { display:flex; align-items:center; width:38px; height:24px; padding:3px; border:1px solid var(--text-secondary,#66666f); border-radius:20px; background:var(--border-color,#d4d4d8); cursor:pointer; transition:background-color .16s; } button[aria-checked=true] { background:var(--lib-accent,var(--text-primary,#18181b)); } span { width:16px; height:16px; border-radius:50%; background:var(--text-secondary,#66666f); transition:transform .16s; } button[aria-checked=true] span { transform:translateX(14px); background:var(--lib-accent-foreground,var(--background-color,#fff)); } button:disabled { opacity:.5; cursor:not-allowed; } button:focus-visible { outline:2px solid var(--text-primary,#18181b); outline-offset:3px; } @media(prefers-reduced-motion:reduce) { button,span { transition:none; } }`],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SwitchComponent), multi: true }]
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label = 'Toggle';
  @Output() checkedChange = new EventEmitter<boolean>();
  private onChange: (value: boolean) => void = () => {};
  onTouched = () => {};
  writeValue(value: boolean) { this.checked = !!value; }
  registerOnChange(fn: (value: boolean) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }
  toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
    this.onChange(this.checked);
  }
}
