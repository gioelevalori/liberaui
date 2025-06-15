import { Component, ElementRef, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [@animation]="state"><ng-content></ng-content></div>
  `,
  styleUrls: ['./animations.component.css'],
  animations: [
    trigger('animation', [
      state('fadeInOut-in', style({ opacity: 1 })),
      state('fadeInOut-out', style({ opacity: 0 })),
      transition('fadeInOut-in <=> fadeInOut-out', animate('2000ms ease-in-out')),

      state('slideInOut-in', style({ transform: 'translateX(0)' })),
      state('slideInOut-out', style({ transform: 'translateX(-100%)' })),
      transition('slideInOut-in <=> slideInOut-out', animate('500ms ease-in-out')),

      state('fadeInDown-in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('fadeInDown-out', style({ opacity: 0, transform: 'translateY(-50px)' })),
      transition('fadeInDown-in <=> fadeInDown-out', animate('500ms ease-out')),
    ])
  ],
})
export class AnimationsComponent {
  @Input() animation: string = '';
  @Input() animationScrolling: boolean = false;
  state: string = '';
  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.state = `${this.animation}-out`; // Assicura che l'animazione sia impostata correttamente

    if (!this.animationScrolling) {
      this.activateAnimation();
    } else {
      this.observeElement();
    }
  }


  private activateAnimation() {
    setTimeout(() => {
      this.state = `${this.animation}-in`;
    });
  }

  private observeElement() {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.activateAnimation();
          observer.disconnect(); // Ferma l'osservazione dopo l'attivazione
        }
      },
      { threshold: 0.4 } // Attiva l'animazione quando il 30% dell'elemento è visibile
    );

    observer.observe(this.el.nativeElement);
  }
}