import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public loginService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url != this.loginService.hostEndPoint + '/auth/login'
            && req.url != this.loginService.hostEndPoint + '/auth/register') {

            const request = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.loginService.tokenObserver.getValue()
                })
            });

            return next.handle(request);
        }
        else {
            return next.handle(req);
        }
    }
}