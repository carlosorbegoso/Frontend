import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// guards
import { UserGuardService as guard } from './guards/user-guard.service';
//login
import { LoginComponent } from './auth/login/login.component';
//user
import { UserCreateComponent } from './user/user-create/user-create.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'user/create',component:UserCreateComponent,canActivate:[guard],data:{expectedRol:['admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
