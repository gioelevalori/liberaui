import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  TabComponent,
  TabItem,
} from '../../../../projects/libera-ui/src/lib/components/tab/tab.component';
import { AccordionComponent } from '../../../../projects/libera-ui/src/lib/components/accordion/accordion.component';
import { AlertComponent } from '../../../../projects/libera-ui/src/lib/components/alert/alert.component';
import { ButtonComponent } from '../../../../projects/libera-ui/src/lib/components/button/button.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { DialogComponent } from '../../../../projects/libera-ui/src/lib/components/dialog/dialog.component';
import {
  ToastService,
  ToastTone,
} from '../../../../projects/libera-ui/src/lib/components/toast/toast.service';
import { TooltipComponent } from '../../../../projects/libera-ui/src/lib/components/tooltip/tooltip.component';
import {
  MenuComponent,
  MenuItem,
} from '../../../../projects/libera-ui/src/lib/components/menu/menu.component';
import {
  RadioGroupComponent,
  RadioOption,
} from '../../../../projects/libera-ui/src/lib/components/radio-group/radio-group.component';
import {
  ComboboxComponent,
  ComboboxOption,
} from '../../../../projects/libera-ui/src/lib/components/combobox/combobox.component';
import {
  DataTableCellDirective,
  DataTableColumn,
  DataTableRowDetailDirective,
  DataTableComponent,
  DataTableSort,
} from '../../../../projects/libera-ui/src/lib/components/data-table/data-table.component';
import { BadgeComponent } from '../../../../projects/libera-ui/src/lib/components/badge/badge.component';
import { TagComponent } from '../../../../projects/libera-ui/src/lib/components/tag/tag.component';
import { SkeletonComponent } from '../../../../projects/libera-ui/src/lib/components/skeleton/skeleton.component';
import {
  ProgressBarComponent,
  SpinnerComponent,
} from '../../../../projects/libera-ui/src/lib/components/progress/progress.component';
import { AvatarComponent } from '../../../../projects/libera-ui/src/lib/components/avatar/avatar.component';
import { SliderComponent } from '../../../../projects/libera-ui/src/lib/components/slider/slider.component';
import { BreadcrumbComponent } from '../../../../projects/libera-ui/src/lib/components/breadcrumb/breadcrumb.component';
import { DrawerComponent } from '../../../../projects/libera-ui/src/lib/components/drawer/drawer.component';
import { PopoverComponent } from '../../../../projects/libera-ui/src/lib/components/popover/popover.component';
import { MultiSelectComponent } from '../../../../projects/libera-ui/src/lib/components/multi-select/multi-select.component';
type PatternKind =
  | 'tabs'
  | 'accordion'
  | 'alert'
  | 'dialog'
  | 'toast'
  | 'tooltip'
  | 'menu'
  | 'radio-group'
  | 'combobox'
  | 'data-table'
  | 'badge'
  | 'tag'
  | 'skeleton'
  | 'progress'
  | 'avatar'
  | 'slider'
  | 'breadcrumb'
  | 'drawer'
  | 'popover'
  | 'multi-select';
