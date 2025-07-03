import { Component } from '@angular/core';
import { AnimationsComponent } from '../../components/animations/animations.component';
import { CodeComponent } from '../../components/code/code.component';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [AnimationsComponent, CodeComponent],
  templateUrl: './installation.component.html',
  styleUrl: './installation.component.css'
})
export class InstallationComponent {
  public codeImport = `# Using npm
npm install libera-ui`;
}
