import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  tokenObserver = new BehaviorSubject<string>("");

  hostEndPoint = "http://localhost:1453/api";

  constructor(private http: HttpClient) { }

  callLogin(email: string, pass: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { 'email': email, 'password': pass };
    return this.http.post<any>(this.hostEndPoint + '/auth/login', body, { headers: headers });
  }

  callRegister(email: string, pass: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { 'email': email, 'password': pass };
    return this.http.post<any>(this.hostEndPoint + '/auth/register', body, { headers: headers });
  }
}
