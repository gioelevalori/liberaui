import { booleanAttribute, Component, Input } from '@angular/core';

export type StatusTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

/** Compact count or status. Give it a label when the number alone lacks context. */
@Component({
  selector: 'lib-badge',
  standalone: true,
  template: `<span
    class="lib-badge"
    [attr.data-tone]="tone"
    [class.dot]="dot"
    [attr.aria-label]="label || null"
    [attr.role]="label ? 'img' : null"
    >{{ dot ? '' : display }}</span
  >`,
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  @Input() value: number | string = '';
  @Input() tone: StatusTone = 'neutral';
  /** Counts above max show as "max+". */
  @Input() max = 99;
  @Input({ transform: booleanAttribute }) dot = false;
  @Input() label = '';
  get display() {
    return typeof this.value === 'number' && this.value > this.max
      ? `${this.max}+`
      : String(this.value);
  }
}
