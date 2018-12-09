import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {AppUser} from '../../models/app-user';
import {CartService} from '../service/cart.service';
import {ShoppingCart} from '../../models/shopping-cart';
import {ShoppingCartItem} from '../../models/shopping-cart-item';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  shoppingCartItemCount = 0;

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
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items) {
        console.log('productId', productId);
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }

  logout() {
    this.authService.signOut();
  }
}
