import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  inject,
  Injector,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { LIBERA_UI_TEXT } from '../../text';

let nextSideNavigationId = 0;

@Component({
  selector: 'lib-side-navigation',
  standalone: true,
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SideNavigationComponent {
  protected readonly text = inject(LIBERA_UI_TEXT);
  @ViewChild('closeButton') closeButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('trigger') trigger!: ElementRef<HTMLButtonElement>;
  readonly panelId = 'lib-side-navigation-' + nextSideNavigationId++;
  private readonly injector = inject(Injector);
  isOpen = false;
  fullWidth = false;
  openNav() {
    this.isOpen = true;
    this.focusAfterRender(() => this.closeButton);
  }
  closeNav() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.focusAfterRender(() => this.trigger);
  }
  @HostListener('document:keydown.escape') onEscape() {
    this.closeNav();
  }
  /** Hidden panels cannot take focus, so wait until the open state is rendered. */
  private focusAfterRender(target: () => ElementRef<HTMLElement>) {
    afterNextRender(() => target().nativeElement.focus(), { injector: this.injector });
  }
}
