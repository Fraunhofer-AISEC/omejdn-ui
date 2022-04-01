import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Settings }   from '../interfaces/settings';

@Injectable()
export class SettingsService {
  setting: Settings;

  constructor(private http: HttpClient) { }

  get() {
    return this.setting;
  }

  async load() {
    this.setting = await this.http.get<Settings>('assets/settings.json').toPromise();
  }
}
