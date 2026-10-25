import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
const paths: Record<string, string> = {
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',
  list: 'M4 6h16M4 12h16M4 18h16',
  calendar: 'M3 5h18v16H3zM7 3v4m10-4v4M3 10h18',
  table: 'M3 3h18v18H3zM3 9h18M9 3v18M3 15h18',
  type: 'M3 5h18M12 5v16M8 21h8',
  sun: 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42',
  moon: 'M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M18 6 6 18',
  copy: 'M9 9h11v11H9zM15 9V4H4v11h5',
  check: 'm5 12 4 4L19 6',
  upload: 'M12 16V3m-5 5 5-5 5 5M4 15v6h16v-6',
  eye: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  'eye-off':
    'm3 3 18 18M10 5a13 13 0 0 1 2 0c7 0 10 7 10 7a19 19 0 0 1-4 5M6 6a21 21 0 0 0-4 6s3 7 10 7a12 12 0 0 0 5-1M10 10a3 3 0 0 0 4 4',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  palette:
    'M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-4 2 2 0 0 1 1-4h3a3 3 0 0 0 3-3c0-4-4-7-9-7ZM7 8h.01M12 6h.01M17 8h.01M6 13h.01',
  users:
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M17 3a4 4 0 0 1 0 8m5 10v-2a4 4 0 0 0-3-4',
  lock: 'M5 10h14v11H5zM8 10V6a4 4 0 0 1 8 0v4',
  book: 'M12 5v16M3 3c4 0 6 0 9 2 3-2 5-2 9-2v16c-4 0-6 0-9 2-3-2-5-2-9-2Z',
  code: 'm8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18',
};
@Component({
  selector: 'lib-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  host: { '[style.width.px]': 'size', '[style.height.px]': 'size', 'aria-hidden': 'true' },
  styleUrl: './icon.component.css',
})
export class IconComponent {
  @Input() name = 'grid';
  @Input() size = 18;
  get path() {
    return paths[this.name] ?? paths['grid'];
  }
}
