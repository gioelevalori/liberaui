import { Component } from '@angular/core';

@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [],
  template: '<label for="file-upload" class="custom-file-label">Scegli un file</label><input id="file-upload" type="file" (change)="onFileSelected($event)"><span id="file-name">{{ fileName || "Nessun file selezionato" }}</span>',
  styleUrl: './input-file.component.css'
})
export class InputFileComponent {
  fileName: string = '';

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
    } else {
      this.fileName = 'Nessun file selezionato';
    }
  }
}
