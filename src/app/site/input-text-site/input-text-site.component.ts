import { Component } from '@angular/core';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { CodeComponent } from '../../components/code/code.component';

@Component({
  selector: 'app-input-text-site',
  standalone: true,
  imports: [InputTextComponent, CodeComponent],
  templateUrl: './input-text-site.component.html',
  styleUrl: './input-text-site.component.css'
})
export class InputTextSiteComponent {
  public codeImport = `import { InputTextComponent } from '../../components/input-text/input-text.component';`;
  public codeInputText = `<app-input-text placeholder="Nome"></app-input-text>`;
  public codeDisabled = `<app-input-text placeholder="Nome" [disabled]="true"></app-input-text>`;
}
