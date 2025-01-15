import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SwitchLanguageComponent } from '@shared/components/switch-language/switch-language.component';
import { SwitchThemeComponent } from '@shared/components/switch-theme/switch-theme.component';

@Component({
  selector: 'auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  imports: [TranslateModule, SwitchLanguageComponent, SwitchThemeComponent],
})
export class AuthLayoutComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
