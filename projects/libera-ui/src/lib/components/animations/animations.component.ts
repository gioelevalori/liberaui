import { Component, ElementRef, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'lib-animations',
  standalone: true,
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.css'],
})
export class AnimationsComponent {
  @Input() animation = '';
  @Input() animationScrolling = false;
  state = '';
  private observer?: IntersectionObserver;
  private animationTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit() {
    if (
      !isPlatformBrowser(this.platformId) ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      this.state = `${this.animation}-in`;
      return;
    }
    this.state = `${this.animation}-out`;
    if (!this.animationScrolling || typeof IntersectionObserver === 'undefined') {
      this.activateAnimation();
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.activateAnimation();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    if (this.animationTimer !== undefined) clearTimeout(this.animationTimer);
  }

  private activateAnimation() {
    this.animationTimer = setTimeout(() => {
      this.state = `${this.animation}-in`;
    });
  }
}
