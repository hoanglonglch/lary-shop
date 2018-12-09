import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Product} from '../../models/product';
import {Cart} from '../../models/cart';
import {take} from 'rxjs/operators';
import {ShoppingCartItem} from '../../models/shopping-cart-item';
import {map, switchMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: AngularFireList<any []>;

  constructor(private database: AngularFireDatabase) {
    this.cart$ = database.list('/shopping-carts');
  }

  private createCart (cart: Cart) {
    return this.database.list('/shopping-carts/').push(cart);
  }

  private createEmptyCart() {
    return this.database.list('/shopping-carts/').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart () {
    let cartId = await this.getOrCreateCartId();
    return this.database.object('/shopping-carts/' + cartId);
  }

  getItem (cartId, productKey) {
    return this.database.object('/shopping-carts/' + cartId + '/items/' + productKey);
  }

  private async getOrCreateCartId() {
    let cartKey = localStorage.getItem('cartKey');

    if (!cartKey) {
      let cartItem = await this.createEmptyCart();
      localStorage.setItem('cartKey', cartItem.key);
      return cartItem.key;
    }

    return cartKey;
  }

   getQuantity (productId: string) {
    let cartId = localStorage.getItem('cartKey');
   return this.database.list('/shopping-carts/' + cartId + '/items');
  }

   addToCart (product: Product) {
    this.updateItemQuatity(product, 1);
  }

  async removeFromCart (product: Product) {
    this.updateItemQuatity(product, -1);
  }

  async updateItemQuatity (product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: ShoppingCartItem) => {
      item$.update({
        product: product,
        quantity: (item && item.quantity || 0) + change
      });
    });
  }

  /**
   *[Refactor] This method has problem, return nothing,
   *do a lot of work (getCart, createCart) and not relative to function name
   * [TODO][Bug] Memory Leak
   **/
  /*addCart(product: Product) {

    let cart: Cart = {
      dateCreated: '',
      productIds: [product.key]
    };

    let cartKey = localStorage.getItem('cartKey');

    if (cartKey) {
      this.getCart(cartKey).valueChanges()
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
      this.createCart(cart).then(item => {
        console.log('key', item.key);
        localStorage.setItem('cartKey', item.key);
      });
    }


  }*/
}
