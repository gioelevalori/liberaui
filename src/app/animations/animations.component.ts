import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [@fadeInOut]="state"><ng-content></ng-content></div>
  `,
  styleUrl: './animations.component.css',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('in <=> out', animate('2000ms ease-in-out')),
    ])
  ],
})
export class AnimationsComponent {
  state: 'in' | 'out' = 'out';

  ngOnInit() {
    setTimeout(() => {
      this.state = 'in'; // Attiva l'animazione dopo il caricamento
    });
  }
}


