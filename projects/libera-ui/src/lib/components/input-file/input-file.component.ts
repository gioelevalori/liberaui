import { Component } from '@angular/core';

@Component({
  selector: 'lib-input-file', standalone: true,
  template: `<label class="custom-file-label">Choose a file<input type="file" (change)="onFileSelected($event)"></label><span class="file-name" role="status">{{ fileName || 'No file selected' }}</span>`,
  styleUrls: ['./input-file.component.css', '../font.css'],
})
export class InputFileComponent {
  fileName = '';
  onFileSelected(event: Event) {
    this.fileName = (event.target as HTMLInputElement).files?.[0]?.name || '';
  }
}
