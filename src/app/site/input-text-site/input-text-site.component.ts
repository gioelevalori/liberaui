import { Component } from '@angular/core';
import { InputTextComponent } from '../../../../projects/libera-ui/src/lib/components/input-text/input-text.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';

@Component({
  selector: 'lib-input-text-site',
  standalone: true,
  imports: [InputTextComponent, CodeComponent, AnimationsComponent],
  templateUrl: './input-text-site.component.html',
  styleUrl: './input-text-site.component.css'
})
export class InputTextSiteComponent {
  public codeImport = `import { InputTextComponent } from 'libera-ui';`;
  public codeInputText = `<lib-input-text placeholder="Nome"></lib-input-text>`;
  public codeDisabled = `<lib-input-text placeholder="Nome" [disabled]="true"></lib-input-text>`;
}
