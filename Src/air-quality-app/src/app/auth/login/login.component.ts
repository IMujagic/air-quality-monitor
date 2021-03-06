import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginModel } from 'src/app/core/models/login.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading: boolean;
  error: string;
  sub: any;
  message: string | number;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.message = params['message'] || '';
      });
  }

  login(e) {
    if (e.form.invalid) {
        return;
    }

    this.loading = true;
    this.authService.login(<LoginModel> 
      { 
        username: e.form.controls.email.value, 
        password: e.form.controls.password.value  
      })
      .subscribe(
        data => {
          this.loading = false;
          this.router.navigate(['/home']);
        },
        error => {
          this.error = 'Wrong credentials!';
          this.loading = false;
        });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
