import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { CookieService } from '@services/cookie.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly cookieService: CookieService,
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.cookieService.isAuthenticated();

    if (isAuthenticated) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
