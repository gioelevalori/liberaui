import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { LIBERA_UI_TEXT } from '../../text';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Landmark-labelled trail. The last item is the current page; separators are drawn in CSS
 * so screen readers do not announce them.
 */
@Component({
  selector: 'lib-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  template: `<nav [attr.aria-label]="label">
    <ol>
      <li *ngFor="let item of items; let last = last">
        <a *ngIf="!last && item.href; else current" [href]="item.href">{{ item.label }}</a>
        <ng-template #current
          ><span [attr.aria-current]="last ? 'page' : null">{{ item.label }}</span></ng-template
        >
      </li>
    </ol>
  </nav>`,
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent {
  protected readonly text = inject(LIBERA_UI_TEXT);
  @Input() items: BreadcrumbItem[] = [];
  @Input() label = this.text.breadcrumb;
}
