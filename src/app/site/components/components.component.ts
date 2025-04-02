import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FixedSideBarComponent } from '../../components/fixed-side-bar/fixed-side-bar.component';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FixedSideBarComponent
  ],
  templateUrl: './components.component.html',
  styleUrl: './components.component.css'
})
export class ComponentsComponent {

}
