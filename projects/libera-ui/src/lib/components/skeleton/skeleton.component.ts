import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

/** Placeholder shapes while content loads. Hidden from assistive technology; announce loading elsewhere. */
@Component({
  selector: 'lib-skeleton',
  standalone: true,
  imports: [CommonModule],
  host: { 'aria-hidden': 'true' },
  template: `<span
    *ngFor="let line of lineList; let last = last"
    class="lib-skeleton"
    [attr.data-shape]="shape"
    [style.width]="shape === 'text' && last && lines > 1 ? '60%' : width"
    [style.height]="shape === 'rect' ? height : null"
  ></span>`,
  styleUrl: './skeleton.component.css',
})
export class SkeletonComponent {
  @Input() shape: 'text' | 'rect' | 'circle' = 'text';
  @Input() width = '100%';
  /** Height of a rect; circles follow their width. */
  @Input() height = '96px';
  /** Number of text lines; the last line is shorter. */
  @Input() lines = 1;
  get lineList() {
    return Array.from({ length: this.shape === 'text' ? Math.max(1, this.lines) : 1 });
  }
}
