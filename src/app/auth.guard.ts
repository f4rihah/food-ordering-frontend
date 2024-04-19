import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAdmin = localStorage.getItem('isAdmin') === '1'; // Assuming admin flag is '1' for admin
    const userToken = localStorage.getItem('userToken');

    if (!userToken) {
      // If there's no token, the user is not logged in
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    if (route.data.isAdmin && !isAdmin) {
      // If route requires admin but user is not admin
      this.router.navigate(['/']); // Redirect to home page or unauthorized page
      return false;
    }

    return true; // User is logged in (and is admin if required)
  }
}