interface Member {
  id: number;
  name: string;
  role: string;
  status: string;
  joined: number;
  reviews: number;
}
@Component({
  selector: 'lib-patterns-site',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabComponent,
    AccordionComponent,
    AlertComponent,
    ButtonComponent,
    CodeComponent,
    DialogComponent,
    TooltipComponent,
    MenuComponent,
    RadioGroupComponent,
    ComboboxComponent,
    DataTableComponent,
    DataTableCellDirective,
    DataTableRowDetailDirective,
    BadgeComponent,
    TagComponent,
    SkeletonComponent,
    ProgressBarComponent,
    SpinnerComponent,
    AvatarComponent,
    SliderComponent,
    BreadcrumbComponent,
    DrawerComponent,
    PopoverComponent,
    MultiSelectComponent,
  ],
  templateUrl: './patterns-site.component.html',
  styleUrl: './patterns-site.component.css',
})
export class PatternsSiteComponent {
  readonly kind = inject(ActivatedRoute).snapshot.data['kind'] as PatternKind;
  private readonly toasts = inject(ToastService);
  dialogOpen = false;
  dialogResult = '';
  dismissible = true;
  toastTone: ToastTone = 'success';
  lastAction = '';
  plan: string | number | null = 'team';
  country: string | number | null = null;
  readonly menuItems: MenuItem[] = [
    { id: 'rename', label: 'Rename', icon: 'type' },
    { id: 'duplicate', label: 'Duplicate', icon: 'copy' },
    { id: 'share', label: 'Share · coming later', icon: 'users', disabled: true },
    { id: 'delete', label: 'Delete', icon: 'close', danger: true },
  ];
  readonly plans: RadioOption[] = [
    { value: 'solo', label: 'Solo', description: 'One workspace for personal projects.' },
    { value: 'team', label: 'Team', description: 'Shared themes and reviews for up to 20 people.' },
    { value: 'enterprise', label: 'Enterprise · contact us', disabled: true },
  ];
  readonly countries: ComboboxOption[] = [
    'Argentina',
    'Australia',
    'Austria',
    'Belgium',
    'Brazil',
    'Canada',
    'Denmark',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Ireland',
    'Italy',
    'Japan',
    'Mexico',
    'Netherlands',
    'New Zealand',
    'Norway',
    'Portugal',
    'Spain',
    'Sweden',
    'Switzerland',
    'United Kingdom',
    'United States',
  ].map((label) => ({ value: label.toLowerCase().replace(/ /g, '-'), label }));
  removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
  }
  showToast() {
    const copy = {
      info: ['Sync scheduled', 'Your theme will sync in a moment.'],
      success: ['Theme exported', 'The CSS file is ready to use.'],
      warning: ['Storage almost full', 'Remove unused themes to free space.'],
      danger: ['Export failed', 'Check your connection and try again.'],
    }[this.toastTone];
    this.toasts.show({ title: copy[0], message: copy[1], tone: this.toastTone });
  }
  readonly members: Member[] = [
    { id: 1, name: 'Chiara Ferri', role: 'Design', status: 'Active', joined: 2019, reviews: 128 },
    {
      id: 2,
      name: 'Andrea Costa',
      role: 'Engineering',
      status: 'Active',
      joined: 2021,
      reviews: 87,
    },
    { id: 3, name: 'Bruno Galli', role: 'Design', status: 'Invited', joined: 2026, reviews: 0 },
    {
      id: 4,
      name: 'Davide Marino',
      role: 'Engineering',
      status: 'Active',
      joined: 2018,
      reviews: 211,
    },
    { id: 5, name: 'Elena Ricci', role: 'Product', status: 'Away', joined: 2020, reviews: 64 },
    {
      id: 6,
      name: 'Federica Bruno',
      role: 'Engineering',
      status: 'Active',
      joined: 2023,
      reviews: 45,
    },
    {
      id: 7,
      name: 'Giorgio Lombardi',
      role: 'Product',
      status: 'Active',
      joined: 2022,
      reviews: 39,
    },
    { id: 8, name: 'Ilaria Conti', role: 'Design', status: 'Away', joined: 2024, reviews: 12 },
  ];
  readonly memberColumns: DataTableColumn<Member>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Team', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'joined', label: 'Joined', sortable: true, align: 'end' },
    { key: 'reviews', label: 'Reviews', sortable: true, align: 'end' },
  ];
  memberSort: DataTableSort[] = [{ key: 'role', direction: 'asc' }];
  selectedMembers: unknown[] = [];
  memberFilter = '';
  tags = ['Design', 'Accessibility', 'Angular'];
  loaded = false;
  progress: number | null = 40;
  radius: number | null = 12;
  drawerOpen = false;
  showArchived = false;
  compact = true;
  selectedTeams: (string | number)[] | null = ['design'];
  readonly crumbs = [
    { label: 'Home', href: '#/' },
    { label: 'Components', href: '#/components' },
    { label: 'Breadcrumb' },
  ];
  readonly teams = [
    'Design',
    'Engineering',
    'Product',
    'Marketing',
    'Sales',
    'Support',
    'Research',
    'Operations',
  ].map((label) => ({ value: label.toLowerCase(), label }));
  get countryLabel() {
    return this.countries.find((c) => c.value === this.country)?.label ?? 'none';
  }
  activeTab = 'overview';
  openQuestions: string[] = ['style'];
  multiple = false;
  alertVisible = true;
  tone: 'info' | 'success' | 'warning' | 'danger' = 'success';
  readonly tabs: TabItem[] = [
    {
      id: 'overview',
      icon: 'grid',
      label: 'Overview',
      content: 'Everything in its place. Start with a shared visual language for your workspace.',
    },
    {
      id: 'appearance',
      icon: 'palette',
      label: 'Appearance',
      content: 'Choose your theme, accent and surface in Theme Studio, then export the result.',
    },
    {
      id: 'team',
      icon: 'users',
      label: 'Team',
      content: 'Give every collaborator a clear place to start.',
    },
    { id: 'billing', icon: 'lock', label: 'Billing · coming later', content: '', disabled: true },
  ];
  readonly questions = [
    {
      id: 'style',
      title: 'Can I make it look like my brand?',
      content:
        'Yes. Set your accent, typography, radius and spacing in Theme Studio and download the CSS.',
    },
    {
      id: 'license',
      title: 'Can I use it in a commercial project?',
      content: 'Yes. LiberaUI is MIT licensed. Preserve its copyright and license notice.',
    },
    {
      id: 'glass',
      title: 'Does Glass work in light and dark mode?',
      content:
        'Yes. The material follows the surrounding theme and respects reduced transparency preferences.',
    },
  ];
  get title() {
    return {
      tabs: 'Tabs',
      accordion: 'Accordion',
      alert: 'Alert',
      dialog: 'Dialog',
      toast: 'Toast',
      tooltip: 'Tooltip',
      menu: 'Menu',
      'radio-group': 'Radio group',
      combobox: 'Combobox',
      'data-table': 'Data table',
      badge: 'Badge',
      tag: 'Tag',
      skeleton: 'Skeleton',
      progress: 'Progress',
      avatar: 'Avatar',
      slider: 'Slider',
      breadcrumb: 'Breadcrumb',
      drawer: 'Drawer',
      popover: 'Popover',
      'multi-select': 'Multi-select',
    }[this.kind];
  }
  get description() {
    return {
      tabs: 'Organize a workspace into clear, keyboard-friendly sections.',
      accordion: 'Reveal the details when people need them.',
      alert: 'Give feedback that people can understand and act on.',
      dialog: 'Ask for a decision without losing the context behind it.',
      toast: 'Confirm what happened, then get out of the way.',
      tooltip: 'Name and explain compact controls.',
      menu: 'Offer related actions from a single button.',
      'radio-group': 'Choose exactly one option from a short, visible list.',
      combobox: 'Find one option in a long list by typing.',
      'data-table': 'Explore structured data by searching, sorting, paging and selecting rows.',
      badge: 'Show a count or a status at a glance.',
      tag: 'Label a status or category, and let people remove it.',
      skeleton: 'Hold the shape of content while it loads.',
      progress: 'Show how far a task has come, or that it is still working.',
      avatar: 'Represent a person with a picture or their initials.',
      slider: 'Pick a value from a continuous range.',
      breadcrumb: 'Show where a page sits in the hierarchy.',
      drawer: 'Open a side panel for details or settings without leaving the page.',
      popover: 'Keep quick settings and filters one click away.',
      'multi-select': 'Choose several options from a long list.',
    }[this.kind];
  }
  get usage() {
    return {
      tabs: 'Import TabComponent and provide items with unique IDs. Bind activeId to react to the selected section. Items may include a TemplateRef for richer panel content.',
      accordion:
        'Import AccordionComponent. Provide items with unique IDs and bind openIds to control the expanded sections.',
      alert:
        'Import AlertComponent. Choose a tone and optionally bind visible to show, dismiss and reopen a message.',
      dialog:
        'Import DialogComponent and bind open. Project the body as content and mark action buttons with dialog-actions. The closed output reports whether the person dismissed the dialog.',
      toast:
        'Add ToastOutletComponent once near the root of your application, then call ToastService.show from anywhere. Set duration to 0 for messages that should stay until dismissed.',
      tooltip:
        'Wrap a single control in TooltipComponent. Its first focusable element is described by the tooltip text, so keep the text short and never put interactive content inside.',
      menu: 'Import MenuComponent, provide items with unique IDs and handle itemSelected.',
      'radio-group':
        'Import RadioGroupComponent, provide options and bind the value with ngModel or a form control.',
      combobox:
        'Import ComboboxComponent, provide options and bind the selected value with ngModel or a form control. The value is the option value, not the typed text.',
      'data-table':
        'Import DataTableComponent, describe your columns and pass rows. Bind sort, selection and pageSize as needed. Use an ng-template with libCell to render a column with your own markup; the row is the implicit context. Add an ng-template with libRowDetail for expandable details, bind filter to a search field, and set lazy with totalRows and stateChange to load pages from a server.',
      badge:
        'Import BadgeComponent. Pass a value and, when the number needs context, a label such as "3 unread messages". Use dot for a status without a number.',
      tag: 'Import TagComponent and project the text. Add removable and a removeLabel that names the item, then handle removed.',
      skeleton:
        'Import SkeletonComponent. Use text lines, a rectangle or a circle, then replace it with the real content.',
      progress:
        'Import ProgressBarComponent and SpinnerComponent. Pass a value from 0 to 100, or null when the amount is unknown. Give both a label.',
      avatar:
        'Import AvatarComponent. Pass a name and an optional image source. Set decorative when the name is already visible next to it.',
      slider:
        'Import SliderComponent and bind it with ngModel or a form control. Set min, max, step and an optional unit.',
      breadcrumb:
        'Import BreadcrumbComponent and pass items with a label and an href. The last item is the current page.',
      drawer:
        'Import DrawerComponent and bind open, just like DialogComponent. Choose position start or end.',
      popover: 'Import PopoverComponent, set the button label and project the panel content.',
      'multi-select':
        'Import MultiSelectComponent, pass options and bind an array with ngModel or a form control.',
    }[this.kind];
  }
  get behavior() {
    return {
      tabs: 'Use Left/Right arrows to switch enabled tabs, Home/End to jump to the first/last tab, and Tab to enter the panel. Disabled tabs are skipped. Multiple instances have separate IDs.',
      accordion:
        'Each heading is a native details summary. Enter or Space expands it. With multiple disabled, opening a section closes the previous one.',
      alert:
        'Info, success and warning use a polite status announcement. Danger uses an alert announcement. The optional dismiss button has an accessible label.',
      dialog:
        'The page behind the dialog is inert and focus stays inside it. Escape, the close button and a backdrop click dismiss it unless dismissible is false. Focus returns to the element that opened it.',
      toast:
        'Messages are announced through a polite live region; danger messages use an alert. The countdown pauses while the pointer or keyboard focus is on a toast.',
      tooltip:
        'Appears on keyboard focus immediately and on hover after a short delay. It stays visible while the pointer is over it, and Escape hides it without moving focus.',
      menu: 'Enter, Space or Down Arrow opens the menu on the first item; Up Arrow opens it on the last. Arrows move and wrap, Home and End jump, and a letter moves to the next matching item. Escape closes and returns focus; Tab closes and moves on.',
      'radio-group':
        'Native radio buttons in a fieldset: Tab enters the group and arrow keys change the selection. Descriptions are announced with each option.',
      combobox:
        'Typing filters the list and highlights the first match. Up and Down Arrow move through results, Enter selects, Escape closes and Alt+Down Arrow opens the list. Leaving the field restores the selected option.',
      'data-table':
        'Column headers are buttons: activate one to sort ascending, again for descending and again to clear. Hold Shift with a click, Enter or Space to add a secondary sort. The new order is announced, the primary column exposes aria-sort, and every row is named by its row header. Selection checkboxes name the row they select. Detail buttons expose aria-expanded, and a loading table is marked busy.',
      badge:
        'Counts above max are shown as "99+". With a label, the badge is announced as an image with that name; without one it is read as plain text.',
      tag: 'The remove button is a real button with its own name, such as "Remove Design", so each one is distinct when read aloud.',
      skeleton:
        'Skeletons are hidden from assistive technology. Announce loading with a spinner or a busy region elsewhere. The shimmer stops when reduced motion is requested.',
      progress:
        'The bar is a progressbar with its current value. Without a value it is indeterminate. The spinner announces its label through a status region.',
      avatar:
        'The avatar is named after the person. If the image is missing or fails to load, initials are shown instead. Decorative avatars are hidden from assistive technology.',
      slider:
        'A native range input: arrow keys move by one step, Page Up and Page Down by larger amounts, and Home and End jump to the limits. With a unit, the value is announced with it.',
      breadcrumb:
        'A labelled navigation landmark with an ordered list. The current page is marked with aria-current, and separators are drawn in CSS so they are not read aloud.',
      drawer:
        'The drawer behaves like a modal dialog: the page is inert, focus stays inside, Escape closes it and focus returns to the opener.',
      popover:
        'The panel opens in the top layer next to its button and moves focus to its first control. Clicking outside closes it; Escape closes it and returns focus to the button.',
      'multi-select':
        'The button opens a filterable list that allows several selections. Type to filter, use Up and Down Arrow to move and Enter to select or clear an option. Escape closes the list and returns focus. The button announces how many options are selected.',
    }[this.kind];
  }
  get code() {
    return {
      badge:
        'import { BadgeComponent } from \'libera-ui\';\n\n<lib-badge [value]="unread" tone="info" label="{{ unread }} unread messages" />\n<lib-badge dot tone="danger" label="New activity" />',
      tag: 'import { TagComponent } from \'libera-ui\';\n\n<lib-tag tone="success" removable removeLabel="Remove Design" (removed)="remove(\'design\')">\n  Design\n</lib-tag>',
      skeleton:
        'import { SkeletonComponent } from \'libera-ui\';\n\n<lib-skeleton shape="circle" width="40px" />\n<lib-skeleton [lines]="3" />',
      progress:
        'import { ProgressBarComponent, SpinnerComponent } from \'libera-ui\';\n\n<lib-progress-bar label="Uploading theme" [value]="progress" visibleLabel showValue />\n<lib-spinner label="Loading members" />',
      avatar:
        'import { AvatarComponent } from \'libera-ui\';\n\n<lib-avatar name="Ada Lovelace" src="/people/ada.jpg" />\n<lib-avatar name="Grace Hopper" decorative /> Grace Hopper',
      slider:
        'import { SliderComponent } from \'libera-ui\';\n\n<lib-slider label="Corner radius" unit=" px" [min]="0" [max]="28" [(ngModel)]="radius" />',
      breadcrumb:
        "import { BreadcrumbComponent } from 'libera-ui';\n\n<lib-breadcrumb [items]=\"[\n  { label: 'Home', href: '/' },\n  { label: 'Projects', href: '/projects' },\n  { label: 'Atlas' }\n]\" />",
      drawer:
        'import { DrawerComponent } from \'libera-ui\';\n\n<lib-button (click)="open = true">Settings</lib-button>\n<lib-drawer title="Settings" position="end" [(open)]="open">\u2026</lib-drawer>',
      popover:
        'import { PopoverComponent } from \'libera-ui\';\n\n<lib-popover label="Filters">\n  <label><input type="checkbox" /> Show archived</label>\n</lib-popover>',
      'multi-select':
        'import { MultiSelectComponent } from \'libera-ui\';\n\n<lib-multi-select label="Teams" [options]="teams" [(ngModel)]="selectedTeams" />',
      'data-table':
        'import { DataTableComponent, DataTableCellDirective, DataTableColumn } from \'libera-ui\';\n// Add DataTableComponent and DataTableCellDirective to your standalone imports.\n// In your class:\ncolumns: DataTableColumn<Member>[] = [\n  { key: \'name\', label: \'Name\', sortable: true },\n  { key: \'reviews\', label: \'Reviews\', sortable: true, align: \'end\' }\n];\nselection: unknown[] = [];\n\n// In your template:\n<lib-data-table caption="Team" rowKey="id" rowHeader="name" [columns]="columns"\n  [rows]="members" [pageSize]="10" selectable [(selection)]="selection">\n  <ng-template libCell="name" let-member><strong>{{ member.name }}</strong></ng-template>\n</lib-data-table>',
      dialog:
        'import { DialogComponent } from \'libera-ui\';\n// Add DialogComponent to your standalone imports.\n// In your class:\nopen = false;\n\n// In your template:\n<lib-button (click)="open = true">Delete project</lib-button>\n<lib-dialog title="Delete project?" description="This cannot be undone." [(open)]="open">\n  Everything in this project will be removed.\n  <lib-button dialog-actions variant="outline" (click)="open = false">Cancel</lib-button>\n  <lib-button dialog-actions (click)="delete()">Delete</lib-button>\n</lib-dialog>',
      toast:
        "import { ToastOutletComponent, ToastService } from 'libera-ui';\n// Add <lib-toast-outlet /> once, for example in your root component.\n// Anywhere else:\nprivate readonly toasts = inject(ToastService);\n\nsave() {\n  this.toasts.show({ title: 'Saved', message: 'Your changes are live.', tone: 'success' });\n}",
      tooltip:
        'import { TooltipComponent } from \'libera-ui\';\n// Add TooltipComponent to your standalone imports.\n\n<lib-tooltip text="Copy link">\n  <button type="button" aria-label="Copy link">…</button>\n</lib-tooltip>',
      menu: "import { MenuComponent, MenuItem } from 'libera-ui';\n// Add MenuComponent to your standalone imports.\n// In your class:\nitems: MenuItem[] = [\n  { id: 'rename', label: 'Rename' },\n  { id: 'delete', label: 'Delete', danger: true }\n];\n\n// In your template:\n<lib-menu label=\"Actions\" [items]=\"items\" (itemSelected)=\"run($event.id)\" />",
      'radio-group':
        "import { RadioGroupComponent, RadioOption } from 'libera-ui';\n// Add RadioGroupComponent and FormsModule to your standalone imports.\n// In your class:\nplans: RadioOption[] = [\n  { value: 'solo', label: 'Solo' },\n  { value: 'team', label: 'Team' }\n];\nplan = 'team';\n\n// In your template:\n<lib-radio-group label=\"Plan\" [options]=\"plans\" [(ngModel)]=\"plan\" />",
      combobox:
        "import { ComboboxComponent, ComboboxOption } from 'libera-ui';\n// Add ComboboxComponent and FormsModule to your standalone imports.\n// In your class:\ncountries: ComboboxOption[] = [\n  { value: 'it', label: 'Italy' },\n  { value: 'jp', label: 'Japan' }\n];\ncountry: string | null = null;\n\n// In your template:\n<lib-combobox label=\"Country\" [options]=\"countries\" [(ngModel)]=\"country\" />",
      tabs: "import { TabComponent, TabItem } from 'libera-ui';\n// Add TabComponent to your standalone imports.\n// In your class:\nitems: TabItem[] = [\n  { id: 'overview', label: 'Overview', content: 'Your overview' },\n  { id: 'settings', label: 'Settings', content: 'Your settings' }\n];\nactive = 'overview';\n\n// In your template:\n<lib-tabs [items]=\"items\" [(activeId)]=\"active\" label=\"Workspace\" />",
      accordion:
        "import { AccordionComponent } from 'libera-ui';\n// Add AccordionComponent to your standalone imports.\n// In your class:\nitems = [{ id: 'details', title: 'A little more detail', content: 'Your content' }];\nopen: string[] = [];\n\n// In your template:\n<lib-accordion [items]=\"items\" [(openIds)]=\"open\" />",
      alert:
        'import { AlertComponent } from \'libera-ui\';\n// Add AlertComponent to your standalone imports.\n// In your class:\nvisible = true;\n\n// In your template:\n<lib-alert title="Changes saved" tone="success" dismissible [(visible)]="visible">\n  Your workspace is ready.\n</lib-alert>',
    }[this.kind];
  }
}
