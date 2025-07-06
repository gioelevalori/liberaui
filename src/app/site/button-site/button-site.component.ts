import { Component } from '@angular/core';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../../projects/libera-ui/src/lib/components/button/button.component';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';

@Component({
  selector: 'lib-button-site',
  standalone: true,
  imports: [ButtonComponent, CodeComponent, RouterModule, AnimationsComponent],
  templateUrl: './button-site.component.html',
  styleUrl: './button-site.component.css'
})
export class ButtonSiteComponent {
  public codeImport = `import { ButtonComponent } from 'libera-ui'`;
  public codeColor = `<lib-button color="orange">Invia</lib-button>`;
  public codeDisabled = `  <lib-button color="blue" [disabled]="true">Invia</lib-button>`;
  public codeLink = `
  <lib-button color="blue">
    <a href="https://angular.dev/" class="link-button">
      External
    </a>
  </lib-button>`;
}
