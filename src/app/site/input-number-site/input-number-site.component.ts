import { Component } from '@angular/core';
import { InputNumberComponent } from '../../components/input-number/input-number.component';
import { CodeComponent } from '../../components/code/code.component';

@Component({
  selector: 'app-input-number-site',
  standalone: true,
  imports: [InputNumberComponent, CodeComponent],
  templateUrl: './input-number-site.component.html',
  styleUrl: './input-number-site.component.css'
})
export class InputNumberSiteComponent {
  public codeImport = `import { InputNumberComponent } from '../../components/input-number/input-number.component';`;

}
