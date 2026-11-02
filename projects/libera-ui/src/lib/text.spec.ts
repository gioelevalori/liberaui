import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ComboboxComponent } from './components/combobox/combobox.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { provideLiberaUiText } from './text';

@Component({
  standalone: true,
  imports: [ComboboxComponent, DataTableComponent, DialogComponent],
  template: `
    <lib-combobox label="Paese" [options]="[]" />
    <lib-combobox label="Città" emptyText="Nessuna città" [options]="[]" />
    <lib-data-table
      rowKey="id"
      selectable
      [pageSize]="1"
      [columns]="[{ key: 'name', label: 'Nome', sortable: true }]"
      [rows]="rows"
    />
    <lib-dialog title="Titolo" />
  `,
})
class HostComponent {
  rows = [
    { id: 1, name: 'Ada' },
    { id: 2, name: 'Bea' },
  ];
}

describe('provideLiberaUiText', () => {
  it('translates built-in text while inputs still win', async () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideLiberaUiText({
          search: 'Cerca',
          noResults: 'Nessun risultato',
          previousPage: 'Precedente',
          nextPage: 'Successiva',
          pageStatus: (page, count) => `Pagina ${page} di ${count}`,
          selectRow: (row) => `Seleziona ${row}`,
          sortAnnouncement: (columns) =>
            columns
              .map((c) => `${c.label} ${c.ascending ? 'crescente' : 'decrescente'}`)
              .join(', '),
          closeDialog: 'Chiudi finestra',
        }),
      ],
    });
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;

    const [country, city] = Array.from(el.querySelectorAll<HTMLInputElement>('lib-combobox input'));
    expect(country.placeholder).toBe('Cerca');
    for (const input of [country, city]) {
      input.value = 'x';
      input.dispatchEvent(new Event('input'));
    }
    await fixture.whenStable();
    const empty = Array.from(el.querySelectorAll('.lib-combobox-empty')).map((p) =>
      p.textContent?.trim(),
    );
    expect(empty).toEqual(['Nessun risultato', 'Nessuna città']);

    const pager = el.querySelector('.lib-data-table-pager')!;
    expect(pager.textContent).toContain('Precedente');
    expect(pager.textContent).toContain('Pagina 1 di 2');
    expect(el.querySelector('tbody input')?.getAttribute('aria-label')).toBe('Seleziona Ada');
    el.querySelector<HTMLButtonElement>('thead button')!.click();
    await fixture.whenStable();
    expect(el.querySelector('lib-data-table [role="status"]')?.textContent).toBe('Nome crescente');

    // Untranslated keys keep the English defaults.
    expect(el.querySelector('thead input')?.getAttribute('aria-label')).toBe(
      'Select all rows on this page',
    );
    expect(el.querySelector('.lib-dialog-close')?.getAttribute('aria-label')).toBe(
      'Chiudi finestra',
    );
  });
});
