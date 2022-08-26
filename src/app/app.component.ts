import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(
    private router: Router
  ) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser === null) {
      this.router.navigate(['/login']);
    } else {

      this.router.navigate(['/home']);
    }
  }


}
