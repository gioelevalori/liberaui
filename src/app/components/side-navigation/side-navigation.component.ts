import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="mySidenav" [ngClass]="{'open': isOpen}" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" (click)="closeNav()">&times;</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
    <span style="font-size:30px;cursor:pointer" (click)="openNav()">open</span>
  `,
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent {
  public isOpen = false;
  public openNav() {
    this.isOpen = true;
  }

  public closeNav() {
    this.isOpen = false;
  }
}

