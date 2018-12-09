import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {AppUser} from '../../models/app-user';
import {CartService} from '../service/cart.service';
import {ShoppingCart} from '../../models/shopping-cart';
import {Item} from '../../models/item';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  quantity = 0;

  constructor(public authService: AuthService,
              private cartService: CartService) {
  }

  async ngOnInit() {
    this.authService.appUser$
      .subscribe((appUser: AppUser) => {
        this.appUser = appUser;
      });

    let cart$ = await this.cartService.getCart();
    cart$.valueChanges().subscribe((cart: ShoppingCart) => {
      let items: Item[] = Object.keys(cart.items)
        .map(productKey => {
          return cart.items[productKey];
        });

      this.quantity = 0;
      items.forEach((item: Item) => {
        this.quantity += item.quantity;
      });

    });
  }

  logout() {
    this.authService.signOut();
  }
}
