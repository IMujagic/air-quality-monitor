import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(model: LoginModel) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, model)
      .pipe(map(user => {
        localStorage.setItem(environment.storageKey, JSON.stringify(user));
        return user;
      }));
  }

  register(model: RegisterModel) {

  }

  currentUserValue(): User {
    return <User>JSON.parse(localStorage.getItem(environment.storageKey));
  }

  logout() {
    localStorage.removeItem(environment.storageKey);
  }
}
