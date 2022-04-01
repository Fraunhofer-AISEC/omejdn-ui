import { Component, OnInit } from '@angular/core';
import { AppComponent }      from '../app/app.component';
import { ClientService }     from '../../services/client.service';
import { Client }            from '../../interfaces/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Client[];
  confirmClient: string;
  searchTerm: string;
  showNewClient: boolean;

  constructor(private clientService: ClientService, public app: AppComponent) { }

  ngOnInit(): void {

    this.app.setPageTitle('Clients');
    this.app.setPageAccessLevel('admin');
    if (!this.app.isAdmin()) {
      return;
    }
    this.pullClients();
    this.confirmClient = '';
  }

  pullClients(): void {
    this.clients = [];
    this.clientService.getClients().subscribe(clients => {
      let metadata=['redirect_uris',
                    'post_logout_redirect_uris',
                    'grant_types',
                    'response_types',
                    'contacts',
                    'scope',
                    'resource']
      for(let client of clients) {
        for(let md of metadata)
          if (client[md] != undefined && !Array.isArray(client[md])) client[md] = [client[md]]
      }
      this.clients = clients;
    },
      error => {
        this.app.showError('Failed loading clients.');
        console.log(error);
      });
  }

  addClient(clientId: string) {
    console.log(clientId);

    this.clientService.postNewClient({
      client_id: clientId,
      client_name: null,
      client_uri: null,
      logo_uri: null,
      tos_uri: null,
      policy_uri: null,
      software_id: null,
      software_version: null,
      contacts: null,
      token_endpoint_auth_method: 'client_secret_basic',
      client_secret: null,
      jwks_uri: null,
      jwks: null,
      grant_types: ['authorization_code'],
      redirect_uris: null,
      post_logout_redirect_uris: null,
      response_types: ['code'],
      scope: [],
      resource: [],
      attributes: [],
    }).subscribe(res1 => {
      console.log(res1);
      location.href = '/client/' + clientId;
      },
      error => {
        this.app.errorInfos.push ('Failed adding new client.');
        console.log (error);
      });
  }

  deleteClient(client: Client) {
    this.clientService.deleteClientCertificate(client).subscribe(result => {
      console.log(result);
    },
      error => {
        this.app.showError('Failed deleting certificate.');
        console.log(error);
      });

    this.clientService.deleteClient(client).subscribe(result => {
      console.log(result);
    },
      error => {
        this.app.showError('Failed deleting client.');
        console.log(error);
        return;
      });

    const index = this.clients.indexOf(client);
    this.clients.splice(index, 1);
    this.confirmClient = null;
  }

  confirmDelete(client: Client) {
    console.log(client.client_id);
    this.confirmClient = client.client_id;
  }

  hideConfirmDelete() {
    this.confirmClient = null;
  }

  hasScopes(client: Client) {
    return client.scope && client.scope.length !== 0;
  }

}
