import { Component } from '@angular/core';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';

@Component({
  selector: 'lib-installation',
  standalone: true,
  imports: [AnimationsComponent, CodeComponent],
  templateUrl: './installation.component.html',
  styleUrl: './installation.component.css'
})
export class InstallationComponent {
  public codeImport = `# Using npm
npm install libera-ui`;
}
