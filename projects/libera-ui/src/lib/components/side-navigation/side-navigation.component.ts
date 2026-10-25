import { Component, HostListener, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-side-navigation',
  standalone: true,
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SideNavigationComponent {
  isOpen = false;
  fullWidth = false;
  openNav() {
    this.isOpen = true;
  }
  closeNav() {
    this.isOpen = false;
  }
  @HostListener('document:keydown.escape') onEscape() {
    this.closeNav();
  }
}
