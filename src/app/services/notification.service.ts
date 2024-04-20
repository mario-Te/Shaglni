import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_DOMAIN } from './app-domain';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(private http: HttpClient) { }
  getNotification(): Observable<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${API_DOMAIN}/get-notifications`, { headers }).pipe(
      map(response => response.data)
    );
  }
  openNotifications(): Observable<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${API_DOMAIN}/open-notifications`, {}, { headers }).pipe(
      map(response => response.data)
    );
  }
}
