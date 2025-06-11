import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [],
  template: `<div class="topnav custom-nav">
    <div class="content-header"><ng-content></ng-content></div>
  </div>`,
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

}
