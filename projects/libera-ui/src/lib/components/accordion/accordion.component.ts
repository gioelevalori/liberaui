import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
export interface AccordionItem { id:string; title:string; content:string; disabled?:boolean; }
@Component({
 selector:'lib-accordion',standalone:true,imports:[CommonModule],
 template:`<details *ngFor="let item of items" [open]="openIds.includes(item.id)"><summary [attr.aria-disabled]="item.disabled ? true : null" [attr.tabindex]="item.disabled ? -1 : 0" (click)="toggle($event,item)"><span>{{ item.title }}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div class="answer">{{ item.content }}</div></details>`,
 styles:[`:host{display:block;color:var(--text-primary);font-family:var(--lib-font,'Inter Variable',sans-serif)}details{border-bottom:1px solid var(--border-color)}summary{display:flex;align-items:center;justify-content:space-between;gap:20px;list-style:none;cursor:pointer;min-height:52px;padding:16px 0;font-size:14px;font-weight:500}summary::-webkit-details-marker{display:none}summary[aria-disabled=true]{opacity:.45;cursor:not-allowed}summary:focus-visible{outline:2px solid var(--text-primary);outline-offset:3px}svg{width:18px;height:18px;flex:0 0 18px;transition:transform .18s}details[open] svg{transform:rotate(180deg)}.answer{padding:0 28px 20px 0;color:var(--text-secondary);font-size:13px;line-height:1.7;overflow-wrap:anywhere}details[open] .answer{animation:lib-answer-reveal 180ms cubic-bezier(.16,1,.3,1)}@keyframes lib-answer-reveal{from{opacity:.6;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}@media(prefers-reduced-motion:reduce){svg{transition:none}.answer{animation:none!important}}`]
})
export class AccordionComponent {
 @Input() items:AccordionItem[]=[];
 @Input({transform:booleanAttribute}) multiple=false;
 @Input() openIds:string[]=[];
 @Output() openIdsChange=new EventEmitter<string[]>();
 toggle(event:Event,item:AccordionItem){
  event.preventDefault();if(item.disabled)return;
  this.openIds=this.openIds.includes(item.id)?this.openIds.filter(id=>id!==item.id):this.multiple?[...this.openIds,item.id]:[item.id];
  this.openIdsChange.emit([...this.openIds]);
 }
}
