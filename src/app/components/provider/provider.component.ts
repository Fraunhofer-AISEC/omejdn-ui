import { Component, OnInit } from '@angular/core';
import { AppComponent }      from '../app/app.component';
import { Provider }          from '../../interfaces/provider';
import { ProviderService }   from '../../services/provider.service';

@Component({
  selector: 'app-extern-providers',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ExternProvidersComponent implements OnInit {

  providers: Provider [];
  confirmProvider: string;
  searchTerm: string;
  showNewProvider: boolean;

  constructor(public app: AppComponent, private providerService: ProviderService) { }

  ngOnInit(): void {
    this.app.setPageTitle('External OAuth Providers');
    this.app.setPageAccessLevel('admin');
    if (!this.app.isAdmin()) {
      return;
    }

    this.pullProviders();
    this.confirmProvider = '';
  }

  pullProviders() {
    this.providers = [];
    this.providerService.getProviders().subscribe(providers => {
      this.providers = providers;
    },
    error => {
      console.log(error);
      this.app.showError('Failed loading providers.');
    });
  }


  confirmDelete(provider: Provider) {
    this.confirmProvider = provider.name;
  }

  hideConfirmDelete() {
    this.confirmProvider = null;
  }

  addProvider(providerName: string) {
    this.providerService.postProvider({
      name: providerName,
      redirect_uri: '',
      client_id: '',
      client_secret: '',
      scopes: [],
      claim_mapper: '',
      authorization_endpoint: '',
      token_endpoint: '',
      userinfo_endpoint: '',
      response_type: '',
      logo: '',
      external_userid: '',
      mapping_key: '',
      mapping_pairs: []
    }).subscribe(res => {
      console.log(res);
      location.href = '/provider/' + providerName;
    },
    error => {
      this.app.showError('Failed saving provider.');
      console.log (error);
    });
  }

  deleteProvider(provider: Provider) {
    this.providerService.deleteProvider(provider).subscribe(result => {
      console.log (result);
    },
    error => {
      this.app.showError('Failed deleting provider.');
      console.log (error);
      return;
    });
    const index = this.providers.indexOf (provider);
    this.providers.splice (index, 1);
    this.confirmProvider = null;
  }

}
