import { Component, HostListener, ViewEncapsulation } from '@angular/core';

@Component({
  selector:'lib-side-navigation', standalone:true,
  template:`<nav class="sidenav" [hidden]="!isOpen" aria-label="Side navigation"><button type="button" class="closebtn" (click)="closeNav()">Close</button><ng-content></ng-content></nav><button type="button" class="nav-trigger" (click)="openNav()" [attr.aria-expanded]="isOpen">Open navigation</button>`,
  styleUrls:['./side-navigation.component.css','../font.css'], encapsulation:ViewEncapsulation.None,
})
export class SideNavigationComponent {
  isOpen = false;
  fullWidth = false;
  openNav() { this.isOpen = true; }
  closeNav() { this.isOpen = false; }
  @HostListener('document:keydown.escape') onEscape() { this.closeNav(); }
}
