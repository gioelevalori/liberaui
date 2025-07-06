import { Component } from '@angular/core';
import { InputTextareaComponent } from '../../../../projects/libera-ui/src/lib/components/input-textarea/input-textarea.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';

@Component({
  selector: 'lib-input-textarea-site',
  standalone: true,
  imports: [InputTextareaComponent, CodeComponent, AnimationsComponent],
  templateUrl: './input-textarea-site.component.html',
  styleUrl: './input-textarea-site.component.css'
})
export class InputTextareaSiteComponent {
  public codeImport = `import { InputTextareaComponent } from 'libera-ui';`;
  public codeTextarea = `<lib-input-textarea placeholder="Testo"></lib-input-textarea>`;
  public codeDisabled = `<lib-input-textarea placeholder="Testo" [disabled]="true"></lib-input-textarea>`;
}
