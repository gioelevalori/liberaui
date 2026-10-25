import { IconComponent } from '../icon/icon.component';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-input-file', standalone: true, imports: [IconComponent],
  template: `<label class="custom-file-label"><lib-icon name="upload" [size]="16" /> Choose a file<input type="file" (change)="onFileSelected($event)"></label><span class="file-name" role="status">{{ fileName || 'No file selected' }}</span>`,
  styleUrls: ['./input-file.component.css', '../font.css'],
})
export class InputFileComponent {
  fileName = '';
  onFileSelected(event: Event) {
    this.fileName = (event.target as HTMLInputElement).files?.[0]?.name || '';
  }
}
