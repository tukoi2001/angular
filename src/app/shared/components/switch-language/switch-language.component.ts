import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TranslationService } from '@services/translation.service';
import { DEFAULT_LANGUAGE } from '@constants/language.constants';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'switch-language',
  standalone: true,
  imports: [NzDropDownModule, CommonModule, TranslateModule],
  templateUrl: './switch-language.component.html',
  styleUrl: './switch-language.component.scss',
})
export class SwitchLanguageComponent {
  constructor(private readonly translationService: TranslationService) {}

  get flagUrl(): string {
    const path: string = '/assets/images';
    if (this.translationService.currentLanguage() === DEFAULT_LANGUAGE) {
      return `${path}/england.png`;
    }
    return `${path}/vietnamese.png`;
  }

  get languageLabel(): string {
    if (this.translationService.currentLanguage() === DEFAULT_LANGUAGE) {
      return 'english';
    }
    return 'vietnamese';
  }

  onSwitchLanguage(language: string): void {
    this.translationService.setLanguage(language);
  }
}
