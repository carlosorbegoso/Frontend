import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SysUser } from 'src/app/models/response/sys-user';
import { UserService } from 'src/app/service/user.service';

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
    
  constructor(private userService: UserService,private fb:FormBuilder) { }
  user: SysUser
  ngOnInit(): void {

  }
  save(user: SysUser): void {
    this.userService.save(user).subscribe(
      (data: any) => {
        alert(data)
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
