import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { LIBERA_UI_TEXT } from '../../text';

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  /** Marks destructive actions. */
  danger?: boolean;
}
let nextMenuId = 0;

/** Menu button following the WAI-ARIA pattern; the list renders in the top layer. */
@Component({
  selector: 'lib-menu',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  protected readonly text = inject(LIBERA_UI_TEXT);
  @Input() label = this.text.options;
  @Input() items: MenuItem[] = [];
  @Output() itemSelected = new EventEmitter<MenuItem>();
  @ViewChild('trigger') trigger!: ElementRef<HTMLButtonElement>;
  @ViewChild('menu') menu!: ElementRef<HTMLDivElement>;
  @ViewChildren('item') itemButtons!: QueryList<ElementRef<HTMLButtonElement>>;
  readonly uid = 'lib-menu-' + nextMenuId++;
  open = false;
  private readonly changeDetector = inject(ChangeDetectorRef);

  private pendingFocus = 0;

  onTriggerKeydown(event: KeyboardEvent) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    this.pendingFocus = event.key === 'ArrowDown' ? 0 : -1;
    const el = this.menu.nativeElement;
    if (!el.matches(':popover-open')) el.showPopover();
    this.opened();
  }
  onMenuKeydown(event: KeyboardEvent, index: number) {
    const enabled = this.enabledIndexes();
    const at = enabled.indexOf(index);
    let next: number | undefined;
    if (event.key === 'ArrowDown') next = enabled[(at + 1) % enabled.length];
    else if (event.key === 'ArrowUp') next = enabled[(at - 1 + enabled.length) % enabled.length];
    else if (event.key === 'Home') next = enabled[0];
    else if (event.key === 'End') next = enabled[enabled.length - 1];
    else if (event.key === 'Escape') {
      event.preventDefault();
      this.close(true);
      return;
    } else if (event.key === 'Tab') {
      this.close(false);
      return;
    } else if (event.key.length === 1 && /\S/.test(event.key)) {
      const letter = event.key.toLowerCase();
      const order = [...enabled.slice(at + 1), ...enabled.slice(0, at + 1)];
      next = order.find((i) => this.items[i].label.toLowerCase().startsWith(letter));
    }
    if (next === undefined) return;
    event.preventDefault();
    this.focusItem(next);
  }
  choose(item: MenuItem) {
    if (item.disabled) return;
    this.close(true);
    this.itemSelected.emit(item);
  }
  /**
   * The trigger is the native popovertarget invoker, so the browser opens, closes and
   * light-dismisses the menu; this keeps state and focus in sync with it.
   */
  onToggle(event: Event) {
    if ((event as Event & { newState: string }).newState === 'open') {
      if (!this.open) this.opened();
    } else {
      this.open = false;
      this.pendingFocus = 0;
    }
    this.changeDetector.markForCheck();
  }

  private opened() {
    const enabled = this.enabledIndexes();
    this.open = true;
    this.position();
    if (enabled.length)
      this.focusItem(this.pendingFocus < 0 ? enabled[enabled.length - 1] : enabled[0]);
  }
  private close(restoreFocus: boolean) {
    const el = this.menu.nativeElement;
    if (el.matches(':popover-open')) el.hidePopover();
    this.open = false;
    if (restoreFocus) this.trigger.nativeElement.focus();
  }
  private enabledIndexes() {
    return this.items.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0);
  }
  private focusItem(index: number) {
    this.itemButtons.get(index)?.nativeElement.focus();
  }
  private position() {
    const el = this.menu.nativeElement;
    const view = el.ownerDocument.defaultView!;
    const anchor = this.trigger.nativeElement.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    const below = anchor.bottom + 6;
    const top = below + box.height > view.innerHeight - 8 ? anchor.top - box.height - 6 : below;
    el.style.left = Math.max(8, Math.min(anchor.left, view.innerWidth - box.width - 8)) + 'px';
    el.style.top = Math.max(8, top) + 'px';
  }
}
