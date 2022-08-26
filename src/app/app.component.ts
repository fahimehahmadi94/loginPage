import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {



  constructor(
    private router: Router,
    public translate: TranslateService
  ) {

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser === null) {
      this.router.navigate(['']);
    } else {

      this.router.navigate(['/home']);
    }
  }


  ngOnInit(): void {
 
  }
}
