import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  template: `
  <table class="styled-table">
    <ng-content></ng-content>
  </table>`,
  styleUrl: './table.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {

}
