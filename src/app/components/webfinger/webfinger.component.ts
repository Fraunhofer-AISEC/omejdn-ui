import { Component, OnInit } from '@angular/core';
import { ConfigService }     from '../../services/config.service';
import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-webfinger',
  templateUrl: './webfinger.component.html',
  styleUrls: ['./webfinger.component.css']
})
export class WebfingerComponent implements OnInit {

  webfingerConfig: object;
  newDetail: object;

  constructor(
    private configService: ConfigService,
    public app: AppComponent,
  ) { }

  ngOnInit(): void {
    this.app.setPageTitle('Webfinger Config');
    this.app.setPageAccessLevel('admin');
    if (!this.app.isAdmin()) {
      return;
    }
    this.pullWebfinger();
    this.newDetail = {};
  }

  pullWebfinger() {
    this.configService.getWebfingerConfig().subscribe(config => {
      this.webfingerConfig = config;
      console.log(typeof this.webfingerConfig);
    },
    error => {
      console.log(error);
    });
  }

  saveChanges() {
    this.configService.putWebfingerConfig(this.webfingerConfig).subscribe(result => {
      console.log(result);
      this.app.showInfo('Your changes have been saved.');
    },
      error => {
        console.log(error);
      });
  }

  getMailKeys() {
    return Object.keys(this.webfingerConfig);
  }

  getDetailKeys(mail) {
    return Object.keys(this.webfingerConfig[mail]);
  }

  addEntry = (newKey, newType) => {
    this.webfingerConfig[newKey] = {};
  }

  addDetail(mail) {
    this.webfingerConfig[mail][this.newDetail[mail]] = '';
    this.newDetail[mail] = '';
  }

  deleteDetail(mail, detail) {
    delete this.webfingerConfig[mail][detail];
  }

  deleteEntry(mail) {
    delete this.webfingerConfig[mail];
  }

}
