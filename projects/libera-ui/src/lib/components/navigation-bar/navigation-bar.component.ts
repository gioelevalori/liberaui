import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-navigation-bar',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css', '../font.css'],
})
export class NavigationBarComponent {}
