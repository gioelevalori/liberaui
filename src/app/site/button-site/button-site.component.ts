import { Component } from '@angular/core';
import { CodeComponent } from '../../components/code/code.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { ComponentsComponent } from '../components/components.component';
import { AnimationsComponent } from '../../components/animations/animations.component';

@Component({
  selector: 'app-button-site',
  standalone: true,
  imports: [ButtonComponent, CodeComponent, RouterModule, AnimationsComponent],
  templateUrl: './button-site.component.html',
  styleUrl: './button-site.component.css'
})
export class ButtonSiteComponent {
  public codeImport = `import { ButtonComponent } from './components/button/button.component'`;
  public codeColor = `<app-button color="orange">Invia</app-button>`;
  public codeDisabled = `  <app-button color="blue" [disabled]="true">Invia</app-button>`;
  public codeLink = `
  <app-button color="blue">
    <a href="https://angular.dev/" target="_blank" rel="noopener noreferrer" class="link-button">
      External
    </a>
  </app-button>`;
}
