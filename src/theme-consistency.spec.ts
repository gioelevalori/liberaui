import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SwitchThemeComponent } from '../projects/libera-ui/src/lib/components/switch-theme/switch-theme.component';

@Component({standalone:true,imports:[SwitchThemeComponent],template:'<lib-switch-theme/><lib-switch-theme/>'})
class ThemeHost {}

describe('Shared theme controls', () => {
  it('keeps header and component previews synchronized', () => {
    const saved=localStorage.getItem('theme');
    const dark=document.body.classList.contains('dark-theme');
    try {
      localStorage.setItem('theme','light');
      const fixture=TestBed.createComponent(ThemeHost); fixture.detectChanges();
      const buttons: HTMLButtonElement[]=Array.from(fixture.nativeElement.querySelectorAll('button'));
      buttons[0].click(); fixture.detectChanges();
      expect(buttons.map(button=>button.textContent?.trim())).toEqual(['Light theme','Light theme']);
      buttons[1].click(); fixture.detectChanges();
      expect(buttons.map(button=>button.textContent?.trim())).toEqual(['Dark theme','Dark theme']);
      fixture.destroy();
    } finally {
      if(saved===null)localStorage.removeItem('theme');else localStorage.setItem('theme',saved);
      document.body.classList.toggle('dark-theme',dark);
    }
  });
});
