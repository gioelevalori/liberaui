import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../../projects/libera-ui/src/lib/components/button/button.component';
import { SwitchComponent } from '../../../../projects/libera-ui/src/lib/components/switch/switch.component';

@Component({
  selector: 'lib-home', standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ButtonComponent, SwitchComponent],
  templateUrl: './home.component.html', styleUrl: './home.component.css'
})
export class HomeComponent {
  filter = 'All examples';
  readonly filters = ['All examples', 'Forms', 'Workspace'];
  accent: string | null = null;
  readonly palettes = [{name:'Neutral',value:null},{name:'Forest',value:'#176b3a'},{name:'Ocean',value:'#2454ce'},{name:'Plum',value:'#823c9e'},{name:'Clay',value:'#a33e27'}];
  workspaceName = '';
  workspaceSize = '2–10 people';
  workspaceCreated = '';
  email = '';
  inviteMessage = '';
  selectedVariant = 'solid';
  copied = false;
  copyMessage = '';
  notifications = [
    {name:'Comments & mentions',description:'When a conversation needs you.',enabled:true},
    {name:'Product updates',description:'New releases, at your pace.',enabled:false},
    {name:'Security alerts',description:'Keep account activity in view.',enabled:true}
  ];
  tasks = [{label:'Define the component API',done:true},{label:'Check keyboard navigation',done:true},{label:'Test light and dark themes',done:false},{label:'Write the usage example',done:false}];
  members = [{name:'Alex Morgan',initials:'AM',email:'alex@example.com',role:'Owner',color:'amber'},{name:'Sam Rivera',initials:'SR',email:'sam@example.com',role:'Editor',color:'violet'},{name:'Jordan Lee',initials:'JL',email:'jordan@example.com',role:'Viewer',color:'green'}];
  get completed() { return this.tasks.filter(task => task.done).length; }
  visible(category: string) { return this.filter === 'All examples' || this.filter === category; }
  createWorkspace() { if (this.workspaceName.trim()) this.workspaceCreated = this.workspaceName.trim(); }
  invite() {
    if (!this.email.trim()) return;
    this.inviteMessage = `Invitation preview ready for ${this.email.trim()}. No email was sent.`;
    this.email = '';
  }
  async copyInstall() {
    try { await navigator.clipboard.writeText('npm install libera-ui'); this.copied = true; this.copyMessage = 'Install command copied.'; }
    catch { this.copyMessage = 'Unable to copy. Select the command to copy it manually.'; }
  }
}
