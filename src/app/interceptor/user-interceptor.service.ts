import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { TokenService } from '../service/token.service';
import { LoaderService } from '../utils/loader.service';

@Injectable({
  providedIn: 'root'
})
export class UserInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService, public loaderService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);
    let intReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      intReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) })
    }
    return next.handle(intReq).pipe(
      finalize(
        () => {
          this.loaderService.isLoading.next(false);
        }
      )
    ).pipe(catchError(this.ErrorHandling));
  }
  ErrorHandling(error:HttpErrorResponse){
    console.error("user not authorized");
    return throwError(error)
  }
}


export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi: true }]
