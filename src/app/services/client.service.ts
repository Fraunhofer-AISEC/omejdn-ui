import { Injectable }      from '@angular/core';
import { Observable }      from 'rxjs';
import { HttpClient }      from '@angular/common/http';
import { Client }          from '../interfaces/client';
import { Certificate }     from '../interfaces/certificate';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientUrl = this.settings.get().apiUrl + '/config/clients';

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientUrl);
  }

  public getClient(clientname: string): Observable<Client> {
    const url = this.clientUrl + '/' + clientname;
    return this.http.get<Client>(url);
  }

  postClient(client: Client) {
    const url = this.clientUrl + '/' + client.client_id;
    return this.http.post<Client>(url, client);
  }

  putClient(client: Client) {
    const url = this.clientUrl + '/' + client.client_id;
    return this.http.put<Client>(url, client);
  }

  postNewClient(client: Client) {
    const url = this.clientUrl;
    return this.http.post<Client>(url, client);
  }

  public deleteClient(client: Client) {
    const url = this.clientUrl + '/' + client.client_id;
    return this.http.delete<Client>(url);
  }

  getClientCertificate(clientId: string): Observable<Certificate> {
    const url = this.clientUrl + '/' + clientId + '/keys';
    return this.http.get<Certificate>(url);
  }

  public putClientCertificate(certificate: any, client: Client) {
    const url = this.clientUrl + '/' + client.client_id + '/keys';
    return this.http.put<Certificate>(url, { certificate });
  }

  public postClientCertificate(certificate: Certificate, client: Client) {
    const url = this.clientUrl + '/' + client.client_id + '/keys';
    return this.http.post<Certificate>(url, { certificate });
  }

  public deleteClientCertificate(client: Client) {
    const url = this.clientUrl + '/' + client.client_id + '/keys';
    return this.http.delete<Certificate>(url);
  }
}
