import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-fixed-side-bar',
  standalone: true,
  imports: [],
  template: `
  <div class="sidenav">
    <ng-content select="[sidebar]"></ng-content>
  </div>
  <div class="main">
    <ng-content select="[main]"></ng-content>
  </div>`,
  styleUrls: ['./fixed-side-bar.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FixedSideBarComponent {

}
