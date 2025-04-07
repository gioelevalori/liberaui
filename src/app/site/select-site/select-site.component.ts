import { Component } from '@angular/core';
import { SelectComponent, SelectOption } from '../../components/select/select.component';
import { CodeComponent } from '../../components/code/code.component';
import { AnimationsComponent } from '../../components/animations/animations.component';

@Component({
  selector: 'app-select-site',
  standalone: true,
  imports: [SelectComponent, CodeComponent, AnimationsComponent],
  templateUrl: './select-site.component.html',
  styleUrl: './select-site.component.css'
})
export class SelectSiteComponent {
  public cities: SelectOption[] = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
  ];

  public codeImport = `import { SelectComponent } from '../../components/select/select.component'`;
  public codeSelect = `<app-select [options]="cities"></app-select>`;
  public codeDisabled = `<app-select [options]="cities" [disabled]="true"></app-select>`;
}
