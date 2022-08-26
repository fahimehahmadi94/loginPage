import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    public translate: TranslateService) {
    // Register translation languages
    translate.addLangs(['English', 'Persian']);

    // Set default language
    translate.setDefaultLang('English');
  }

  ngOnInit(): void {
    if (localStorage.getItem('language') == null) {
      localStorage.setItem('language', 'English');
    }
    else {
      let lang = localStorage.getItem('language');
      this.translate.setDefaultLang(`${lang}`);
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }
}
