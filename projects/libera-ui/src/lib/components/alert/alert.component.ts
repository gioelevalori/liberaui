import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
 selector:'lib-alert',standalone:true,imports:[CommonModule],
 template:`<div *ngIf="visible" class="alert" [attr.data-tone]="tone" [attr.role]="tone==='danger'?'alert':'status'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path *ngIf="tone==='success';else info" d="m8 12 3 3 5-6"/><ng-template #info><path d="M12 7v6m0 3v1"/></ng-template></svg><div><strong *ngIf="title">{{ title }}</strong><div class="message"><ng-content /></div></div><button *ngIf="dismissible" type="button" [attr.aria-label]="dismissLabel" (click)="dismiss()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div>`,
 styles:[`:host{display:block;font-family:var(--lib-font,'Inter Variable',sans-serif)}.alert{animation:lib-alert-reveal 240ms cubic-bezier(.16,1,.3,1);display:flex;align-items:start;gap:12px;padding:18px;border:1px solid var(--border-color);border-radius:var(--lib-radius,12px);color:var(--text-primary);background:var(--lib-panel-background,var(--surface-color));font-size:13px;line-height:1.6}.alert>svg{width:20px;height:20px;flex:0 0 20px;margin-top:1px}.alert>div{flex:1;min-width:0;overflow-wrap:anywhere}.alert[data-tone=success]>svg{color:var(--success-color)}.alert[data-tone=warning]>svg{color:var(--warning-color)}.alert[data-tone=danger]>svg{color:var(--danger-color)}strong{font-weight:600;display:block;margin-bottom:3px}.message{color:var(--text-secondary)}button{display:grid;place-items:center;min-width:32px;min-height:32px;margin:-6px -6px 0 0;border:0;border-radius:5px;background:transparent;color:inherit;cursor:pointer}button:hover{background:var(--surface-color)}button:active{transform:scale(.94)}button{transition:background-color 120ms,transform 120ms}button svg{width:16px;height:16px}button:focus-visible{outline:2px solid var(--text-primary);outline-offset:2px}@keyframes lib-alert-reveal{from{opacity:.5;transform:translateY(-6px) scale(.99)}to{opacity:1;transform:translateY(0) scale(1)}}@media(prefers-reduced-motion:reduce){.alert{animation:none}button{transition:none}}`]
})
export class AlertComponent {
 @Input() title='';
 @Input() tone:'info'|'success'|'warning'|'danger'='info';
 @Input({transform:booleanAttribute}) dismissible=false;
 @Input() dismissLabel='Dismiss notification';
 @Input() visible=true;
 @Output() visibleChange=new EventEmitter<boolean>();
 @Output() dismissed=new EventEmitter<void>();
 dismiss(){this.visible=false;this.visibleChange.emit(false);this.dismissed.emit();}
}
