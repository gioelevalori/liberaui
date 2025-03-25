import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';  // Componenti standalone

@NgModule({
  declarations: [
    // Includi qui il componente solo se è necessario (ma non è obbligatorio per i componenti standalone)
  ],
  imports: [
    CommonModule,
    ButtonComponent // Importazione di un componente standalone in un modulo
  ],
  exports: [ // Esportiamo ButtonComponent per renderlo disponibile ad altri moduli
    ButtonComponent
  ]
})
export class ButtonModule { }
