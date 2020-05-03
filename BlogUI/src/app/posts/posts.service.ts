import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsSubject = new BehaviorSubject<Post[]>(null);

  hostEndPoint = "http://localhost:1453/api";

  constructor(private http: HttpClient) { }

  fetchPosts() {
    return this.http.get<{ posts: Post[] }>(this.hostEndPoint + '/posts');
  }

  fetchPostsByHashtag(hashtag) {
    return this.http.get<{ posts: Post[] }>(this.hostEndPoint + '/posts?hashtag=' + hashtag);
  }
}
