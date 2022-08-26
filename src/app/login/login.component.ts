import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  textDirection: string = '';
  returnUrl: string = '';
  error = '';

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });



  constructor(
    public translate: TranslateService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.CheckDirection();
    // Register translation languages
    translate.addLangs(['English', 'Persian']);

    // Set default language
    translate.setDefaultLang('English');

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (localStorage.getItem('language') == null) {
      localStorage.setItem('language', 'English');
    }
    else {
      let lang = localStorage.getItem('language');
      this.translate.setDefaultLang(`${lang}`);
      this.translateLanguageTo(`${lang}`);
    }
    
  }

  //Switch language
  translateLanguageTo(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
    this.CheckDirection();
  }
  //direction
  CheckDirection() {
    const lang = localStorage.getItem('language');
    if (lang == 'Persian') {
      this.textDirection = 'rtl';
    }
    else {
      this.textDirection = 'ltr'
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  loginSubmit() {

    this.authenticationService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.error = error;
        });

  }

}
