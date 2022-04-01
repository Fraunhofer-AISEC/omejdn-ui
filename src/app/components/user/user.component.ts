import { Component, OnInit } from '@angular/core';
import { AppComponent }      from '../app/app.component';
import { UserService }       from '../../services/user.service';
import { User }              from '../../interfaces/user';
import { Router }            from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UsersComponent implements OnInit {
  users: User [];
  confirmUser: string;
  searchTerm: string;
  openUser: User;
  showNewUser: boolean;

  constructor(private userService: UserService, public router: Router, public app: AppComponent) { }

  ngOnInit(): void {
    this.app.setPageTitle('Users');
    this.app.setPageAccessLevel('admin');
    if (!this.app.isAdmin()) {
      return;
    }

    this.users = [];
    this.userService.getUsers().subscribe (users => {
      this.users = users;
      console.log(this.users);
    },
    error => {
      this.app.showError('Failed loading users.');
      console.log (error);
    });
  }

  addUser(username: string) {
    this.userService.postUser({
      username,
      password: null,
      attributes: [],
      userBackend: null,
      extern: null,
    }).subscribe(result => {
      console.log(result);
      location.href = '/user/' + username;
    },
      error => {
        this.app.showError('Failed adding new user.');
        console.log(error);
      });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(result => {
      console.log (result);
    },
    error => {
      this.app.showError('Failed deleting user.');
      console.log (error);
      return;
    });
    const index = this.users.indexOf (user);
    this.users.splice (index, 1);
    this.confirmUser = null;
  }

  showDetail(username: string): void {
    console.log (username);
    this.router.navigate (['user', username]);
  }

  confirmDelete(user: User) {
    this.confirmUser = user.username;
  }

  hideConfirmDelete() {
    this.confirmUser = null;
  }

  hasAttributes(user: User) {
    if (user.attributes.length === 0) {
      return false;
    }
    return true;
  }

  hasLotsOfAttributes(user: User) {
    return user.attributes.length > 3;
  }

  getAttribute(user, key) {
    for (const attr of user.attributes) {
      if (attr.key === key) { return attr.value; }
    }
    return null;
  }
  getUserAttributes(user: User) {
    const res = [];
    let i = 0;
    for (const attr of user.attributes) {
      res.push(attr);
      i++;
      if ((i >= 3) && (this.openUser !== user)) {
        return res;
      }
    }
    return res;
  }
}
