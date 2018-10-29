import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      let returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
      console.log('[LoginComponent][ngOnInit(){user}]', user);
      console.log('[LoginComponent][ngOnInit(){returnUrl}]', returnUrl);

        if (user) {
          this.userService.save(user);
          this.router.navigate([returnUrl]);
        }

      }
    );

  }

  doGoogleLogin() {
    this.authService.loginWithGmail();
  }

}
