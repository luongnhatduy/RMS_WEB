import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/index';
@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  error = '';

  constructor(fb: FormBuilder, private route: Router, private authenticationService: AuthenticationService) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: any): void {
    this.submitted = true;
    if (this.form.valid) {

      this.authenticationService.login(values.username, values.password).subscribe(
        response => {
          if (response.status) {
            localStorage.setItem('currentUser', JSON.stringify(
              {
                id: response.data.id,
                taikhoan: response.data.taikhoan,
                ho: response.data.ho,
                ten: response.data.ten,
                token: response.data.token,
                quyen: response.data.quyen
              }));
          this.error = '';
            this.route.navigateByUrl('/dashboard');
          }
        },
        error => {
         this.error = 'tài khoản hoặc mật khẩu không chính xác!';
        }
      );
    }
  }
}
