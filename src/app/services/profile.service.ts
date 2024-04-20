import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_DOMAIN } from './app-domain';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${API_DOMAIN}/personal-info`, { headers }).pipe(
      map(response => response.data)
    );

  }
  getUserData(query: string): Observable<any> {

    return this.http.get<any>(`${API_DOMAIN}/user-info?user=${query}`).pipe(
      map(response => response.data)
    );

  }
  getCompanyData(query: any) {
    return this.http.get<any>(`${API_DOMAIN}/company-info?company=${query}`).pipe(
      map(response => response.data)
    );
  }
  UpdateSkills(formSkills: any[]) {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${API_DOMAIN}/update-skills`, { formSkills }, { headers }).pipe(
      map(response => response.data)
    );

  }
  UpdateBasicInfo(resource: any) {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${API_DOMAIN}/update-basic-info`, resource, { headers }).pipe(
      map(response => response.data)
    );
  }


  Updatebio(resource: any) {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${API_DOMAIN}/update-bio`, { bio: resource.bio }, { headers }).pipe(
      map(response => response.data)
    );
  }
  UpdateEducation(resource: any) {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${API_DOMAIN}/update-education`, { education: resource.education }, { headers }).pipe(
      map(response => response.data)
    );
  }
  uploadImage(formData: FormData): Observable<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,

    });
    return this.http.put<any>(`${API_DOMAIN}/update-image`, formData, {
      headers
    }).pipe(
      map(response => response.data));
  }
}
