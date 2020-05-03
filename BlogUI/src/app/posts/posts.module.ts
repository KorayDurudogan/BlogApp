import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';

import { PostsComponent } from './posts.component';
import { PostsService } from './posts.service';
import { PostsListComponent } from './posts-list/posts-list.component';
import { SharedModule } from '../shared/shared.module';
import { PostComponent } from './posts-list/post/post.component';
import { NewPostComponent } from './new-post/new-post.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostsListComponent,
    PostComponent,
    NewPostComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [PostsService],
  entryComponents: [NewPostComponent]
})
export class PostsModule { }
