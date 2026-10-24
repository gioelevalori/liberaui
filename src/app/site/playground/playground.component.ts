import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { ButtonComponent, ButtonVariant } from '../../../../projects/libera-ui/src/lib/components/button/button.component';

@Component({
  selector: 'lib-playground',
  standalone: true,
  imports: [FormsModule, CommonModule, CodeComponent, ButtonComponent],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css'
})
export class PlaygroundComponent {
  label = 'Create something';
  accent = '#176b3a';
  radius = 12;
  size = 'comfortable';
  disabled = false;
  loading = false;
  variant: ButtonVariant = 'solid';
  clicks = 0;
  readonly palettes = [
    { name: 'Forest', value: '#176b3a' },
    { name: 'Ocean', value: '#2454ce' },
    { name: 'Plum', value: '#823c9e' },
    { name: 'Clay', value: '#a33e27' },
    { name: 'Ink', value: '#25272c' }
  ];
  activate() { if (!this.disabled && !this.loading) this.clicks++; }
  get code(): string {
    const escaped = this.label.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
    return `<!-- Import ButtonComponent from 'libera-ui' in your component imports. -->\n<lib-button\n  variant="${this.variant}"\n  color="${this.accent}"\n  [disabled]="${this.disabled}"\n  [loading]="${this.loading}"\n  [radius]="${this.radius}"\n  size="${this.size}"\n>\n  ${escaped || 'Create something'}\n</lib-button>`;
  }
  reset() {
    this.label = 'Create something'; this.accent = '#176b3a'; this.radius = 12;
    this.size = 'comfortable'; this.disabled = false; this.loading = false; this.variant = 'solid'; this.clicks = 0;
  }
}
