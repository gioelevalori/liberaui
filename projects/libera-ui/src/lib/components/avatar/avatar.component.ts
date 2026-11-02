import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, Input, OnChanges } from '@angular/core';

/** Picture of a person or entity, falling back to initials when there is no image or it fails. */
@Component({
  selector: 'lib-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `<span
    class="lib-avatar"
    [attr.data-shape]="shape"
    [style.--size.px]="size"
    [attr.role]="decorative ? null : 'img'"
    [attr.aria-label]="decorative ? null : name"
    [attr.aria-hidden]="decorative ? 'true' : null"
    ><img
      *ngIf="src && !failed; else initialsText"
      [src]="src"
      alt=""
      (error)="failed = true"
    /><ng-template #initialsText>{{ initials }}</ng-template></span
  >`,
  styleUrl: './avatar.component.css',
})
export class AvatarComponent implements OnChanges {
  @Input() name = '';
  @Input() src = '';
  @Input() size = 36;
  @Input() shape: 'circle' | 'square' = 'circle';
  /** Set when a visible name sits next to the avatar, so it is not read twice. */
  @Input({ transform: booleanAttribute }) decorative = false;
  failed = false;
  ngOnChanges() {
    this.failed = false;
  }
  get initials() {
    const words = this.name.trim().split(/\s+/).filter(Boolean);
    const letters = words.length > 1 ? [words[0], words[words.length - 1]] : words;
    return letters
      .map((word) => [...word][0] ?? '')
      .join('')
      .toUpperCase();
  }
}
