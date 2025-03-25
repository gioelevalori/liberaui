import { Component } from '@angular/core';
import { ComponentsComponent } from '../components/components.component';
import { AnimationsComponent } from '../../components/animations/animations.component';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [ComponentsComponent, AnimationsComponent],
  templateUrl: './installation.component.html',
  styleUrl: './installation.component.css'
})
export class InstallationComponent {

}
