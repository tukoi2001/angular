import { computed, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';
import { DEFAULT_LANGUAGE } from '@constants/language.constants';
import { LANGUAGE } from '@constants/storage.constants';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLang = signal<string>(DEFAULT_LANGUAGE);
  currentLanguage = computed<string>(() => this.currentLang());

  constructor(
    private readonly translateService: TranslateService,
    private readonly storageService: StorageService,
  ) {
    this.translateService.setDefaultLang(DEFAULT_LANGUAGE);
    this.loadLanguage();
  }

  private loadLanguage(): void {
    const savedLang = this.storageService.getLocal(LANGUAGE) || DEFAULT_LANGUAGE;
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string): void {
    this.translateService.use(lang);
    this.storageService.setLocal(LANGUAGE, lang);
    this.currentLang.update(_value => lang);
  }

  instant(key: string, params?: object): string {
    return this.translateService.instant(key, params);
  }
}
