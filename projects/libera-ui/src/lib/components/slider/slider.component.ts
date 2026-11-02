import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueControl } from '../form-value-control';

/** Native range input, so arrow, Page and Home/End keys follow platform behavior. */
@Component({
  selector: 'lib-slider',
  standalone: true,
  template: `<label class="lib-slider">
    <span class="lib-slider-head"
      ><span>{{ label }}</span
      ><output *ngIf="showValue">{{ valueText }}</output></span
    >
    <input
      type="range"
      [min]="min"
      [max]="max"
      [step]="step"
      [disabled]="disabled"
      [value]="value ?? min"
      [attr.aria-valuetext]="unit ? valueText : null"
      [style.--fill.%]="fill"
      (input)="commit(+$any($event.target).value)"
      (blur)="touched()"
    />
  </label>`,
  styleUrl: './slider.component.css',
  imports: [CommonModule],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SliderComponent), multi: true },
  ],
})
export class SliderComponent extends FormValueControl<number> {
  @Input() label = '';
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  /** Appended to the announced and displayed value, for example "%" or " px". */
  @Input() unit = '';
  @Input({ transform: booleanAttribute }) showValue = true;
  get valueText() {
    return `${this.value ?? this.min}${this.unit}`;
  }
  get fill() {
    const span = this.max - this.min || 1;
    return (((this.value ?? this.min) - this.min) / span) * 100;
  }
}
