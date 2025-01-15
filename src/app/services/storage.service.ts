import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setSession<T = string>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
    } catch (err) {
      throw new Error(`Error saving to sessionStorage: ${err}`);
    }
  }

  getSession<T = string>(key: string): T | null {
    try {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      throw new Error(`Error reading from sessionStorage: ${err}`);
    }
  }

  removeSession(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearAllSession(): void {
    sessionStorage.clear();
  }

  setLocal<T = string>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (err) {
      throw new Error(`Error saving to localStorage: ${err}`);
    }
  }

  getLocal<T = string>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      throw new Error(`Error reading from localStorage: ${err}`);
    }
  }

  removeLocal(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocal(): void {
    localStorage.clear();
  }
}
