import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { componentRegistry } from '../../component-registry';
import { ButtonComponent } from '../../../../projects/libera-ui/src/lib/components/button/button.component';
import { SwitchComponent } from '../../../../projects/libera-ui/src/lib/components/switch/switch.component';

@Component({ selector:'lib-components', standalone:true, imports:[CommonModule,FormsModule,RouterModule,ButtonComponent,SwitchComponent], templateUrl:'./components.component.html', styleUrl:'./components.component.css' })
export class ComponentsComponent {
  query = '';
  category = 'All';
  readonly categories = ['All','Actions','Forms','Data','Layout','Appearance','Motion'];
  readonly components = componentRegistry;
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
