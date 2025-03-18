import { Component } from '@angular/core';
import { AnimationsComponent } from '../../components/animations/animations.component';
import { InputTextComponent } from '../../components/input-text/input-text.component';

@Component({
  selector: 'app-animation-site',
  standalone: true,
  imports: [InputTextComponent, AnimationsComponent],
  templateUrl: './animations-site.component.html',
  styleUrl: './animations-site.component.css'
})
export class AnimationsSiteComponent {

}
