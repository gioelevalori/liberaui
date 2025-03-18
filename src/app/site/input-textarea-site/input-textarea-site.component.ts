import { Component } from '@angular/core';
import { InputTextareaComponent } from '../../components/input-textarea/input-textarea.component';
import { CodeComponent } from '../../components/code/code.component';

@Component({
  selector: 'app-input-textarea-site',
  standalone: true,
  imports: [InputTextareaComponent, CodeComponent],
  templateUrl: './input-textarea-site.component.html',
  styleUrl: './input-textarea-site.component.css'
})
export class InputTextareaSiteComponent {
  public codeImport = `import { InputTextareaComponent } from '../../components/input-textarea/input-textarea.component';`;
}
