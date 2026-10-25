import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import {
  ButtonComponent,
  ButtonVariant,
} from '../../../../projects/libera-ui/src/lib/components/button/button.component';

@Component({
  selector: 'lib-button-site',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, CodeComponent],
  templateUrl: './button-site.component.html',
  styleUrl: './button-site.component.css',
})
export class ButtonSiteComponent {
  variants: ButtonVariant[] = ['solid', 'secondary', 'outline', 'ghost', 'destructive'];
  activated = '';
  readonly importCode = `import { ButtonComponent } from 'libera-ui';\n// Add ButtonComponent to your standalone component imports.`;
  readonly variantCode = `<lib-button>Continue</lib-button>\n<lib-button variant="secondary">Secondary</lib-button>\n<lib-button variant="outline">Outline</lib-button>\n<lib-button variant="ghost">Ghost</lib-button>\n<lib-button variant="destructive">Delete</lib-button>`;
  readonly stateCode = `<lib-button [loading]="saving">Save changes</lib-button>\n<lib-button [disabled]="true">Unavailable</lib-button>`;
  readonly sizeCode = `<lib-button size="compact">Compact</lib-button>\n<lib-button>Default</lib-button>\n<lib-button size="comfortable" [radius]="16">Comfortable</lib-button>`;
}
