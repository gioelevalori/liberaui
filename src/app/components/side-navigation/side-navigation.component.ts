import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-side-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="mySidenav" [ngClass]="{'minWidth': isOpen} " class="sidenav">
      <a href="javascript:void(0)" class="closebtn" (click)="closeNav()">&times;</a>
      <ng-content></ng-content>
    </div>
    <span style="font-size:30px;cursor:pointer" (click)="openNav()">X</span>
  `,
  styleUrls: ['./side-navigation.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SideNavigationComponent {
  public isOpen = false;
  public fullWidth = false;
  public openNav() {
    this.isOpen = true;
  }

  public closeNav() {
    this.isOpen = false;
  }
}

