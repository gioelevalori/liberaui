import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: '<button [ngClass]="buttonClass" class="custom-button" [style.background-color]="color"><ng-content></ng-content></button>',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() color: string = 'gray';
  @Input() buttonClass: string = '';
}
