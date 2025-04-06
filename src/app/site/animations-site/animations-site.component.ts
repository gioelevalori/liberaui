import { Component } from '@angular/core';
import { AnimationsComponent } from '../../components/animations/animations.component';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { CodeComponent } from '../../components/code/code.component';
import { ComponentsComponent } from '../components/components.component';

@Component({
  selector: 'app-animation-site',
  standalone: true,
  imports: [InputTextComponent, AnimationsComponent, CodeComponent, ComponentsComponent],
  templateUrl: './animations-site.component.html',
  styleUrl: './animations-site.component.css'
})
export class AnimationsSiteComponent {
  public codeImport = `import { AnimationsComponent } from '../../components/animations/animations.component';`;

  public codeFadeInDown = `<app-animations [animation]="'fadeInDown'">
    <app-input-text placeholder="Nome"></app-input-text>
    <app-input-text [disabled]="true" placeholder="Cognome"></app-input-text>
    </app-animations>'`;

  public codeFadeInOut = `<app-animations [animation]="'fadeInOut'">
    <app-input-text placeholder="Nome"></app-input-text>
    <app-input-text [disabled]="true" placeholder="Cognome"></app-input-text>
    </app-animations>`;

  public codeSlideInOut = `<app-animations [animation]="'slideInOut'">
    <app-input-text placeholder="Nome"></app-input-text>
    <app-input-text [disabled]="true" placeholder="Cognome"></app-input-text>
    </app-animations>`;

    public codeScrolling = `<app-animations [animation]="'slideInOut'" [animationScrolling]="true">
    <app-input-text placeholder="Nome"></app-input-text>
    <app-input-text [disabled]="true" placeholder="Cognome"></app-input-text>
    </app-animations>`;
}
