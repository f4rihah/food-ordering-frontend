import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiserviceService } from '../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private apiService: ApiserviceService) {
    this.isLoggedIn$ = this.apiService.isLoggedIn();
    this.isAdmin$ = this.apiService.isAdmin();
  }

  ngOnInit(): void {}

  // Method to determine if the Order Management link should be shown
  showOrderManagementLink(): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      switchMap((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          return this.isAdmin$;
        } else {
          return of(false);
        }
      })
    );
  }

  logout() {
    this.apiService.logoutUser();
  }
}
