import { Component }       from '@angular/core';
import { OAuthService }    from 'angular-oauth2-oidc';
import { Router }          from '@angular/router';
import { Location }        from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { UserService }     from '../../services/user.service';
import { User }            from '../../interfaces/user';
import jwt_decode          from 'jwt-decode';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isMenuCollapsed = true;
  user: User = null;
  pageTitle = '';
  errorInfos: any [];
  infos: any [];
  pageAccessLevel = ''; // May be set to 'login' or 'admin' to show error messages

  constructor(public oauthService: OAuthService,
              private router: Router,
              private location: Location,
              private settings: SettingsService,
              private userService: UserService) {
      // Configure OAuth
      this.oauthService.configure({
        issuer: this.settings.get().oidcIssuer,
        redirectUri: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: this.settings.get().clientId,
        responseType: 'code',
        scope: 'openid omejdn:read omejdn:write omejdn:admin',
        showDebugInformation: true,
      });
      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        if (this.getId() != null) {
          this.userService.getSelf().subscribe(user => {
            this.user = user;
            // Forward non-Admin users after login
            if (this.user && !this.isAdmin() && this.getRoute() === '' && this.router.url.indexOf('code') !== -1) {
              this.router.navigateByUrl('/selfservice');
            }
          });
        }
      });
      this.errorInfos = [];
      this.infos = [];
  }

  login() {
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  logout() {
    this.oauthService.logOut(false);
  }

  isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  isAdmin() {
    if (!this.oauthService.hasValidAccessToken()) { return false; }
    return jwt_decode(this.oauthService.getAccessToken())['scope'].indexOf('omejdn:admin') > -1;
  }

  getId(): any {
    if (!this.oauthService.hasValidAccessToken()) { return null; }
    return jwt_decode(this.oauthService.getAccessToken())['sub'];
  }

  getRoute() {
    let result = this.location.path();
    // This should be resolved once the oauth lib implements RFC 9207
    result = result.split('?')[0]; // Remove query
    if (result.length > 0 && result[result.length - 1] === '/') { result = result.slice(0, -1); }
    return result;
  }

  isExtern() {
    return this.user == null || this.user.extern;
  }

  setPageTitle(title) {
    setTimeout(() => {this.pageTitle = title; });
  }
  setPageAccessLevel(level) {
    setTimeout(() => {this.pageAccessLevel = level; });
  }

  showInfo(message) {
    this.infos.push(message);
    setTimeout(() => (this.infos.shift()), 2000);
  }
  showError(message) {
    this.errorInfos.push(message);
  }

  hasPageAccessRights(level) {
    switch (level) {
      case 'admin':
        return this.isAdmin();
      case 'login':
        return this.isLoggedIn();
      default:
        return true;
    }
  }

  getPageAccessRightError() {
    switch (this.pageAccessLevel) {
      case 'admin':
        return 'You have to be logged in as an admin to see this content.';
      case 'login':
        return 'You have to be logged in to see this content.';
      default:
        return '';
    }
  }
}
