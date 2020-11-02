import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(this.getCurrentUser() !== null);

  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(model: LoginModel) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, model)
      .pipe(map(user => {
        localStorage.setItem(environment.storageKey, JSON.stringify(user));
        this.isLoggedIn.next(true);
        return user;
      }));
  }

  register(model: RegisterModel) {
    return this.http.post<any>(`${environment.apiUrl}/users`, model);
  }

  getCurrentUser(): User {
    return <User>JSON.parse(localStorage.getItem(environment.storageKey));
  }

  logout() {
    localStorage.removeItem(environment.storageKey);
    this.router.navigate(['/auth/login']);
    this.isLoggedIn.next(false);
  }
}
