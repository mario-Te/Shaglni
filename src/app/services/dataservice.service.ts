import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { API_DOMAIN } from './app-domain';

@Injectable({
  providedIn: 'root'
})
export class DataService {



  private specializations$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private jobs$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private jobs_company$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private specializationsLoaded: boolean = false;
  private jobsLoaded: boolean = false;
  private jobsCompanyLoaded: boolean = false;
  private currentpage = 1;

  constructor(private http: HttpClient) { }

  getSpecializations(): Observable<any> {
    if (!this.specializationsLoaded) {
      this.http.get<any>(`${API_DOMAIN}/get-specializations`).pipe(
        map(response => response.data),
        shareReplay(1)
      ).subscribe(data => {
        this.specializations$.next(data);
        this.specializationsLoaded = true;
      });
    }
    return this.specializations$;
  }

  getJobs(page: number): Observable<any> {
    if (!this.jobsLoaded || page != this.currentpage) {
      this.http.get<any>(`${API_DOMAIN}/get-jobs?page=${page}`).pipe(
        map(response => response.data),
        shareReplay(1)
      ).subscribe(data => {
        this.jobs$.next(data);
        this.jobsLoaded = true;
        this.currentpage = page;
      });
    }
    return this.jobs$;
  }

  searchJobs(query: string, page: number): Observable<any> {
    return this.http.get<any>(`${API_DOMAIN}/search-jobs?job=${query}&page=${page}`).pipe(
      map(response => response.data)
    );
  }
  getSignleJob(query: string): Observable<any> {
    return this.http.get<any>(`${API_DOMAIN}/search-job?job=${query}`).pipe(
      map(response => response.data)
    );
  }
  applyForJob(resource: any, query: string): Observable<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${API_DOMAIN}/apply-job?job=${query}`, resource, { headers }).pipe(
      map(response => response.data)
    );
  }
  AddJob(resource: any) {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${API_DOMAIN}/create-new-job`, resource, { headers }).pipe(
      map(response => response.data)
    );
  }
  getGuestCompanyJobs(query: string): Observable<any> {
    return this.http.get<any>(`${API_DOMAIN}/guest-company-jobs?company=${query}`).pipe(
      map(response => response.data)
    );
  }
  getCompanyJobs(): Observable<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    if (!this.jobsCompanyLoaded) {
      this.http.get<any>(`${API_DOMAIN}/get-company-jobs`, { headers }).pipe(
        map(response => response.data),
        shareReplay(1)
      ).subscribe(data => {
        this.jobs_company$.next(data);
        this.jobsCompanyLoaded = true;
      });
    }
    return this.jobs_company$;
  }
  uploadJobImage(formData: FormData, query: string) {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,

    });
    return this.http.put<any>(`${API_DOMAIN}/update-job-image?job=${query}`, formData, {
      headers
    }).pipe(map(response => response.data));
  }
  getApplicantsInfo(query: string) {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,

    });
    return this.http.get<any>(`${API_DOMAIN}/get-job-applicants?job=${query}`, {
      headers
    }).pipe(map(response => response.data));
  }
}
