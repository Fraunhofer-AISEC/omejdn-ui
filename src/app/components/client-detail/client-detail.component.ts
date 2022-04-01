import { Component, OnInit } from '@angular/core';
import { AppComponent }      from '../app/app.component';
import { ClientService }     from '../../services/client.service';
import { ActivatedRoute }    from '@angular/router';
import { Client }            from '../../interfaces/client';
import { Certificate }       from '../../interfaces/certificate';
import { Attribute }         from '../../interfaces/attribute';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  client: Client;
  cert: Certificate;
  configNames = {
    client_name: 'Name',
    client_uri: 'URL for more information',
    logo_uri: 'URL to the Logo',
    tos_uri: 'URL to the Terms of Service',
    policy_uri: 'URL to the Privacy Policy',
    contacts: 'Contacts',
    client_secret: 'Secret',
    grant_types: 'Grant Types (hold ctrl to select multiple)',
    redirect_uris: 'Redirect URIs',
    post_logout_redirect_uris: 'Post Logout Redirect URIs',
  };

  constructor(private route: ActivatedRoute,
              private clientService: ClientService,
              public app: AppComponent) { }

  ngOnInit(): void {
    this.app.setPageTitle('Clients');
    this.app.setPageAccessLevel('admin');

    if (!this.app.isAdmin()) {
      return;
    }
    this.pullClient();
    this.pullCertificate();

    this.cert = {
      certificate: '',
      certfile: ''
    };
  }

  saveChanges(): void {
    if (this.cert.certificate !== '') {
      this.clientService.putClientCertificate (this.cert, this.client).subscribe(() => {
      }, error => {
        this.app.showError('Failed saving certificate.');
        console.log (error);
      });
    } else {
      this.clientService.deleteClientCertificate (this.client).subscribe(() => {
      }, error => {
        this.app.showError('Failed removing certificate.');
        console.log (error);
      });
    }

    this.clientService.putClient(this.client).subscribe(() => {
      this.app.showInfo('Saved.');
    },
    error => {
      this.app.showError('Failed saving changes.');
      console.log (error);
    });
  }

  pullClient(): void {
    const clientId = this.route.snapshot.paramMap.get('client_id');
    console.log(clientId);
    this.clientService.getClient(clientId).subscribe(client => {
      let metadata=['redirect_uris',
                    'post_logout_redirect_uris',
                    'grant_types',
                    'response_types',
                    'contacts',
                    'scope',
                    'resource']
      for(let md of metadata)
        if (client[md] != undefined && !Array.isArray(client[md])) client[md] = [client[md]]
      this.client = client;
      this.app.setPageTitle('Edit Client: ' + client.client_id);
    },
    error => {
      this.app.showError('Failed loading client.');
      console.log (error);
    });
  }

  pullCertificate() {
    const clientId = this.route.snapshot.paramMap.get('client_id');

    this.clientService.getClientCertificate(clientId).subscribe(cert => {
      this.cert = cert;
    },
    error => {
      if (error.status !== 404) { // 404 means no certificate registered
        this.app.showError('Failed loading certificate.');
      }
      console.log (error);
    });
  }

  correctScope(scope): boolean {
    return !this.client.scope.includes(scope);
  }

  correctAttributeKey(key) {
    if (key.length === 0) { return false; }
    for (const attribute of this.client.attributes) {
      if (attribute.key === key) { return false; }
    }
    return true;
  }

}
