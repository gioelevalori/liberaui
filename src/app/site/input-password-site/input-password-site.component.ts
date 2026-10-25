import { Component } from '@angular/core';
import { InputPasswordComponent } from '../../../../projects/libera-ui/src/lib/components/input-password/input-password.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';

@Component({
  selector: 'lib-input-password-site',
  standalone: true,
  imports: [InputPasswordComponent, CodeComponent, AnimationsComponent],
  templateUrl: './input-password-site.component.html',
  styleUrl: './input-password-site.component.css',
})
export class InputPasswordSiteComponent {
  public codeImport = `import { InputPasswordComponent } from 'libera-ui';`;
  public codeInputPassword = `<lib-input-password placeholder="Password"></lib-input-password>`;
  public codeDisabled = `<lib-input-password placeholder="Password" [disabled]="true"></lib-input-password>`;
}
