import { Component, OnInit } from '@angular/core';
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
  error = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  register(e) {
    const form = e.form;

    const registerModel = <RegisterModel> {
      name: form.controls.name.value,
      email: form.controls.email.value,
      password: form.controls.password.value,
      passwordConfirm: form.controls.passwordConfirm.value
    }

    this.authService.register(registerModel)
      .subscribe(
        data => {
          this.loading = false;
          this.success = true;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
