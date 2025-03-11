import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { InputDateComponent } from './input-date/input-date.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonComponent, InputTextComponent, InputNumberComponent, 
    InputTextareaComponent, InputPasswordComponent, InputDateComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-library';
}
