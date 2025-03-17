import { Component } from '@angular/core';
import { SelectComponent, SelectOption } from '../../components/select/select.component';

@Component({
  selector: 'app-select-site',
  standalone: true,
  imports: [SelectComponent],
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
}
