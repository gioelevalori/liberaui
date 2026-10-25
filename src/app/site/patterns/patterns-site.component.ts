import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TabComponent, TabItem } from '../../../../projects/libera-ui/src/lib/components/tab/tab.component';
import { AccordionComponent } from '../../../../projects/libera-ui/src/lib/components/accordion/accordion.component';
import { AlertComponent } from '../../../../projects/libera-ui/src/lib/components/alert/alert.component';
import { ButtonComponent } from '../../../../projects/libera-ui/src/lib/components/button/button.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
@Component({
 selector:'lib-patterns-site',standalone:true,
 imports:[CommonModule,FormsModule,TabComponent,AccordionComponent,AlertComponent,ButtonComponent,CodeComponent],
 template:`<div class="content-page">
 <h1>{{ title }}</h1><p>{{ description }}</p>
 <section class="pattern-surface lib-glass-panel" aria-label="Interactive example">
  <ng-container [ngSwitch]="kind">
   <lib-tabs *ngSwitchCase="'tabs'" [items]="tabs" [(activeId)]="activeTab" label="Workspace settings" />
   <lib-accordion *ngSwitchCase="'accordion'" [items]="questions" [(openIds)]="openQuestions" [multiple]="multiple" />
   <lib-alert *ngSwitchCase="'alert'" title="Your workspace is ready" [tone]="tone" dismissible [(visible)]="alertVisible">Your settings are saved in this local example. You're ready to start building.</lib-alert>
  </ng-container>
 </section>
 <div class="pattern-controls">
  <label *ngIf="kind==='accordion'"><input type="checkbox" [(ngModel)]="multiple"> Allow multiple sections</label>
  <label *ngIf="kind==='alert'">Tone <select [(ngModel)]="tone"><option value="info">Info</option><option value="success">Success</option><option value="warning">Warning</option><option value="danger">Danger</option></select></label>
  <lib-button *ngIf="kind==='alert' && !alertVisible" variant="outline" (click)="alertVisible=true">Show notification again</lib-button>
  <p *ngIf="kind==='tabs'" role="status">Selected: {{ activeTab }}</p>
 </div>
 <h2>Use it in Angular</h2><p>{{ usage }}</p><lib-code [code]="code" />
 <h2>Keyboard and behavior</h2><p>{{ behavior }}</p>
 <h2>Glass and themes</h2><p>These components inherit the shared colors, typography and theme tokens. Place them in a <code>lib-glass-panel</code> inside a Glass container, or use them in the Essential theme.</p>
 </div>`,
 styles:[`.pattern-surface{padding:28px;margin:28px 0;border:1px solid var(--border-color);border-radius:var(--lib-radius,16px);background:var(--lib-panel-background,var(--background-color));min-width:0}.pattern-controls{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.pattern-controls label{display:flex;gap:10px;align-items:center;font-size:13px}.pattern-controls select{padding:9px;border:1px solid var(--border-color);border-radius:6px;background:var(--background-color);color:var(--text-primary)}.pattern-controls p{font-size:12px;color:var(--text-secondary)}@media(max-width:480px){.pattern-surface{padding:18px}}`]
})
export class PatternsSiteComponent {
 readonly kind=inject(ActivatedRoute).snapshot.data['kind'] as 'tabs'|'accordion'|'alert';
 activeTab='overview';
 openQuestions:string[]=['style'];
 multiple=false;
 alertVisible=true;
 tone:'info'|'success'|'warning'|'danger'='success';
 readonly tabs:TabItem[]=[
  {id:'overview',icon:'grid',label:'Overview',content:'Everything in its place. Start with a shared visual language for your workspace.'},
  {id:'appearance',icon:'palette',label:'Appearance',content:'Choose your theme, accent and surface in Theme Studio, then export the result.'},
  {id:'team',icon:'users',label:'Team',content:'Give every collaborator a clear place to start.'},
  {id:'billing',icon:'lock',label:'Billing · coming later',content:'',disabled:true}
 ];
 readonly questions=[
  {id:'style',title:'Can I make it look like my brand?',content:'Yes. Set your accent, typography, radius and spacing in Theme Studio and download the CSS.'},
  {id:'license',title:'Can I use it in a commercial project?',content:'Yes. LiberaUI is MIT licensed. Preserve its copyright and license notice.'},
  {id:'glass',title:'Does Glass work in light and dark mode?',content:'Yes. The material follows the surrounding theme and respects reduced transparency preferences.'}
 ];
 get title(){return {tabs:'Tabs',accordion:'Accordion',alert:'Alert'}[this.kind];}
 get description(){return {tabs:'Organize a workspace into clear, keyboard-friendly sections.',accordion:'Reveal the details when people need them.',alert:'Give feedback that people can understand and act on.'}[this.kind];}
 get usage(){return {tabs:'Import TabComponent and provide items with unique IDs. Bind activeId to react to the selected section. Items may include a TemplateRef for richer panel content.',accordion:'Import AccordionComponent. Provide items with unique IDs and bind openIds to control the expanded sections.',alert:'Import AlertComponent. Choose a tone and optionally bind visible to show, dismiss and reopen a message.'}[this.kind];}
 get behavior(){return {tabs:'Use Left/Right arrows to switch enabled tabs, Home/End to jump to the first/last tab, and Tab to enter the panel. Disabled tabs are skipped. Multiple instances have separate IDs.',accordion:'Each heading is a native details summary. Enter or Space expands it. With multiple disabled, opening a section closes the previous one.',alert:'Info, success and warning use a polite status announcement. Danger uses an alert announcement. The optional dismiss button has an accessible label.'}[this.kind];}
 get code(){return {
 tabs:"import { TabComponent, TabItem } from 'libera-ui';\n// Add TabComponent to your standalone imports.\n// In your class:\nitems: TabItem[] = [\n  { id: 'overview', label: 'Overview', content: 'Your overview' },\n  { id: 'settings', label: 'Settings', content: 'Your settings' }\n];\nactive = 'overview';\n\n// In your template:\n<lib-tabs [items]=\"items\" [(activeId)]=\"active\" label=\"Workspace\" />",
 accordion:"import { AccordionComponent } from 'libera-ui';\n// Add AccordionComponent to your standalone imports.\n// In your class:\nitems = [{ id: 'details', title: 'A little more detail', content: 'Your content' }];\nopen: string[] = [];\n\n// In your template:\n<lib-accordion [items]=\"items\" [(openIds)]=\"open\" />",
 alert:"import { AlertComponent } from 'libera-ui';\n// Add AlertComponent to your standalone imports.\n// In your class:\nvisible = true;\n\n// In your template:\n<lib-alert title=\"Changes saved\" tone=\"success\" dismissible [(visible)]=\"visible\">\n  Your workspace is ready.\n</lib-alert>"
 }[this.kind];}
}
