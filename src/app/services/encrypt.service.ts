import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '@environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  private readonly key = environment.ENCRYPT_KEY;

  /**
   * Encrypt text data
   */
  encrypt(text: string): string {
    try {
      return CryptoJS.AES.encrypt(text, this.key).toString();
    } catch (error) {
      console.error('Encryption failed:', error);
      return '';
    }
  }

  /**
   * Decrypt encrypted text
   */
  decrypt(encryptedText: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, this.key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Decryption failed:', error);
      return '';
    }
  }

  /**
   * Encrypt object by converting to string
   */
  encryptObject<T>(data: T): string {
    try {
      const stringData = JSON.stringify(data);
      return this.encrypt(stringData);
    } catch (error) {
      console.error('Object encryption failed:', error);
      return '';
    }
  }

  /**
   * Decrypt encrypted string back to object
   */
  decryptObject<T>(encryptedData: string): T | null {
    try {
      const decryptedString = this.decrypt(encryptedData);
      return JSON.parse(decryptedString) as T;
    } catch (error) {
      console.error('Object decryption failed:', error);
      return null;
    }
  }
}
