import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DataTableCellDirective,
  DataTableColumn,
  DataTableComponent,
  DataTableSort,
} from './data-table.component';

interface Person {
  id: number;
  name: string;
  role: string;
  age: number | null;
}

@Component({
  standalone: true,
  imports: [DataTableComponent, DataTableCellDirective],
  template: `<lib-data-table
    caption="Team"
    rowKey="id"
    rowHeader="name"
    [columns]="columns"
    [rows]="rows"
    [pageSize]="pageSize"
    [selectable]="selectable"
    [(selection)]="selection"
    [(sort)]="sort"
  >
    <ng-template libCell="role" let-row>
      <em class="role">{{ row.role }}</em>
    </ng-template>
  </lib-data-table>`,
})
class HostComponent {
  pageSize = 0;
  selectable = false;
  selection: unknown[] = [];
  sort: DataTableSort[] = [];
  columns: DataTableColumn<Person>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'age', label: 'Age', sortable: true, align: 'end' },
  ];
  rows: Person[] = [
    { id: 1, name: 'Chiara', role: 'Design', age: 34 },
    { id: 2, name: 'Andrea', role: 'Engineering', age: 9 },
    { id: 3, name: 'Bruno', role: 'Design', age: null },
    { id: 4, name: 'Davide', role: 'Engineering', age: 41 },
    { id: 5, name: 'Elena', role: 'Design', age: 100 },
  ];
}

describe('DataTableComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  const q = <T extends Element>(selector: string) =>
    fixture.nativeElement.querySelector(selector) as T;
  const qa = <T extends Element>(selector: string) =>
    Array.from(fixture.nativeElement.querySelectorAll(selector)) as T[];
  const names = () => qa<HTMLElement>('tbody th[scope="row"]').map((th) => th.textContent?.trim());
  const sortButton = (label: string) =>
    qa<HTMLButtonElement>('thead th button').find((b) => b.textContent?.includes(label))!;
  const header = (label: string) =>
    qa<HTMLElement>('thead th').find((th) => th.textContent?.includes(label))!;
  const stable = () => fixture.whenStable();
  /** Without zone.js, editing host fields directly needs an explicit mark. */
  const changed = () => {
    fixture.changeDetectorRef.markForCheck();
    return stable();
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    await stable();
  });

  it('renders a captioned table with column and row headers', () => {
    expect(q('caption').textContent?.trim()).toBe('Team');
    expect(qa('thead th').every((th) => th.getAttribute('scope') === 'col')).toBeTrue();
    expect(names()).toEqual(['Chiara', 'Andrea', 'Bruno', 'Davide', 'Elena']);
    expect(q('tbody td.align-end')).toBeTruthy();
  });

  it('uses projected cell templates', () => {
    expect(q('tbody em.role').textContent).toBe('Design');
  });

  it('cycles a column through ascending, descending and unsorted', async () => {
    sortButton('Name').click();
    await stable();
    expect(names()).toEqual(['Andrea', 'Bruno', 'Chiara', 'Davide', 'Elena']);
    expect(header('Name').getAttribute('aria-sort')).toBe('ascending');
    expect(host.sort).toEqual([{ key: 'name', direction: 'asc' }]);

    sortButton('Name').click();
    await stable();
    expect(names()).toEqual(['Elena', 'Davide', 'Chiara', 'Bruno', 'Andrea']);
    expect(header('Name').getAttribute('aria-sort')).toBe('descending');

    sortButton('Name').click();
    await stable();
    expect(names()).toEqual(['Chiara', 'Andrea', 'Bruno', 'Davide', 'Elena']);
    expect(header('Name').hasAttribute('aria-sort')).toBeFalse();
  });

  it('sorts numbers numerically and keeps empty values last', async () => {
    sortButton('Age').click();
    await stable();
    expect(names()).toEqual(['Andrea', 'Chiara', 'Davide', 'Elena', 'Bruno']);
    sortButton('Age').click();
    await stable();
    expect(names()).toEqual(['Elena', 'Davide', 'Chiara', 'Andrea', 'Bruno']);
  });

  it('adds secondary sorts with Shift+click and keyboard', async () => {
    sortButton('Role').click();
    await stable();
    sortButton('Name').dispatchEvent(new MouseEvent('click', { shiftKey: true }));
    await stable();
    expect(names()).toEqual(['Bruno', 'Chiara', 'Elena', 'Andrea', 'Davide']);
    expect(header('Role').getAttribute('aria-sort')).toBe('ascending');
    expect(header('Name').hasAttribute('aria-sort')).toBeFalse();
    expect(q('[role="status"]').textContent).toContain(
      'Sorted by Role ascending, then Name ascending',
    );

    const key = new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true, cancelable: true });
    sortButton('Name').dispatchEvent(key);
    await stable();
    expect(key.defaultPrevented).toBeTrue();
    expect(host.sort).toEqual([
      { key: 'role', direction: 'asc' },
      { key: 'name', direction: 'desc' },
    ]);
    expect(names()).toEqual(['Elena', 'Chiara', 'Bruno', 'Davide', 'Andrea']);
  });

  it('paginates and resets to the first page when sorting', async () => {
    host.pageSize = 2;
    await changed();
    expect(names()).toEqual(['Chiara', 'Andrea']);
    const status = () => q('.lib-data-table-pager [aria-live]').textContent?.trim();
    expect(status()).toBe('Page 1 of 3');
    const [prev, next] = qa<HTMLButtonElement>('.lib-data-table-pager button');
    expect(prev.disabled).toBeTrue();
    next.click();
    next.click();
    await stable();
    expect(names()).toEqual(['Elena']);
    expect(next.disabled).toBeTrue();
    sortButton('Name').click();
    await stable();
    expect(status()).toBe('Page 1 of 3');
    expect(names()).toEqual(['Andrea', 'Bruno']);
  });

  it('selects rows and the visible page with a mixed header state', async () => {
    host.selectable = true;
    host.pageSize = 2;
    await changed();
    const all = () => q<HTMLInputElement>('thead input[type="checkbox"]');
    const boxes = () => qa<HTMLInputElement>('tbody input[type="checkbox"]');
    expect(all().getAttribute('aria-label')).toBe('Select all rows on this page');
    expect(boxes()[0].getAttribute('aria-label')).toBe('Select Chiara');

    boxes()[0].click();
    await stable();
    expect(host.selection).toEqual([1]);
    expect(all().indeterminate).toBeTrue();
    // aria-selected is only valid on grid rows; the checkbox state is what is announced.
    expect(q('tbody tr').classList).toContain('selected');

    all().click();
    await stable();
    expect(host.selection).toEqual([1, 2]);
    expect(all().checked).toBeTrue();
    all().click();
    await stable();
    expect(host.selection).toEqual([]);
  });

  it('shows an empty state across every column', async () => {
    host.rows = [];
    await changed();
    const cell = q<HTMLTableCellElement>('tbody td');
    expect(cell.textContent?.trim()).toBe('No data');
    expect(cell.colSpan).toBe(3);
  });
});
