import { IconComponent } from '../icon/icon.component';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-switch-theme',
  standalone: true, imports: [IconComponent],
  template: `<button type="button" class="theme-toggle" (click)="toggleTheme()" [attr.aria-label]="isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'" [attr.title]="isDarkMode ? 'Light theme' : 'Dark theme'"><lib-icon [name]="isDarkMode ? 'sun' : 'moon'" /></button>`,
  styleUrls: ['./switch-theme.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SwitchThemeComponent {
  get isDarkMode() { return document.body.classList.contains('dark-theme'); }
  set isDarkMode(value: boolean) { document.body.classList.toggle('dark-theme', value); }

  ngOnInit() {
    let savedTheme: string | null = null;
    try { savedTheme = localStorage.getItem('theme'); } catch { /* Storage may be disabled. */ }
    this.isDarkMode = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.updateTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
  }

  private updateTheme() {
    document.body.classList.toggle('dark-theme', this.isDarkMode);
    try { localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light'); } catch { /* Theme still works without persistence. */ }
  }

  public switchColor(): string {
    return this.isDarkMode ? 'dark-light' : 'dark-theme';
  }
}
