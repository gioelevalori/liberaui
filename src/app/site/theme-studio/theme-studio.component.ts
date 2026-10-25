import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../../../projects/libera-ui/src/lib/components/button/button.component';
import { SwitchComponent } from '../../../../projects/libera-ui/src/lib/components/switch/switch.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { createThemeCss, DEFAULT_THEME, normalizeTheme, ThemeConfig, themeTokens } from '../../../../projects/libera-ui/src/lib/theme';

@Component({
  selector: 'lib-theme-studio', standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, SwitchComponent, CodeComponent],
  templateUrl: './theme-studio.component.html', styleUrl: './theme-studio.component.css'
})
export class ThemeStudioComponent {
  theme: ThemeConfig = {...DEFAULT_THEME};
  mode = 'light';
  viewport = 'full';
  state = 'ready';
  form = true;
  settings = true;
  actions = true;
  notifications = true;
  message = '';
  submitted = false;
  shareUrl = '';
  readonly palettes = [
    {name:'Forest', value:'#176b3a'}, {name:'Ocean', value:'#2454ce'},
    {name:'Plum', value:'#823c9e'}, {name:'Clay', value:'#a33e27'}, {name:'Ink', value:'#25272c'}
  ];
  constructor() {
    const raw = inject(ActivatedRoute).snapshot.queryParamMap.get('studio');
    if (!raw) return;
    try {
      if (raw.length > 1600) throw new Error();
      const config = JSON.parse(raw);
      if (config.version !== 1) throw new Error();
      this.theme = normalizeTheme(config.theme);
      if (['light','dark'].includes(config.mode)) this.mode = config.mode;
      if (['full','mobile'].includes(config.viewport)) this.viewport = config.viewport;
      if (['ready','loading','disabled','error','long'].includes(config.state)) this.state = config.state;
      for (const key of ['form','settings','actions'] as const) if (typeof config[key] === 'boolean') this[key] = config[key];
    } catch { this.message = 'This shared configuration is invalid. The default theme has been loaded.'; }
  }
  get tokens() { return themeTokens(this.theme); }
  get css() { return createThemeCss(this.theme); }
  get unavailable() { return this.state === 'disabled' || this.state === 'loading'; }
  get title() { return this.state === 'long' ? 'A workspace for every idea, every collaborator, and everything you want to build next' : 'A space for your next idea.'; }
  change() { this.shareUrl = ''; this.message = ''; this.submitted = false; }
  reset() {
    this.theme = {...DEFAULT_THEME}; this.mode = 'light'; this.viewport = 'full'; this.state = 'ready';
    this.form = this.settings = this.actions = this.notifications = true; this.change();
  }
  submit() { if (!this.unavailable && this.state !== 'error') this.submitted = true; }
  async share() {
    const config = {version:1, theme:normalizeTheme(this.theme), mode:this.mode, viewport:this.viewport,
      state:this.state, form:this.form, settings:this.settings, actions:this.actions};
    this.shareUrl = location.href.split('#')[0] + '#/playground?studio=' + encodeURIComponent(JSON.stringify(config));
    try {
      await navigator.clipboard.writeText(this.shareUrl);
      this.message = 'Configuration link copied. Anyone with the link can open this preview.';
    } catch { this.message = 'Copy the configuration link below to share this preview.'; }
  }
  download(kind: 'css' | 'component') {
    const blob = new Blob([kind === 'css' ? this.css : this.componentCode], {type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = kind === 'css' ? 'liberaui-theme.css' : 'workspace.component.ts';
    anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    this.message = kind === 'css' ? 'Theme CSS downloaded. Import it after libera-ui/theme.css.' : 'Angular component downloaded. Import both theme stylesheets before using it.';
  }
  get componentCode() {
    const radius = normalizeTheme(this.theme).radius;
    const size = this.theme.spacing < 20 ? 'compact' : 'comfortable';
    const form = this.form ? `
    <section class="block">
      <h2>A space for your next idea.</h2>
      <p>Create a workspace and bring the details together.</p>
      <form (ngSubmit)="created = true">
        <label for="workspace-name">Workspace name</label>
        <input id="workspace-name" name="workspace" [(ngModel)]="name" required placeholder="Design studio">
        <lib-button type="submit" [radius]="${radius}" size="${size}">Create workspace</lib-button>
      </form>
      <p role="status">{{ created ? 'Workspace preview created: ' + name : 'Local example. Nothing is sent to a server.' }}</p>
    </section>` : '';
    const settings = this.settings ? `
    <section class="block">
      <h2>A little less noise.</h2>
      <div class="row"><span>Product updates</span><lib-switch label="Product updates" [(ngModel)]="notifications" /></div>
      <p>{{ notifications ? 'Updates enabled' : 'Updates paused' }}</p>
    </section>` : '';
    const actions = this.actions ? `
    <section class="block">
      <h2>The right kind of emphasis.</h2>
      <div class="buttons"><lib-button [radius]="${radius}" size="${size}" (click)="count = count + 1">Continue</lib-button>
      <lib-button variant="outline" [radius]="${radius}" size="${size}" (click)="count = 0">Reset</lib-button></div>
      <p role="status">Continue activated {{ count }} times.</p>
    </section>` : '';
    return `// Install libera-ui. In global CSS import libera-ui/theme.css, then liberaui-theme.css.
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, SwitchComponent } from 'libera-ui';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [FormsModule, ButtonComponent, SwitchComponent],
  template: \`${form}${settings}${actions}
  \`,
  styles: [\`
    :host { display:grid; gap:var(--lib-spacing,20px); font-family:var(--lib-font,'Inter Variable',sans-serif); }
    .block { min-width:0; padding:var(--lib-spacing,20px); border:1px solid var(--border-color); border-radius:var(--lib-radius,12px); background:var(--background-color); color:var(--text-primary); overflow-wrap:anywhere; }
    h2 { margin:0 0 12px; font-size:22px; } p { color:var(--text-secondary); }
    form { display:grid; gap:12px; } input { width:100%; box-sizing:border-box; min-height:40px; padding:10px; border:1px solid var(--border-color); border-radius:var(--lib-radius,12px); background:var(--surface-color); color:var(--text-primary); font:inherit; }
    .row,.buttons { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
  \`]
})
export class WorkspaceComponent {
  name = '';
  created = false;
  notifications = true;
  count = 0;
}
`;
  }
}
