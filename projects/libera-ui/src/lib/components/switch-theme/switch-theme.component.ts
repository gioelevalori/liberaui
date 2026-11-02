import { IconComponent } from '../icon/icon.component';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-switch-theme',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SwitchThemeComponent {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  get isDarkMode() {
    return this.document.body.classList.contains('dark-theme');
  }
  set isDarkMode(value: boolean) {
    this.document.body.classList.toggle('dark-theme', value);
  }

  ngOnInit() {
    // Storage and media queries only exist in the browser; servers render the light theme.
    if (!this.isBrowser) return;
    let savedTheme: string | null = null;
    try {
      savedTheme = localStorage.getItem('theme');
    } catch {
      /* Storage may be disabled. */
    }
    this.isDarkMode = savedTheme
      ? savedTheme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.updateTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
  }

  private updateTheme() {
    this.document.body.classList.toggle('dark-theme', this.isDarkMode);
    try {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    } catch {
      /* Theme still works without persistence. */
    }
  }

  public switchColor(): string {
    return this.isDarkMode ? 'dark-light' : 'dark-theme';
  }
}
