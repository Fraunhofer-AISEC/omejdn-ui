import { Injectable }      from '@angular/core';
import { Observable }      from 'rxjs';
import { HttpClient }      from '@angular/common/http';
import { User }            from '../interfaces/user';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = this.settings.get().apiUrl + '/config/users';
  selfServiceUrl = this.settings.get().apiUrl + '/user';

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  public getUser(username: string): Observable<User> {
    const url = this.userUrl + '/' + username;
    return this.http.get<User>(url);
  }

  postUser(user: User) {
    const url = this.userUrl;
    return this.http.post<User>(url, user);
  }

  putUser(user: User) {
    const url = this.userUrl + '/' + user.username;
    return this.http.put<User>(url, user);
  }

  public deleteUser(user: User) {
    const url = this.userUrl + '/' + user.username;
    return this.http.delete<User>(url);
  }

  putPassword(currentPassword: string, newPassword: string) {
    const url = this.selfServiceUrl + '/password';
    const data = {
      currentPassword,
      newPassword,
    };
    return this.http.put(url, data);
  }

  getSelf() {
    const url = this.selfServiceUrl;
    return this.http.get<User>(url);
  }

  putSelf(user: User) {
    const url = this.selfServiceUrl;
    return this.http.put<User>(url, user);
  }

  deleteSelf(user: User) {
    const url = this.selfServiceUrl;
    return this.http.delete<User>(url);
  }
}
