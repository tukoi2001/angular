import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule],
  templateUrl: './app-button.component.html',
})
export class AppButtonComponent {
  @Input() type: 'primary' | 'default' | 'dashed' | 'link' | 'text' = 'default';
  @Input() htmlType: 'button' | 'submit' | 'reset' = 'button';
  @Input() size: 'large' | 'default' | 'small' = 'large';
  @Input() shape: 'circle' | 'round' | null = null;
  @Input() danger = false;
  @Input() ghost = false;
  @Input() loading = false;
  @Input() disabled = false;
  @Input() isFullWidth = false;
  @Input() icon?: string;

  @Output() onClick = new EventEmitter<MouseEvent>();
}
