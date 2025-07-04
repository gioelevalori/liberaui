import { Component } from '@angular/core';
import { InputDateComponent } from '../../components/input-date/input-date.component';
import { CodeComponent } from '../../components/code/code.component';
import { AnimationsComponent } from '../../components/animations/animations.component';

@Component({
  selector: 'lib-input-date-site',
  standalone: true,
  imports: [InputDateComponent, CodeComponent, AnimationsComponent],
  templateUrl: './input-date-site.component.html',
  styleUrl: './input-date-site.component.css'
})
export class InputDateSiteComponent {
  public codeImport = `import { InputDateComponent } from '../../components/input-date/input-date.component';`;
  public codeDate = `<lib-input-date></lib-input-date>`;
}
