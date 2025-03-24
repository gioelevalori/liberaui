import { Component } from '@angular/core';
import { InputDateComponent } from '../../components/input-date/input-date.component';
import { CodeComponent } from '../../components/code/code.component';
import { ComponentsComponent } from '../components/components.component';
import { AnimationsComponent } from '../../components/animations/animations.component';

@Component({
  selector: 'app-input-date-site',
  standalone: true,
  imports: [InputDateComponent, CodeComponent, ComponentsComponent, AnimationsComponent],
  templateUrl: './input-date-site.component.html',
  styleUrl: './input-date-site.component.css'
})
export class InputDateSiteComponent {
  public codeImport = `import { InputDateComponent } from '../../components/input-date/input-date.component';`;
  public codeDate = `<app-input-date></app-input-date>`;
}
