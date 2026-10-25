import { Component } from '@angular/core';
import { InputDateComponent } from '../../../../projects/libera-ui/src/lib/components/input-date/input-date.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';

@Component({
  selector: 'lib-input-date-site',
  standalone: true,
  imports: [InputDateComponent, CodeComponent, AnimationsComponent],
  templateUrl: './input-date-site.component.html',
  styleUrl: './input-date-site.component.css',
})
export class InputDateSiteComponent {
  public codeImport = `import { InputDateComponent } from 'libera-ui';`;
  public codeDate = `<lib-input-date></lib-input-date>`;
}
