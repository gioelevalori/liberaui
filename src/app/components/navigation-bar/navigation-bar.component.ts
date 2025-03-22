import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [],
  template: `<div class="topnav custom-input">
    <ng-content></ng-content>
  </div>`,
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

}
