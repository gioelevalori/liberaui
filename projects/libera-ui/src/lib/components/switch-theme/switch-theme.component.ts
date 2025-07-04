import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-switch-theme',
  standalone: true,
  imports: [CommonModule],
  template: '<button (click)="toggleTheme()" class="custom-input" [ngClass]="switchColor()">{{ isDarkMode ? "🌙" : "🌞" }}</button>',
  styleUrls: ['./switch-theme.component.css', '../font.css'],
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

  public switchColor(): string {
    return this.isDarkMode ? 'dark-light' : 'dark-theme';
  }
}
