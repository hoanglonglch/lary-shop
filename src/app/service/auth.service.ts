import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {User} from 'firebase';
import * as firebase from 'firebase/app';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor (private  afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  loginWithGmail(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOut(){
    this.afAuth.auth.signOut();
  }

}
