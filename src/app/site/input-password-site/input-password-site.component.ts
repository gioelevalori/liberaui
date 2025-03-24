import { Component } from '@angular/core';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';
import { CodeComponent } from '../../components/code/code.component';
import { ComponentsComponent } from '../components/components.component';

@Component({
  selector: 'app-input-password-site',
  standalone: true,
  imports: [InputPasswordComponent, CodeComponent, ComponentsComponent],
  templateUrl: './input-password-site.component.html',
  styleUrl: './input-password-site.component.css'
})
export class InputPasswordSiteComponent {
  public codeImport = `import { InputPasswordComponent } from '../../components/input-password/input-password.component';`;
  public codeInputPassword = `<app-input-password placeholder="Password"></app-input-password>`;
  public codeDisabled = `<app-input-password placeholder="Password" [disabled]="true"></app-input-password>`;
}
