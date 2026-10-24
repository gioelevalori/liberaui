import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SwitchThemeComponent } from './../../projects/libera-ui/src/lib/components/switch-theme/switch-theme.component';
import { componentRegistry } from './component-registry';

@Component({
  selector: 'lib-root', standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SwitchThemeComponent],
  templateUrl: './app.component.html', styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public router: Router) {}
  @ViewChild('siteSearch') siteSearch?: ElementRef<HTMLInputElement>;
  title = 'libera-ui';
  menuOpen = false;
  searchQuery = '';
  readonly navigation = componentRegistry;
  get showcase() { return ['/', '/components'].includes(this.router.url.split('?')[0]); }
  skipToContent(event: Event) { event.preventDefault(); document.getElementById('main-content')?.focus(); }
  search() { this.router.navigate(['/components'], {queryParams: this.searchQuery.trim() ? {q: this.searchQuery.trim()} : {}}); this.menuOpen = false; }
  @HostListener('document:keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (window.innerWidth > 1100) this.siteSearch?.nativeElement.focus();
      else this.router.navigate(['/components']);
    }
    if (event.key === 'Escape') this.menuOpen = false;
  }
}
