import { Injectable } from '@angular/core';

const  TOKENT_KEY = 'AuthToken';
const  USERNAME_KEY = 'AuthUsername';
const  AUTHORITIES_KEY = 'AuthAutorities';
const  AVATAR_KEY =  "avatar";
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles:Array<string> = [];
  constructor() { }
  public setToken(token:string):void {
    window.sessionStorage.removeItem(TOKENT_KEY);
    window.sessionStorage.setItem(TOKENT_KEY, token);
  }
  public getToken() {
    return sessionStorage.getItem(TOKENT_KEY);
  }
  public setUserName(userName:string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }
  public getUserName() {
      return window.sessionStorage.getItem(USERNAME_KEY);
  }
  public setAvatar(avatar: string) {
    window.sessionStorage.removeItem(AVATAR_KEY)
    window.sessionStorage.setItem(AVATAR_KEY, avatar);
  }
  public getAvatar(){
    return window.sessionStorage.getItem(AVATAR_KEY);
  }

  public setAuthorities(roles:string[]):void {
		window.sessionStorage.removeItem(AUTHORITIES_KEY);
		window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(roles));
	}
	public getAuthorities():string[]{
		this.roles = [];
		if(sessionStorage.getItem(AUTHORITIES_KEY)){
			JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(roles => {
				this.roles.push(roles);
			});
		}
		return this.roles;
	}

	public  logOut():void{
		 window.sessionStorage.clear();
	}
}
