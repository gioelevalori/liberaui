import { Routes } from '@angular/router';
import { ButtonSiteComponent } from './site/buttonSite/buttonSite.component';
import { SelectSiteComponent } from './site/select-site/select-site.component';
import { TableSiteComponent } from './site/table-site/table-site.component';
import { HomeComponent } from './site/home/home.component';
import { InputTextSiteComponent } from './site/input-text-site/input-text-site.component';
import { InputNumberSiteComponent } from './site/input-number-site/input-number-site.component';

export const routes: Routes = [
  { path: 'button', component: ButtonSiteComponent },
  { path: 'select', component: SelectSiteComponent },
  { path: 'table', component: TableSiteComponent },
  { path: 'input-text', component: InputTextSiteComponent },
  { path: 'input-number', component: InputNumberSiteComponent },
  { path: '**', component: HomeComponent }
];
