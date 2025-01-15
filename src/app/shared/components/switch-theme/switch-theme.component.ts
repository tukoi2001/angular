import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ThemeService } from '@services/theme.service';
import { SwitchComponent } from '../form/switch/switch.component';
import { THEME } from '@constants/theme.constants';

@Component({
  selector: 'switch-theme',
  standalone: true,
  imports: [NzIconModule, SwitchComponent, FormsModule],
  templateUrl: './switch-theme.component.html',
  styleUrl: './switch-theme.component.scss',
})
export class SwitchThemeComponent implements OnInit {
  value: boolean = false;

  constructor(private readonly themeService: ThemeService) {}

  ngOnInit(): void {
    if (this.themeService.currentTheme() === THEME.dark) {
      this.value = true;
    }
  }

  onSwitchTheme(theme: string): void {
    this.themeService.setTheme(theme);
  }

  onChangeValue(value: boolean): void {
    if (value) {
      this.themeService.setTheme(THEME.dark);
    } else {
      this.themeService.setTheme(THEME.light);
    }
  }
}
