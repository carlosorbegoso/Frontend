import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { LoaderService } from 'src/app/utils/loader.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  events: string[] = [];
  opened: boolean;

  isLogged = false;
  avatar = '';
  nameUser = '';

  constructor(
    public loaderService: LoaderService,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken) {
      this.isLogged = true;
      this.nameUser = this.tokenService.getUserName();
      this.avatar = this.tokenService.getAvatar();
    }else{
      this.isLogged = false;
    }
  }
  onLogOut() {
    this.authService.logoutBackend(this.tokenService.getToken()).subscribe(
      (data) => {
        this.tokenService.logOutFronted();
        window.location.reload();
        this.router.navigate(['/'])
      }
    );

  }

}
