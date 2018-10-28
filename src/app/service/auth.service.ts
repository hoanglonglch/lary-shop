import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor (private  afAuth: AngularFireAuth,
               private router: Router) {
    this.user$ = this.afAuth.authState;
  }

  loginWithGmail() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOut() {
    this.router.navigate(['/']);
    this.afAuth.auth.signOut();
  }

}
