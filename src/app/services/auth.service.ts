import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}