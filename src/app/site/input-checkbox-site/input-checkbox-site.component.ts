import { Component } from '@angular/core';
import { InputCheckboxComponent } from '../../components/input-checkbox/input-checkbox.component';
import { CodeComponent } from '../../components/code/code.component';
import { AnimationsComponent } from '../../components/animations/animations.component';

@Component({
  selector: 'lib-input-checkbox-site',
  standalone: true,
  imports: [InputCheckboxComponent, CodeComponent, AnimationsComponent],
  templateUrl: './input-checkbox-site.component.html',
  styleUrl: './input-checkbox-site.component.css'
})
export class InputCheckboxSiteComponent {
  public codeImport = `import { InputCheckboxComponent } from 'libera-ui';`;
  public codeDisabled = `<lib-input-checkbox [disabled]="true"></lib-input-checkbox>`;
  public codeColor = `<lib-input-checkbox color="yellow"></lib-input-checkbox>`;
}
