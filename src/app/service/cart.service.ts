import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Product} from '../../models/product';
import {Cart} from '../../models/cart';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {forEach} from '@angular/router/src/utils/collection';
import { take } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: AngularFireList<any []>;
  subscription;

  constructor(private database: AngularFireDatabase) {
    this.cart$ = database.list('/shopping-carts');
  }

  addCart(product: Product) {

    let cart: Cart = {
      dateCreated: '',
      productIds: [product.key]
    };

    let cartKey = localStorage.getItem('cartKey');

    if (cartKey) {
      this.database.object('/shopping-carts/' + cartKey).valueChanges()
      .subscribe((shoppingCart: Cart) => {
        console.log('cart', shoppingCart);

        let productIds = shoppingCart.productIds;

        if (productIds.indexOf(product.key) > -1) {
          //  don't update

        } else {
          productIds.push(product.key);
          cart.productIds = productIds;
          this.database.object('/shopping-carts/' + cartKey).update(cart);
        }
      });


    } else {
      this.database.list('/shopping-carts').push(cart).then(item => {
        console.log('item', item);
        console.log('key', item.key);
        localStorage.setItem('cartKey', item.key);
      });
    }


  }
}
