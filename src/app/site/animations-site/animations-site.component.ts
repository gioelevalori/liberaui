import { Component } from '@angular/core';
import { AnimationsComponent } from '../../components/animations/animations.component';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { CodeComponent } from '../../components/code/code.component';

@Component({
  selector: 'app-animation-site',
  standalone: true,
  imports: [InputTextComponent, AnimationsComponent, CodeComponent],
  templateUrl: './animations-site.component.html',
  styleUrl: './animations-site.component.css'
})
export class AnimationsSiteComponent {
  public codeImport = `import { AnimationsComponent } from '../../components/animations/animations.component';`;
}
