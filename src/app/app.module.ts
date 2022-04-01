import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }            from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OAuthModule }         from 'angular-oauth2-oidc';

import { AppRoutingModule }              from './app-routing.module';
import { BrowserAnimationsModule }       from '@angular/platform-browser/animations';
import { NgbModule }                     from '@ng-bootstrap/ng-bootstrap';
import { SearchPipe }                    from './util/search.pipe';
import { SettingsService }               from './services/settings.service';
import { OAuthInterceptor }              from './oauth.interceptor';
import { APP_INITIALIZER }               from '@angular/core';
import { HTTP_INTERCEPTORS }             from '@angular/common/http';

// Components
import { AppComponent }                  from './components/app/app.component';
import { SelfServiceComponent }          from './components/self-service/self-service.component';
// import { ExternProvidersComponent }      from './components/provider/provider.component';
// import { ExternProviderDetailComponent } from './components/provider-detail/provider-detail.component';
import { WebfingerComponent }            from './components/webfinger/webfinger.component';
import { UserDetailComponent }           from './components/user-detail/user-detail.component';
import { ClientDetailComponent }         from './components/client-detail/client-detail.component';
import { EndpointsComponent }            from './components/endpoints/endpoints.component';
import { ConfigComponent }               from './components/config/config.component';
import { UsersComponent }                from './components/user/user.component';
import { ClientComponent }               from './components/client/client.component';
import { InputfieldComponent }           from './components/inputfield/inputfield.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    UsersComponent,
    ClientComponent,
    UserDetailComponent,
    ClientDetailComponent,
    EndpointsComponent,
    SearchPipe,
    SelfServiceComponent,
//    ExternProvidersComponent,
//    ExternProviderDetailComponent,
    WebfingerComponent,
    InputfieldComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    SettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: (settings: SettingsService) => () => settings.load(),
      deps: [SettingsService], multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
