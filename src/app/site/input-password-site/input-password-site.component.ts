import { Component } from '@angular/core';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';
import { CodeComponent } from '../../components/code/code.component';

@Component({
  selector: 'app-input-password-site',
  standalone: true,
  imports: [InputPasswordComponent, CodeComponent],
  templateUrl: './input-password-site.component.html',
  styleUrl: './input-password-site.component.css'
})
export class InputPasswordSiteComponent {
  public codeImport = `import { InputPasswordComponent } from '../../components/input-password/input-password.component';`;
}
