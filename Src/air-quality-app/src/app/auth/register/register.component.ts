import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { RegisterModel } from 'src/app/core/models/register.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading = false;
  success = false;
  errors = [];
  sub = null;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {}

  register(e) {
    const form = e.form;

    const registerModel = <RegisterModel> {
      name: form.controls.name.value,
      email: form.controls.email.value,
      city: form.controls.city.value,
      password: form.controls.password.value,
      passwordConfirm: form.controls.passwordConfirm.value
    }
    this.errors = [];
    this.loading = true;
    this.sub = this.authService.register(registerModel)
      .subscribe(
        data => {
          this.router.navigate(['/auth/login'], { queryParams: { message: `User created. Please login!` }});
        },
        error => {
          if(Array.isArray(error)) {
            this.errors = this.errors.concat(error);
          } else {
            this.errors.push(error);
          }
        }
      )
      .add(() => {
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
