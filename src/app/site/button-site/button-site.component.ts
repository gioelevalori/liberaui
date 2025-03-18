import { Component } from '@angular/core';
import { CodeComponent } from '../../components/code/code.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-button-site',
  standalone: true,
  imports: [ButtonComponent, CodeComponent, RouterModule],
  templateUrl: './button-site.component.html',
  styleUrl: './button-site.component.css'
})
export class ButtonSiteComponent {
  public codeImportButton = `import { ButtonComponent } from './components/button/button.component'`;
}
