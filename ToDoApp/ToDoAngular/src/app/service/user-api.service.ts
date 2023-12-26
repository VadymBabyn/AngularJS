import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';
import { User } from '../model/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private apiUrl = 'http://localhost:5202/api/User';
  
  private isLoggedIn: boolean = false;
  private isLoggedInSubject = new Subject<boolean>();

  private userId: number | null = null;
  
  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setLoggedInStatus(status: boolean): void {
    this.isLoggedIn = status;
    this.isLoggedInSubject.next(status);
  }

  getLoggedInStatusObservable(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  setUserId(userId: number): void {
    this.userId = userId;
  }

  getUserId(): number | null {
    return this.userId;
  }
  
  constructor(private http: HttpClient) { }
 
  login(credentials: { user_login: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  
  register(user: { user_login: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
