import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsModule } from './posts/posts.module';
import { TokenInterceptor } from './token.interceptor';
import { SharedModule } from './shared/shared.module';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PostsModule,
    RouterModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
