import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from './user.model';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[];
  posts_subscription: Subscription;

  errorMessage: string;
  isErrorVisible: boolean;
  isInfoVisible: boolean;
  infoMessage: string;

  constructor(private userService: UsersService) { }

  ngOnDestroy(): void {
    this.posts_subscription.unsubscribe();
  }

  ngOnInit() {
    this.posts_subscription = this.userService.usersSubject.subscribe((users: User[]) => {
      this.users = users;
    });

    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      result => {
        this.userService.usersSubject.next(result.users);
        if (result.users.length < 1) {
          this.isInfoVisible = true;
          this.infoMessage = "No Posts to Show !";
        }
        else {
          this.isInfoVisible = false;
        }
        this.isErrorVisible = false;
      },
      error => {
        this.errorMessage = error.error.message;
        this.isErrorVisible = true;
        this.isInfoVisible = false;
      }
    );
  }

  followClick(id) {
    this.userService.follow(id).subscribe(
      result => {
        this.fetchUsers();
      },
      error => {
        this.errorMessage = error.error.message;
        this.isErrorVisible = true;
        this.isInfoVisible = false;
      }
    );
  }

  unfollowClick(id) {
    this.userService.unfollow(id).subscribe(
      result => {
        this.fetchUsers();
      },
      error => {
        this.errorMessage = error.error.message;
        this.isErrorVisible = true;
        this.isInfoVisible = false;
      }
    );
  }
}
