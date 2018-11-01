import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {switchMap} from 'rxjs/operators';
import {UserInfo} from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor (private  afAuth: AngularFireAuth,
               private router: Router,
               private userService: UserService) {
    this.user$ = this.afAuth.authState;
  }

  loginWithGmail() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOut() {
    this.router.navigate(['/']);
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<{}> {
    return this.user$.pipe(
      switchMap((user: UserInfo) => this.userService.get(user.uid)));
  }
}
