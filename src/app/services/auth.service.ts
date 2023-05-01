import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7068/api/User/';
  constructor(private http: HttpClient) {}

  signUp(userObj: any) {
    return this.http.post(`${this.baseUrl}register`, userObj);
  }

  login(userObj: any) {
    return this.http.post(`${this.baseUrl}authenticate`, userObj);
  }

  getUsers(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}users`);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token') ?? ''; // e aceeasi cheie utilizata pentru a stoca tokenul
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
