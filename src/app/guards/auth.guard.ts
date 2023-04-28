import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private auth: AuthService) {}

  canActivate: (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) =>
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  };
}
