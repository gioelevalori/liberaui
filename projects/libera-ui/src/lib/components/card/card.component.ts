import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: '<div class="custom-card"><ng-content></ng-content></div>',
  styleUrls: ['./card.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
}
