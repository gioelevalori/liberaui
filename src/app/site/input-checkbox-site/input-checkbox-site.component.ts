import { Component } from '@angular/core';
import { InputCheckboxComponent } from '../../components/input-checkbox/input-checkbox.component';
import { CodeComponent } from '../../components/code/code.component';
import { ComponentsComponent } from '../components/components.component';
import { AnimationsComponent } from '../../components/animations/animations.component';

@Component({
  selector: 'app-input-checkbox-site',
  standalone: true,
  imports: [InputCheckboxComponent, CodeComponent, ComponentsComponent, AnimationsComponent],
  templateUrl: './input-checkbox-site.component.html',
  styleUrl: './input-checkbox-site.component.css'
})
export class InputCheckboxSiteComponent {
  public codeImport = `import { InputCheckboxComponent } from '../../components/input-checkbox/input-checkbox.component';`;
  public codeDisabled = `<app-input-checkbox [disabled]="true"></app-input-checkbox>`;
  public codeColor = `<app-input-checkbox color="yellow"></app-input-checkbox>`;
}
