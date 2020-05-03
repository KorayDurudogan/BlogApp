import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsComponent } from './posts/posts.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: DashboardComponent, children: [
      {
        path: 'posts', component: PostsComponent, children: [
          { path: '', component: PostsListComponent }
        ]
      },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: 'posts', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
