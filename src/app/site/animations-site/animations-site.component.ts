import { Component } from '@angular/core';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';
import { InputTextComponent } from '../../../../projects/libera-ui/src/lib/components/input-text/input-text.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';

@Component({
  selector: 'lib-animation-site',
  standalone: true,
  imports: [InputTextComponent, AnimationsComponent, CodeComponent],
  templateUrl: './animations-site.component.html',
  styleUrl: './animations-site.component.css'
})
export class AnimationsSiteComponent {
  public codeImport = `import { AnimationsComponent } from 'libera-ui';`;

  public codeFadeInDown = `<lib-animations [animation]="'fadeInDown'">
    <lib-input-text placeholder="Nome"></lib-input-text>
    <lib-input-text [disabled]="true" placeholder="Cognome"></lib-input-text>
    </lib-animations>'`;

  public codeFadeInOut = `<lib-animations [animation]="'fadeInOut'">
    <lib-input-text placeholder="Nome"></lib-input-text>
    <lib-input-text [disabled]="true" placeholder="Cognome"></lib-input-text>
    </lib-animations>`;

  public codeSlideInOut = `<lib-animations [animation]="'slideInOut'">
    <lib-input-text placeholder="Nome"></lib-input-text>
    <lib-input-text [disabled]="true" placeholder="Cognome"></lib-input-text>
    </lib-animations>`;

  public codeScrolling = `<lib-animations [animation]="'slideInOut'" [animationScrolling]="true">
    <lib-input-text placeholder="Nome"></lib-input-text>
    <lib-input-text [disabled]="true" placeholder="Cognome"></lib-input-text>
    </lib-animations>`;
}
