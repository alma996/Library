import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { AuthenticationService, TokenPayload } from '../authentication.service'

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    user_id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }

  constructor(private auth: AuthenticationService, private router: Router, private fb: FormBuilder, private toastr: ToastrService) { }

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/'), this.showSuccess()
      },
      err => {
        console.error(err), this.errorSuccess()
      }
    )
  }

  showSuccess() {
    this.toastr.success('You are logged in', 'Successfully');
  }

  errorSuccess() {
    this.toastr.error('Please check your email or password', 'Error');
  }
}