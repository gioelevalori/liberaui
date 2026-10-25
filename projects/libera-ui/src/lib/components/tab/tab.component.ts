import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, TemplateRef, ViewChildren } from '@angular/core';
export interface TabItem { id:string; label:string; icon?:string; content?:string; template?:TemplateRef<unknown>; disabled?:boolean; }
let nextTabsId=0;
@Component({
 selector:'lib-tabs, lib-tab',standalone:true,imports:[CommonModule,IconComponent],
 template:`<div class="tabs-list" role="tablist" [attr.aria-label]="label" [attr.dir]="direction"><button #tabButton *ngFor="let item of items;let i=index" type="button" role="tab" [id]="uid+'-tab-'+i" [attr.aria-controls]="uid+'-panel-'+i" [attr.aria-selected]="activeId===item.id" [tabIndex]="activeId===item.id ? 0 : -1" [disabled]="!!item.disabled" (click)="select(item)" (keydown)="navigate($event,i)"><lib-icon *ngIf="item.icon" [name]="item.icon" [size]="16" />{{ item.label }}</button></div><section *ngFor="let item of items;let i=index" role="tabpanel" [id]="uid+'-panel-'+i" [attr.aria-labelledby]="uid+'-tab-'+i" [hidden]="activeId!==item.id" tabindex="0"><ng-container *ngIf="item.template; else plain" [ngTemplateOutlet]="item.template" /><ng-template #plain>{{ item.content }}</ng-template></section>`,
 styles:[`:host{display:block;min-width:0;color:var(--text-primary);font-family:var(--lib-font,'Inter Variable',sans-serif)}.tabs-list{display:flex;gap:4px;overflow-x:auto;padding:5px;border-radius:var(--lib-radius,12px);background:var(--surface-color);scrollbar-width:thin;scrollbar-color:var(--border-color) transparent;overscroll-behavior-x:contain}.tabs-list button{display:inline-flex;align-items:center;gap:8px;flex:0 0 auto;border:0;background:transparent;color:var(--text-secondary);border-radius:var(--lib-radius,8px);padding:10px 15px;min-height:40px;font:inherit;font-size:13px;cursor:pointer}.tabs-list button[aria-selected=true]{background:var(--background-color);color:var(--text-primary);box-shadow:0 2px 6px #0000000d}.tabs-list button:disabled{opacity:.45;cursor:not-allowed}button:focus-visible,section:focus-visible{outline:2px solid var(--text-primary);outline-offset:-3px}section{padding:20px 5px;font-size:14px;line-height:1.6;overflow-wrap:anywhere}section[hidden]{display:none}.tabs-list::-webkit-scrollbar{height:5px}.tabs-list::-webkit-scrollbar-track{background:transparent}.tabs-list::-webkit-scrollbar-thumb{background:var(--border-color);border-radius:8px}.tabs-list::-webkit-scrollbar-button{display:none;width:0;height:0}.tabs-list button{transition:background-color 160ms,color 160ms,box-shadow 160ms}section:not([hidden]){animation:lib-tab-reveal 180ms cubic-bezier(.16,1,.3,1)}@keyframes lib-tab-reveal{from{opacity:.65;transform:translateX(5px)}to{opacity:1;transform:translateX(0)}}@media(prefers-reduced-motion:reduce){section:not([hidden]){animation:none}.tabs-list button{transition:none}}@media(forced-colors:active){.tabs-list{scrollbar-color:auto}}`]
})
export class TabComponent implements OnChanges {
 @Input() items:TabItem[]=[];
 @Input() label='Sections';
 @Input() direction:'ltr'|'rtl'='ltr';
 @Input() activeId='';
 @Output() activeIdChange=new EventEmitter<string>();
 @ViewChildren('tabButton') buttons!:QueryList<ElementRef<HTMLButtonElement>>;
 readonly uid='lib-tabs-'+nextTabsId++;
 ngOnChanges(){if(!this.items.some(i=>i.id===this.activeId&&!i.disabled))this.activeId=this.items.find(i=>!i.disabled)?.id??'';}
 select(item:TabItem){if(item.disabled||this.activeId===item.id)return;this.activeId=item.id;this.activeIdChange.emit(item.id);}
 navigate(event:KeyboardEvent,index:number){
  const enabled=this.items.map((item,i)=>item.disabled?-1:i).filter(i=>i>=0);
  if(!enabled.length)return;
  let next:number|undefined;
  if(event.key==='Home')next=enabled[0];
  else if(event.key==='End')next=enabled[enabled.length-1];
  else if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
   const delta=(event.key==='ArrowRight'?1:-1)*(this.direction==='rtl'?-1:1);
   next=enabled[(enabled.indexOf(index)+delta+enabled.length)%enabled.length];
  }
  if(next===undefined)return;
  event.preventDefault();this.select(this.items[next]);this.buttons.get(next)?.nativeElement.focus();
 }
}
