import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { CodeComponent } from '../../components/code/code.component';

@Component({
  selector: 'app-table-site',
  standalone: true,
  imports: [TableComponent, CodeComponent],
  templateUrl: './table-site.component.html',
  styleUrl: './table-site.component.css'
})
export class TableSiteComponent {
  public codeImport = `import { TableComponent } from '../../components/table/table.component';`;
}
