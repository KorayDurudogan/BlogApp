import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PostsComponent } from './posts.component';
import { PostsService } from './posts.service';
import { PostsListComponent } from './posts-list/posts-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PostsComponent,
    PostsListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    SharedModule,
    FormsModule
  ],
  providers: [PostsService]
})
export class PostsModule { }
