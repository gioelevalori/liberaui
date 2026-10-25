import { TabComponent } from '../../../../projects/libera-ui/src/lib/components/tab/tab.component';
import { AccordionComponent } from '../../../../projects/libera-ui/src/lib/components/accordion/accordion.component';
import { AlertComponent } from '../../../../projects/libera-ui/src/lib/components/alert/alert.component';
import { InputDateComponent } from '../../../../projects/libera-ui/src/lib/components/input-date/input-date.component';
import { InputTextComponent } from '../../../../projects/libera-ui/src/lib/components/input-text/input-text.component';
import { InputNumberComponent } from '../../../../projects/libera-ui/src/lib/components/input-number/input-number.component';
import { InputPasswordComponent } from '../../../../projects/libera-ui/src/lib/components/input-password/input-password.component';
import { InputTextareaComponent } from '../../../../projects/libera-ui/src/lib/components/input-textarea/input-textarea.component';
import { InputFileComponent } from '../../../../projects/libera-ui/src/lib/components/input-file/input-file.component';
import { InputCheckboxComponent } from '../../../../projects/libera-ui/src/lib/components/input-checkbox/input-checkbox.component';
import { SelectComponent } from '../../../../projects/libera-ui/src/lib/components/select/select.component';
import { CardComponent } from '../../../../projects/libera-ui/src/lib/components/card/card.component';
import { TableComponent } from '../../../../projects/libera-ui/src/lib/components/table/table.component';
import { SwitchThemeComponent } from '../../../../projects/libera-ui/src/lib/components/switch-theme/switch-theme.component';
import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { componentRegistry } from '../../component-registry';
import { ButtonComponent } from '../../../../projects/libera-ui/src/lib/components/button/button.component';
import { SwitchComponent } from '../../../../projects/libera-ui/src/lib/components/switch/switch.component';

@Component({ selector:'lib-components', standalone:true, imports:[CommonModule,FormsModule,RouterModule,ButtonComponent,SwitchComponent,InputTextComponent,InputNumberComponent,InputPasswordComponent,InputTextareaComponent,InputFileComponent,InputCheckboxComponent,SelectComponent,CardComponent,TableComponent,SwitchThemeComponent,TabComponent,AccordionComponent,AlertComponent,InputDateComponent], templateUrl:'./components.component.html', styleUrl:'./components.component.css' })
export class ComponentsComponent {
  query = '';
  category = 'All';
  readonly categories = ['All','Actions','Forms','Data','Layout','Appearance','Motion','Feedback'];
  readonly components = componentRegistry;
  readonly previewTabs=[{id:'design',label:'Design',content:'A place for every detail.'},{id:'code',label:'Code',content:'Ready for Angular.'}];
  readonly previewQuestions=[{id:'customize',title:'Can I customize it?',content:'Choose your colors, typography and spacing.'}];
  previewChecked = true;
  previewCount = 0;
  constructor(route: ActivatedRoute) {
    route.queryParamMap.pipe(takeUntilDestroyed(inject(DestroyRef))).subscribe(params => this.query = params.get('q') || '');
  }
  get filtered() {
    const query = this.query.trim().toLowerCase();
    return this.components.filter(item => (this.category === 'All' || item.category === this.category) && `${item.label} ${item.description} ${item.category}`.toLowerCase().includes(query));
  }
}
