import {Component, OnInit} from '@angular/core';
import {CartService} from '../service/cart.service';
import {ShoppingCart} from '../../models/shopping-cart';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ShoppingCartItem} from '../../models/shopping-cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart$: Observable<ShoppingCart>;
  shoppingCartItems: ShoppingCartItem[];

  constructor(private cartService: CartService) { }

   async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.shoppingCart$ = cart$.valueChanges().pipe(map((cart: ShoppingCart) => new ShoppingCart(cart.items)));

    this.shoppingCart$.subscribe((shoppingCart: ShoppingCart) => {
      this.shoppingCartItems = [];
      for (let productId in shoppingCart.items) {
        this.shoppingCartItems.push(shoppingCart.items[productId]);
      }
    });
  }
}
