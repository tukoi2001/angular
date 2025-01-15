import { Component, Input, forwardRef, TemplateRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '@services/translation.service';

@Component({
  selector: 'text-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NzIconModule,
    TranslateModule,
  ],
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() control?: FormControl;
  @Input() id: string = '';
  @Input() icon: string = '';
  @Input() type: 'text' | 'password' | 'textarea' = 'text';
  @Input() placeholder: string = '';
  @Input() size: 'large' | 'small' | 'default' = 'large';
  @Input() rows: number = 4;
  @Input() autosize: boolean | { minRows: number; maxRows: number } = false;
  @Input() customError?: string = '';
  @Input() required: boolean = false;
  @Input() prefix?: string | TemplateRef<void>;
  @Input() suffix?: string | TemplateRef<void>;

  private showPassword = signal<boolean>(false);
  protected isShowPassword = computed<boolean>(() => this.showPassword());

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private readonly translationService: TranslationService) {}

  togglePasswordVisibility(): void {
    this.showPassword.update(value => !value);
  }

  getErrorMessage(): string {
    if (this.control && this.control.errors) {
      if (this.control.errors['required']) {
        return this.translationService.instant('this_field_is_required');
      }
      if (this.control.errors['email']) {
        return this.translationService.instant('please_enter_a_valid_email');
      }
      if (this.control.errors['minlength']) {
        const number = this.control.errors['minlength'].requiredLength;
        return this.translationService.instant('minimum_length_is_character', { number });
      }
      if (this.control.errors['maxlength']) {
        const number = this.control.errors['maxlength'].requiredLength;
        return this.translationService.instant('maximum_length_is_character', { number });
      }
      if (this.control.errors['pattern']) {
        if (this.type !== 'password') {
          return this.translationService.instant('invalid_pattern');
        }
        return this.translationService.instant('password_pattern');
      }
      if (this.control.hasError('passwordMismatch')) {
        return this.translationService.instant('confirm_password_pattern');
      }
      if (this.customError && this.control.errors['custom']) {
        return this.customError;
      }
    }
    return '';
  }

  writeValue(value: string): void {
    if (this.control && value !== undefined) {
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.control && this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.control) {
      isDisabled ? this.control.disable() : this.control.enable();
    }
  }
}
