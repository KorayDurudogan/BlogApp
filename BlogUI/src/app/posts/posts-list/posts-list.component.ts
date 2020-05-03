import { Component, OnInit, OnDestroy } from '@angular/core';

import { PostsService } from '../posts.service';

import { Post } from '../post.model';

@Component({
  selector: 'app-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {

  posts: Post[];

  serviceErrorMessage: string;
  isErrorVisible: boolean;

  hashtag: string;

  constructor(private postService: PostsService) { }

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
      },
      error => {
        this.serviceErrorMessage = error.error.message;
        this.isErrorVisible = true;
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
          this.isErrorVisible = false;
        },
        error => {
          this.serviceErrorMessage = error.error.message;
          this.isErrorVisible = true;
        }
      );
    }
  }

}
