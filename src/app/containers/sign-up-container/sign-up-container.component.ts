import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';

import { REGEX } from '@constants/regex.constants';
import { matchPasswordsValidator } from '@validators/password.validator';
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component';
import { TextFieldComponent } from '@shared/components/form/text-field/text-field.component';
import { AppButtonComponent } from '@shared/components/form/app-button/app-button.component';
import { CheckboxComponent } from '@shared/components/form/checkbox/checkbox.component';
import type { IAuthSignUpRequest, ISignUpFormBuilder } from '@models/auth.model';

@Component({
  selector: 'sign-up-container',
  imports: [
    AuthLayoutComponent,
    TextFieldComponent,
    AppButtonComponent,
    CheckboxComponent,
    ReactiveFormsModule,
    RouterLink,
    NzFormModule,
    NzButtonModule,
    NzCheckboxModule,
    NzInputModule,
    NzIconModule,
    TranslateModule,
  ],
  templateUrl: './sign-up-container.component.html',
  styleUrl: './sign-up-container.component.scss',
})
export class SignUpContainer implements OnInit {
  form!: FormGroup<ISignUpFormBuilder>;
  showPassword: boolean = false;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.maxLength(20)]],
        lastName: ['', [Validators.required, Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(REGEX.password)]],
        confirmPassword: ['', [Validators.required]],
        remember: [false],
      },
      { validators: matchPasswordsValidator('password', 'confirmPassword') },
    );
  }

  getControl(controlName: keyof ISignUpFormBuilder): FormControl<string> {
    return this.form.controls[controlName] as FormControl<string>;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData: IAuthSignUpRequest = this.form.value as IAuthSignUpRequest;
      console.log(formData);
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
