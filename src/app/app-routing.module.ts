import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { UsersComponent }                from './components/user/user.component';
import { ClientComponent }               from './components/client/client.component';
import { ConfigComponent }               from './components/config/config.component';
import { UserDetailComponent }           from './components/user-detail/user-detail.component';
import { ClientDetailComponent }         from './components/client-detail/client-detail.component';
import { EndpointsComponent }            from './components/endpoints/endpoints.component';
import { SelfServiceComponent }          from './components/self-service/self-service.component';
// import { ExternProvidersComponent }      from './components/provider/provider.component';
// import { ExternProviderDetailComponent } from './components/provider-detail/provider-detail.component';
import { WebfingerComponent }            from './components/webfinger/webfinger.component';

const routes: Routes = [
  {path: 'user',                   component: UsersComponent},
  {path: 'user/:username',         component: UserDetailComponent},
  {path: 'client',                 component: ClientComponent},
  {path: 'client/:client_id',      component: ClientDetailComponent},
//  {path: 'provider',               component: ExternProvidersComponent},
//  {path: 'provider/:providername', component: ExternProviderDetailComponent},
  {path: 'config',                 component: ConfigComponent},
  {path: 'endpoints',              component: EndpointsComponent},
  {path: 'selfservice',            component: SelfServiceComponent},
  {path: 'webfinger',              component: WebfingerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
