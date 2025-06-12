import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [],
  template: '<input type="date" class="custom-input" />',
  styleUrls: ['./input-date.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InputDateComponent {

}
