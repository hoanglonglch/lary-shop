import {ShoppingCartItem} from './shopping-cart-item';

export class ShoppingCart {
  constructor(public items: ShoppingCartItem []) {  }

  get productIds(){
    return Object.keys(this.items);
  }

  get totalItemsCount () {
    let shoppingCartItemCount = 0;
    for (let shoppingCartItem in this.items) {
      shoppingCartItemCount += this.items[shoppingCartItem].quantity;
    }
    return shoppingCartItemCount;
  }
}
