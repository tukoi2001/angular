import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'checkbox',
  standalone: true,
  imports: [CommonModule, NzCheckboxModule, ReactiveFormsModule, FormsModule],
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() disabled = false;
  @Input() indeterminate = false;
  @Input() autoFocus = false;

  value: boolean = false;

  onChange = (_: boolean) => {};
  onTouched = () => {};

  onValueChange(value: boolean): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
