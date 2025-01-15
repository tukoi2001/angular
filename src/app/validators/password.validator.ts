import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passwordControlName: string,
  confirmPasswordControlName: string,
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(passwordControlName);
    const confirmPasswordControl = formGroup.get(confirmPasswordControlName);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (!confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ required: true });
      return { required: true };
    }

    // If both controls are set and password matches confirmPassword
    if (confirmPasswordControl.value && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    // If password and confirmPassword are matching, clear any error
    confirmPasswordControl.setErrors(null);
    return null;
  };
}
