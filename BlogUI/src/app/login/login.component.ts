import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  serviceErrorMessage: string;
  isRegisterMode: boolean = false;
  headerText: string;
  buttonText: string;
  modeSwitchText: string;

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    this.setTextsAccordingToMode();
  }

  createForm() {
    this.loginForm = new FormGroup({
      'loginWrap': new FormGroup({
        'emailDiv': new FormGroup({
          'emailTextbox': new FormControl("koray@gmail.com", [Validators.required, Validators.email]),
        }),
        'passDiv': new FormGroup({
          'passwordTextbox': new FormControl("1234", [Validators.required])
        })
      })
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.loginWrap.emailDiv.emailTextbox;
      const pass = this.loginForm.value.loginWrap.passDiv.passwordTextbox;
      if (!this.isRegisterMode)
        this.login(email, pass);
      else
        this.register(email, pass);
    }
  }

  register(email, pass) {
    this.loginService.callRegister(email, pass).subscribe(
      result => {
        if (result.message == "success")
          this.login(email, pass);
        else
          this.serviceErrorMessage = "Something went wrong !";
      },
      error => {
        this.serviceErrorMessage = error.error.message;
      }
    );
  }

  login(email, pass) {
    this.loginService.callLogin(email, pass).subscribe(
      result => {
        if (result.message == "success")
          this.loginService.tokenObserver.next(result.token);
        else
          this.serviceErrorMessage = "Something went wrong !";
      },
      error => {
        this.serviceErrorMessage = error.error.message;
      }
    );
  }

  setTextsAccordingToMode() {
    if (!this.isRegisterMode) {
      this.headerText = "sign in now";
      this.buttonText = "sign in";
      this.modeSwitchText = "Not a member ? Register now.";
    }
    else {
      this.headerText = "sign up now";
      this.buttonText = "sign up";
      this.modeSwitchText = "Already a member ? Login now";
    }
  }

  toggleRegisterMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.setTextsAccordingToMode();
  }
}
