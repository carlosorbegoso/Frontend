import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestAuth } from '../models/request/request-auth';
import { Auth } from '../models/response/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = `${environment.API_URL}/auth/`;
  constructor(private HttpClient: HttpClient) { }

  public login(auth: Auth): Observable<RequestAuth> {

    return this.HttpClient.post<RequestAuth>(this.URL + "login", auth);
  }

  public logoutBackend(token: String) {
    return this.HttpClient.post(`${this.URL}logout?token=${token}`, null);
  }


}
