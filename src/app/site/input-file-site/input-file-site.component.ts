import { Component } from '@angular/core';
import { InputFileComponent } from '../../components/input-file/input-file.component';
import { CodeComponent } from '../../components/code/code.component';
import { ComponentsComponent } from '../components/components.component';
import { AnimationsComponent } from '../../components/animations/animations.component';

@Component({
  selector: 'app-input-file-site',
  standalone: true,
  imports: [InputFileComponent, CodeComponent, ComponentsComponent, AnimationsComponent],
  templateUrl: './input-file-site.component.html',
  styleUrl: './input-file-site.component.css'
})
export class InputFileSiteComponent {
  public codeImport = `import { InputFileComponent } from '../../components/input-file/input-file.component';`;
  public codeFileUpload = `<app-input-file></app-input-file>`;
}
