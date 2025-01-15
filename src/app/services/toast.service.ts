import { Injectable } from '@angular/core';
import { GlobalConfig, ToastrService } from 'ngx-toastr';

const TOAST_CONFIGS: Partial<GlobalConfig> = {
  positionClass: 'toast-top-right',
  preventDuplicates: true,
  closeButton: false,
  progressBar: false,
  timeOut: 3000,
  extendedTimeOut: 1000,
  easeTime: 300,
} as const;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly toastService: ToastrService) {}

  showSuccess(message: string, title?: string) {
    this.toastService.success(message, title, TOAST_CONFIGS);
  }

  showError(message: string, title?: string) {
    this.toastService.error(message, title, TOAST_CONFIGS);
  }

  showInfo(message: string, title?: string) {
    this.toastService.info(message, title, TOAST_CONFIGS);
  }

  showWarning(message: string, title?: string) {
    this.toastService.warning(message, title, TOAST_CONFIGS);
  }

  // Optional: Custom
  showCustom(message: string, title?: string, config?: Partial<GlobalConfig>) {
    this.toastService.show(message, title, { ...TOAST_CONFIGS, ...config });
  }
}
