import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/';
  private jwtToken: string | null;

  constructor(private http: HttpClient) {
    this.jwtToken = localStorage.getItem('authToken');
  }
  
  getUsers() {
    return this.http.get<any[]>(this.apiUrl + 'users', {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    });
  }

  getUserById(id: number) {
    return this.http.get<any>(this.apiUrl + 'users' + id, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    });
  }

  createUser(user: User) {
    return this.http.post<any>(this.apiUrl + 'users', user, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    });
  }

  updateUser(user: User) {
    return this.http.put<any>(this.apiUrl + 'users/' + user.id, user, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    });
  }

  deleteUser(id: number) {
    return this.http.delete(this.apiUrl + 'users/' + id, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    });
  }
}
