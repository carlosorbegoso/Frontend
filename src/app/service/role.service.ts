import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private URL = `${environment.API_URL}/api/role/`;
  constructor(private HttpClient: HttpClient) { }

  public roleAll(): Observable<any> {
    return this.HttpClient.get(this.URL + 'all')
  }
}
