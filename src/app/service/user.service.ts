import { HttpClient,HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = `${environment.API_URL}/user/`;
  constructor(private httpClient: HttpClient) { }

  public userFindAll(){
    return this.httpClient.get(this.URL+"all");
  }

}
