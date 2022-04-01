import { Component, OnInit } from '@angular/core';
import { AppComponent }      from '../app/app.component';
import { User }              from '../../interfaces/user';
import { UserService }       from '../../services/user.service';
import { ActivatedRoute }    from '@angular/router';
import { Attribute }         from '../../interfaces/attribute';
import { ConfigService }     from '../../services/config.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  newAttributeValue: string[];
  newAttributeKey: string;
  simpleAttribute: boolean;
  provider: any;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              public app: AppComponent,
              private configService: ConfigService) { }

  ngOnInit(): void {
    this.app.setPageTitle('Users');
    this.app.setPageAccessLevel('admin');
    if (!this.app.isAdmin()) {
      return;
    }

    this.pullUser();
    this.newAttributeValue = [];
    this.newAttributeKey = '';
    this.simpleAttribute = true;
  }

  pullUser(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.userService.getUser(username).subscribe(user => {
      this.user = user;
      this.app.setPageTitle(user.username);
      if (this.isExtern()) {
        this.pullProvider(); }
    },
    error => {
      this.app.showError('Failed loading user.');
      console.log (error);
    });
  }

  pullProvider(): void {
    this.configService.getOauthProvider(this.user.extern).subscribe(provider => {
      this.provider = provider;
    },
    error => {
      this.app.showError('Failed loading extern Provider.');
      console.log (error);
    });
  }

  saveChanges(): void {
    this.userService.putUser(this.user).subscribe(result => {
      console.log(result);
      this.pullUser();
      this.app.showInfo('Saved.');
    },
    error => {
      this.app.showError('Failed saving changes.');
      console.log (error);
    });
  }


  getAttributeIndex(attribute: Attribute): number {
    return this.user.attributes.indexOf[attribute.key];
  }

  addAttribute() {
    if (!this.correctAttributeKey()) {
      return;
    }
    console.log (this.simpleAttribute);
    if (this.simpleAttribute) {
      const newAttribute: Attribute = {
        key: this.newAttributeKey,
        value: '',
      };
      this.user.attributes.push(newAttribute);
    } else {
      const newAttribute: Attribute = {
        key: this.newAttributeKey,
        value: [],
      };
      this.user.attributes.push(newAttribute);
    }
    this.newAttributeKey = '';

  }

  deleteAttribute(attribute: Attribute) {
    const index = this.user.attributes.indexOf(attribute);
    this.user.attributes.splice (index, 1);
  }

  correctAttributeKey() {
    if (this.newAttributeKey === '') {
      return false;
    }
    for (const attribute of this.user.attributes) {
      if (attribute.key === this.newAttributeKey) {
        return false;
      }
    }
    return true;
  }

  isArray(value: any) {
    return Array.isArray(value);
  }

  getIndex(attribute: Attribute): number {
    return this.user.attributes.indexOf(attribute);
  }

  deleteValue(attribute: Attribute, item: any) {
    const index = this.user.attributes[this.getIndex(attribute)].value.indexOf(item);
    if (index !== -1) {
      this.user.attributes[this.getIndex(attribute)].value.splice(index, 1);
    }
  }

  addValue(attribute: Attribute) {
    const thisNewValue = this.newAttributeValue[this.getIndex(attribute)];
    if (thisNewValue !== '' && thisNewValue !== undefined && !attribute.value.includes(this.newAttributeValue[this.getIndex(attribute)])) {
      attribute.value.push(thisNewValue);
      this.newAttributeValue[this.getIndex(attribute)] = '';
    }
  }

  isExtern() {
    if (!this.user.extern) {
      return false;
    }
    return true;
  }

  hasMappingKeyClaim() {
    for (const attribute of this.user.attributes) {
      if (attribute.key === this.provider.mapping_key) {
        return true;
      }
    }
    return false;
  }

  addMappingKeyClaim() {
    this.newAttributeKey = this.provider.mapping_key;
    this.addAttribute();
  }
}




