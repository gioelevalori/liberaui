import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

export type ButtonVariant = 'solid' | 'secondary' | 'outline' | 'ghost' | 'destructive';

@Component({
  selector: 'lib-button', standalone: true, imports: [CommonModule],
  template: `<button class="custom-button" [ngClass]="buttonClass" [attr.data-variant]="variant" [style.--lib-button-color]="color" [style.border-radius.px]="radius" [class.lib-button-compact]="size === 'compact'" [class.lib-button-comfortable]="size === 'comfortable'" [disabled]="disabled || loading" [attr.aria-busy]="loading" [attr.type]="type"><svg *ngIf="loading" class="lib-button-spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" opacity=".25"/><path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><ng-content></ng-content></button>`,
  styleUrls: ['./button.component.css', '../font.css'], encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() color: string | null = null;
  @Input() buttonClass = '';
  @Input() variant: ButtonVariant = 'solid';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() radius: number | null = null;
  @Input() size = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
