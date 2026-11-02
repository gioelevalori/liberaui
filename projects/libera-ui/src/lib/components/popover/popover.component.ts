import { ChangeDetectorRef, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { LIBERA_UI_TEXT } from '../../text';

let nextPopoverId = 0;

/**
 * Non-modal panel opened from a button, for interactive content such as filters or quick
 * settings. The browser light-dismisses it; Escape returns focus to the button.
 */
@Component({
  selector: 'lib-popover',
  standalone: true,
  template: `<button
      #trigger
      type="button"
      class="lib-popover-trigger"
      [attr.popovertarget]="uid"
      [attr.aria-expanded]="open"
      [attr.aria-controls]="uid"
    >
      {{ label }}
    </button>
    <div
      #panel
      popover="auto"
      class="lib-popover"
      role="dialog"
      [id]="uid"
      [attr.aria-label]="title || label"
      (toggle)="onToggle($event)"
      (keydown.escape)="close()"
    >
      <ng-content />
    </div>`,
  styleUrl: './popover.component.css',
})
export class PopoverComponent {
  protected readonly text = inject(LIBERA_UI_TEXT);
  @Input() label = this.text.options;
  /** Accessible name of the panel when it differs from the button label. */
  @Input() title = '';
  @ViewChild('trigger') trigger!: ElementRef<HTMLButtonElement>;
  @ViewChild('panel') panel!: ElementRef<HTMLDivElement>;
  readonly uid = 'lib-popover-' + nextPopoverId++;
  open = false;
  private readonly changeDetector = inject(ChangeDetectorRef);

  onToggle(event: Event) {
    this.open = (event as Event & { newState: string }).newState === 'open';
    if (this.open) {
      this.position();
      // Move focus into the panel so keyboard users reach its content next.
      this.panel.nativeElement
        .querySelector<HTMLElement>(
          'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        ?.focus();
    }
    this.changeDetector.markForCheck();
  }
  close() {
    const el = this.panel.nativeElement;
    if (el.matches(':popover-open')) el.hidePopover();
    this.trigger.nativeElement.focus();
  }
  private position() {
    const el = this.panel.nativeElement;
    const view = el.ownerDocument.defaultView!;
    const anchor = this.trigger.nativeElement.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    const below = anchor.bottom + 8;
    const top = below + box.height > view.innerHeight - 8 ? anchor.top - box.height - 8 : below;
    el.style.left = Math.max(8, Math.min(anchor.left, view.innerWidth - box.width - 8)) + 'px';
    el.style.top = Math.max(8, top) + 'px';
  }
}
