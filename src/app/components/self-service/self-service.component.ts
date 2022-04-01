import { Component, OnInit } from '@angular/core';
import { AppComponent }      from '../app/app.component';
import { UserService }       from '../../services/user.service';
import { ConfigService }     from '../../services/config.service';
import { Attribute }         from '../../interfaces/attribute';

@Component({
  selector: 'app-self-service',
  templateUrl: './self-service.component.html',
  styleUrls: ['./self-service.component.css']
})
export class SelfServiceComponent implements OnInit {

  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  newAttributeValue: string[];
  newAttributeKey: string;
  simpleAttribute: boolean;
  provider: any;

  constructor(private userService: UserService, private configService: ConfigService, public app: AppComponent) { }

  ngOnInit(): void {
    this.app.setPageTitle('Selfservice');
    this.app.setPageAccessLevel('login');
    if (!this.app.isLoggedIn()) { return; }
    if (this.app.isExtern()) { this.pullProvider(); }

    this.currentPassword = '';
    this.newPassword = '';
    this.newPasswordConfirm = '';
    this.newAttributeValue = [];
    this.newAttributeKey = '';
    this.simpleAttribute = true;
  }

  newPasswordConfirmed() {
    return this.newPassword === this.newPasswordConfirm;
  }

  canChangePassword() {
    return this.currentPassword !== '' && this.newPassword !== '' && this.newPasswordConfirmed();
  }

  changePassword() {
    if (!this.canChangePassword()) {
      return false;
    }
    this.userService.putPassword(this.currentPassword, this.newPassword).subscribe(res => {
      this.currentPassword = '';
      this.newPassword = '';
      this.newPasswordConfirm = '';
    },
    error => {
      console.log(error);
      this.currentPassword = '';
      this.newPassword = '';
      this.newPasswordConfirm = '';
    });
  }

  pullProvider(): void {
    this.configService.getOwnProvider().subscribe(provider => {
      this.provider = provider;
    }, () => {}); // 404 means there is no provider
  }

  saveChanges(): void {
    this.userService.putUser(this.app.user).subscribe(result => {
      console.log(result);
      if (this.app.isExtern()) { this.pullProvider(); }
      this.app.showInfo('Saved.');
    },
    error => {
      this.app.showError('Failed saving changes.');
      console.log (error);
    });
  }


  getAttributeIndex(attribute: Attribute): number {
    return this.app.user.attributes.indexOf[attribute.key];
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
      this.app.user.attributes.push(newAttribute);
    } else {
      const newAttribute: Attribute = {
        key: this.newAttributeKey,
        value: [],
      };
      this.app.user.attributes.push(newAttribute);
    }
    this.newAttributeKey = '';
  }

  deleteAttribute(attribute: Attribute) {
    const index = this.app.user.attributes.indexOf(attribute);
    this.app.user.attributes.splice (index, 1);
  }

  correctAttributeKey() {
    if (this.newAttributeKey === '') {
      return false;
    }
    for (const attribute of this.app.user.attributes) {
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
    return this.app.user.attributes.indexOf(attribute);
  }

  deleteValue(attribute: Attribute, item: any) {
    const index = this.app.user.attributes[this.getIndex(attribute)].value.indexOf(item);
    if (index !== -1) {
      this.app.user.attributes[this.getIndex(attribute)].value.splice(index, 1);
    }
  }

  addValue(attribute: Attribute) {
    const thisNewValue = this.newAttributeValue[this.getIndex(attribute)];
    if (thisNewValue !== '' && thisNewValue !== undefined && !attribute.value.includes(this.newAttributeValue[this.getIndex(attribute)])) {
      attribute.value.push(thisNewValue);
      this.newAttributeValue[this.getIndex(attribute)] = '';
    }
  }

  hasMappingKeyClaim() {
    for (const attribute of this.app.user.attributes) {
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
