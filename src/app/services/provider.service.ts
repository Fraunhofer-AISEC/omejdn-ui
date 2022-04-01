import { Injectable }      from '@angular/core';
import { SettingsService } from './settings.service';
import { HttpClient}       from '@angular/common/http';
import { Provider }        from '../interfaces/provider';
import { Observable }      from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  providerUrl = this.settings.get().apiUrl + '/config/oauth_providers';

  constructor(
    private http: HttpClient,
    private settings: SettingsService) { }

  getProviders(): Observable<Provider[]> {
      return this.http.get<Provider[]>(this.providerUrl);
  }

  getProvider(providerName: string): Observable<Provider> {
    const url = this.providerUrl + '/' + providerName;
    return this.http.get<Provider>(url);
  }

  deleteProvider(provider: Provider) {
    const url = this.providerUrl + '/' + provider.name;
    return this.http.delete<Provider>(url);
  }

  putProvider(provider: Provider) {
    const url = this.providerUrl + '/' + provider.name;
    return this.http.put<Provider>(url, provider);
  }

  postProvider(provider: Provider) {
    const url = this.providerUrl + '/' + provider.name;
    return this.http.post<Provider>(url, provider);
  }

}
