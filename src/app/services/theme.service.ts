import { computed, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { THEME } from '@constants/theme.constants';
import { THEMES } from '@constants/storage.constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = signal<string>(THEME.light);
  currentTheme = computed<string>(() => this.theme());

  constructor(private readonly storageService: StorageService) {
    this.loadTheme();
  }

  setTheme(theme: string): void {
    this.theme.update(_value => theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: string): void {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
    this.storageService.setLocal(THEMES, theme);
  }

  private loadTheme(): void {
    const savedTheme = this.storageService.getLocal(THEMES) || THEME.light;
    this.setTheme(savedTheme);
  }
}
