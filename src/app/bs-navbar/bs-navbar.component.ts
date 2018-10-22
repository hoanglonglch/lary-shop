import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {

  }

  ngOnInit() {
    this.afAuth.authState.subscribe( dataFromGoogle => {
      this.user = dataFromGoogle;
      let displayName = this.user ? this.user.displayName : '';
      console.log('[BsNavbarComponent][ngOnit()][GoogleData]', displayName);
    });
  }

  logout(){
    this.afAuth.auth.signOut();
  }
}
