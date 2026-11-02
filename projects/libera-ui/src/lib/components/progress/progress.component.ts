import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, inject, Input } from '@angular/core';
import { LIBERA_UI_TEXT } from '../../text';

/** Determinate or indeterminate progress bar. A null value means the amount is unknown. */
@Component({
  selector: 'lib-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="lib-progress-label" *ngIf="showValue || visibleLabel">
      <span *ngIf="visibleLabel">{{ label }}</span
      ><span *ngIf="showValue && percent !== null">{{ percent }}%</span>
    </div>
    <div
      class="lib-progress-track"
      role="progressbar"
      [attr.aria-label]="label"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-valuenow]="percent"
      [attr.data-tone]="tone"
      [class.indeterminate]="percent === null"
    >
      <span [style.width.%]="percent ?? 40"></span>
    </div>`,
  styleUrl: './progress.component.css',
})
export class ProgressBarComponent {
  protected readonly text = inject(LIBERA_UI_TEXT);
  @Input() value: number | null = null;
  @Input() label = this.text.progress;
  /** Shows the label above the bar; otherwise it is only announced. */
  @Input({ transform: booleanAttribute }) visibleLabel = false;
  @Input({ transform: booleanAttribute }) showValue = false;
  @Input() tone: 'neutral' | 'success' | 'warning' | 'danger' = 'neutral';
  get percent() {
    return this.value === null || !Number.isFinite(this.value)
      ? null
      : Math.round(Math.min(100, Math.max(0, this.value)));
  }
}

/** Indeterminate spinner that announces its label to assistive technology. */
@Component({
  selector: 'lib-spinner',
  standalone: true,
  template: `<span role="status" class="lib-spinner" [style.--size.px]="size"
    ><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.4" opacity=".2" />
      <path
        d="M12 3a9 9 0 0 1 9 9"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
      /></svg
    ><span class="lib-visually-hidden">{{ label }}</span></span
  >`,
  styleUrl: './progress.component.css',
})
export class SpinnerComponent {
  protected readonly text = inject(LIBERA_UI_TEXT);
  @Input() label = this.text.loading;
  @Input() size = 20;
}
