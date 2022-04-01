import { Component, OnInit } from '@angular/core';
import { FormControl }       from '@angular/forms'
import { AppComponent }      from '../app/app.component';
import { ConfigService }     from '../../services/config.service';
import { Config }            from '../../interfaces/config';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  config: Config;
  showPlugin = new FormControl('');
  configNames = {
    issuer: 'Issuer Identifier',
    front_url: 'Front URL',
    bind_to: 'Bind To',
    allow_origin: 'Allow Origin',
    app_env: 'Application Environment',
    default_audience: 'Default Audience',
    accept_audience: 'Accepted Audience',
    user_backend_default: 'Default User Backend',
    access_token: 'Access Token',
    id_token: 'ID Token',
    expiration: 'Expiration',
    algorithm: 'Signing Algorithm',
    openid: 'Enable OpenID functionality'
  };

  constructor(public app: AppComponent, private configService: ConfigService) { }

  ngOnInit(): void {
    this.app.setPageTitle('Config');
    this.app.setPageAccessLevel('admin');

    if (!this.app.isAdmin()) { return; }

    this.pullConfig();
  }

  pullConfig(): void {
    this.configService.getConfig().subscribe (config => {
      this.config = config;
    },
    error => {
      this.app.showError('Failed loading config.');
      console.log (error);
    });
  }

  saveChanges() {
    this.configService.putConfig(this.config).subscribe(result => {
      console.log (result);
      this.app.showInfo('Your changes have been saved.');
    },
    error => {
      this.app.showError('Failed saving changes.');
      console.log (error);
    });
  }

  getPlugin() {
    const arr = this.showPlugin.value.split('.', 2);
    if (arr.length < 2) { return []; }
    return [this.config.plugins[arr[0]][arr[1]] || {}];
  }

  getPlugins(type) {
    return Object.keys(this.config.plugins[type] || {});
  }

  getConfigSettings(config) {
    return Object.keys(config);
  }
}
