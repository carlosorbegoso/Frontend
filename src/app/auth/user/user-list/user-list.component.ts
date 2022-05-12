import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SysUser } from 'src/app/models/response/sys-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';
import { NotificationService } from 'src/app/utils/notification.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['username', 'mobile', 'email', 'roles', 'createTime'];
  dataUsers = new MatTableDataSource;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLogged: boolean = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private userService: UserService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    this.findAll();

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataUsers.filter = filterValue.trim().toLowerCase();
  }


  findAll(){
    this.userService.userFindAll().forEach(
      (data: any) => {
        this.dataUsers = new MatTableDataSource(data);
      }).catch((error: any) => {
        this.notificationService.showWarning(error.message, "Not authorization")
      });
  }

}
