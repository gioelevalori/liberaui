import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FixedSideBarComponent } from '../../../../projects/libera-ui/src/lib/components/fixed-side-bar/fixed-side-bar.component';

@Component({
  selector: 'lib-components',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FixedSideBarComponent,
    RouterOutlet
  ],
  templateUrl: './components.component.html',
  styleUrl: './components.component.css'
})
export class ComponentsComponent {

}
