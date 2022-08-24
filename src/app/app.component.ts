import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  textDirection: string = '';

  constructor(public translate: TranslateService) {
    this.CheckDirection();
    // Register translation languages
    translate.addLangs(['English', 'Persian']);

    // Set default language
    translate.setDefaultLang('English');

  }

  ngOnInit(): void {
    if (localStorage.getItem('language') == 'English') {
      console.log("testtttttttttt");

    }

    if (localStorage.getItem('language') == null) {
      localStorage.setItem('language', 'English');
    }
    else {

      let lang = localStorage.getItem('language');
      this.translate.setDefaultLang(`${lang}`);
      this.translateLanguageTo(`${lang}`);
    }



  }

  CheckDirection() {
    const lang = localStorage.getItem('language');
    if (lang == 'Persian') {
      this.textDirection = 'rtl'
    }
    else {
      this.textDirection = 'ltr'

    }
  }

  //Switch language
  translateLanguageTo(language: string) {
    localStorage.setItem('language', language);
    language = language;

    this.translate.use(language);
  }

}
