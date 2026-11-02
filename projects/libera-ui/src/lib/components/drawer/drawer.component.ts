import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { IconComponent } from '../icon/icon.component';

/** Side panel with the same modal behavior as DialogComponent: inert page, Escape, focus return. */
@Component({
  selector: 'lib-drawer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: '../dialog/dialog.component.html',
  styleUrls: ['../dialog/dialog.component.css', './drawer.component.css'],
  host: { '[attr.data-position]': 'position' },
})
export class DrawerComponent extends DialogComponent {
  @Input() position: 'start' | 'end' = 'end';
  @Input() override closeLabel = this.text.closePanel;
}
