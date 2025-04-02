import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: '<div class="custom-card"><ng-content></ng-content></div>',
  styleUrl: './card.component.css'
})
export class CardComponent {
}
