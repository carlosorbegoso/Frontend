import { HttpClient,HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SysUser } from '../models/response/sys-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = `${environment.API_URL}/api/user`;
  constructor(private httpClient: HttpClient) { }

  public userFindAll():Observable<any>{
    return this.httpClient.get<any>(this.URL+"/all");
  }
  public save(user:SysUser){
    return this.httpClient.post(this.URL,user)
  }

}
