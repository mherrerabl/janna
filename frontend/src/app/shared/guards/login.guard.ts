import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app.reducers';
import { TypeUser, UserClass } from '../../users/models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  private user!: UserClass;
  constructor(private router: Router, private store: Store<AppState>) {
    this.store.select('user').subscribe((store) => {
      this.user = new UserClass('', '', '', '', '', null, TypeUser['user'], '');
      if (store.user) {
        this.user = store.user;
      }
    });
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.user.id !== '') {
      return true;
    }

    this.router.navigate(['/']);

    return false;
  }
}
