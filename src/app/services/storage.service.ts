import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(public storage: Storage) {}

  async setData(key: any, value: any) {
    const res = await this.storage.set(key, value);
    console.log(res);
  }

  async getData(key: any) {
    const keyVal = await this.storage.get(key);
    return keyVal;
  }
}
