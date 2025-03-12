import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-switch-theme',
  standalone: true,
  imports: [],
  template: '<button (click)="toggleTheme()" class="custom-input">{{ isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode" }}</button>',
  styleUrl: './switch-theme.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SwitchThemeComponent {
  isDarkMode = false;

  ngOnInit() {
    // Controlla se l'utente ha già un tema salvato
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
      this.updateTheme();
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
  }

  private updateTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
