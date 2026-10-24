import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button [ngClass]="buttonClass" class="custom-button" [style.background-color]="color" [style.border-radius.px]="radius" [class.lib-button-compact]="size === 'compact'" [class.lib-button-comfortable]="size === 'comfortable'" [disabled]="disabled" [attr.type]="type"><ng-content></ng-content></button>`,
  styleUrls: ['./button.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() color = 'gray';
  @Input() buttonClass = '';
  @Input() disabled = false;
  @Input() radius: number | null = null;
  @Input() size = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
