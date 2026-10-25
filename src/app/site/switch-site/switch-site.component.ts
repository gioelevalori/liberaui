import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwitchComponent } from '../../../../projects/libera-ui/src/lib/components/switch/switch.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';

@Component({
  selector: 'lib-switch-site',
  standalone: true,
  imports: [FormsModule, SwitchComponent, CodeComponent],
  templateUrl: './switch-site.component.html',
})
export class SwitchSiteComponent {
  enabled = true;
  readonly example = `import { FormsModule } from '@angular/forms';\nimport { SwitchComponent } from 'libera-ui';\n// Add both to your standalone component imports.\n\n<lib-switch label="Focus mode" [(ngModel)]="enabled" />`;
}
