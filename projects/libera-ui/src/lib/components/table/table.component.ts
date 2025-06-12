import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  template: `
  <table class="styled-table">
    <ng-content></ng-content>
  </table>`,
  styleUrls: ['./table.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {

}
