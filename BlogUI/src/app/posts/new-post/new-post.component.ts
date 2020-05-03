import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private postService: PostsService, private dialogRef: MatDialogRef<NewPostComponent>) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.postForm = new FormGroup({
      'postWrap': new FormGroup({
        'headerTextBox': new FormControl(null, [Validators.required]),
        'bodyTextArea': new FormControl(null, [Validators.required]),
        'hashtagTextBox': new FormControl(),
        'privateCheckbox': new FormControl(false)
      })
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const headerTextBox = this.postForm.value.postWrap.headerTextBox;
      const bodyTextArea = this.postForm.value.postWrap.bodyTextArea;
      if (headerTextBox && bodyTextArea) {
        const hashtagTextArea = this.postForm.value.postWrap.hashtagTextBox;
        const privateCheckbox = this.postForm.value.postWrap.privateCheckbox;

        let hashtag_array: string[] = [];
        if (hashtagTextArea)
          hashtag_array = hashtagTextArea.replace(' ', '').split('#').filter(h => h);

        const post = new Post(headerTextBox, bodyTextArea, privateCheckbox, hashtag_array);
        this.postService.sharePost(post).subscribe(
          result => {
            this.postService.fetchPosts().subscribe(
              result => {
                this.postService.postsSubject.next(result.posts);
                this.dialogRef.close();
              }
            );
          }
        );
      }
    }
  }

}
