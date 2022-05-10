import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  BASE_URL = 'https://705c-92-103-197-34.eu.ngrok.io';
  constructor(private client: HttpClient) {}

  getUsers() {
    return this.client.get<User[]>(this.BASE_URL.concat('/users'));
  }

  addUser(user: User) {
    return this.client.post<User>(this.BASE_URL.concat('/users'), user);
  }

  deleteUser(user: User) {
    return this.client.delete(this.BASE_URL.concat(`/users/${user.id}`));
  }

  updateUser(user: User) {
    return this.client.put<User>(
      this.BASE_URL.concat(`/users/${user.id}`),
      user
    );
  }
}
