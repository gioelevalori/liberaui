import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  content?: string;
  template?: TemplateRef<unknown>;
  disabled?: boolean;
}
let nextTabsId = 0;
@Component({
  selector: 'lib-tabs, lib-tab',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css',
})
export class TabComponent implements OnChanges {
  @Input() items: TabItem[] = [];
  @Input() label = 'Sections';
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @Input() activeId = '';
  @Output() activeIdChange = new EventEmitter<string>();
  @ViewChildren('tabButton') buttons!: QueryList<ElementRef<HTMLButtonElement>>;
  readonly uid = 'lib-tabs-' + nextTabsId++;
  ngOnChanges() {
    if (!this.items.some((i) => i.id === this.activeId && !i.disabled))
      this.activeId = this.items.find((i) => !i.disabled)?.id ?? '';
  }
  select(item: TabItem) {
    if (item.disabled || this.activeId === item.id) return;
    this.activeId = item.id;
    this.activeIdChange.emit(item.id);
  }
  navigate(event: KeyboardEvent, index: number) {
    const enabled = this.items.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0);
    if (!enabled.length) return;
    let next: number | undefined;
    if (event.key === 'Home') next = enabled[0];
    else if (event.key === 'End') next = enabled[enabled.length - 1];
    else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const delta = (event.key === 'ArrowRight' ? 1 : -1) * (this.direction === 'rtl' ? -1 : 1);
      next = enabled[(enabled.indexOf(index) + delta + enabled.length) % enabled.length];
    }
    if (next === undefined) return;
    event.preventDefault();
    this.select(this.items[next]);
    this.buttons.get(next)?.nativeElement.focus();
  }
}
