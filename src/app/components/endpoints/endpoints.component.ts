import { Component, OnInit } from '@angular/core';
import { AppComponent }      from '../app/app.component';
import { SettingsService }   from '../../services/settings.service';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.css']
})
export class EndpointsComponent implements OnInit {

  constructor(public app: AppComponent, public settings: SettingsService) { }

  ngOnInit(): void {
    this.app.setPageTitle('Endpoints');
    this.app.setPageAccessLevel('');
  }

}
