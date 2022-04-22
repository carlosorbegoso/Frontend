import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/response/auth';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  auth:Auth;
  password : string;
  username : string;
  roles: string[] = [];
  messageError: string;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }
  onLogin():void {
    this.auth = new Auth(this.username, this.password)
    this.authService.login(this.auth).subscribe(
      (data: any) => {
        this.isLogged = true;
        this.isLoginFail = false;
        this.tokenService.setToken(data.data.token);
        this.tokenService.setUserName(data.data.name);
        this.tokenService.setAuthorities(data.data.roles);
        this.tokenService.setAvatar(data.data.avatar);
        this.roles = data.roles;
      },message => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.messageError =  message.error.message + " " + message.statusText; 
      }
    )
  };

}
