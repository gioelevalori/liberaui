import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BadgeComponent,
  ButtonComponent,
  ComboboxComponent,
  DataTableCellDirective,
  DataTableColumn,
  DataTableComponent,
  DialogComponent,
  MultiSelectComponent,
  SliderComponent,
  SwitchComponent,
  TagComponent,
  ToastOutletComponent,
  ToastService,
  TooltipComponent,
} from 'libera-ui';

interface Member {
  id: number;
  name: string;
  team: string;
  reviews: number;
}

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    BadgeComponent,
    ButtonComponent,
    ComboboxComponent,
    DataTableCellDirective,
    DataTableComponent,
    DialogComponent,
    MultiSelectComponent,
    SliderComponent,
    SwitchComponent,
    TagComponent,
    ToastOutletComponent,
    TooltipComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly toasts = inject(ToastService);
  dark = false;
  dialogOpen = false;
  country: string | number | null = 'it';
  teams: (string | number)[] | null = ['design'];
  radius: number | null = 12;

  readonly countries = [
    { value: 'it', label: 'Italy' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'es', label: 'Spain' },
    { value: 'jp', label: 'Japan' },
    { value: 'us', label: 'United States' },
  ];
  readonly teamOptions = ['Design', 'Engineering', 'Product', 'Research'].map((label) => ({
    value: label.toLowerCase(),
    label,
  }));
  readonly columns: DataTableColumn<Member>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'team', label: 'Team', sortable: true },
    { key: 'reviews', label: 'Reviews', sortable: true, align: 'end' },
  ];
  readonly members: Member[] = [
    { id: 1, name: 'Chiara Ferri', team: 'Design', reviews: 128 },
    { id: 2, name: 'Andrea Costa', team: 'Engineering', reviews: 87 },
    { id: 3, name: 'Elena Ricci', team: 'Product', reviews: 64 },
    { id: 4, name: 'Davide Marino', team: 'Engineering', reviews: 211 },
  ];

  toggleTheme(dark: boolean) {
    this.dark = dark;
    document.body.classList.toggle('dark-theme', dark);
  }
  save() {
    this.toasts.show({ title: 'Saved', message: 'Your settings are live.', tone: 'success' });
  }
}
