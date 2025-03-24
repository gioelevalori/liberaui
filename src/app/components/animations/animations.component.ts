import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [@animation]="state"><ng-content></ng-content></div>
  `,
  styleUrl: './animations.component.css',
  animations: [
    trigger('animation', [
      state('fadeInOut-in', style({ opacity: 3 })),
      state('fadeInOut-out', style({ opacity: 0 })),
      transition('fadeInOut-in <=> fadeInOut-out', animate('2000ms ease-in-out')),

      state('slideInOut-in', style({ transform: 'translateX(0)' })),
      state('slideInOut-out', style({ transform: 'translateX(-100%)' })),
      transition('slideInOut-in <=> slideInOut-out', animate('500ms ease-in-out')),

      state('fadeInDown-in', style({ opacity: 10, transform: 'translateY(0)' })),
      state('fadeInDown-out', style({ opacity: 0, transform: 'translateY(-50px)' })),
      transition('fadeInDown-in <=> fadeInDown-out', animate('500ms ease-out')),
    ])
  ],
})
export class AnimationsComponent {
  @Input() animation: string = '';
  state: string = this.animation + '-out';

  ngOnInit() {
    this.state = `${this.animation}-out`; // Imposta lo stato iniziale

    setTimeout(() => {
      this.state = `${this.animation}-in`; // Attiva l'animazione dopo il caricamento
    });
  }
}


