import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueControl } from '../form-value-control';
import { IconComponent } from '../icon/icon.component';
@Component({
  selector: 'lib-input-date',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputDateComponent), multi: true },
  ],
})
export class InputDateComponent extends FormValueControl<string> implements OnDestroy {
  @Input() label = 'Choose a date';
  @Input() placeholder = 'Enter a value';
  @Input({ transform: booleanAttribute }) required = false;
  @Input() min: string | null = null;
  @Input() max: string | null = null;
  @ViewChild('picker') picker!: ElementRef<HTMLDivElement>;
  @ViewChild('trigger') trigger!: ElementRef<HTMLButtonElement>;
  readonly weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  readonly todayDate = new Date();
  readonly today = this.iso(this.todayDate);
  month = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), 1);
  focusDate = this.today;
  open = false;
  private frame = 0;
  get monthLabel() {
    return this.month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  }
  get days(): (Date | null)[] {
    const start = (this.month.getDay() + 6) % 7;
    return [
      ...Array(start).fill(null),
      ...Array.from(
        { length: new Date(this.month.getFullYear(), this.month.getMonth() + 1, 0).getDate() },
        (_, i) => new Date(this.month.getFullYear(), this.month.getMonth(), i + 1),
      ),
    ];
  }
  iso(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
  dayLabel(date: Date) {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  unavailable(date: Date) {
    const key = this.iso(date);
    return this.disabled || !!(this.min && key < this.min) || !!(this.max && key > this.max);
  }
  toggle() {
    if (this.disabled) return;
    if (this.open) {
      this.close();
      return;
    }
    const key = this.value || this.today;
    const [y, m, d] = key.split('-').map(Number);
    let selected = new Date(y, m - 1, d);
    if (!Number.isFinite(selected.getTime())) selected = this.todayDate;
    if (this.min && this.iso(selected) < this.min) selected = new Date(this.min + 'T12:00:00');
    if (this.max && this.iso(selected) > this.max) selected = new Date(this.max + 'T12:00:00');
    this.month = new Date(selected.getFullYear(), selected.getMonth(), 1);
    this.focusDate = this.iso(selected);
    const el = this.picker.nativeElement,
      rect = this.trigger.nativeElement.getBoundingClientRect();
    el.style.left = Math.max(8, Math.min(rect.right - 296, window.innerWidth - 304)) + 'px';
    el.style.top =
      Math.max(8, rect.bottom + 368 > window.innerHeight ? rect.top - 368 : rect.bottom + 8) + 'px';
    el.showPopover();
    this.open = true;
    this.focusDay();
  }
  onToggle(event: Event) {
    this.open = (event as Event & { newState: string }).newState === 'open';
    if (!this.open) this.touched();
  }
  close() {
    this.picker.nativeElement.hidePopover();
    this.open = false;
    this.touched();
    this.trigger.nativeElement.focus();
  }
  choose(day: Date) {
    if (this.unavailable(day)) return;
    this.commit(this.iso(day));
    this.close();
  }
  chooseToday() {
    this.choose(this.todayDate);
  }
  moveMonth(delta: number) {
    this.month = new Date(this.month.getFullYear(), this.month.getMonth() + delta, 1);
    this.focusDate = this.iso(this.days.find((day) => day && !this.unavailable(day)) ?? this.month);
  }
  navigate(event: KeyboardEvent, day: Date) {
    let next = new Date(day);
    const delta: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    if (event.key in delta) next.setDate(day.getDate() + delta[event.key]);
    else if (event.key === 'Home') next.setDate(day.getDate() - ((day.getDay() + 6) % 7));
    else if (event.key === 'End') next.setDate(day.getDate() + 6 - ((day.getDay() + 6) % 7));
    else if (event.key === 'PageUp' || event.key === 'PageDown') {
      const month = day.getMonth() + (event.key === 'PageUp' ? -1 : 1);
      next = new Date(
        day.getFullYear(),
        month,
        Math.min(day.getDate(), new Date(day.getFullYear(), month + 1, 0).getDate()),
      );
    } else return;
    event.preventDefault();
    if (this.unavailable(next)) return;
    this.month = new Date(next.getFullYear(), next.getMonth(), 1);
    this.focusDate = this.iso(next);
    this.focusDay();
  }
  private focusDay() {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() =>
      this.picker.nativeElement
        .querySelector<HTMLButtonElement>(`[data-date="${this.focusDate}"]`)
        ?.focus(),
    );
  }
  ngOnDestroy() {
    cancelAnimationFrame(this.frame);
  }
}
