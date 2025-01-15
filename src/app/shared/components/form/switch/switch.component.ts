import { Component, EventEmitter, Input, Output, TemplateRef, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'switch',
  standalone: true,
  imports: [CommonModule, NzSwitchModule, NzIconModule, ReactiveFormsModule, FormsModule],
  templateUrl: './switch.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() size: 'default' | 'small' = 'default';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() checkedChildren!: string | TemplateRef<void>;
  @Input() unCheckedChildren!: string | TemplateRef<void>;
  @Input() control: boolean = false;

  @Output() onChangeValue = new EventEmitter<boolean>();

  value = false;

  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  onValueChange(value: boolean): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.onChangeValue.emit(value);
  }

  writeValue(value: boolean): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
