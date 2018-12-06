import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {AppUser} from '../../models/app-user';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.appUser$
      .subscribe((appUser: AppUser) => {
        this.appUser = appUser;
      });
  }

  logout() {
    this.authService.signOut();
  }
}
