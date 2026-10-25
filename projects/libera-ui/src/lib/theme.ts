export interface ThemeConfig {
  accent: string;
  radius: number;
  spacing: number;
  font: 'inter' | 'system' | 'serif';
}
export const DEFAULT_THEME: ThemeConfig = { accent: '#176b3a', radius: 12, spacing: 20, font: 'inter' };
export const THEME_FONTS = {
  inter: "'Inter Variable', Inter, sans-serif",
  system: "system-ui, sans-serif",
  serif: "Georgia, serif"
};
export function normalizeTheme(value: unknown): ThemeConfig {
  const v = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const number = (key: string, fallback: number, min: number, max: number) =>
    typeof v[key] === 'number' && Number.isFinite(v[key]) ? Math.round(Math.min(max, Math.max(min, v[key] as number))) : fallback;
  return {
    accent: typeof v['accent'] === 'string' && /^#[0-9a-f]{6}$/i.test(v['accent']) ? v['accent'] : DEFAULT_THEME.accent,
    radius: number('radius', 12, 0, 28),
    spacing: number('spacing', 20, 12, 32),
    font: ['inter', 'system', 'serif'].includes(v['font'] as string) ? v['font'] as ThemeConfig['font'] : 'inter'
  };
}
export function accentForeground(accent: string): string {
  const rgb = normalizeTheme({accent}).accent.slice(1).match(/../g)!.map(v => {
    const n = parseInt(v, 16) / 255;
    return n <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4);
  });
  return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2] > .179 ? '#000000' : '#ffffff';
}
export function themeTokens(value: ThemeConfig): Record<string, string> {
  const t = normalizeTheme(value);
  return { '--lib-accent': t.accent, '--lib-accent-foreground': accentForeground(t.accent),
    '--lib-radius': t.radius + 'px', '--lib-spacing': t.spacing + 'px', '--lib-font': THEME_FONTS[t.font] };
}
export function createThemeCss(value: ThemeConfig): string {
  const declarations = Object.entries(themeTokens(value)).map(([key, val]) => '  ' + key + ': ' + val + ';').join('\n');
  return "/* Import after libera-ui/theme.css. Applies to light and dark mode. */\nbody, body.dark-theme {\n" + declarations + "\n  font-family: var(--lib-font);\n}\n";
}
