import {Component, OnInit} from '@angular/core';
import {CartService} from '../service/cart.service';
import {ShoppingCart} from '../../models/shopping-cart';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart$: Observable<ShoppingCart>;

  constructor(private cartService: CartService) { }

   async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.shoppingCart$ = cart$.valueChanges().pipe(map((cart: ShoppingCart) => new ShoppingCart(cart.items)));

  }
}
