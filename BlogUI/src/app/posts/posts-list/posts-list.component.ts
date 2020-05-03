import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { NewPostComponent } from '../new-post/new-post.component';

@Component({
  selector: 'app-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {

  posts: Post[];

  errorMessage: string;
  isErrorVisible: boolean;

  isInfoVisible: boolean;
  infoMessage: string;

  hashtag: string;

  constructor(private postService: PostsService, private dialog: MatDialog) { }

  ngOnDestroy() {
    this.postService.postsSubject.unsubscribe();
  }

  ngOnInit() {
    this.setPosts();
    this.postService.postsSubject.subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  setPosts() {
    this.postService.fetchPosts().subscribe(
      (result) => {
        this.postService.postsSubject.next(result.posts);
        this.isErrorVisible = false;
        if (result.posts.length < 1) {
          this.isInfoVisible = true;
          this.infoMessage = "No Posts to Show !";
        }
        else {
          this.isInfoVisible = false;
        }
      },
      error => {
        this.errorMessage = error.error.message;
        this.isErrorVisible = true;
        this.isInfoVisible = false;
      }
    );
  }

  searchByHashtag() {
    if (this.hashtag) {
      //remove '#' char.
      const hashtag = this.hashtag.replace(/#/, '');

      this.postService.fetchPostsByHashtag(hashtag).subscribe(
        (result) => {
          this.postService.postsSubject.next(result.posts);
          if (result.posts.length < 1) {
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
    else {
      this.setPosts();
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "640px";
    dialogConfig.height = "260px";
    dialogConfig.panelClass = "custom-dialog-container";
    this.dialog.open(NewPostComponent, dialogConfig);
  }
}
