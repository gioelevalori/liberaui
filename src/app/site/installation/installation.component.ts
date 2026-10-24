import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';

@Component({
  selector: 'lib-installation',
  standalone: true,
  imports: [AnimationsComponent, CodeComponent, RouterModule],
  templateUrl: './installation.component.html',
  styleUrl: './installation.component.css'
})
export class InstallationComponent {
  readonly themeCode = "/* Your application's global stylesheet */\n@import 'libera-ui/theme.css';";
  readonly starterCode = "import { ButtonComponent } from 'libera-ui';\n// Add ButtonComponent to your standalone component imports.\n\n<lib-button color=\"#176b3a\">Create something</lib-button>";
  public codeImport = `# Using npm
npm install libera-ui`;
}
