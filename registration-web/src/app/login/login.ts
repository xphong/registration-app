import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'rg-login',
  templateUrl: './login.html'
})
export class Login {
  public errorMessage = '';
  public successMessage = '';

  private form: FormGroup;
  private username = new FormControl('', Validators.required);
  private password = new FormControl('', Validators.required);

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    console.log('hello `Login` component');
  }

  login() {
    this.authService.login(this.form.value)
        .subscribe(data => {
          if (data) {
            this.errorMessage = '';
            this.successMessage = 'Login successful';
            this.router.navigate(['admin/userlist']);
          } else {
            this.errorMessage = 'Error';
            this.successMessage = '';
          }
        }, error => {
          this.errorMessage = error;
          this.successMessage = '';
        });
  }

  createForm() {
    this.form = this.formBuilder.group({
      username:  this.username,
      password: this.password
    });
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }
}
