import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { CodeComponent } from '../../components/code/code.component';
import { AnimationsComponent } from '../../components/animations/animations.component';

@Component({
  selector: 'lib-table-site',
  standalone: true,
  imports: [TableComponent, CodeComponent, AnimationsComponent],
  templateUrl: './table-site.component.html',
  styleUrl: './table-site.component.css'
})
export class TableSiteComponent {
  public codeImport = `import { TableComponent } from '../../components/table/table.component';`;
  public codeTable = `<lib-table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Surname</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Adress</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Francesco</td>
        <td>Rossi</td>
        <td>francescorossigmail.com</td>
        <td>3435675457</td>
        <td>Contrada Verdi</td>
      </tr>
      <tr>
        <td>Melissa</td>
        <td>Bianchi</td>
        <td>melissabianchigmail.com</td>
        <td>3546757545</td>
        <td>Contrada Rossi</td>
      </tr>
    </tbody>
  </lib-table>`;
}
