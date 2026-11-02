import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';

export type TooltipPlacement = 'top' | 'bottom';
let nextTooltipId = 0;
const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Wraps a control and describes it. The bubble renders in the top layer, so it is never clipped. */
@Component({
  selector: 'lib-tooltip',
  standalone: true,
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
})
export class TooltipComponent implements OnDestroy {
  @Input() text = '';
  @Input() placement: TooltipPlacement = 'top';
  @Input() delay = 300;
  @ViewChild('bubble') bubble!: ElementRef<HTMLDivElement>;
  readonly id = 'lib-tooltip-' + nextTooltipId++;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private hoverTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    afterNextRender(() => {
      const target = this.host.nativeElement.querySelector<HTMLElement>(FOCUSABLE);
      if (!target) return;
      const ids = target.getAttribute('aria-describedby');
      if (!ids?.split(' ').includes(this.id))
        target.setAttribute('aria-describedby', ids ? `${ids} ${this.id}` : this.id);
    });
  }

  @HostListener('mouseenter') onPointerEnter() {
    clearTimeout(this.hoverTimer);
    this.hoverTimer = setTimeout(() => this.show(), this.delay);
  }
  @HostListener('focusin') onFocus() {
    this.show();
  }
  @HostListener('mouseleave') onPointerLeave() {
    // Keyboard users still need the description while focus stays on the control.
    if (this.host.nativeElement.contains(this.host.nativeElement.ownerDocument.activeElement))
      clearTimeout(this.hoverTimer);
    else this.hide();
  }
  @HostListener('focusout') hide() {
    clearTimeout(this.hoverTimer);
    const el = this.bubble?.nativeElement;
    if (el?.matches(':popover-open')) el.hidePopover();
  }
  @HostListener('document:keydown.escape') onEscape() {
    this.hide();
  }
  ngOnDestroy() {
    clearTimeout(this.hoverTimer);
  }

  private show() {
    const el = this.bubble?.nativeElement;
    if (!this.text || !el || typeof el.showPopover !== 'function') return;
    if (!el.matches(':popover-open')) el.showPopover();
    const anchor = this.host.nativeElement.getBoundingClientRect();
    const bubble = el.getBoundingClientRect();
    const view = el.ownerDocument.defaultView!;
    const left = anchor.left + anchor.width / 2 - bubble.width / 2;
    const above = anchor.top - bubble.height - 8;
    const below = anchor.bottom + 8;
    const top =
      this.placement === 'top'
        ? above < 8
          ? below
          : above
        : below + bubble.height > view.innerHeight - 8
          ? above
          : below;
    el.style.left = Math.max(8, Math.min(left, view.innerWidth - bubble.width - 8)) + 'px';
    el.style.top = Math.max(8, top) + 'px';
  }
}
