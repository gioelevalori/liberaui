import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [],
  template: `<div class="topnav custom-input">
    <a class="active" href="#home">Home</a>
    <a href="#news">News</a>
    <a href="#contact">Contact</a>
    <a href="#about">About</a>
    <ng-content></ng-content>
  </div>`,
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

}
