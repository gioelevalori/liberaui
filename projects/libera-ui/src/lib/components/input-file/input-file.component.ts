import { IconComponent } from '../icon/icon.component';
import { Component, inject } from '@angular/core';
import { LIBERA_UI_TEXT } from '../../text';

@Component({
  selector: 'lib-input-file',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css', '../font.css'],
})
export class InputFileComponent {
  protected readonly text = inject(LIBERA_UI_TEXT);
  fileName = '';
  onFileSelected(event: Event) {
    this.fileName = (event.target as HTMLInputElement).files?.[0]?.name || '';
  }
}
