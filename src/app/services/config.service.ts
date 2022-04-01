import { Injectable }        from '@angular/core';
import { Observable }        from 'rxjs';
import { HttpClient }        from '@angular/common/http';
import { Config }            from '../interfaces/config';
import { UserBackendConfig } from '../interfaces/user-backend-config';
import { SettingsService }   from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseUrl = this.settings.get().apiUrl + '/config/';
  selfServiceUrl = this.settings.get().apiUrl + '/user/';

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  getConfig(): Observable<Config> {
    return this.http.get<Config>(this.baseUrl + 'omejdn');
  }

  putConfig(config: Config) {
    return this.http.put<Config> (this.baseUrl + 'omejdn', config);
  }

  getUserBackendConfig(): Observable<UserBackendConfig> {
    return this.http.get<UserBackendConfig>(this.baseUrl + 'user_backend');
  }

  putUserBackendConfig(config: UserBackendConfig) {
    return this.http.put<UserBackendConfig>(this.baseUrl + 'user_backend', config);
  }

  getOauthProvider(provider: string) {
    return this.http.get(this.baseUrl + 'oauth_providers/' + provider);
  }

  getOwnProvider() {
    return this.http.get(this.selfServiceUrl + 'provider');
  }

  getWebfingerConfig() {
    return this.http.get(this.baseUrl + 'webfinger');
  }

  public putWebfingerConfig(config) {
    return this.http.put(this.baseUrl + 'webfinger', config);
  }
}
