import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'forms',loadComponent:()=>import('./site/forms-lab/forms-lab.component').then(m=>m.FormsLabComponent),title:'Forms | LiberaUI'},
  ...(['tabs','accordion','alert'] as const).map(kind => ({path:kind,loadComponent:()=>import('./site/patterns/patterns-site.component').then(m=>m.PatternsSiteComponent),data:{kind}})),
  { path: 'switch', loadComponent: () => import('./site/switch-site/switch-site.component').then(m => m.SwitchSiteComponent) },
  { path: 'playground', loadComponent: () => import('./site/playground/playground.component').then(m => m.PlaygroundComponent), title: 'Playground | LiberaUI' },
  { path: 'components', loadComponent: () => import('./site/components/components.component').then(m => m.ComponentsComponent) },
  { path: 'button', loadComponent: () => import('./site/button-site/button-site.component').then(m => m.ButtonSiteComponent) },
  { path: 'select', loadComponent: () => import('./site/select-site/select-site.component').then(m => m.SelectSiteComponent) },
  { path: 'table', loadComponent: () => import('./site/table-site/table-site.component').then(m => m.TableSiteComponent) },
  { path: 'input-text', loadComponent: () => import('./site/input-text-site/input-text-site.component').then(m => m.InputTextSiteComponent) },
  { path: 'input-number', loadComponent: () => import('./site/input-number-site/input-number-site.component').then(m => m.InputNumberSiteComponent) },
  { path: 'input-file', loadComponent: () => import('./site/input-file-site/input-file-site.component').then(m => m.InputFileSiteComponent) },
  { path: 'input-password', loadComponent: () => import('./site/input-password-site/input-password-site.component').then(m => m.InputPasswordSiteComponent) },
  { path: 'input-date', loadComponent: () => import('./site/input-date-site/input-date-site.component').then(m => m.InputDateSiteComponent) },
  { path: 'input-textarea', loadComponent: () => import('./site/input-textarea-site/input-textarea-site.component').then(m => m.InputTextareaSiteComponent) },
  { path: 'input-checkbox', loadComponent: () => import('./site/input-checkbox-site/input-checkbox-site.component').then(m => m.InputCheckboxSiteComponent) },
  { path: 'switch-theme', loadComponent: () => import('./site/switch-theme-site/switch-theme-site.component').then(m => m.SwitchThemeSiteComponent) },
  { path: 'navigation-bar', loadComponent: () => import('./site/navigation-bar-site/navigation-bar-site.component').then(m => m.NavigationBarSiteComponent) },
  { path: 'side-navigation', loadComponent: () => import('./site/side-navigation-site/side-navigation-site.component').then(m => m.SideNavigationSiteComponent) },
  { path: 'animations', loadComponent: () => import('./site/animations-site/animations-site.component').then(m => m.AnimationsSiteComponent) },
  { path: 'fixed-side-bar', loadComponent: () => import('./site/fixed-side-bar-site/fixed-side-bar-site.component').then(m => m.FixedSideBarSiteComponent) },
  { path: 'installation', loadComponent: () => import('./site/installation/installation.component').then(m => m.InstallationComponent) },
  { path: 'card', loadComponent: () => import('./site/card-site/card-site.component').then(m => m.CardSiteComponent) },
  { path: 'banner', loadComponent: () => import('./site/banner-site/banner-site.component').then(m => m.BannerSiteComponent) },
  { path: '**', loadComponent: () => import('./site/home/home.component').then(m => m.HomeComponent), title: 'LiberaUI | Angular components' }
];


for (const route of routes) {
  route.title ??= (route.path || 'Overview').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + ' | LiberaUI';
}
