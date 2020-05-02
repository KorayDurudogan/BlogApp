import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BlogUI';

  constructor(private loginService: LoginService, private router: Router) {
    this.manageLoginRouting();
    this.loginService.tokenObserver.subscribe(() => this.manageLoginRouting());
  }

  manageLoginRouting() {
    if (this.loginService.tokenObserver.getValue())
      this.router.navigate(['/']);
    else
      this.router.navigate(['/login']);
  }
}
