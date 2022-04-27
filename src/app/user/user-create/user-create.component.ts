import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SysRole } from 'src/app/models/response/sys-role';
import { SysUser } from 'src/app/models/response/sys-user';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';
import { NotificationService } from 'src/app/utils/notification.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  roles: SysRole[] = [];
  users: SysUser = {
    roles: []
  }



  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private roleService: RoleService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getRole();
  }
  save(user: SysUser): void {
    this.userService.save(user).subscribe(
      (data: any) => {
        try {
          if(data.status == 500)throw data.message
          this.notificationService.showSuccess("Data shown successfully !!", data.message);
        } catch (e) {
          this.notificationService.showError('Hello world!', 'Toastr fun!');
        }
       
      }
    )

  }
  getRole(): void {
    this.roleService.roleAll().subscribe(
      data => {
        this.roles = data.data;
      }
    )
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
