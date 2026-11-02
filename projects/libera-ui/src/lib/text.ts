import { InjectionToken, Provider } from '@angular/core';

/** Every piece of text the components render or announce on their own. */
export interface LiberaUiText {
  search: string;
  noResults: string;
  noData: string;
  enterValue: string;
  chooseOption: string;
  chooseOptions: string;
  filterOptions: string;
  clearSelection: string;
  selectedCount: (count: number) => string;
  options: string;
  sections: string;
  breadcrumb: string;
  notifications: string;
  dismissNotification: string;
  closeDialog: string;
  closePanel: string;
  close: string;
  remove: string;
  loading: string;
  progress: string;
  pagination: string;
  previousPage: string;
  nextPage: string;
  pageStatus: (page: number, count: number) => string;
  selectAllRows: string;
  selectRow: (row: string) => string;
  details: string;
  rowDetails: (row: string) => string;
  sortAnnouncement: (columns: { label: string; ascending: boolean }[]) => string;
  showPassword: string;
  hidePassword: string;
  openCalendar: string;
  chooseDate: string;
  previousMonth: string;
  nextMonth: string;
  daysOfMonth: string;
  today: string;
  chooseFile: string;
  noFileSelected: string;
  sideNavigation: string;
  openNavigation: string;
  copy: string;
  copied: string;
  copyFailed: string;
  switchToDarkTheme: string;
  switchToLightTheme: string;
  darkTheme: string;
  lightTheme: string;
}

export const DEFAULT_LIBERA_UI_TEXT: LiberaUiText = {
  search: 'Search',
  noResults: 'No results',
  noData: 'No data',
  enterValue: 'Enter a value',
  chooseOption: 'Choose an option',
  chooseOptions: 'Choose options',
  filterOptions: 'Filter options',
  clearSelection: 'Clear selection',
  selectedCount: (count) => `${count} selected`,
  options: 'Options',
  sections: 'Sections',
  breadcrumb: 'Breadcrumb',
  notifications: 'Notifications',
  dismissNotification: 'Dismiss notification',
  closeDialog: 'Close dialog',
  closePanel: 'Close panel',
  close: 'Close',
  remove: 'Remove',
  loading: 'Loading',
  progress: 'Progress',
  pagination: 'Pagination',
  previousPage: 'Previous',
  nextPage: 'Next',
  pageStatus: (page, count) => `Page ${page} of ${count}`,
  selectAllRows: 'Select all rows on this page',
  selectRow: (row) => `Select ${row}`,
  details: 'Details',
  rowDetails: (row) => `Details for ${row}`,
  sortAnnouncement: (columns) =>
    columns.length
      ? 'Sorted by ' +
        columns.map((c) => `${c.label} ${c.ascending ? 'ascending' : 'descending'}`).join(', then ')
      : 'Sorting removed',
  showPassword: 'Show password',
  hidePassword: 'Hide password',
  openCalendar: 'Open calendar',
  chooseDate: 'Choose a date',
  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  daysOfMonth: 'Days of the month',
  today: 'Today',
  chooseFile: 'Choose a file',
  noFileSelected: 'No file selected',
  sideNavigation: 'Side navigation',
  openNavigation: 'Open navigation',
  copy: 'Copy',
  copied: 'Copied!',
  copyFailed: 'Unable to copy. Select the code and copy manually.',
  switchToDarkTheme: 'Switch to dark theme',
  switchToLightTheme: 'Switch to light theme',
  darkTheme: 'Dark theme',
  lightTheme: 'Light theme',
};

export const LIBERA_UI_TEXT = new InjectionToken<LiberaUiText>('LIBERA_UI_TEXT', {
  providedIn: 'root',
  factory: () => DEFAULT_LIBERA_UI_TEXT,
});

/**
 * Translates the text components render or announce on their own. Missing keys keep the English
 * default, and inputs such as emptyText or closeLabel still override a single instance.
 */
export function provideLiberaUiText(text: Partial<LiberaUiText>): Provider {
  return { provide: LIBERA_UI_TEXT, useValue: { ...DEFAULT_LIBERA_UI_TEXT, ...text } };
}
