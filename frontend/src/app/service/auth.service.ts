import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'authToken';
  private roleKey = 'authRole';

  constructor(private http: HttpClient) {  }

  isLogged() {
    return new Promise((resolve, reject) => {
      const token = this.getToken();

      if (token) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  login(username: string, password: string) {
    const body = {
      userName: username,
      password: password
    };

    return this.http.post<any>(`${this.apiUrl}login`, body, {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
      .subscribe(response => {
        const { token, role } = response;
        this.saveToken(token);
        this.saveRole(role);
      });
  }

  getRole() {
    return localStorage.getItem(this.roleKey);
  }

  private saveRole(role: string) {
    localStorage.setItem(this.roleKey, role);
  }

  private saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }
}
