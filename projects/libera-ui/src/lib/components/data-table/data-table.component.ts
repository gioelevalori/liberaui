import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';

export interface DataTableColumn<T = Record<string, unknown>> {
  key: keyof T & string;
  label: string;
  sortable?: boolean;
  align?: 'start' | 'end';
  /** Text shown in the cell; defaults to the raw value. Sorting always uses the raw value. */
  format?: (value: T[keyof T], row: T) => string;
}
export interface DataTableSort {
  key: string;
  direction: 'asc' | 'desc';
}
type Row = Record<string, unknown>;
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

/** Marks an ng-template that renders the cells of one column; the row is the implicit context. */
@Directive({ selector: 'ng-template[libCell]', standalone: true })
export class DataTableCellDirective {
  @Input('libCell') key = '';
  readonly template = inject<TemplateRef<{ $implicit: Row }>>(TemplateRef);
}

/** Data table with multi-column sorting, pagination and row selection. */
@Component({
  selector: 'lib-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements OnChanges {
  @Input() caption = '';
  @Input() columns: DataTableColumn<any>[] = [];
  @Input() rows: any[] = [];
  /** Property that identifies a row; selection holds these values. */
  @Input() rowKey = 'id';
  /** Column rendered as the row header that names each row. */
  @Input() rowHeader = '';
  /** Rows per page; 0 shows every row. */
  @Input() pageSize = 0;
  @Input({ transform: booleanAttribute }) selectable = false;
  @Input() selection: unknown[] = [];
  @Input() sort: DataTableSort[] = [];
  @Input() emptyText = 'No data';
  @Output() selectionChange = new EventEmitter<unknown[]>();
  @Output() sortChange = new EventEmitter<DataTableSort[]>();
  @ContentChildren(DataTableCellDirective) cellTemplates!: QueryList<DataTableCellDirective>;
  page = 0;
  view: Row[] = [];
  sortMessage = '';
  private sorted: Row[] = [];

  ngOnChanges() {
    this.refresh();
  }

  get pageCount() {
    return this.pageSize > 0 ? Math.max(1, Math.ceil(this.sorted.length / this.pageSize)) : 1;
  }
  get pageSelection() {
    const keys = this.view.map((row) => row[this.rowKey]);
    const selected = keys.filter((key) => this.selection.includes(key)).length;
    return { all: !!keys.length && selected === keys.length, some: selected > 0 };
  }

  template(key: string) {
    return this.cellTemplates?.find((cell) => cell.key === key)?.template ?? null;
  }
  text(column: DataTableColumn<Row>, row: Row) {
    const value = row[column.key];
    return column.format ? column.format(value, row) : (value ?? '');
  }
  ariaSort(key: string) {
    // Only the primary sort column carries aria-sort, as the ARIA spec recommends.
    const primary = this.sort[0];
    return primary?.key === key ? (primary.direction === 'asc' ? 'ascending' : 'descending') : null;
  }
  sortIndex(key: string) {
    return this.sort.findIndex((s) => s.key === key);
  }

  onSortClick(event: MouseEvent, key: string) {
    this.toggleSort(key, event.shiftKey);
  }
  onSortKeydown(event: KeyboardEvent, key: string) {
    // Keyboard activation does not reliably carry Shift into the click event.
    if (!event.shiftKey || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    this.toggleSort(key, true);
  }
  movePage(delta: number) {
    this.page = Math.min(this.pageCount - 1, Math.max(0, this.page + delta));
    this.slice();
  }
  toggleRow(row: Row) {
    const key = row[this.rowKey];
    this.setSelection(
      this.selection.includes(key)
        ? this.selection.filter((k) => k !== key)
        : [...this.selection, key],
    );
  }
  togglePage() {
    const keys = this.view.map((row) => row[this.rowKey]);
    this.setSelection(
      this.pageSelection.all
        ? this.selection.filter((k) => !keys.includes(k))
        : [...this.selection, ...keys.filter((k) => !this.selection.includes(k))],
    );
  }
  rowLabel(row: Row) {
    return String(row[this.rowHeader || this.columns[0]?.key] ?? row[this.rowKey]);
  }

  private toggleSort(key: string, additive: boolean) {
    const current = this.sort.find((s) => s.key === key);
    const next: DataTableSort | null = !current
      ? { key, direction: 'asc' }
      : current.direction === 'asc'
        ? { key, direction: 'desc' }
        : null;
    if (additive) {
      this.sort = current
        ? next
          ? this.sort.map((s) => (s.key === key ? next : s))
          : this.sort.filter((s) => s.key !== key)
        : [...this.sort, next!];
    } else this.sort = next ? [next] : [];
    this.sortChange.emit(this.sort);
    this.page = 0;
    this.refresh();
    this.sortMessage = this.sort.length
      ? 'Sorted by ' +
        this.sort
          .map(
            (s) =>
              `${this.columns.find((c) => c.key === s.key)?.label ?? s.key} ${s.direction === 'asc' ? 'ascending' : 'descending'}`,
          )
          .join(', then ')
      : 'Sorting removed';
  }
  private setSelection(selection: unknown[]) {
    this.selection = selection;
    this.selectionChange.emit(selection);
  }
  private refresh() {
    const rules = this.sort.filter((s) => this.columns.some((c) => c.key === s.key));
    this.sorted = rules.length
      ? [...this.rows].sort((a, b) => {
          for (const rule of rules) {
            const result = compare(a[rule.key], b[rule.key], rule.direction);
            if (result) return result;
          }
          return 0;
        })
      : this.rows;
    this.page = Math.min(this.page, this.pageCount - 1);
    this.slice();
  }
  private slice() {
    this.view =
      this.pageSize > 0
        ? this.sorted.slice(this.page * this.pageSize, (this.page + 1) * this.pageSize)
        : this.sorted;
  }
}

/** Empty values always sort last, whatever the direction. */
function compare(a: unknown, b: unknown, direction: 'asc' | 'desc') {
  const empty = (v: unknown) => v === null || v === undefined || v === '';
  if (empty(a) || empty(b)) return empty(a) === empty(b) ? 0 : empty(a) ? 1 : -1;
  const result =
    typeof a === 'number' && typeof b === 'number'
      ? a - b
      : a instanceof Date && b instanceof Date
        ? a.getTime() - b.getTime()
        : collator.compare(String(a), String(b));
  return direction === 'asc' ? result : -result;
}
