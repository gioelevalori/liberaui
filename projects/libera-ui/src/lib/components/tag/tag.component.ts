import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { StatusTone } from '../badge/badge.component';
import { IconComponent } from '../icon/icon.component';
import { LIBERA_UI_TEXT } from '../../text';

/** Short label for a status or category, optionally removable. */
@Component({
  selector: 'lib-tag',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `<span class="lib-tag" [attr.data-tone]="tone"
    ><lib-icon *ngIf="icon" [name]="icon" [size]="12" /><ng-content /><button
      *ngIf="removable"
      type="button"
      [attr.aria-label]="removeLabel"
      (click)="removed.emit()"
    >
      <lib-icon name="close" [size]="12" /></button
  ></span>`,
  styleUrl: './tag.component.css',
})
export class TagComponent {
  protected readonly text = inject(LIBERA_UI_TEXT);
  @Input() tone: StatusTone = 'neutral';
  @Input() icon = '';
  @Input({ transform: booleanAttribute }) removable = false;
  /** Name the item, for example "Remove Design", so each button is distinct. */
  @Input() removeLabel = this.text.remove;
  @Output() removed = new EventEmitter<void>();
}
