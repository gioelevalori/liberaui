import { Component } from '@angular/core';
import { TableComponent } from '../../../../projects/libera-ui/src/lib/components/table/table.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';

@Component({
  selector: 'lib-table-site',
  standalone: true,
  imports: [TableComponent, CodeComponent, AnimationsComponent],
  templateUrl: './table-site.component.html',
  styleUrl: './table-site.component.css',
})
export class TableSiteComponent {
  public codeImport = `import { TableComponent } from 'libera-ui';`;
  public codeTable = `<lib-table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Surname</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Francesco</td>
        <td>Rossi</td>
        <td>francesco@example.com</td>
        <td>3435675457</td>
        <td>Contrada Verdi</td>
      </tr>
      <tr>
        <td>Melissa</td>
        <td>Bianchi</td>
        <td>melissa@example.com</td>
        <td>3546757545</td>
        <td>Contrada Rossi</td>
      </tr>
    </tbody>
  </lib-table>`;
}
