import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwitchThemeComponent } from './../../projects/libera-ui/src/lib/components/switch-theme/switch-theme.component';

@Component({
  selector: 'lib-root',
  standalone: true,
  imports: [CommonModule, RouterModule, SwitchThemeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'libera-ui';
  skipToContent(event: Event) { event.preventDefault(); document.getElementById('main-content')?.focus(); }
  menuOpen = false;
  readonly navigation = [
    { path: '/button', label: 'Button' },
    { path: '/table', label: 'Table' },
    { path: '/select', label: 'Select' },
    { path: '/input-text', label: 'Text input' },
    { path: '/input-number', label: 'Number input' },
    { path: '/input-file', label: 'File input' },
    { path: '/input-password', label: 'Password input' },
    { path: '/input-textarea', label: 'Textarea' },
    { path: '/input-checkbox', label: 'Checkbox' },
    { path: '/switch-theme', label: 'Theme switch' },
    { path: '/animations', label: 'Animations' },
    { path: '/card', label: 'Card' }
  ];
}
