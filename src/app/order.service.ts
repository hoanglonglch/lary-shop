import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {CartService} from './service/cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private cartService: CartService,
              private database: AngularFireDatabase) {
  }

  async storeOrder(order) {
    let result = await this.database.list('/orders').push(order);
    this.cartService.removeShoppingCart();
    return result;
  }
}
