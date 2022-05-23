import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routers: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'user', component: UserListComponent }
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routers),
  ]
})
export class AuthRoutingModule { }
