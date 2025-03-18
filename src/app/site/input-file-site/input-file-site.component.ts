import { Component } from '@angular/core';
import { InputFileComponent } from '../../components/input-file/input-file.component';
import { CodeComponent } from '../../components/code/code.component';

@Component({
  selector: 'app-input-file-site',
  standalone: true,
  imports: [InputFileComponent, CodeComponent],
  templateUrl: './input-file-site.component.html',
  styleUrl: './input-file-site.component.css'
})
export class InputFileSiteComponent {
  public codeImport = `import { InputDateComponent } from '../../components/input-date/input-date.component';`;
}
