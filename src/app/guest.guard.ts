import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem("Token");
    const isLoggedIn = token !== null ? true : false; // your condition to check if the user is logged in
    if (isLoggedIn) {
      this.router.navigateByUrl('/profile');
      return false;
    }
    return true;
  }
}
