import { GetStorage, SetStorage } from '../../data/prootocols/cache';

export default class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: unknown): void {
    if (typeof window === 'undefined') return;

    if (value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(key);
    }
  }

  get(key: string): any {
    if (typeof window === 'undefined') return;

    const value = window.localStorage.getItem(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value);
  }
}
