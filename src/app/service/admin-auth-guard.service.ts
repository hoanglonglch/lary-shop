import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, switchMap} from 'rxjs/operators';
import {UserService} from './user.service';
import {AppUser} from '../../models/app-user';


@Injectable({
  providedIn: 'root'
})

// TODO [ToRead]:  Using nested observable
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private userService: UserService) { }

  // [ToRead]
  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.authService.user$.pipe(
      switchMap(user => {
        console.log('userid', user.uid);
        return this.userService.get(user.uid);
      }),
      map(data2 => {
        console.log('[AdminAuthGuardService][canActivate()]{data2}', data2);
      })
    ).subscribe( data => {
      console.log('[AdminAuthGuardService][canActivate()]{data}', data);
    });
    return true;
  }*/

  canActivate(): Observable<boolean> {
    return this.authService.appUser$.pipe(
      map((appUser: AppUser) => {
        console.log('app user', appUser);
        return appUser.isAdmin;
      })
    );
  }

}
