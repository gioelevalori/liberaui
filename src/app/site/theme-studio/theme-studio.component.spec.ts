import { accentForeground, createThemeCss, DEFAULT_THEME, normalizeTheme } from '../../../../projects/libera-ui/src/lib/theme';
import { ThemeStudioComponent } from './theme-studio.component';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('Theme Studio configuration', () => {
  it('rejects injected CSS and clamps untrusted numeric values', () => {
    const theme = normalizeTheme({accent:'red; background:url(evil)', radius:900, spacing:-2, font:'url(evil)'});
    expect(theme).toEqual({accent:DEFAULT_THEME.accent, radius:28, spacing:12, font:'inter', material:'solid'});
    expect(createThemeCss(theme)).not.toContain('evil');
    expect(normalizeTheme({radius:Infinity}).radius).toBe(12);
    expect(normalizeTheme({material:'injected'}).material).toBe('solid');
  });
  it('chooses readable foreground colors and exports shared tokens', () => {
    expect(accentForeground('#ffffff')).toBe('#000000');
    expect(accentForeground('#000000')).toBe('#ffffff');
    expect(createThemeCss({...DEFAULT_THEME, radius:20})).toContain('--lib-radius: 20px');
    expect(createThemeCss(DEFAULT_THEME)).toContain('body, body.dark-theme');
  });
  it('restores theme, sections and preview state from a shared URL', () => {
    const config = {version:1, theme:{accent:'#2454ce', radius:4, spacing:24, font:'serif', material:'glass'}, mode:'dark', viewport:'mobile', state:'long', form:false, settings:true, actions:false};
    TestBed.configureTestingModule({providers:[{provide:ActivatedRoute,useValue:{snapshot:{queryParamMap:convertToParamMap({studio:JSON.stringify(config)})}}}]});
    const studio = TestBed.runInInjectionContext(() => new ThemeStudioComponent());
    expect(studio.theme.radius).toBe(4);
    expect(studio.theme.material).toBe('glass');
    expect(studio.componentCode).toContain('lib-glass lib-glass-backdrop');
    expect(studio.componentCode).toContain('lib-glass-panel');
    expect(studio.css).toContain('lib-glass-panel');
    expect(studio.mode).toBe('dark');
    expect(studio.form).toBeFalse();
    expect(studio.componentCode).toContain('Product updates');
    expect(studio.componentCode).not.toContain('<form');
    expect(studio.componentCode).not.toContain('The right kind');
  });
  it('recovers from malformed links and resets the composition', () => {
    TestBed.configureTestingModule({providers:[{provide:ActivatedRoute,useValue:{snapshot:{queryParamMap:convertToParamMap({studio:'{broken'})}}}]});
    const studio = TestBed.runInInjectionContext(() => new ThemeStudioComponent());
    expect(studio.message).toContain('invalid');
    studio.form = false; studio.mode = 'dark'; studio.reset();
    expect(studio.form).toBeTrue(); expect(studio.mode).toBe('light');
    expect(studio.theme).toEqual({...DEFAULT_THEME,material:'glass'});
  });
});
