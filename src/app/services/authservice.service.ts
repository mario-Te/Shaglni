
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_DOMAIN } from './app-domain';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient) { }
  // Example service function to fetch user data from an API
  Register(resource: any): Observable<any> {
    return this.http.post<any>(`${API_DOMAIN}/register`, resource).pipe(map(response => response.data));
  }
  login(resource: any): Observable<any> {
    return this.http.post<any>(`${API_DOMAIN}/login`, resource).pipe(map(response => response.data));
  }
  loginCompany(resource: any): Observable<any> {
    return this.http.post<any>(`${API_DOMAIN}/login-company`, resource).pipe(map(response => response.data));
  }
  RegisterCompany(resource: any) {
    return this.http.post<any>(`${API_DOMAIN}/register-company`, resource).pipe(map(response => response.data));
  }
}
