import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../service/cart.service';
import {ShoppingCart} from '../../models/shopping-cart';
import {take} from 'rxjs/operators';
import {OrderService} from '../order.service';
import {ShoppingCartItem} from '../../models/shopping-cart-item';
import {AuthService} from '../service/auth.service';
import {Order} from '../../models/order';
import {Router} from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cart: ShoppingCart;

  constructor(private cartService: CartService) {
  }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    cart$.valueChanges().pipe(take(1)).subscribe((cart: ShoppingCart) => {
      this.cart = new ShoppingCart(cart.items);
    });
  }

}
