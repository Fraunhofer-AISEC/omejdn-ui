import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { AppComponent }      from '../app/app.component';
import { Provider }          from '../../interfaces/provider';
import { ProviderService }   from '../../services/provider.service';
import { Attribute }         from '../../interfaces/attribute';

@Component({
  selector: 'app-extern-provider-detail',
  templateUrl: './provider-detail.component.html',
  styleUrls: ['./provider-detail.component.css']
})
export class ExternProviderDetailComponent implements OnInit {

  provider: Provider;
  newScope: string;
  newPairKey: string;
  editPairValue: any [];

  constructor(
    public app: AppComponent,
    private route: ActivatedRoute,
    private providerService: ProviderService) { }

  ngOnInit(): void {
    this.app.setPageTitle('External OAuth Providers');
    this.app.setPageAccessLevel('admin');
    if (!this.app.isAdmin()) {
      return;
    }

    this.pullProvider();
    this.newScope = '';
    this.newPairKey = '';
    this.editPairValue = [];
  }

  pullProvider() {
    const providername = this.route.snapshot.paramMap.get('providername');
    this.providerService.getProvider(providername).subscribe(provider => {
      this.provider = provider;
      this.app.setPageTitle(provider.name);
      console.log(this.provider);
    },
    error => {
      this.app.showError('Failed loading provider.');
      console.log(error);
    });
  }

  saveChanges() {
    this.providerService.putProvider(this.provider).subscribe(() => {
      this.app.showInfo('Saved.');
      this.editPairValue = [];
    },
    error => {
      this.app.showError('Failed saving changes.');
      console.log (error);
    });
  }

  deleteScope(scope) {
    const index = this.provider.scopes.indexOf(scope);
    if (index !== -1) {
      this.provider.scopes.splice(index, 1);
    }
  }

  addScope() {
    this.provider.scopes.push(this.newScope);
    this.newScope = '';
  }

  deleteMappingPair(pair: Attribute) {
    const index = this.provider.mapping_pairs.indexOf(pair);
    this.provider.mapping_pairs.splice (index, 1);
  }

  addMappingPair() {
    const newValue: Attribute = {
      key: '',
      value: 'true',
    };
    const newPair = {
      key: this.newPairKey,
      attribute: newValue,
    };
    this.provider.mapping_pairs.push(newPair);
  }

  getIndex(pair): number {
    return this.provider.mapping_pairs.indexOf(pair);
  }

  addMappingPairValue(pair) {
    this.editPairValue.push(pair);
  }

  valueEdited(pair) {
    return this.editPairValue.indexOf(pair) > -1;
  }

}
