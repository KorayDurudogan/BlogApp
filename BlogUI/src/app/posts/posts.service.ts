import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsSubject = new BehaviorSubject<Post[]>(null);

  hostEndPoint = "http://localhost:1453/api/posts";

  constructor(private http: HttpClient) { }

  fetchPosts() {
    return this.http.get<{ posts: Post[] }>(this.hostEndPoint);
  }

  fetchPostsByHashtag(hashtag: string) {
    return this.http.get<{ posts: Post[] }>(this.hostEndPoint + '?hashtag=' + hashtag);
  }

  sharePost(new_post: Post) {
    return this.http.put<any>(this.hostEndPoint, new_post);
  }
}