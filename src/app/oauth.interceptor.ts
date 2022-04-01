import { Injectable, Optional }                                 from '@angular/core';
import { OAuthStorage }                                         from 'angular-oauth2-oidc';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { SettingsService }                                      from './services/settings.service';
import { Observable }                                           from 'rxjs';

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {

    constructor(
        private authStorage: OAuthStorage,
        @Optional() private settings: SettingsService
    ) {
    }

    private checkUrl(url: string): boolean {
        const found = url.startsWith(this.settings.get().apiUrl);
        console.log('Adding authZ header: ' + found);
        return !!found;
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const url = req.url.toLowerCase();

        if (!this.settings) { return next.handle(req); }
        if (!this.settings.get()) { return next.handle(req); }
        if (!this.settings.get().apiUrl) { return next.handle(req); }
        if (!this.checkUrl(url)) { return next.handle(req); }

        const token = this.authStorage.getItem('access_token');
        const header = 'Bearer ' + token;

        const headers = req.headers
                                .set('Authorization', header);

        req = req.clone({ headers });
        console.log('Added authZ header: ' + header);
        return next.handle(req);

    }
}
