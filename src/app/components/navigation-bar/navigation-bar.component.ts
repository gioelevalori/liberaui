import { Component } from '@angular/core';

@Component({
  selector: 'lib-navigation-bar',
  standalone: true,
  imports: [],
  template: `<div class="topnav custom-nav">
    <div class="content-header"><ng-content></ng-content></div>
  </div>`,
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

}
