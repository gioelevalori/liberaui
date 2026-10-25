import { IconComponent } from '../icon/icon.component';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-input-file',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css', '../font.css'],
})
export class InputFileComponent {
  fileName = '';
  onFileSelected(event: Event) {
    this.fileName = (event.target as HTMLInputElement).files?.[0]?.name || '';
  }
}
