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
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { LIBERA_UI_TEXT } from '../../text';

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
/** What a server needs to load one page in lazy mode. */
export interface DataTableState {
  sort: DataTableSort[];
  page: number;
  pageSize: number;
  filter: string;
}
type Row = Record<string, unknown>;
let nextDataTableId = 0;
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

/** Marks an ng-template that renders the cells of one column; the row is the implicit context. */
@Directive({ selector: 'ng-template[libCell]', standalone: true })
export class DataTableCellDirective {
  @Input('libCell') key = '';
  readonly template = inject<TemplateRef<{ $implicit: Row }>>(TemplateRef);
}

/** Marks an ng-template rendered under an expanded row; the row is the implicit context. */
@Directive({ selector: 'ng-template[libRowDetail]', standalone: true })
export class DataTableRowDetailDirective {
  readonly template = inject<TemplateRef<{ $implicit: Row }>>(TemplateRef);
}

/** Data table with multi-column sorting, filtering, pagination, row selection and details. */
@Component({
  selector: 'lib-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements OnChanges {
  protected readonly text = inject(LIBERA_UI_TEXT);
  readonly uid = 'lib-data-table-' + nextDataTableId++;
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
  @Input() emptyText = this.text.noData;
  /** Text matched against every column's displayed value. */
  @Input() filter = '';
  /** The server sorts, filters and pages: rows holds only the current page. */
  @Input({ transform: booleanAttribute }) lazy = false;
  /** Total matching rows on the server, used for paging in lazy mode. */
  @Input() totalRows = 0;
  @Input({ transform: booleanAttribute }) loading = false;
  @Output() selectionChange = new EventEmitter<unknown[]>();
  @Output() sortChange = new EventEmitter<DataTableSort[]>();
  /** Emitted in lazy mode whenever a different page of data is needed. */
  @Output() stateChange = new EventEmitter<DataTableState>();
  @ContentChildren(DataTableCellDirective) cellTemplates!: QueryList<DataTableCellDirective>;
  @ContentChildren(DataTableRowDetailDirective)
  detailTemplates!: QueryList<DataTableRowDetailDirective>;
  page = 0;
  view: Row[] = [];
  sortMessage = '';
  expanded: unknown[] = [];
  private sorted: Row[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter'] && !changes['filter'].firstChange) {
      this.page = 0;
      if (this.lazy) this.emitState();
    }
    this.refresh();
  }

  get pageCount() {
    const total = this.lazy ? this.totalRows : this.sorted.length;
    return this.pageSize > 0 ? Math.max(1, Math.ceil(total / this.pageSize)) : 1;
  }
  get pageSelection() {
    const keys = this.view.map((row) => row[this.rowKey]);
    const selected = keys.filter((key) => this.selection.includes(key)).length;
    return { all: !!keys.length && selected === keys.length, some: selected > 0 };
  }

  get detail() {
    return this.detailTemplates?.first?.template ?? null;
  }
  get columnCount() {
    return this.columns.length + (this.selectable ? 1 : 0) + (this.detail ? 1 : 0);
  }
  detailId(row: Row) {
    return `${this.uid}-detail-${String(row[this.rowKey])}`;
  }
  isExpanded(row: Row) {
    return this.expanded.includes(row[this.rowKey]);
  }
  toggleExpanded(row: Row) {
    const key = row[this.rowKey];
    this.expanded = this.isExpanded(row)
      ? this.expanded.filter((k) => k !== key)
      : [...this.expanded, key];
  }

  template(key: string) {
    return this.cellTemplates?.find((cell) => cell.key === key)?.template ?? null;
  }
  cellText(column: DataTableColumn<Row>, row: Row) {
    const value = row[column.key];
    return column.format ? column.format(value, row) : (value ?? '');
  }
  ariaSort(key: string) {
    // Only the primary sort column carries aria-sort, as the ARIA spec recommends.
    const primary = this.sort[0];
    return primary?.key === key ? (primary.direction === 'asc' ? 'ascending' : 'descending') : null;
  }
  sortDirection(key: string) {
    return this.sort.find((s) => s.key === key)?.direction ?? null;
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
    if (this.lazy) this.emitState();
    else this.slice();
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
    if (this.lazy) this.emitState();
    this.refresh();
    this.sortMessage = this.text.sortAnnouncement(
      this.sort.map((s) => ({
        label: this.columns.find((c) => c.key === s.key)?.label ?? s.key,
        ascending: s.direction === 'asc',
      })),
    );
  }
  private setSelection(selection: unknown[]) {
    this.selection = selection;
    this.selectionChange.emit(selection);
  }
  private emitState() {
    this.stateChange.emit({
      sort: this.sort,
      page: this.page,
      pageSize: this.pageSize,
      filter: this.filter,
    });
  }
  private refresh() {
    if (this.lazy) {
      this.sorted = this.view = this.rows;
      return;
    }
    const needle = this.filter.trim().toLowerCase();
    const rows = needle
      ? this.rows.filter((row) =>
          this.columns.some((c) => String(this.cellText(c, row)).toLowerCase().includes(needle)),
        )
      : this.rows;
    const rules = this.sort.filter((s) => this.columns.some((c) => c.key === s.key));
    this.sorted = rules.length
      ? [...rows].sort((a, b) => {
          for (const rule of rules) {
            const result = compare(a[rule.key], b[rule.key], rule.direction);
            if (result) return result;
          }
          return 0;
        })
      : rows;
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
