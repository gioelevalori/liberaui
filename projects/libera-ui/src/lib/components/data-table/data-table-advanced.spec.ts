import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DataTableColumn,
  DataTableComponent,
  DataTableRowDetailDirective,
  DataTableState,
} from './data-table.component';

interface Person {
  id: number;
  name: string;
  role: string;
}
const people: Person[] = [
  { id: 1, name: 'Chiara', role: 'Design' },
  { id: 2, name: 'Andrea', role: 'Engineering' },
  { id: 3, name: 'Bruno', role: 'Design' },
  { id: 4, name: 'Davide', role: 'Product' },
];

@Component({
  standalone: true,
  imports: [DataTableComponent, DataTableRowDetailDirective],
  template: `<lib-data-table
    rowKey="id"
    rowHeader="name"
    [columns]="columns"
    [rows]="rows"
    [filter]="filter"
    [pageSize]="pageSize"
    [lazy]="lazy"
    [totalRows]="totalRows"
    [loading]="loading"
    (stateChange)="states.push($event)"
  >
    <ng-template libRowDetail let-person>
      <p class="detail">{{ person.name }} works in {{ person.role }}.</p>
    </ng-template>
  </lib-data-table>`,
})
class HostComponent {
  columns: DataTableColumn<Person>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
  ];
  rows: Person[] = people;
  filter = '';
  pageSize = 0;
  lazy = false;
  totalRows = 0;
  loading = false;
  states: DataTableState[] = [];
}

describe('DataTableComponent filtering, details and lazy loading', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  const q = <T extends Element>(selector: string) =>
    fixture.nativeElement.querySelector(selector) as T;
  const qa = <T extends Element>(selector: string) =>
    Array.from(fixture.nativeElement.querySelectorAll(selector)) as T[];
  const names = () => qa('tbody th[scope="row"]').map((th) => th.textContent?.trim());
  const changed = () => {
    fixture.changeDetectorRef.markForCheck();
    return fixture.whenStable();
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('filters across columns and returns to the first page', async () => {
    host.pageSize = 1;
    await changed();
    qa<HTMLButtonElement>('.lib-data-table-pager button')[1].click();
    await fixture.whenStable();
    expect(names()).toEqual(['Andrea']);

    host.filter = 'design';
    await changed();
    expect(names()).toEqual(['Chiara']);
    expect(q('.lib-data-table-pager [aria-live]').textContent?.trim()).toBe('Page 1 of 2');
    host.filter = 'zzz';
    await changed();
    expect(q('tbody td.empty').textContent?.trim()).toBe('No data');
    expect(q<HTMLTableCellElement>('tbody td.empty').colSpan).toBe(3);
  });

  it('expands row details with a labelled disclosure button', async () => {
    const button = q<HTMLButtonElement>('tbody button.expand');
    expect(button.getAttribute('aria-label')).toBe('Details for Chiara');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(q('thead th .lib-visually-hidden').textContent).toBe('Details');

    button.click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    const detail = q<HTMLTableCellElement>('tr.detail-row td');
    expect(button.getAttribute('aria-controls')).toBe(detail.id);
    expect(detail.colSpan).toBe(3);
    expect(detail.textContent?.trim()).toBe('Chiara works in Design.');

    button.click();
    await fixture.whenStable();
    expect(q('tr.detail-row')).toBeNull();
  });

  it('delegates sorting, paging and filtering to the server in lazy mode', async () => {
    host.lazy = true;
    host.pageSize = 2;
    host.totalRows = 7;
    host.rows = [people[3], people[0]];
    await changed();
    expect(names()).toEqual(['Davide', 'Chiara']);
    expect(q('.lib-data-table-pager [aria-live]').textContent?.trim()).toBe('Page 1 of 4');

    qa<HTMLButtonElement>('thead button')
      .find((b) => b.textContent?.includes('Name'))!
      .click();
    await fixture.whenStable();
    // Rows stay as provided; the server is asked for the sorted first page.
    expect(names()).toEqual(['Davide', 'Chiara']);
    expect(host.states.pop()).toEqual({
      sort: [{ key: 'name', direction: 'asc' }],
      page: 0,
      pageSize: 2,
      filter: '',
    });

    qa<HTMLButtonElement>('.lib-data-table-pager button')[1].click();
    await fixture.whenStable();
    expect(host.states.pop()?.page).toBe(1);

    host.filter = 'and';
    await changed();
    expect(host.states.pop()).toEqual(
      jasmine.objectContaining({ page: 0, filter: 'and' }) as unknown as DataTableState,
    );
  });

  it('marks the table busy while loading', async () => {
    host.loading = true;
    await changed();
    expect(q('table').getAttribute('aria-busy')).toBe('true');
    expect(q('.lib-data-table-loading[role="status"]').textContent).toContain('Loading');
    host.loading = false;
    await changed();
    expect(q('table').hasAttribute('aria-busy')).toBeFalse();
  });
});
