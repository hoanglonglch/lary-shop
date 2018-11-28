import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Product} from '../../models/product';
import {Cart} from '../../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: AngularFireList<any []>;

  constructor(private database: AngularFireDatabase) {
    this.cart$ = database.list('/shopping-carts');
  }

  addCart(product: Product) {

    let cart: Cart = {
      dateCreated: '',
      productIds: [product.key]
    };

    let cartKey= localStorage.getItem('cartKey');

    if(cartKey) {
      this.database.object('/shopping-cart/' + cartKey).valueChanges().pipe()
      /*.subscribe((shoppingCart: Cart) => {
        console.log('shoppingCart', shoppingCart);
      });*/

    }else{
      this.database.list('/shopping-carts').push(cart).then(item => {
        console.log('item', item);
        console.log('key', item.key);
        localStorage.setItem('cartKey', item.key);
      });
    }


  }
}
