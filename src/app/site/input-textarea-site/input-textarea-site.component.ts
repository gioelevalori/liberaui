import { Component } from '@angular/core';
import { InputTextareaComponent } from '../../components/input-textarea/input-textarea.component';
import { CodeComponent } from '../../components/code/code.component';
import { ComponentsComponent } from '../components/components.component';

@Component({
  selector: 'app-input-textarea-site',
  standalone: true,
  imports: [InputTextareaComponent, CodeComponent, ComponentsComponent],
  templateUrl: './input-textarea-site.component.html',
  styleUrl: './input-textarea-site.component.css'
})
export class InputTextareaSiteComponent {
  public codeImport = `import { InputTextareaComponent } from '../../components/input-textarea/input-textarea.component';`;
  public codeTextarea = `<app-input-textarea placeholder="Testo"></app-input-textarea>`;
  public codeDisabled = `<app-input-textarea placeholder="Testo" [disabled]="true"></app-input-textarea>`;
}
