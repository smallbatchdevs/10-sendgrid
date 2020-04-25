import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../shared/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  googleLogin() {
    this.authService.signInWithGoogle().then(res => {
      console.log('LoginComponent:: successful login');
    });
  }
}
