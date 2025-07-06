import { Component } from '@angular/core';
import { InputNumberComponent } from '../../../../projects/libera-ui/src/lib/components/input-number/input-number.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';

@Component({
  selector: 'lib-input-number-site',
  standalone: true,
  imports: [InputNumberComponent, CodeComponent, AnimationsComponent],
  templateUrl: './input-number-site.component.html',
  styleUrl: './input-number-site.component.css'
})
export class InputNumberSiteComponent {
  public codeImport = `import { InputNumberComponent } from 'libera-ui';`;
  public codeInputNumber = `<lib-input-number placeholder="Numero" [min]="5" [max]="10"></lib-input-number>`;
  public codeDisabled = `<lib-input-number placeholder="Numero" [min]="5" [max]="10" [disabled]="true"></lib-input-number>`;
}
