import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

export type ButtonVariant = 'solid' | 'secondary' | 'outline' | 'ghost' | 'destructive';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
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
