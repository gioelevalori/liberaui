import { Component } from '@angular/core';
import { InputFileComponent } from '../../../../projects/libera-ui/src/lib/components/input-file/input-file.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';

@Component({
  selector: 'lib-input-file-site',
  standalone: true,
  imports: [InputFileComponent, CodeComponent, AnimationsComponent],
  templateUrl: './input-file-site.component.html',
  styleUrl: './input-file-site.component.css'
})
export class InputFileSiteComponent {
  public codeImport = `import { InputFileComponent } from 'libera-ui';`;
  public codeFileUpload = `<lib-input-file></lib-input-file>`;
}
