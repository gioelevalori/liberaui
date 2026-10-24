import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwitchComponent } from '../../../../projects/libera-ui/src/lib/components/switch/switch.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';

@Component({ selector:'lib-switch-site', standalone:true, imports:[FormsModule,SwitchComponent,CodeComponent], template: `<div class="content-page"><h1>Switch</h1><p>A small control for an immediate choice. Supports ngModel, reactive forms, keyboard activation, and disabled states.</p><div class="component-demo"><div><strong>Focus mode</strong><p>{{ enabled ? 'Notifications are paused in this preview.' : 'Notifications are enabled in this preview.' }}</p></div><lib-switch label="Focus mode" [(ngModel)]="enabled" /></div><lib-code [code]="example" /><h2>Disabled</h2><div class="component-demo"><span>Read-only preference</span><lib-switch label="Read-only preference" [checked]="true" [disabled]="true" /></div><h2>API</h2><div class="api-table-wrap"><table class="api-table"><thead><tr><th>Input</th><th>Default</th><th>Purpose</th></tr></thead><tbody><tr><td>label</td><td>Toggle</td><td>Accessible name. Use a specific name for each control.</td></tr><tr><td>checked</td><td>false</td><td>Checked state. Supports checkedChange for two-way binding.</td></tr><tr><td>disabled</td><td>false</td><td>Prevents changes and keyboard focus.</td></tr><tr><td>ngModel / formControl</td><td>—</td><td>Boolean value through ControlValueAccessor.</td></tr></tbody></table></div><p class="release-note">This component is available in repository source. The npm release may differ.</p></div>` })
export class SwitchSiteComponent {
  enabled = true;
  readonly example = `import { FormsModule } from '@angular/forms';\nimport { SwitchComponent } from 'libera-ui';\n// Add both to your standalone component imports.\n\n<lib-switch label="Focus mode" [(ngModel)]="enabled" />`;
}
