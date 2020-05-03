import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersSubject = new BehaviorSubject<User[]>(null);

  hostEndPoint = "http://localhost:1453/api/users";

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<{ users: User[] }>(this.hostEndPoint);
  }

  follow(followed_id) {
    const body = { user_id: followed_id };
    return this.http.put<any>(this.hostEndPoint + "/follow", body);
  }

  unfollow(unfollowed_id) {
    const body = { user_id: unfollowed_id };
    return this.http.put<any>(this.hostEndPoint + "/unfollow", body);
  }
}
